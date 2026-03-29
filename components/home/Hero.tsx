import Link from 'next/link';
import HeroVisual from './HeroVisual';
import HeroBackground from './HeroBackground';

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
}

async function getHeroData(): Promise<HeroData> {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Hero = (await import('@/lib/models/Hero')).default;
    await connectDB();
    const data = await Hero.findOne().lean();
    if (data) {
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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* MagicRings — full section background */}
      <HeroBackground />

      {/* Grid + glow overlay on top of rings */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-2 container mx-auto px-6 lg:px-12 py-32 w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Text ── */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400">
                {heroData.badgeText}
              </span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">{heroData.badgeDescription}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-black text-white leading-[1.06] tracking-tight mb-3">
            {heroData.title}
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl font-black leading-[1.06] tracking-tight mb-8 bg-linear-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
            {heroData.subtitle}
          </h2>

          {/* Dot-separated service tags */}
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500 mb-5">
            <span>Data Centers</span>
            <span className="text-blue-700">•</span>
            <span>CCTV</span>
            <span className="text-blue-700">•</span>
            <span>Low Current</span>
            <span className="text-blue-700">•</span>
            <span>Structured Cabling</span>
          </div>

          <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-10">
            {heroData.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={heroData.primaryButtonLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
            >
              {heroData.primaryButtonText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={heroData.secondaryButtonLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold text-sm transition-colors duration-200"
            >
              {heroData.secondaryButtonText}
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-10 pt-8 border-t border-white/8 grid grid-cols-3 gap-6">
            {[
              { value: '10+', label: 'Years delivering' },
              { value: '500+', label: 'Projects completed' },
              { value: '24/7', label: 'Support coverage' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-medium tracking-widest uppercase text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: MagicRings + Network diagram (client component) ── */}
        <HeroVisual />

      </div>
    </section>
  );
}
