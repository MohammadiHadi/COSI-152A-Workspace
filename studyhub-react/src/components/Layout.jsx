// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />  {/* matched page renders here */}
      </main>
      <Footer />
    </>
  );
}

