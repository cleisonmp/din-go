declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    NEXT_PUBLIC_URL: string
    AUTH_SECRET: string
    FAUNADB_KEY: string
    API_ERROR_TYPE: string
  }
}
