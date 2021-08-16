import Document, { Html, Head, Main, NextScript } from "next/document";

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
