import styled from "@emotion/styled";

import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Tag, tags } from "../types/Tag";
import { SelectableInlineButton } from "./Buttons";

type TagSelectorProps = {
  onClick: (tag: Tag) => void;
  selectedTags: Tag[];
};

/**
 * Tag Selector
 * 
 * Displays all the tags for workouts as selectable buttons.
 * 
 * @param onClick function called when tag is clicked
 * @param selectedTags array of Tags that have been selected
 */
export const TagSelector = ({ onClick, selectedTags }: TagSelectorProps) => (
  <TagsRow>
    {tags.map((tag) => (
      <SelectableInlineButton
        key={tag}
        onClick={(e) => {
          e.preventDefault();
          onClick(tag);
        }}
        isSelected={selectedTags.includes(tag)}
      >
        {tag}
      </SelectableInlineButton>
    ))}
  </TagsRow>
);

export const TagsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;

  border-radius: 10px;
  ${p => SurfaceElevation(p.theme.name, 3)};
`;
