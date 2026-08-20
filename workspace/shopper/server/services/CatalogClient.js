/** @module CatalogClient */

const config = require("../config");
const ServiceClient = require("./ServiceClient");

const ALL_ITEMS_CACHE_KEY = "shopper_catalog:all_items";
const ALL_ITEMS_CACHE_TTL_SECONDS = 60;

/**
 * Service class for interacting with the Item catalog
 */
class CatalogClient {
  /**
   * Get all items from the database, sorted in descending order by creation time
   * @returns {Promise<Array>} - A promise that resolves to an array of Items
   */
  static async getAll() {
    try {
      const result = await ServiceClient.callService("catalog-service", {
        method: "GET",
        url: `/items`
      });
      await config.redis.client.set(
        ALL_ITEMS_CACHE_KEY,
        JSON.stringify(result),
        { EX: ALL_ITEMS_CACHE_TTL_SECONDS }
      );
      return result;
    } catch (error) {
      console.error("Error occurred while fetching items:", error);
      const cached = await config.redis.client.get(ALL_ITEMS_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    }
  }

  /**
   * Get a single item from the database
   * @param {string} itemId - The id of the item to retrieve
   * @returns {Promise<Object>} - A promise that resolves to an Item object
   */
  static async getOne(itemId) {
    try {
      const result = await ServiceClient.callService("catalog-service", {
        method: "GET",
        url: `/items/${itemId}`
      });
      return result;
    } catch (error) {
      console.error("Error occurred while fetching item:", error);
      return null;
    }
  }

  /**
   * Create a new item in the database
   * @param {Object} data - The data for the new item
   * @returns {Promise<Object>} - A promise that resolves to the new Item object
   */
  static async create(data, token) {
    return ServiceClient.callService("catalog-service", {
      method: "POST",
      url: `/items`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Update an existing item in the database
   * @param {string} itemId - The id of the item to update
   * @param {Object} data - The new data for the item
   * @returns {Promise<Object|null>} - A promise that resolves to the updated Item object, or null if no item was found
   */
  static async update(itemId, data, token) {
    return ServiceClient.callService("catalog-service", {
      method: "PUT",
      url: `/items/${itemId}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Remove an item from the database
   * @param {string} itemId - The id of the item to remove
   * @returns {Promise<Object>} - A promise that resolves to the deletion result
   */
  static async remove(itemId, token) {
    return ServiceClient.callService("catalog-service", {
      method: "DELETE",
      url: `/items/${itemId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

module.exports = CatalogClient;
