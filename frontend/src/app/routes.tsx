import { createBrowserRouter } from "react-router";

import { ProtectedRoute }
from "./components/ProtectedRoute";

import { Layout }
from "./components/Layout";

import { Home }
from "./pages/Home";

import { Branch }
from "./pages/Branch";

import { About }
from "./pages/About";

import { NotFound }
from "./pages/NotFound";

import { AdminLogin }
from "./pages/admin/AdminLogin";

import { AdminDashboard }
from "./pages/admin/AdminDashboard";

import { PdfViewer }
from "./pages/PdfViewer";

import { Bookmarks }
from "./pages/Bookmarks";

import { PrivacyPolicy }
from "./pages/PrivacyPolicy";

import { Contact }
from "./pages/Contact";

export const router =
  createBrowserRouter([

  // MAIN WEBSITE
  {
    path: "/",

    Component: Layout,

    children: [

      {
        index: true,
        Component: Home
      },

      {
        path: "branch/:branchId",
        Component: Branch
      },

      {
        path: "about",
        Component: About
      },

      {
        path: "viewer/:fileName",
        Component: PdfViewer
      },

      {
        path: "bookmarks",
        Component: Bookmarks
      },

      {
        path: "*",
        Component: NotFound
      },

      {
        path: "privacy-policy",
        Component: PrivacyPolicy
      },

      {
        path: "contact",
        Component: Contact
      },
    ]
  },

  // ADMIN LOGIN
  {
    path: "/admin/login",

    Component: AdminLogin
  },

  // PROTECTED DASHBOARD
  {
    path: "/admin/dashboard",

    element: (

      <ProtectedRoute>

        <AdminDashboard />

      </ProtectedRoute>
    )
  }
]);