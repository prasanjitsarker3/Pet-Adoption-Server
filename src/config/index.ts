import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  PORT: process.env.PORT,
  projectProcess: process.env.projectProcess,
  jwt: {
    accessToken: process.env.accessToken,
    accessTokenExpireDate: process.env.accessTokenExpireDate,
  },
};
