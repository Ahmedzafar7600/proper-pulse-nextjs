import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from "@/context/GlobalContext";
import 'photoswipe/dist/photoswipe.css'

export const metaData = {
  title: "Property Pulse",
  keyword: "rental, property , realestate ",
  description: "Find the perfect rental property",
};

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
        <body>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer />
          <ToastContainer></ToastContainer>
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
