import "@/app/globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
