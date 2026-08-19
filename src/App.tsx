import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Casas from "./pages/Casas";
import CasaDetalle from "./pages/CasaDetalle";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

/**
 * MAPA DE RUTAS
 *  /               → pages/Home.tsx
 *  /casas          → pages/Casas.tsx        (?ciudad=…&orden=…)
 *  /casas/:slug    → pages/CasaDetalle.tsx
 *  /nosotros       → pages/Nosotros.tsx
 *  /contacto       → pages/Contacto.tsx
 *  *               → pages/NotFound.tsx
 */
function Layout() {
  const { pathname } = useLocation();
  const esDetalle = pathname.startsWith("/casas/") && pathname.length > 7;
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casas" element={<Casas />} />
          <Route path="/casas/:slug" element={<CasaDetalle />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* En el detalle, la propia página renderiza su WhatsAppButton con mensaje personalizado */}
      {!esDetalle && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
