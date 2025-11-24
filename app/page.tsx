
import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import DataCenterImages from "@/components/home/DataCenterImages";
import CCTVSurveillance from "@/components/home/CCTVServeillance";
import LowCurrentSolution from "@/components/home/LowCurrentSolution";
import StructuredCabling from "@/components/home/StructuredCabling";
import ProjectList from "@/components/home/ProjectList";
import ContactUs from "@/components/home/ContactUs";

async function getHomePageData() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { HomePage } = await import('@/lib/models/HomePage');
    await connectDB();
    const data = await HomePage.findOne().lean();
    if (data) {
      // Convert to plain object
      const { ...plainData } = data;
      return plainData;
    }
  } catch (error) {
    console.error('Error fetching home page data from database:', error);
  }
  return null;
}

export default async function Home() {
  const homeData = await getHomePageData();
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Floating over Hero */}

      {/* Hero Section with Prism Background */}
      <Hero />
      {/* <BusinessVerticals  /> */}
      {/* <DataCenterBrands /> */}
      <DataCenterImages />
      <CCTVSurveillance data={homeData?.cctvSection} />
      <LowCurrentSolution data={homeData?.lowCurrentSection} />
      <StructuredCabling data={homeData?.structuredCablingSection} />
      <ProjectList />
      <Clients data={homeData?.clientsSection} />
      <ContactUs />

      {/* Footer */}
    </div>
  );
}
