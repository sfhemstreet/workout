import { removeDuplicates } from "../../utils/removeDuplicates";

test("Removes duplicate values from array and objects", () => {
  const arrNum = [1,1,1,2,2,2,3,3,3];
  const arrObj = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }, { id: 2 }, { id: 3 }, { id: 3 }, { id: 3 }];

  expect(removeDuplicates(arrNum)).toStrictEqual([1,2,3]);
  expect(removeDuplicates(arrObj)).toStrictEqual([{id: 1}, {id: 2}, {id: 3}]);
})