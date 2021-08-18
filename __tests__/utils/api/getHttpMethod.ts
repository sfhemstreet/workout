import { NextApiRequest } from "next";
import { getHttpMethod } from "../../../utils/api/getHttpMethod";

test("getHttpMethod returns HTTP method", () => {
  const meth1 = "POST";
  const meth2 = "patch";
  const meth3 = "deletE";
  const meth4 = "Get";
  const nullMeth = "";

  expect(getHttpMethod({ method: meth1 } as NextApiRequest)).toBe("POST");
  expect(getHttpMethod({ method: meth2 } as NextApiRequest)).toBe("PATCH");
  expect(getHttpMethod({ method: meth3 } as NextApiRequest)).toBe("DELETE");
  expect(getHttpMethod({ method: meth4 } as NextApiRequest)).toBe("GET");
  expect(getHttpMethod({ method: nullMeth } as NextApiRequest)).toBe(null);
})