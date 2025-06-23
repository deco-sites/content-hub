import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "@deco/deco";
import Theme from "site/sections/Theme/Theme.tsx";
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any" />

      {/* Include Icons and manifest */}
      <Head>
        {/* Fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Electrolux Sans';
                src:
                  url(${
              asset(
                "/fonts/ElectroluxSans-Regular.woff2",
              )
            }) format('woff2'),
                  url(${
              asset(
                "/fonts/ElectroluxSans-Regular.woff",
              )
            }) format('woff');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Electrolux Sans';
                src:
                  url(${
              asset(
                "/fonts/ElectroluxSans-Bold.woff2",
              )
            }) format('woff2'),
                  url(${
              asset(
                "/fonts/ElectroluxSans-Bold.woff",
              )
            }) format('woff');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Electrolux Sans';
                src:
                  url(${
              asset(
                "/fonts/ElectroluxSans-SemiBold.woff2",
              )
            }) format('woff2'),
                  url(${
              asset(
                "/fonts/ElectroluxSans-SemiBold.woff",
              )
            }) format('woff');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />

        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />
        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {/* Swiper CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />

        {/* Custom CSS */}
        <link
          rel="stylesheet"
          href={asset(`/customStyles/styles.css?revision=${revision}`)}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />
    </>
  );
});
