
import Hero from "@/components/home/Hero";
import BusinessVerticals from "@/components/home/BusinessVerticals";
import Clients from "@/components/home/Clients";
import DataCenterImages from "@/components/home/DataCenterImages";
import CCTVSurveillance from "@/components/home/CCTVServeillance";
import LowCurrentSolution from "@/components/home/LowCurrentSolution";
import StructuredCabling from "@/components/home/StructuredCabling";
import ProjectList from "@/components/home/ProjectList";
import ContactUs from "@/components/home/ContactUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      <BusinessVerticals  />
      {/* <DataCenterBrands /> */}
      <DataCenterImages />
      <CCTVSurveillance />
      <LowCurrentSolution />
      <StructuredCabling  />
      <ProjectList />
      <Clients />
      <ContactUs />

      {/* Footer */}
    </div>
  );
}
