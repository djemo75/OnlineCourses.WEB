import { ContentfulCourseWithFields, CourseResponse } from "../types/course";
import { mapContentfulAssetToResponse } from "./mapContentfulAssetToResponse";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const mapContentfulCourseToResponse = (
  course: ContentfulCourseWithFields,
  isFavorite: boolean,
  averageRating: number
): CourseResponse => {
  return {
    id: course.sys.id,
    title: course.fields.title,
    description: documentToHtmlString(course.fields.description),
    image: mapContentfulAssetToResponse(course.fields.image),
    tags: course.fields.tags,
    createdAt: course.sys.createdAt,
    favorite: isFavorite,
    averageRating,
  };
};
