/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as AboutImport } from "./routes/about";
import { Route as LoggedOutImport } from "./routes/_logged-out";
import { Route as AuthedImport } from "./routes/_authed";
import { Route as IndexImport } from "./routes/index";
import { Route as BetaAccessGetADemoImport } from "./routes/beta-access/get-a-demo";
import { Route as LoggedOutSigninImport } from "./routes/_logged-out/signin";
import { Route as AuthedSubscriptionIndexImport } from "./routes/_authed/subscription/index";
import { Route as AuthedSettingAccountDetailsImport } from "./routes/_authed/setting/account-details";
import { Route as AuthedChatMyOrbitImport } from "./routes/_authed/chat/my-orbit";
import { Route as AuthedChatFeedImport } from "./routes/_authed/chat/feed";
import { Route as AuthedChatConnectImport } from "./routes/_authed/chat/connect";
import { Route as AuthedChatCallCallIdImport } from "./routes/_authed/chat/call/$callId";
import { Route as AuthedChatBotCallBotIdImport } from "./routes/_authed/chat/bot-call/$botId";

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: "/about",
  getParentRoute: () => rootRoute,
} as any);

const LoggedOutRoute = LoggedOutImport.update({
  id: "/_logged-out",
  getParentRoute: () => rootRoute,
} as any);

const AuthedRoute = AuthedImport.update({
  id: "/_authed",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const BetaAccessGetADemoRoute = BetaAccessGetADemoImport.update({
  path: "/beta-access/get-a-demo",
  getParentRoute: () => rootRoute,
} as any);

const LoggedOutSigninRoute = LoggedOutSigninImport.update({
  path: "/signin",
  getParentRoute: () => LoggedOutRoute,
} as any);

const AuthedSubscriptionIndexRoute = AuthedSubscriptionIndexImport.update({
  path: "/subscription/",
  getParentRoute: () => AuthedRoute,
} as any);

const AuthedSettingAccountDetailsRoute =
  AuthedSettingAccountDetailsImport.update({
    path: "/setting/account-details",
    getParentRoute: () => AuthedRoute,
  } as any);

const AuthedChatMyOrbitRoute = AuthedChatMyOrbitImport.update({
  path: "/chat/my-orbit",
  getParentRoute: () => AuthedRoute,
} as any);

const AuthedChatFeedRoute = AuthedChatFeedImport.update({
  path: "/chat/feed",
  getParentRoute: () => AuthedRoute,
} as any);

const AuthedChatConnectRoute = AuthedChatConnectImport.update({
  path: "/chat/connect",
  getParentRoute: () => AuthedRoute,
} as any);

const AuthedChatCallCallIdRoute = AuthedChatCallCallIdImport.update({
  path: "/chat/call/$callId",
  getParentRoute: () => AuthedRoute,
} as any);

const AuthedChatBotCallBotIdRoute = AuthedChatBotCallBotIdImport.update({
  path: "/chat/bot-call/$botId",
  getParentRoute: () => AuthedRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/_authed": {
      id: "/_authed";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthedImport;
      parentRoute: typeof rootRoute;
    };
    "/_logged-out": {
      id: "/_logged-out";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof LoggedOutImport;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      id: "/about";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/_logged-out/signin": {
      id: "/_logged-out/signin";
      path: "/signin";
      fullPath: "/signin";
      preLoaderRoute: typeof LoggedOutSigninImport;
      parentRoute: typeof LoggedOutImport;
    };
    "/beta-access/get-a-demo": {
      id: "/beta-access/get-a-demo";
      path: "/beta-access/get-a-demo";
      fullPath: "/beta-access/get-a-demo";
      preLoaderRoute: typeof BetaAccessGetADemoImport;
      parentRoute: typeof rootRoute;
    };
    "/_authed/chat/connect": {
      id: "/_authed/chat/connect";
      path: "/chat/connect";
      fullPath: "/chat/connect";
      preLoaderRoute: typeof AuthedChatConnectImport;
      parentRoute: typeof AuthedImport;
    };
    "/_authed/chat/feed": {
      id: "/_authed/chat/feed";
      path: "/chat/feed";
      fullPath: "/chat/feed";
      preLoaderRoute: typeof AuthedChatFeedImport;
      parentRoute: typeof AuthedImport;
    };
    "/_authed/chat/my-orbit": {
      id: "/_authed/chat/my-orbit";
      path: "/chat/my-orbit";
      fullPath: "/chat/my-orbit";
      preLoaderRoute: typeof AuthedChatMyOrbitImport;
      parentRoute: typeof AuthedImport;
    };
    "/_authed/setting/account-details": {
      id: "/_authed/setting/account-details";
      path: "/setting/account-details";
      fullPath: "/setting/account-details";
      preLoaderRoute: typeof AuthedSettingAccountDetailsImport;
      parentRoute: typeof AuthedImport;
    };
    "/_authed/subscription/": {
      id: "/_authed/subscription/";
      path: "/subscription";
      fullPath: "/subscription";
      preLoaderRoute: typeof AuthedSubscriptionIndexImport;
    };
    "/_authed/chat/bot-call/$botId": {
      id: "/_authed/chat/bot-call/$botId";
      path: "/chat/bot-call/$botId";
      fullPath: "/chat/bot-call/$botId";
      preLoaderRoute: typeof AuthedChatBotCallBotIdImport;
      parentRoute: typeof AuthedImport;
    };
    "/_authed/chat/call/$callId": {
      id: "/_authed/chat/call/$callId";
      path: "/chat/call/$callId";
      fullPath: "/chat/call/$callId";
      preLoaderRoute: typeof AuthedChatCallCallIdImport;
      parentRoute: typeof AuthedImport;
    };
  }
}
// Create and export the route tree

interface AuthedRouteChildren {
  AuthedChatConnectRoute: typeof AuthedChatConnectRoute;
  AuthedChatFeedRoute: typeof AuthedChatFeedRoute;
  AuthedChatMyOrbitRoute: typeof AuthedChatMyOrbitRoute;
  AuthedSettingAccountDetailsRoute: typeof AuthedSettingAccountDetailsRoute;
  AuthedSubscriptionIndexRoute: typeof AuthedSubscriptionIndexRoute;
  AuthedChatBotCallBotIdRoute: typeof AuthedChatBotCallBotIdRoute;
  AuthedChatCallCallIdRoute: typeof AuthedChatCallCallIdRoute;
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedChatConnectRoute: AuthedChatConnectRoute,
  AuthedChatFeedRoute: AuthedChatFeedRoute,
  AuthedChatMyOrbitRoute: AuthedChatMyOrbitRoute,
  AuthedSettingAccountDetailsRoute: AuthedSettingAccountDetailsRoute,
  AuthedSubscriptionIndexRoute: AuthedSubscriptionIndexRoute,
  AuthedChatBotCallBotIdRoute: AuthedChatBotCallBotIdRoute,
  AuthedChatCallCallIdRoute: AuthedChatCallCallIdRoute,
};

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren);

