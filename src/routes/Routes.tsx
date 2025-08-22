import { Fragment, lazy, Suspense } from "react";
import { Routes as Routers, Route } from "react-router-dom";

import AuthGuard from "@/guards/AuthGuard";
import AppLayout from "@/layout/AppLayout";
import AuthLayout from "@/layout/AuthLayout";
import GuestGuard from "@/guards/GuestGuard";
import { IRoutes } from "@/types";
import { PATH_NAME } from "@/configs";
import RoleRoute from "./RoleRoute";

const EmptyChat = lazy(() => import("@/components/chats/EmptyChat"));
const Chat = lazy(() => import("@/components/chats/Chat"));
const UserProfile = lazy(() => import("@/pages/User/UserProfile"));
const SignIn = lazy(() => import("@/pages/AuthPages/SignIn"));
const routesConfig: IRoutes[] = [
  {
    path: PATH_NAME.HOME,
    guard: AuthGuard,
    layout: AppLayout,
    element: EmptyChat,
  },
  {
    path: PATH_NAME.PROFILE,
    guard: AuthGuard,
    layout: AppLayout,
    element: UserProfile,
  },
  {
    path: PATH_NAME.LOGIN,
    guard: GuestGuard,
    layout: AuthLayout,
    element: SignIn,
  },
  {
    path: "/message/:userId",
    guard: AuthGuard,
    layout: AppLayout,
    element: Chat,
  },
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<div />}>
          <Routers>
            {routes.map((route: IRoutes, idx: number) => {
              const Guard = route.guard || Fragment;
              const Layout = route.layout || Fragment;
              const Component = route.element;
              const requireRoles = route.requireRoles;

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  element={
                    <Guard>
                      <Layout>
                        <RoleRoute requireRoles={requireRoles}>
                          <Component />
                        </RoleRoute>
                      </Layout>
                    </Guard>
                  }
                >
                  {route.routes ? renderRoutes(route.routes) : null}
                </Route>
              );
            })}
          </Routers>
        </Suspense>
      ) : null}
    </>
  );
};

const Routes = () => renderRoutes(routesConfig);

export default Routes;
