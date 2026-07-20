// Load environment variables from .env (if present)
require("dotenv").config();

// Import the package.json file to grab the package name and the version
const pkg = require("../../package.json");

// Export a configuration object
module.exports = {
  // Use the name field from package.json as the application name
  serviceName: pkg.name,
  serviceVersion: pkg.version,

  registry: {
    url: process.env.REGISTRY_URL || "http://localhost:3080",
    version: "*"
  },

  // MongoDB configuration
  mongodb: {
    // Connection URL for the MongoDB server (local docker or Atlas)
    url: process.env.MONGODB_URI || "mongodb://localhost:37017/shopper"
  },

  // Redis configuration
  redis: {
    // Connection options for the Redis server
    options: {
      url: process.env.REDIS_URL || "redis://localhost:7379"
    },
    // Placeholder for the Redis client, to be connected elsewhere
    client: null
  }
};