import React from "react";
import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import OnSale from "./components/pages/OnSale";
import AboutUs from "./components/pages/AboutUs";
import Policy from "./components/pages/Policy";
import Drive from "./components/pages/Drive";
import Bottles from "./components/pages/Bottles";
import Glassware from "./components/pages/Glassware";
import Suncatcher from "./components/pages/Suncatcher";
import FAQ from "./components/pages/FAQ";
import Terms from "./components/pages/Terms";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleProduct from "./components/pages/SingleProduct";
import Ask from "./components/pages/Ask";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import Cart from "./components/pages/Cart";
import Account from "./components/pages/Account";
import MyOrders from "./components/pages/MyOrders";
import Setting from "./components/pages/Setting";
import Admin from "./components/pages/Admin";
import AdminProducts from "./components/pages/AdminProducts";
import AdminOrders from "./components/pages/AdminOrders";
import AdminBanners from "./components/pages/AdminBanners";
import RegisterConfirm from "./components/pages/RegisterConfirm";
import WelcomeOnBoard from "./components/pages/WelcomeOnBoard";
import ResetOnBoard from "./components/pages/ResetOnBoard";
import ResetPassword from "./components/pages/ResetPassword";
import InstaPay from "./components/pages/InstaPay";
import MetaPixel from "./context/MetaPixel";
import PNF from "./components/pages/PNF";
import Purchase from "./components/pages/Purchase";
import AdminUsers from "./components/pages/AdminUsers";

const App = () => {
  //Google Auth
  const clientId =
    "977628146808-o9801maetvh6qcrduselv7l8dhgeulfd.apps.googleusercontent.com";

  //Query To Use Axios APIs
  const client = new QueryClient();

  //All Routes
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/shop/drive", element: <Drive /> },
        { path: "/shop/bottles", element: <Bottles /> },
        { path: "/shop/glassware", element: <Glassware /> },
        { path: "/shop/suncatcher", element: <Suncatcher /> },
        { path: "/shop/:cat/:prdName", element: <SingleProduct /> },
        { path: "/shop/:prdName", element: <SingleProduct /> },
        { path: "/sale", element: <OnSale /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/policy", element: <Policy /> },
        { path: "/fqa", element: <FAQ /> },
        { path: "/terms", element: <Terms /> },
        { path: "/ask", element: <Ask /> },
        { path: "/instapay", element: <InstaPay /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/cartlist", element: <Cart /> },
        { path: "/purchase", element: <Purchase /> },
        {
          path: "/account",
          element: <Account />,
          children: [
            { path: "orders", element: <MyOrders /> },
            { path: "setting", element: <Setting /> },
          ],
        },
        {
          path: "/backstage",
          element: <Admin />,
          children: [
            { path: "products", element: <AdminProducts /> },
            { path: "orders", element: <AdminOrders /> },
            { path: "banners", element: <AdminBanners /> },
            { path: "users", element: <AdminUsers /> },
          ],
        },
      ],
    },
    { path: "/activate", element: <RegisterConfirm /> },
    { path: "/welcome/:id/:token", element: <WelcomeOnBoard /> },
    { path: "/reset-password/:id/:token", element: <ResetOnBoard /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "*", element: <PNF /> },
  ]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            textTransform: "capitalize",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <MetaPixel />
      <QueryClientProvider client={client}>
        <GoogleOAuthProvider clientId={clientId}>
          <RouterProvider router={Router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
