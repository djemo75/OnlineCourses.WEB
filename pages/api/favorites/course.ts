import { NextApiRequest, NextApiResponse } from "next";
import { ContentfulClient } from "@src/shared/api/services/contentfulClient";
import { baseHandler } from "@src/shared/api/utils/baseHandler";
import { mapContentfulCourseToResponse } from "@src/shared/api/utils/mapContentfulCourseToResponse";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { extractAccessToken } from "@src/shared/api/utils/extractAccessToken";
import {
  FavoriteItemType,
  FavoriteResponse,
} from "@src/shared/api/types/favorite";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = extractAccessToken(req);

  if (!accessToken) {
    return res.send([]);
  }

  const onlineCoursesClient = new OnlineCoursesClient(accessToken);
  const contentfulClient = new ContentfulClient();

  const favoriteCourses = await onlineCoursesClient.getFavoritesByItemType(
    FavoriteItemType.COURSE
  );
  const courseIds = favoriteCourses.map(({ itemId }) => itemId);

  const response = await Promise.all(
    courseIds.map(async (courseId) => {
      const course = await contentfulClient.getCourse(courseId);
      const statistic = await onlineCoursesClient.getRatingStatistic(courseId);
      return mapContentfulCourseToResponse(
        course,
        true,
        statistic.averageRating
      );
    })
  );

  res.send(response);
});

export default handler;
