import { NextApiRequest } from "next";
import { firebaseAdmin } from "./firebaseAdmin";

/**
 * getUserId
 * 
 * Takes NextApiRequest and extracts token from req.body
 * If token is verified by firebase returns user's id.
 * 
 * @param req API route request 
 */
export async function getUserId(req: NextApiRequest) {
  try {
    const idToken: string | undefined = req.body.token;

    if (!idToken) {
      console.log("NULL TOKEN");
      return null;
    }

    console.log("TOKEN ->", idToken);

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      console.log("Decoded??", decodedToken, "uid?", decodedToken.uid);
      return decodedToken.uid;
    } catch (err) {
      console.error("Failed to decode token.", err);
      return null;
    }
  } catch (bodyErr) {
    console.error("Failed to find token in req.body", bodyErr);
    return null;
  }
}
