export enum RatingItemType {
  COURSE = "course",
  COURSE_LESSON = "courseLesson",
}

export enum RatingValue {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

type Rating = {
  id: number;
  userId: number;
  itemType: RatingItemType;
  itemId: string;
  value: RatingValue;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  picture: string;
};

export type RatingResponse = Rating & { user: User };
