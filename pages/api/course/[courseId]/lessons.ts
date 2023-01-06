import { NextApiRequest, NextApiResponse } from "next";
import { ContentfulClient } from "@src/shared/api/services/contentfulClient";
import { baseHandler } from "@src/shared/api/utils/baseHandler";
import { mapContentfulCourseLessonToResponse } from "@src/shared/api/utils/mapContentfulCourseLessonToResponse";
import { extractAccessToken } from "@src/shared/api/utils/extractAccessToken";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { FavoriteResponse } from "@src/shared/api/types/favorite";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = extractAccessToken(req);
  const courseId = (req.query.courseId as string) || "";

  const contentfulClient = new ContentfulClient();
  const result = await contentfulClient.getCourseLessons(courseId);

  const onlineCoursesClient = new OnlineCoursesClient(accessToken);

  let favorites: FavoriteResponse[] = [];
  if (accessToken) {
    const itemIds = result.items.map((item) => item.sys.id);
    favorites = await onlineCoursesClient.getFavoritesByItemIds(itemIds);
  }

  const mappedItems = await Promise.all(
    result.items.map(async (item) => {
      const statistic = await onlineCoursesClient.getRatingStatistic(
        item.sys.id
      );

      return mapContentfulCourseLessonToResponse(
        item,
        favorites.some((favorite) => favorite.itemId === item.sys.id),
        statistic.averageRating
      );
    })
  );
  const response = {
    total: result.total,
    skip: result.skip,
    limit: result.limit,
    items: mappedItems,
  };
  res.send(response);
});

export default handler;
