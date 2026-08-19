import { IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";

/** Botón flotante de WhatsApp (esquina inferior derecha). */
export default function WhatsAppButton({ mensaje }: { mensaje?: string }) {
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition hover:scale-105"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
