declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    NEXTAUTH_URL: string
    AUTH_SECRET: string
    FAUNADB_KEY: string
  }
}
