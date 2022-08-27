import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta
            name="application-name"
            content="Twitter-clone App created by Isiaka Abdulahi"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content=" Twitter-clone App created by Isiaka Abdulahi"
          />
          <meta
            name="description"
            content="Twitter-clone App created by Isiaka Abdulahi"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#1DA1F2" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="/../apple.png" />
          <link
            rel="apple-touch-icon"
            sizes="16x16"
            href="/../public/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="32x32"
            href="/../public/favicon-32x32.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/../public/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/../public/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/../public/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/icon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="384x384"
            href="/icon-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/public/icon-512x512.png"
          />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://twitter.com/isiakaabd" />
          <meta name="twitter:title" content="Twitter clone App" />
          <meta
            name="twitter:description"
            content="Twitter Clone App by Isiaka Abdulahi @isiakaabd"
          />
          <meta
            name="twitter:image"
            content="https://commons.wikimedia.org/wiki/File:Twitter-logo.svg"
          />
          <meta name="twitter:creator" content="@isiakaabd" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Twitter clone App by @isiakaabd" />
          <meta
            property="og:description"
            content="Twitter clone App by Isiaka Abdulahi"
          />
          <meta property="og:site_name" content="Twitter clone App" />
          <meta property="og:url" content="https://isiakaabd.netlify.com" />
          <meta
            property="og:image"
            content="https://commons.wikimedia.org/wiki/File:Twitter-logo.svg"
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
