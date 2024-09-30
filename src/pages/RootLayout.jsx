import Footer from "@/components/Footer";
import Header from "@/components/header";
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
