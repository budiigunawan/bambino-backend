import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";

const getSecret = async () => {
  const encoder = new TextEncoder();
  const unit8Array = encoder.encode(process.env.TOKEN_SECRET);
  return unit8Array.buffer as ArrayBuffer;
};

export const createToken = async (userId: string) => {
  const secret = await getSecret();
  const payload = {};
  const options = {
    subject: userId,
    expiresIn: new TimeSpan(30, "d"),
    includeIssuedTimestamp: true,
  };

  try {
    const jwt = await createJWT("HS256", secret, payload, options);

    return jwt;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const validateToken = async (token: string) => {
  const secret = await getSecret();

  try {
    const decodedToken = await validateJWT("HS256", secret, token);
    return decodedToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};
