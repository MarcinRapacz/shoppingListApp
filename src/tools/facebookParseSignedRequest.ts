import crypto from "crypto";

//remove a dependency on b64url
function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
}

interface IParseSignedRequest {
  user_id: string;
  code: string;
  algorithm: string;
  issued_at: number;
}

export function parseSignedRequest(
  signedRequest: string,
  secret = process.env.FACEBOOK_APP_SECRET as string
): IParseSignedRequest | null {
  try {
    const encodedData = signedRequest.split(".");
    // decode the data
    const sig = encodedData[0];
    const json = atob(encodedData[1]);
    const data = JSON.parse(json); // ERROR Occurs Here!

    // check algorithm - not relevant to error
    if (!data.algorithm || data.algorithm.toUpperCase() != "HMAC-SHA256") {
      throw Error(
        "Unknown algorithm: " + data.algorithm + ". Expected HMAC-SHA256"
      );
    }

    // check sig - not relevant to error
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(encodedData[1])
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace("=", "");
    if (sig !== expectedSig) {
      throw Error("Invalid signature: " + sig + ". Expected " + expectedSig);
    }

    return data;
  } catch (error) {
    return null;
  }
}
