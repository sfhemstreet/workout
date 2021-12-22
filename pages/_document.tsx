import Document, { Html, Head, Main, NextScript } from "next/document";

const DOMAIN = "https://workout-jade.vercel.app";
const NAME = "Workout";
const DESCRIPTION = "Workout circuit app, create great workouts!";

/**
 * _document
 *
 * Next.js specialized component that mounts first to the DOM.
 *
 * We use it to fetch the fonts needed for our theme.
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content={NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={NAME} />
          <meta name="description" content={DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#BB86FC" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#121212" />

          <link rel="apple-touch-icon" href="/icons/mechanical-arm-apple-128.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/mechanical-arm-apple-152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/mechanical-arm-apple-152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/mechanical-arm-apple-152.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/mechanical-arm-apple-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/mechanical-arm-apple-16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
         

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={DOMAIN} />
          <meta name="twitter:title" content={NAME} />
          <meta
            name="twitter:description"
            content={DESCRIPTION}
          />
          <meta
            name="twitter:image"
            content={`${DOMAIN}/icons/mechanical-arm-apple-192.png`}
          />
        
          <meta property="og:type" content="website" />
          <meta property="og:title" content={NAME} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:site_name" content={NAME} />
          <meta property="og:url" content={DOMAIN} />
          <meta
            property="og:image"
            content={`${DOMAIN}/icons/mechanical-arm-apple-128.png`}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Share+Tech+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
