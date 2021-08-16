import { Action, AnyAction } from "redux";
import { OperatorFunction } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * myOfType works exactly like `ofType` in redux-observable,
 * but it provides the action payload type.
 *
 * Use this instead of `ofType` when you need to access the payload property of an action.
 *
 * @param types
 */
export function myOfType<
  Input extends AnyAction,
  // Note: Without letting `Type` extending string, Type cannot be inferred to a literal type.
  Type extends Input["type"] & string,
  Output extends Input = Extract<Input, Action<Type>>
>(...types: Type[]): OperatorFunction<Input, Output> {
  return filter((input): input is Output => {
    return types.indexOf(input.type) >= 0;
  });
}
