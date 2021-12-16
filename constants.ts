export const REST_PERIOD = "_-_ReSt_-_";
export const MAX_WORKOUT_ROUNDS = 100;
export const MAX_EXERCISE_DURATION = 5999;
export const MAX_EXERCISE_REPETITIONS = 999;
export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 43;
export const MIN_DESCRIPTION_LENGTH = 0;
export const MAX_DESCRIPTION_LENGTH = 400;

export const NAME_LENGTH = {
  min: MIN_NAME_LENGTH,
  max: MAX_NAME_LENGTH,
} as const;

export const PAGE_TITLE_MAP = {
  "/": {
    full: "🦾 WORKOUT",
    text: "Workout",
    icon: "🦾",
  },
  "/about": {
    full: "❓ ABOUT",
    text: "About",
    icon: "❓",
  },
  "/create": {
    full: "🛠 CREATE",
    text: "Create",
    icon: "🛠",
  },
  "/edit": {
    full: "🎛 EDIT",
    text: "Edit",
    icon: "🎛",
  },
  "/history": {
    full: "📜 HISTORY",
    text: "History",
    icon: "📜",
  },
  "/workout": {
    full: "💥 WORKOUT",
    text: "Workout",
    icon: "💥",
  },
  "/explore": {
    full: "🛸 EXPLORE",
    text: "Explore",
    icon: "🛸",
  },
  "/my-workouts": {
    full: "❤️ MY WORKOUTS",
    text: "My Workouts",
    icon: "❤️",
  },
  "/clone": {
    full: "🧬 CLONE",
    text: "Clone",
    icon: "🧬"
  },
  "/404": {
    full: "🔎 404",
    text: "404",
    icon: "🔎"
  }
} as const;