import axios, { AxiosResponse } from "axios";
import { CourseResponse } from "../types/course";
import { CourseLessonResponse } from "../types/courseLesson";
import { FavoriteItemType } from "../types/favorite";
import { PaginationResponse } from "../types/pagination";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class NextApiClient {
  readonly accessToken: string | undefined;
  public constructor(accessToken?: string) {
    this.accessToken = accessToken;
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  }

  public async getCourse(courseId: string): Promise<CourseResponse> {
    const result = await axios.get(`${API_URL}/api/course/${courseId}`);

    return result.data;
  }

  public async getCourseLessons(
    courseId: string
  ): Promise<PaginationResponse<CourseLessonResponse>> {
    const result = await axios.get<PaginationResponse<CourseLessonResponse>>(
      `${API_URL}/api/course/${courseId}/lessons`
    );

    return result.data;
  }

  public async getFavoriteCourses(): Promise<CourseResponse[]> {
    const result = await axios.get(
      `${API_URL}/api/favorites/${FavoriteItemType.COURSE}`
    );

    return result.data;
  }

  public async getFavoriteCourseLessons(): Promise<CourseLessonResponse[]> {
    const result = await axios.get(
      `${API_URL}/api/favorites/${FavoriteItemType.COURSE_LESSON}`
    );

    return result.data;
  }
}