interface LoggedOutRouteChildren {
  LoggedOutSigninRoute: typeof LoggedOutSigninRoute;
}

const LoggedOutRouteChildren: LoggedOutRouteChildren = {
  LoggedOutSigninRoute: LoggedOutSigninRoute,
};

const LoggedOutRouteWithChildren = LoggedOutRoute._addFileChildren(
  LoggedOutRouteChildren,
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "": typeof LoggedOutRouteWithChildren;
  "/about": typeof AboutRoute;
  "/signin": typeof LoggedOutSigninRoute;
  "/beta-access/get-a-demo": typeof BetaAccessGetADemoRoute;
  "/chat/connect": typeof AuthedChatConnectRoute;
  "/chat/feed": typeof AuthedChatFeedRoute;
  "/chat/my-orbit": typeof AuthedChatMyOrbitRoute;
  "/setting/account-details": typeof AuthedSettingAccountDetailsRoute;
  "/subscription": typeof AuthedSubscriptionIndexRoute;
  "/chat/bot-call/$botId": typeof AuthedChatBotCallBotIdRoute;
  "/chat/call/$callId": typeof AuthedChatCallCallIdRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "": typeof LoggedOutRouteWithChildren;
  "/about": typeof AboutRoute;
  "/signin": typeof LoggedOutSigninRoute;
  "/beta-access/get-a-demo": typeof BetaAccessGetADemoRoute;
  "/chat/connect": typeof AuthedChatConnectRoute;
  "/chat/feed": typeof AuthedChatFeedRoute;
  "/chat/my-orbit": typeof AuthedChatMyOrbitRoute;
  "/setting/account-details": typeof AuthedSettingAccountDetailsRoute;
  "/subscription": typeof AuthedSubscriptionIndexRoute;
  "/chat/bot-call/$botId": typeof AuthedChatBotCallBotIdRoute;
  "/chat/call/$callId": typeof AuthedChatCallCallIdRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/_authed": typeof AuthedRouteWithChildren;
  "/_logged-out": typeof LoggedOutRouteWithChildren;
  "/about": typeof AboutRoute;
  "/_logged-out/signin": typeof LoggedOutSigninRoute;
  "/beta-access/get-a-demo": typeof BetaAccessGetADemoRoute;
  "/_authed/chat/connect": typeof AuthedChatConnectRoute;
  "/_authed/chat/feed": typeof AuthedChatFeedRoute;
  "/_authed/chat/my-orbit": typeof AuthedChatMyOrbitRoute;
  "/_authed/setting/account-details": typeof AuthedSettingAccountDetailsRoute;
  "/_authed/subscription/": typeof AuthedSubscriptionIndexRoute;
  "/_authed/chat/bot-call/$botId": typeof AuthedChatBotCallBotIdRoute;
  "/_authed/chat/call/$callId": typeof AuthedChatCallCallIdRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | ""
    | "/about"
    | "/signin"
    | "/beta-access/get-a-demo"
    | "/chat/connect"
    | "/chat/feed"
    | "/chat/my-orbit"
    | "/setting/account-details"
    | "/subscription"
    | "/chat/bot-call/$botId"
    | "/chat/call/$callId";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | ""
    | "/about"
    | "/signin"
    | "/beta-access/get-a-demo"
    | "/chat/connect"
    | "/chat/feed"
    | "/chat/my-orbit"
    | "/setting/account-details"
    | "/subscription"
    | "/chat/bot-call/$botId"
    | "/chat/call/$callId";
  id:
    | "__root__"
    | "/"
    | "/_authed"
    | "/_logged-out"
    | "/about"
    | "/_logged-out/signin"
    | "/beta-access/get-a-demo"
    | "/_authed/chat/connect"
    | "/_authed/chat/feed"
    | "/_authed/chat/my-orbit"
    | "/_authed/setting/account-details"
    | "/_authed/subscription/"
    | "/_authed/chat/bot-call/$botId"
    | "/_authed/chat/call/$callId";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthedRoute: typeof AuthedRouteWithChildren;
  LoggedOutRoute: typeof LoggedOutRouteWithChildren;
  AboutRoute: typeof AboutRoute;
  BetaAccessGetADemoRoute: typeof BetaAccessGetADemoRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  LoggedOutRoute: LoggedOutRouteWithChildren,
  AboutRoute: AboutRoute,
  BetaAccessGetADemoRoute: BetaAccessGetADemoRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/_logged-out",
        "/about",
        "/beta-access/get-a-demo"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/chat/connect",
        "/_authed/chat/feed",
        "/_authed/chat/my-orbit",
        "/_authed/setting/account-details",
        "/_authed/chat/bot-call/$botId",
        "/_authed/chat/call/$callId"
      ]
    },
    "/_logged-out": {
      "filePath": "_logged-out.tsx",
      "children": [
        "/_logged-out/signin"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_logged-out/signin": {
      "filePath": "_logged-out/signin.tsx",
      "parent": "/_logged-out"
    },
    "/beta-access/get-a-demo": {
      "filePath": "beta-access/get-a-demo.tsx"
    },
    "/_authed/chat/connect": {
      "filePath": "_authed/chat/connect.tsx",
      "parent": "/_authed"
    },
    "/_authed/chat/feed": {
      "filePath": "_authed/chat/feed.tsx",
      "parent": "/_authed"
    },
    "/_authed/chat/my-orbit": {
      "filePath": "_authed/chat/my-orbit.tsx",
      "parent": "/_authed"
    },
    "/_authed/setting/account-details": {
      "filePath": "_authed/setting/account-details.tsx",
      "parent": "/_authed"
    },
    "/_authed/subscription/": {
      "filePath": "_authed/subscription/index.tsx",
    "/_authed/chat/bot-call/$botId": {
      "filePath": "_authed/chat/bot-call/$botId.tsx",
      "parent": "/_authed"
    },
    "/_authed/chat/call/$callId": {
      "filePath": "_authed/chat/call/$callId.tsx",
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
