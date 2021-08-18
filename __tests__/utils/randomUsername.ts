import { randomUserName } from "../../utils/randomUserName";

test("Creates random username", async () => {
  const name = await randomUserName()

  expect(name).toBeTruthy();
})