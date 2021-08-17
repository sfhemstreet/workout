// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkUsername } from "../../components/SignIn/helpers";
import { CreateUserAPIBody } from "../../types/CreateUserAPIBody";
import { firebaseAdmin } from "../../utils/api/firebaseAdmin";
import { getHttpMethod } from "../../utils/api/getHttpMethod";
import { getUserId } from "../../utils/api/getUserId";

export type UserApiResponseData =
  | { type: "FAILED"; data: { error: string } }
  | { type: "USER_CREATED"; data: { success: boolean } };

export default async function createUserApiRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserApiResponseData>
) {
  const method = getHttpMethod(req);

  if (!method) {
    res.status(405).json({
      type: "FAILED",
      data: { error: "No method." },
    });
    return;
  }

  if (method !== "POST") {
    res.status(405).json({
      type: "FAILED",
      data: { error: "Invalid method." },
    });
    return;
  }

  const uid: string | null = await getUserId(req);

  if (!uid) {
    res.status(401).json({
      type: "FAILED",
      data: { error: "Not authenticated." },
    });
    return;
  }

  // Create user
  if (method === "POST") {
    const user = req.body.user as CreateUserAPIBody | undefined;

    if (!user || !isCreateUserValid(user)) {
      res.status(400).json({
        type: "FAILED",
        data: {
          error: "Invalid body.",
        },
      });
      return;
    }

    const workoutIds = user.workouts.map((workout) => workout.id);
    const workoutsToUpload = user.workouts.filter(
      (workout) => workout.creator.id === user.id
    );

    try {
      await firebaseAdmin.firestore().collection("users").doc(uid).create({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        playSounds: user.playSounds,
        theme: user.theme,
        workouts: workoutIds,
        completedWorkouts: user.completedWorkouts,
      });

      if (workoutsToUpload.length > 0) {
        try {
          const batch = firebaseAdmin.firestore().batch();

          workoutsToUpload.forEach((workout) => {
            const workoutRef = firebaseAdmin
              .firestore()
              .collection("workouts")
              .doc(workout.id);
            batch.create(workoutRef, {
              ...workout,
              // After being stringified and parsed the createdAt Date is actually a string.
              // We need to convert it to a timestamp before sending it to Firestore.
              createdAt: firebase.firestore.Timestamp.fromDate(
                new Date(workout.createdAt)
              ),
            });
          });

          await batch.commit();
        } catch (workoutsErr) {
          console.error("Error uploading workouts", workoutsErr);
        }
      }

      res.status(201).json({
        type: "USER_CREATED",
        data: { success: true },
      });

      return;
    } catch (postErr) {
      console.error("Failed to create user.", postErr);
      res.status(400).json({
        type: "FAILED",
        data: { error: "Failed to create user." },
      });
      return;
    }
  }
}

function isCreateUserValid(user: CreateUserAPIBody | undefined) {
  try {
    if (!user) return false;

    if (user.id.length < 6) return false;

    if (Object.values(checkUsername(user.name)).includes(false)) return false;

    if (!user.avatar.startsWith("https://robohash.org")) return false;

    if (typeof user.playSounds !== "boolean") return false;

    if (user.theme !== "DARK" && user.theme !== "LIGHT") return false;

    if (typeof user.workouts !== "object") return false;

    if (typeof user.completedWorkouts !== "object") return false;

    return true;
  } catch (err) {
    console.error("Failed to validateCreateUser", err);
    return false;
  }
}
