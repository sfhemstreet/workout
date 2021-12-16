import * as Icons from "../../components/Icons";
import { render } from "../test-utils/render";

test("Icons render properly", () => {
  const icons = render(<div>
    <Icons.CheckIcon />
    <Icons.CheckIcon isChecked/>
    <Icons.CheckIcon isFilled/>
    <Icons.CheckIcon isChecked isFilled />

    <Icons.EyeIcon />
    <Icons.EyeIcon isCrossedOut />
    <Icons.EyeIcon isFilled />
    <Icons.EyeIcon isCrossedOut isFilled />

    <Icons.StarIcon />
    <Icons.StarIcon isFilled />
  </div>)
})