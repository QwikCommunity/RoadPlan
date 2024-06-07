import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

export default () => {
  return (
    <>
      <QwikCityProvider>
        <head>
          <meta charSet="utf-8" />
          <title>Qwik Blank App</title>
        </head>
        <body>
          <RouterOutlet />
          <ServiceWorkerRegister />
        </body>
      </QwikCityProvider>
    </>
  );
};
