import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongo: {
    url: "mongodb://localhost:27017/node-api",
  },
};
