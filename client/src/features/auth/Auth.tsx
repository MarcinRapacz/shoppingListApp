import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import * as AuthAPI from "../../api/auth";
import * as auth from "./authSlice";
import * as alert from "../alert/alertSlice";
import "./Auth.scss";
import FacebookLogin from "../facebookLogin/FacebookLogin";
import GoogleLogin from "../googleLogin/GoogleLogin";

interface Props {
  mode: string;
}

const schema: yup.ObjectSchema<AuthAPI.Request> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Podaj poprawny adres email")
      .required("To pole jest wymagane"),
    password: yup
      .string()
      .min(8, "Hasło powinno miec minimum 8 znaków")
      .required("To pole jest wymagane"),
  })
  .defined();

const Auth: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const { mode } = props;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AuthAPI.Request) => {
    try {
      let token = "";
      let message = "";
      switch (mode) {
        case "login": {
          const response = await AuthAPI.login(data);
          token = response.data.token;
          message = response.data.message;
          break;
        }

        case "create": {
          const response = await AuthAPI.create(data);
          token = response.data.token;
          message = response.data.message;
          break;
        }

        default:
          break;
      }

      if (token) {
        dispatch(alert.show({ message, status: "success" }));
        dispatch(auth.set(token));
      }
    } catch (error) {
      dispatch(
        alert.show({
          message: error.response.data.message,
          status: "danger",
        })
      );
      dispatch(auth.reset());
    }
  };

  return (
    <Container className="Auth">
      <Row className="justify-content-md-center">
        <Col xs md="4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Adres email"
                name="email"
                isInvalid={!!errors.email}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Hasło"
                name="password"
                isInvalid={!!errors.password}
                ref={register()}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" className="btn-block" type="submit">
              Dołącz
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-2">
        <Col xs md="2">
          <FacebookLogin />
        </Col>
        <Col xs md="2">
          <GoogleLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
