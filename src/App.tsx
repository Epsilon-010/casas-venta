import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";

/**
 * Sitio de UNA sola página. La navegación es por anclas:
 *  #inicio → Hero · #propiedades → casas por ciudad · #contacto → formulario
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
