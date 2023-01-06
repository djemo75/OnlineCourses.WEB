import axios from "axios";
import { RatingStatisticResponse } from "../types/courseStatistic";
import { FavoriteItemType, FavoriteResponse } from "../types/favorite";
import { RatingResponse } from "../types/rating";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export class OnlineCoursesClient {
  readonly accessToken: string | undefined;
  public constructor(accessToken?: string) {
    this.accessToken = accessToken;
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  }

  /**
   * Returns the favorites from an authenticated user by IDs
   *
   * @Authentication required
   *
   * @param itemIds - An array of course IDs or lesson IDs
   */
  public async getFavoritesByItemIds(
    itemIds: string[]
  ): Promise<FavoriteResponse[]> {
    const data = { itemIds };
    const result = await axios.post(
      `${API_URL}/api/favorites/allByItemIds`,
      data
    );

    return result.data;
  }

  /**
   * Returns the favorites from an authenticated user by itemType
   *
   * @Authentication required
   *
   * @param itemType - 'course' or 'courseLesson'
   */
  public async getFavoritesByItemType(
    itemType: FavoriteItemType
  ): Promise<FavoriteResponse[]> {
    const result = await axios.get(`${API_URL}/api/favorites/${itemType}`);
    return result.data;
  }

  /**
   * Adds a course or lesson to the favorites list
   *
   * @Authentication required
   *
   * @param itemId - Course ID or lesson ID
   * @param itemType - 'course' or 'courseLesson'
   */
  public async addFavorite(
    itemId: string,
    itemType: string
  ): Promise<FavoriteResponse> {
    const data = { itemId, itemType };
    const result = await axios.post(`${API_URL}/api/favorites/`, data);

    return result.data;
  }

  /**
   * Removes a course or lesson from the favorites list
   *
   * @Authentication required
   *
   * @param itemId - Course ID or lesson ID
   */
  public async removeFavorite(itemId: string): Promise<FavoriteResponse> {
    const result = await axios.delete(`${API_URL}/api/favorites/${itemId}`);

    return result.data;
  }

  /**
   * Returns all ratings for specific course or lesson
   *
   * @Authentication not required
   *
   * @param itemId - Course ID or lesson ID
   */
  public async getRatings(itemId: string): Promise<RatingResponse[]> {
    const result = await axios.get(`${API_URL}/api/ratings/${itemId}`);

    return result.data;
  }

  /**
   * Returns statistic for specific course or lesson
   *
   * @Authentication not required
   *
   * @param itemId - Course ID or lesson ID
   */
  public async getRatingStatistic(
    itemId: string
  ): Promise<RatingStatisticResponse> {
    const result = await axios.get(
      `${API_URL}/api/ratings/statistic/${itemId}`
    );

    return result.data;
  }

  /**
   * Adds rating for specific course or lesson
   *
   * @Authentication required
   *
   * @param itemId - Course ID or lesson ID
   * @param itemType - 'course' or 'courseLesson'
   * @param value - Rating value 1-5
   * @param comment - Comment to rating
   */
  public async addRating(
    itemId: string,
    itemType: string,
    value: number,
    comment: string
  ): Promise<RatingResponse> {
    const data = { itemId, itemType, value, comment };
    const result = await axios.post(`${API_URL}/api/ratings/`, data);

    return result.data;
  }

  /**
   * Deletes rating for specific course or lesson
   *
   * @Authentication required
   *
   * @param itemId - Course ID or lesson ID
   */
  public async deleteRating(itemId: string): Promise<RatingResponse> {
    const result = await axios.delete(`${API_URL}/api/ratings/${itemId}`);

    return result.data;
  }
}
