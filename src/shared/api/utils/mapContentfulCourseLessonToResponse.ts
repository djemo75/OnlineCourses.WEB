import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import {
  ContentfulCourseLessonWithFields,
  CourseLessonResponse,
} from "../types/courseLesson";

export const mapContentfulCourseLessonToResponse = (
  course: ContentfulCourseLessonWithFields,
  isFavorite: boolean,
  averageRating: number
): CourseLessonResponse => {
  return {
    id: course.sys.id,
    courseId: course.fields.course.sys.id,
    title: course.fields.title,
    description: documentToHtmlString(course.fields.description),
    duration: course.fields.duration,
    videoUrl: course.fields.videoUrl,
    createdAt: course.sys.createdAt,
    favorite: isFavorite,
    averageRating,
  };
};
