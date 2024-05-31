import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between stars-box">
      <Header />
      <Footer />
    </main>
  );
}
