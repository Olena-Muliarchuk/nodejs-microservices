require("dotenv").config();
const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  mongodb: {
    url: process.env.MONGODB_URI || "mongodb://localhost:37017/shopper"
  },
  redis: {
    options: {
      url: process.env.REDIS_URL || "redis://localhost:7379"
    },
    client: null
  }
};
