import 'dotenv/config';

export const environment = () => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 9999,
  };
};
