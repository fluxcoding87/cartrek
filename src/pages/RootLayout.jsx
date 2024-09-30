import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <section>
        <Header />
        <main>
          <Outlet />
        </main>
      </section>
      <Footer />
    </>
  );
}
