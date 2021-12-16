import { from, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, mapTo, mergeMap } from "rxjs/operators";
import { firebase } from "../../../firebase/firebase";
import { ThemeType, Workout } from "../../../types";
import { CompletedWorkout } from "../../../types/CompletedWorkout";
import { userRegisterFail } from "../../ducks/user";

type CreateUserOptions = {
  id: string;
  name: string;
  avatar: string;
  playSounds: boolean;
  theme: ThemeType;
  workouts: Workout[];
  completedWorkouts: CompletedWorkout[];
};
export const createUser$ = (user: CreateUserOptions, token: string) =>
  ajax({
    url: "/api/user",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      user,
      token,
    },
  });

export const deleteUserIfExists$ = of(firebase.auth().currentUser).pipe(
  mergeMap((user) =>
    user
      ? from(user.delete()).pipe(
          mapTo(userRegisterFail("Ooops, we messed up. Please try again 🙏")),
          catchError((err) =>
            of(userRegisterFail("Ugh, we messed up! Please try again."))
          )
        )
      : of(userRegisterFail("Yikes, we messed up. Please try again 😓"))
  )
);
