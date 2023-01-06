import Contentful, { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { ContentfulCourseFields } from "./course";

export type ContentfulCourseLessonFields = {
  title: Contentful.EntryFields.Text;
  description: Document;
  duration: Contentful.EntryFields.Number;
  videoUrl: Contentful.EntryFields.Text;
  course: Entry<ContentfulCourseFields>;
};

export type ContentfulCourseLessonWithFields =
  Entry<ContentfulCourseLessonFields>;

export type CourseLessonResponse = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  createdAt: string;
  favorite: boolean;
  averageRating: number;
};
