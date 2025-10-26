import Link from "next/link";
import Hero from "@/components/home/Hero";
import BusinessVerticals from "@/components/home/BusinessVerticals";
import Clients from "@/components/home/Clients";
import DataCenterBrands from "@/components/home/DataCenterBrands";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      <BusinessVerticals  />
      <DataCenterBrands />
      <Clients />

      {/* Footer */}
    </div>
  );
}
