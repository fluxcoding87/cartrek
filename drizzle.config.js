/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://cartrek_owner:xKt0Ye1WFzXC@ep-flat-snowflake-a51v599w.us-east-2.aws.neon.tech/cartrek?sslmode=require",
  },
};
