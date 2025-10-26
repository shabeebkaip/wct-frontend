import Link from "next/link";
import Hero from "@/components/home/Hero";
import BusinessVerticals from "@/components/home/BusinessVerticals";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      <BusinessVerticals  />

      {/* Footer */}
    </div>
  );
}
