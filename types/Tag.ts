export const tags =  [
  "core",
  "arms",
  "legs",
  "lats",
  "chest",
  "back",
  "shoulders",

  "full-body",
  "lower-body",
  "upper-body",
  
  "coordination",
  "balance",
  "cardio",
  "body-weight",
] as const;

export type Tag = typeof tags[number];