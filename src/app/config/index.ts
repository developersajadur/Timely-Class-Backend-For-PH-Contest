import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  token_secret: process.env.TOKEN_SECRET,
  token_expires_in: process.env.TOKEN_EXPIRES_IN,
  password_salt_rounds: process.env.PASSWORD_SALT_ROUNDS,
};
