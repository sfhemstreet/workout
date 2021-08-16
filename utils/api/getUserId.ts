import { NextApiRequest } from "next";
import { firebaseAdmin } from "./firebaseAdmin";

export async function getUserId(req: NextApiRequest) {
  try {
    const idToken: string | undefined = req.body.token;

    if (!idToken) {
      return null;
    }

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
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
