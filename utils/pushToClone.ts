import { NextRouter } from "next/router";

/**
 * pushToClone 
 * 
 * uses the router to set the cloneId query param and push to the /clone page.
 * 
 * @param router 
 * @param cloneId 
 */
export const pushToClone = (router: NextRouter, cloneId: string) =>
  router.push({ pathname: "/clone", query: { cloneId } });
