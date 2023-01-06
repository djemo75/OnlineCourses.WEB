import Contentful, { Entry } from "contentful";
import { AssetResponse } from "./asset";
import { Document } from "@contentful/rich-text-types";

export type ContentfulCourseFields = {
  title: Contentful.EntryFields.Text;
  description: Document;
  image: Contentful.Asset;
  tags: Contentful.EntryFields.Text[];
};

export type ContentfulCourseWithFields = Entry<ContentfulCourseFields>;

export type CourseResponse = {
  id: string;
  title: string;
  description: string;
  image: AssetResponse;
  tags: string[];
  createdAt: string;
  favorite: boolean;
  averageRating: number;
};
