export enum FavoriteItemType {
  COURSE = "course",
  COURSE_LESSON = "courseLesson",
}

export type FavoriteResponse = {
  id: number;
  userId: number;
  itemType: FavoriteItemType;
  itemId: string;
  createdAt: string;
  updatedAt: string;
};
