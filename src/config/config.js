const config = {
  production: {
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT
  },
  development: {
    secret: 'I_AM_GERER',
    MONGO_URI: 'mongodb://localhost/news_api',
    port: 3000
  }
};

export const getConfig = env => config[env] || config.development;
