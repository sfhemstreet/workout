import * as validator from "../../utils/validation";
import { PASSWORD_LENGTH, USERNAME_LENGTH } from "./constants";

/**
 * checkPassword
 * 
 * Validates 4 aspects of password
 * 
 * `hasLetter`
 * `hasNumber`
 * `hasSymbol`
 * `hasLength`
 * 
 * @param value password to check
 */
export const checkPassword = (value: string) => ({
  hasLetter: validator.hasLetter(value),
  hasNumber: validator.hasNumber(value),
  hasSymbol: validator.hasSymbol(value),
  hasLength: validator.hasLength(value, PASSWORD_LENGTH),
});

/**
 * checkUsername
 * 
 * Validates 3 aspects of username
 * 
 * `hasLength`
 * `hasNoWhiteSpace`
 * `hasNoSymbols`
 * 
 * @param value username string to check
 */
export const checkUsername = (value: string) => ({
  hasLength: validator.hasLength(value, USERNAME_LENGTH),
  hasNoWhitespace: !validator.hasWhitespace(value),
  hasNoSymbols: !validator.hasSymbol(value, ["-", "_"]),
});