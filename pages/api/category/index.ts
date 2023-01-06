import { NextApiRequest, NextApiResponse } from "next";
import { ContentfulClient } from "@src/shared/api/services/contentfulClient";
import { baseHandler } from "@src/shared/api/utils/baseHandler";
import { mapContentfulCategoryToResponse } from "@src/shared/api/utils/mapContentfulCategoryToResponse";

const handler = baseHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const contentfulClient = new ContentfulClient();
  const result = await contentfulClient.getCategories();

  const response = {
    total: result.total,
    skip: result.skip,
    limit: result.limit,
    items: result.items.map(mapContentfulCategoryToResponse),
  };
  res.send(response);
});

export default handler;
