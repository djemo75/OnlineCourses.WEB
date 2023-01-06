import { ContentfulClientApi } from "contentful";
import { ContentfulCategoryFields } from "../types/category";
import { ContentfulCourseFields } from "../types/course";
import { ContentfulCourseLessonFields } from "../types/courseLesson";

const contentful = require("contentful");

type CourseFilters = {
  categoryId: string;
  level: string[];
};

export class ContentfulClient {
  readonly client: ContentfulClientApi;
  public constructor() {
    this.client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  public async getCategories() {
    const result = await this.client.getEntries<ContentfulCategoryFields>({
      content_type: "courseCategory",
      limit: 1000,
    });

    return result;
  }

  public async getCourses(
    filters: CourseFilters,
    pageNumber: number,
    pageSize: number
  ) {
    let query: any = {
      content_type: "course",
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      [`fields.category.sys.id`]: `${filters.categoryId}`,
    };
    if (filters.level.length) {
      query[`fields.level[in]`] = filters.level.join(",");
    }

    const result = await this.client.getEntries<ContentfulCourseFields>(query);

    return result;
  }

  public async getCourse(courseId: string) {
    const result = await this.client.getEntry<ContentfulCourseFields>(courseId);

    return result;
  }

  public async getCourseLessons(courseId: string) {
    const result = await this.client.getEntries<ContentfulCourseLessonFields>({
      content_type: "courseLesson",
      limit: 1000,
      [`fields.course.sys.id`]: `${courseId}`,
      order: "sys.createdAt",
    });

    return result;
  }

  public async getCourseLesson(courseLessonId: string) {
    const result = await this.client.getEntry<ContentfulCourseLessonFields>(
      courseLessonId
    );

    return result;
  }
}
