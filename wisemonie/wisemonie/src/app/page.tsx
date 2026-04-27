import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import All from "@/components/layout/All";
import Value from "@/components/layout/Value";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <All />
      <Value />
      
    </main>
  );
}