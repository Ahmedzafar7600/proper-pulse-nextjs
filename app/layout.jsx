import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const metaData = {
  title: "Property Pulse",
  keyword: "rental, property , realestate ",
  description: "Find the perfect rental property",
};

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer />
          <ToastContainer></ToastContainer>
        </body>
      </html>
    </AuthProvider>
  );
}
