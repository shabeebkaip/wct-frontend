import Link from 'next/link';
import Image from 'next/image';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  badgeText: string;
  badgeDescription: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundImage: string;
}

async function getHeroData(): Promise<HeroData> {
  // Fetch directly from database during build and runtime
  // This avoids HTTP request issues during Vercel build
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Hero = (await import('@/lib/models/Hero')).default;
    await connectDB();
    const data = await Hero.findOne().lean();
    if (data) {
      // Convert to plain object, removing MongoDB _id and __v fields
      const { ...plainData } = data;
      return plainData as HeroData;
    }
  } catch (error) {
    console.error('Error fetching hero data from database:', error);
  }

  throw new Error('Failed to fetch hero data');
}

export default async function Hero() {
  const heroData = await getHeroData();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300 py-16">
      {/* Background Image - Full Coverage */}
      {heroData.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroData.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        </div>
      )}

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-white dark:to-black z-5 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
            <span className="text-xs font-bold text-white tracking-wider drop-shadow-lg">{heroData.badgeText}</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <span className="text-xs font-medium text-white/90 tracking-wide drop-shadow-lg">
            {heroData.badgeDescription}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 tracking-tight">
          <div className="relative">
            <div className="text-white drop-shadow-2xl [text-shadow:0_4px_12px_rgb(0_0_0/60%)]">
              {heroData.title}
            </div>
          </div>
          <div className="relative mt-2">
            <div className="text-white drop-shadow-2xl [text-shadow:0_4px_12px_rgb(0_0_0/60%)]">
              {heroData.subtitle}
            </div>
          </div>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/95 leading-relaxed mb-10 font-medium drop-shadow-xl [text-shadow:0_2px_8px_rgb(0_0_0/50%)]">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link 
            href={heroData.primaryButtonLink}
            className="group relative px-8 py-4 bg-white hover:bg-white/90 rounded-full font-bold text-base text-slate-900 shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 transform backdrop-blur-sm"
          >
            <span className="relative z-10">{heroData.primaryButtonText}</span>
          </Link>
          <Link 
            href={heroData.secondaryButtonLink}
            className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-white/60 rounded-full font-bold text-base text-white shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
          >
            <span>{heroData.secondaryButtonText}</span>
          </Link>
        </div>


      </div>
    </section>
  );
}
