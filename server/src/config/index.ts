type Config = {
  jwt: {
    accessTokenSecret: string,
    refreshTokenSecret: string,
    accessTokenExpiresIn: '15M',
    refreshTokenExpiresIn: '7D',
  },
  frontendUrl: string,
}

// In a real app, we would use a library like `dotenv` to load these from a .env file
export const config: Config = {
  jwt: {
    accessTokenSecret: 'my-super-secret-access-token',
    refreshTokenSecret: 'my-super-secret-refresh-token',
    accessTokenExpiresIn: '15M', // 15 minutes
    refreshTokenExpiresIn: '7D', // 7 days
  },
  frontendUrl: 'http://localhost:5173', // frontend's URL
};