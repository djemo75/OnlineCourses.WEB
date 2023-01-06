import Contentful from "contentful";
import { AssetResponse } from "../types/asset";

export const mapContentfulAssetToResponse = (
  asset: Contentful.Asset
): AssetResponse => {
  return {
    id: asset.sys.id,
    title: asset.fields.title,
    fileUrl: "https:" + asset.fields.file.url,
    fileName: asset.fields.file.fileName,
    contentType: asset.fields.file.contentType,
  };
};
