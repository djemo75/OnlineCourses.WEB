import { NextApiRequest, NextApiResponse } from "next";
import { ContentfulClient } from "@src/shared/api/services/contentfulClient";
import { baseHandler } from "@src/shared/api/utils/baseHandler";
import { mapContentfulCourseToResponse } from "@src/shared/api/utils/mapContentfulCourseToResponse";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { extractAccessToken } from "@src/shared/api/utils/extractAccessToken";
import { FavoriteResponse } from "@src/shared/api/types/favorite";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = extractAccessToken(req);
  const courseId = (req.query.courseId as string) || "";

  const contentfulClient = new ContentfulClient();
  const course = await contentfulClient.getCourse(courseId);

  let favorites: FavoriteResponse[] = [];

  const onlineCoursesClient = new OnlineCoursesClient(accessToken);
  if (accessToken) {
    favorites = await onlineCoursesClient.getFavoritesByItemIds([courseId]);
  }

  const statistic = await onlineCoursesClient.getRatingStatistic(course.sys.id);

  const response = mapContentfulCourseToResponse(
    course,
    favorites.some((favorite) => favorite.itemId === course.sys.id),
    statistic.averageRating
  );
  res.send(response);
});

export default handler;
