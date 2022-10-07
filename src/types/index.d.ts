import { Secret } from "jsonwebtoken";

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: Secret;
    JWT_EXPIRES_IN: string;
    EMAIL: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    BASE_URL: string;
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    PAYSTACK_SECRET_KEY: string;
    CORS_ORIGIN: string;
  }
}
