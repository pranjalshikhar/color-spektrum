import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
