import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import { AboutPage } from "@/lib/models/AboutPage";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAboutPageData() {
  try {
    await connectDB();
    const data = await AboutPage.findOne().lean();
    
    if (!data) {
      return null;
    }
    
    // Convert MongoDB document to plain object and handle _id
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return null;
  }
}

const About = async () => {
  const aboutData = await getAboutPageData();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Unable to load about page content.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-10 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <LucideIcons.Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                {aboutData.hero.badge}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
              {aboutData.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {aboutData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
                <LucideIcons.Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  {aboutData.companyStory.badge}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-gray-100">
                {aboutData.companyStory.title}
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                {aboutData.companyStory.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-2xl dark:shadow-none">
                <Image
                  src="/logo.png"
                  alt="WeCare Technology Office"
                  fill
                  className="object-contain p-12 bg-linear-to-br from-slate-100 to-white dark:from-gray-900/90 dark:to-gray-800/90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-100 via-transparent to-transparent dark:from-gray-900 dark:via-transparent dark:to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group relative p-10 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6">
                  {(() => {
                    const MissionIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[aboutData.mission.icon] || LucideIcons.Target;
                    return <MissionIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                  {aboutData.mission.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {aboutData.mission.description}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative p-10 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6">
                  {(() => {
                    const VisionIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[aboutData.vision.icon] || LucideIcons.Eye;
                    return <VisionIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                  {aboutData.vision.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {aboutData.vision.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <LucideIcons.Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Core Values
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our values are the foundation of everything we do, guiding our
              decisions and shaping our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.coreValues.map((value: { icon: string; title: string; description: string }, index: number) => {
              const ValueIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[value.icon] || LucideIcons.Star;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <ValueIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <LucideIcons.Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-gray-100 mb-4">
              Meet the People Behind Our Success
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our team of dedicated professionals brings together decades of
              experience and expertise in IT infrastructure.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-12">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-blue-300 dark:to-blue-500/30" />
              <LucideIcons.Crown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Leadership</span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-blue-300 dark:to-blue-500/30" />
            </div>
            <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
              {aboutData.teamMembers
                .filter((member: { isLeadership: boolean; order: number; name: string; role: string; image?: string }) => member.isLeadership)
                .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                .map((member: { name: string; role: string; image?: string }, index: number) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center"
                  >
                    {/* Avatar */}
                    <div className="relative mb-4">
                      <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                      <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-500/10">
                            <LucideIcons.UserCircle2 className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-1">
                      {member.name}
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {member.role}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-12">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-slate-300 dark:to-gray-700" />
              <LucideIcons.Users className="w-4 h-4 text-slate-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Our Team</span>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-slate-300 dark:to-gray-700" />
            </div>
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {aboutData.teamMembers
                .filter((member: { isLeadership: boolean; order: number; name: string; role: string; image?: string }) => !member.isLeadership)
                .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                .map((member: { name: string; role: string; image?: string }, index: number) => (
                <div
                  key={index}
                  className="group flex flex-col items-center"
                >
                  {/* Avatar */}
                  <div className="relative mb-3">
                    <div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-slate-300 to-slate-200 dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-50 dark:from-gray-800 dark:to-gray-900">
                          <LucideIcons.User className="w-10 h-10 text-slate-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-gray-100 mb-0.5 text-center max-w-[100px]">
                    {member.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 text-center max-w-[100px]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-blue-50/50 dark:bg-blue-500/5 backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                {aboutData.cta.title}
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {aboutData.cta.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={aboutData.cta.primaryButton.link}
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {aboutData.cta.primaryButton.text}
                </Link>
                <Link
                  href={aboutData.cta.secondaryButton.link}
                  className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300"
                >
                  {aboutData.cta.secondaryButton.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
