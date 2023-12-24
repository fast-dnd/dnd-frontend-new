import { IDungeonDetail } from "@/types/dungeon";
import { DungeonTag } from "@/utils/dungeon/dungeon-options";

export type TagsWithLabel = { label: DungeonTag; value: DungeonTag }[];

export interface IDungeonDetailWithTags
  extends Omit<IDungeonDetail, "tags" | "rating" | "numOfRatings"> {
  tags: TagsWithLabel;
}

export const tagsAttachLabel = (tags: DungeonTag[] | readonly DungeonTag[]) =>
  tags.map((tag) => ({ value: tag, label: tag }));

export const tagsRemoveLabel = (tags: TagsWithLabel) => tags.map((tag) => tag.value);
