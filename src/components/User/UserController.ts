import express from "express";
import bcrypt from "bcryptjs";
import axios from "axios";
import { JWT } from "../../tools/jsonWebToken";
import { handleValidation } from "../../tools/handleValidation";
import User from "./UserModel";
import handleError from "../../tools/handleError";
import { parseSignedRequest } from "../../tools/facebookParseSignedRequest";

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const { email, password } = req.body;

    // Znajdz usera
    const user = await User.findOne({ email });
    if (!user) {
      return handleError({ message: "Invalid credentials", statusCode: 401 });
    }

    // Porownaj hashe hasel
    const isMatch = bcrypt.compareSync(password, user.password || "");
    if (!isMatch) {
      return handleError({ message: "Invalid credentials", statusCode: 401 });
    }

    // Przygoruj token
    const token = JWT.create(user);

    // Zwroc token
    return res.status(200).json({ token, message: "User login" });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      handleError({ message: "Email already exists", statusCode: 400 });
    }

    user = new User({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await user.save();

    const token = JWT.create(user);

    return res.status(201).json({ token, message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const facebook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const MSG_ERROR = "Invalid signed request";
    const { id, signedRequest, accessToken } = req.body;

    const decodedSignedRequest = parseSignedRequest(signedRequest);

    if (!decodedSignedRequest) {
      handleError({ message: MSG_ERROR, statusCode: 400 });
      return;
    }

    if (decodedSignedRequest.user_id !== id) {
      handleError({ message: MSG_ERROR, statusCode: 400 });
      return;
    }

    const URL = `https://graph.facebook.com/${id}?fields=id,name,email,picture&access_token=${accessToken}`;
    const response = await axios.get(URL);

    if (response.data.id !== decodedSignedRequest.user_id) {
      handleError({ message: MSG_ERROR, statusCode: 400 });
      return;
    }

    let token = "";
    const STRATEGY_NAME = "facebook";
    const isUserExists = await User.findOne({
      strategyId: decodedSignedRequest.user_id,
      strategy: STRATEGY_NAME,
    });

    if (isUserExists?.id) {
      token = JWT.create(isUserExists);
      return res.status(200).json({ token, message: "User login" });
    }

    const user = new User({
      name: response.data.name,
      email: response.data.email,
      photoURL: response.data.picture?.data?.url,
      strategy: STRATEGY_NAME,
      strategyId: decodedSignedRequest.user_id,
    });
    await user.save();

    token = JWT.create(user);
    return res.status(201).json({ token, message: "User created" });
  } catch (error) {
    next(error);
  }
};

export const google = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { idToken } = req.body;
    const URL = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    const response = await axios.get(URL);

    let token = "";
    const STRATEGY_NAME = "google";
    const isUserExists = await User.findOne({
      strategyId: response.data.sub,
      strategy: STRATEGY_NAME,
    });

    if (isUserExists?.id) {
      token = JWT.create(isUserExists);
      return res.status(200).json({ token, message: "User login" });
    }

    const user = new User({
      name: response.data.name,
      email: response.data.email,
      photoURL: response.data.picture,
      strategy: STRATEGY_NAME,
      strategyId: response.data.sub,
    });
    await user.save();

    token = JWT.create(user);
    return res.status(201).json({ token, message: "User created" });
  } catch (error) {
    next(error);
  }
};
