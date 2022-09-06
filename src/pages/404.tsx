import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <main className="">
        <div className="">
          <h1 className="">
            Ooops! The page you&apos;re looking for was not found
          </h1>
          <Link href="/">
            <div className="">
              <a className="">Return Home</a>
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}
