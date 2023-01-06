import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { NextApiRequest, NextApiResponse } from "next";
import { ContentfulClient } from "@src/shared/api/services/contentfulClient";
import { baseHandler } from "@src/shared/api/utils/baseHandler";
import { mapContentfulCourseToResponse } from "@src/shared/api/utils/mapContentfulCourseToResponse";
import { extractAccessToken } from "@src/shared/api/utils/extractAccessToken";
import { FavoriteResponse } from "@src/shared/api/types/favorite";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = extractAccessToken(req);

  const categoryId = (req.query.categoryId as string) || "";
  const level =
    typeof req.query.level === "string"
      ? [req.query.level]
      : (req.query.level as string[]) || [];

  const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

  const contentfulClient = new ContentfulClient();
  const result = await contentfulClient.getCourses(
    {
      categoryId,
      level,
    },
    pageNumber,
    pageSize
  );

  let favorites: FavoriteResponse[] = [];

  const onlineCoursesClient = new OnlineCoursesClient(accessToken);
  if (accessToken) {
    favorites = await onlineCoursesClient.getFavoritesByItemIds(
      result.items.map((item) => item.sys.id)
    );
  }

  const mappedItems = await Promise.all(
    result.items.map(async (item) => {
      const statistic = await onlineCoursesClient.getRatingStatistic(
        item.sys.id
      );
      return mapContentfulCourseToResponse(
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
