import 'dotenv/config';

export const environment = () => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 9999,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  };
};
