import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import Error from "./presentation/components/Error";
import ToastError from "./presentation/components/ToastError";
global.XMLHttpRequest = require("xhr2");

export const meta: MetaFunction = () => {
  return { title: "gRPC demo store" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStyles }];
};

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>Ops, aconteceu um error!</title>
        <Links />
      </head>
      <body>
        <ToastError message={error.message} />
        <div className='flex flex-col h-screen items-center justify-center bg-error-custom '>
          <Error />
        </div>
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <title>{`Ops! ${caught.status}`}</title>
        <Links />
      </head>
      <body>
        <ToastError message={caught.statusText} />
        <div className='flex flex-col h-screen items-center justify-center bg-error-custom '>
          <Error />
        </div>
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
