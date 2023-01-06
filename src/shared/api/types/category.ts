import Contentful, { Entry } from "contentful";

export type ContentfulCategoryFields = {
  name: Contentful.EntryFields.Text;
};

export type ContentfulCategoryWithFields = Entry<ContentfulCategoryFields>;

export type CategoryResponse = {
  id: string;
  name: string;
  createdAt: string;
};
