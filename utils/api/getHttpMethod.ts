import { NextApiRequest } from "next";
import { HttpMethod } from "../../types/HttpMethod";

export function getHttpMethod(req: NextApiRequest): null | HttpMethod {
  if (!req.method) return null;

  if (
    req.method === "get" ||
    req.method === "post" ||
    req.method === "patch" ||
    req.method === "delete" 
  )
    return req.method.toUpperCase() as HttpMethod;

  if (
    req.method !== "GET" &&
    req.method !== "POST" &&
    req.method !== "PATCH" &&
    req.method !== "DELETE"
  )
    return null;

  return req.method as HttpMethod;
}
