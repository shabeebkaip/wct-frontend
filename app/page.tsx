import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import DataCenterImages from "@/components/home/DataCenterImages";
import CCTVSurveillance from "@/components/home/CCTVServeillance";
import LowCurrentSolution from "@/components/home/LowCurrentSolution";
import StructuredCabling from "@/components/home/StructuredCabling";
import ContactUs from "@/components/home/ContactUs";
import TrustedBrands from "@/components/home/TrustedBrands";

// Force dynamic rendering to ensure CMS changes are reflected immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "WeCare Technology | IT Infrastructure Solutions in Saudi Arabia",
  description: "WeCare Technology (WCT) is a leading IT infrastructure provider in Saudi Arabia, specializing in Data Centers, Structured Cabling, CCTV, Low Current Systems, and ICT solutions with 18+ years of expertise.",
  keywords: "WeCare Technology, WCT, IT infrastructure Saudi Arabia, data center solutions, structured cabling, CCTV surveillance, low current systems, ICT infrastructure Riyadh",
  alternates: {
    canonical: "https://wecaretech.com",
  },
  openGraph: {
    title: "WeCare Technology | IT Infrastructure Solutions in Saudi Arabia",
    description: "WeCare Technology (WCT) is a leading IT infrastructure provider in Saudi Arabia, specializing in Data Centers, Structured Cabling, CCTV, Low Current Systems, and ICT solutions.",
    url: "https://wecaretech.com",
    siteName: "WeCare Technology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeCare Technology | IT Infrastructure Solutions in Saudi Arabia",
    description: "Leading IT infrastructure provider in Saudi Arabia — Data Centers, Structured Cabling, CCTV, Low Current Systems.",
  },
};

// Helper function to serialize ObjectIds in nested objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeData(data: any): any {
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }
  if (typeof data === 'object' && data !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serialized: any = {};
    for (const key in data) {
      if (key === '_id' && data[key] && typeof data[key] === 'object' && data[key].toString) {
        serialized[key] = data[key].toString();
      } else if (typeof data[key] === 'object') {
        serialized[key] = serializeData(data[key]);
      } else {
        serialized[key] = data[key];
      }
    }
    return serialized;
  }
  return data;
}

async function getCCTVSection() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { CCTVSection } = await import('@/lib/models/CCTVSection');
    await connectDB();
    const data = await CCTVSection.findOne().lean();
    return serializeData(data);
  } catch (error) {
    console.error('Error fetching CCTV section:', error);
  }
  return null;
}

async function getLowCurrentSection() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { LowCurrentSection } = await import('@/lib/models/LowCurrentSection');
    await connectDB();
    const data = await LowCurrentSection.findOne().lean();
    return serializeData(data);
  } catch (error) {
    console.error('Error fetching Low Current section:', error);
  }
  return null;
}

async function getStructuredCablingSection() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { StructuredCablingSection } = await import('@/lib/models/StructuredCablingSection');
    await connectDB();
    const data = await StructuredCablingSection.findOne().lean();
    return serializeData(data);
  } catch (error) {
    console.error('Error fetching Structured Cabling section:', error);
  }
  return null;
}

async function getClientsSection() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { ClientsSection } = await import('@/lib/models/ClientsSection');
    await connectDB();
    const data = await ClientsSection.findOne().lean();
    return serializeData(data);
  } catch (error) {
    console.error('Error fetching Clients section:', error);
  }
  return null;
}

async function getTrustedBrandsSection() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { TrustedBrandsSection } = await import('@/lib/models/TrustedBrandsSection');
    await connectDB();
    const data = await TrustedBrandsSection.findOne().lean();
    return serializeData(data);
  } catch (error) {
    console.error('Error fetching Trusted Brands section:', error);
  }
  return null;
}

async function getProjects() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Project = (await import('@/lib/models/Project')).default;
    await connectDB();
    const projects = await Project.find().sort({ order: 1 }).lean();
    if (projects && projects.length > 0) {
      return projects.map((project) => serializeData(project));
    }
  } catch (error) {
    console.error('Error fetching projects from database:', error);
  }
  return [];
}

export default async function Home() {
  const [cctvSection, lowCurrentSection, structuredCablingSection, clientsSection, trustedBrandsSection, ] = await Promise.all([
    getCCTVSection(),
    getLowCurrentSection(),
    getStructuredCablingSection(),
    getClientsSection(),
    getTrustedBrandsSection(),
    getProjects()
  ]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      
      {/* Data Center Solutions */}
      <DataCenterImages />
      
      {/* Trusted Brands */}
      <TrustedBrands data={trustedBrandsSection} />
      
      {/* CCTV Surveillance - Reduced to 3 solutions */}
      <CCTVSurveillance data={cctvSection} />
      
      {/* Low Current Solutions - Simplified */}
      <LowCurrentSolution data={lowCurrentSection} />
      
      {/* Structured Cabling - Limited to 4 features */}
      <StructuredCabling data={structuredCablingSection} />
      
      {/* Projects - Max 3 per category */}
      {/* <ProjectList projects={projects} /> */}
      
      {/* Clients Section */}
      <Clients data={clientsSection} />
      
      {/* Contact Form */}
      <ContactUs />

      {/* Footer */}
    </div>
  );
}
