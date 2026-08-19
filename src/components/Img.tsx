import { useState, type ImgHTMLAttributes } from "react";

/**
 * <img> con fallback: si la URL remota falla (sin red, ID inválido),
 * muestra /placeholder.svg para que el layout nunca se rompa.
 */
export default function Img({ src, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const [err, setErr] = useState(false);
  return <img src={err || !src ? "/placeholder.svg" : src} alt={alt} onError={() => setErr(true)} {...rest} />;
}
