let IS_DEVELOPMENT: boolean = false;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  IS_DEVELOPMENT = true;
} else {
  IS_DEVELOPMENT = false;
  // production code
}

const config = {
  WEBSITE_API: IS_DEVELOPMENT
    ? "http://localhost:3001"
    : process.env.REACT_APP_WEBSITE_URL,
  WEBSITE_ID: process.env.REACT_APP_WEBSITE_ID,
};

export default config;
