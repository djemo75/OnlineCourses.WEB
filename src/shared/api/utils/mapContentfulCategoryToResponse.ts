import {
  CategoryResponse,
  ContentfulCategoryWithFields,
} from "../types/category";

export const mapContentfulCategoryToResponse = (
  category: ContentfulCategoryWithFields
): CategoryResponse => {
  return {
    id: category.sys.id,
    name: category.fields.name,
    createdAt: category.sys.createdAt,
  };
};
