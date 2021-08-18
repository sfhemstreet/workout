import { NextApiRequest } from "next";
import { HttpMethod } from "../../types/HttpMethod";

/**
 * getHttpMethod
 * 
 * Helper function to get formatted request type.
 * 
 * @param req API route request
 */
export function getHttpMethod(req: NextApiRequest): null | HttpMethod {
  if (!req.method) return null;

  const method = req.method.toUpperCase();

  if (
    method !== "GET" &&
    method !== "POST" &&
    method !== "PATCH" &&
    method !== "DELETE"
  )
    return null;

  return method as HttpMethod;
}
