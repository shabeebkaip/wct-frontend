import Link from "next/link";
import Hero from "@/components/home/Hero";
import BusinessVerticals from "@/components/home/BusinessVerticals";
import Clients from "@/components/home/Clients";
import DataCenterBrands from "@/components/home/DataCenterBrands";
import DataCenterImages from "@/components/home/DataCenterImages";
import CCTVSurveillance from "@/components/home/CCTVServeillance";
import LowCurrentSolution from "@/components/home/LowCurrentSolution";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      <BusinessVerticals  />
      <DataCenterImages />
      <DataCenterBrands />
      <CCTVSurveillance />
      <LowCurrentSolution />
      <Clients />

      {/* Footer */}
    </div>
  );
}
