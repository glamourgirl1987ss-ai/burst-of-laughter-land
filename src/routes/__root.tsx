import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const metaPixelCode = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1838424743986517');
fbq('track', 'PageView');
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <title>Страницата не е намерена (404) – ЩуроБъркотия</title>
      <meta
        name="description"
        content="Упс! Тази страница на ЩуроБъркотия не съществува. Върни се към началната страница, за да поръчаш играта."
      />
      <meta property="og:title" content="Страницата не е намерена (404) – ЩуроБъркотия" />
      <meta
        property="og:description"
        content="Упс! Тази страница на ЩуроБъркотия не съществува. Върни се към началната страница, за да поръчаш играта."
      />
      <meta name="robots" content="noindex" />
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ЩуроБъркотия – играта, която ще ви взриви от смях" },
      { name: "author", content: "ЩуроБъркотия" },
      { property: "og:title", content: "ЩуроБъркотия – играта, която ще ви взриви от смях" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "ЩуроБъркотия – играта, която ще ви взриви от смях" },
      {
        name: "description",
        content:
          "Търсиш игра, която да събере всички и да ги разсмее до сълзи? 🎉 'ЩуроБъркотия' е перфектната комбинация от въображение, актьорска игра и безкраен смях!",
      },
      {
        property: "og:description",
        content:
          "Търсиш игра, която да събере всички и да ги разсмее до сълзи? 🎉 'ЩуроБъркотия' е перфектната комбинация от въображение, актьорска игра и безкраен смях!",
      },
      {
        name: "twitter:description",
        content:
          "Търсиш игра, която да събере всички и да ги разсмее до сълзи? 🎉 'ЩуроБъркотия' е перфектната комбинация от въображение, актьорска игра и безкраен смях!",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/9eWlVQe91whCG9pgGa7NADbKYVJ3/social-images/social-1777811037982-ChatGPT_Image_2.05.2026_г.,_19_40_13.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/9eWlVQe91whCG9pgGa7NADbKYVJ3/social-images/social-1777811037982-ChatGPT_Image_2.05.2026_г.,_19_40_13.webp",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Lilita+One&family=Fredoka:wght@500;600;700&family=Baloo+2:wght@500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [{ src: "https://cdn.forminit.com/sdk.js", async: true }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: metaPixelCode }} />
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1838424743986517&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
