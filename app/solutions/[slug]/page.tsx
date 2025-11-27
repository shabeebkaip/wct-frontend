import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Solution from '@/lib/models/Solution';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SolutionData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    features: string[];
  };
  overview?: {
    title: string;
    description: string;
    image: string;
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
  }>;
  brands: Array<{
    name: string;
    logo: string;
    specialization: string;
  }>;
  solutionTypes: Array<{
    icon: string;
    title: string;
    description: string;
    applications: string[];
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  process?: {
    title: string;
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  benefits?: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  stats: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

async function getSolution(slug: string): Promise<SolutionData | null> {
  try {
    await connectDB();
    const solution = await Solution.findOne({ slug, published: true }).lean();
    
    if (!solution) {
      return null;
    }

    return JSON.parse(JSON.stringify(solution));
  } catch (error) {
    console.error('Error fetching solution:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  
  if (!solution) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: solution.seo?.metaTitle || solution.title,
    description: solution.seo?.metaDescription || solution.hero.description,
    keywords: solution.seo?.keywords?.join(', '),
  };
}

// Helper to get icon component
function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[iconName] || Icons.Circle;
  return Icon;
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await getSolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
        style={solution.hero.backgroundImage ? {
          backgroundImage: `url(${solution.hero.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {solution.hero.subtitle && (
              <p className="text-blue-300 text-lg mb-4 font-medium">
                {solution.hero.subtitle}
              </p>
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {solution.hero.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {solution.hero.description}
            </p>
            
            {solution.hero.features && solution.hero.features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {solution.hero.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                  >
                    <Icons.CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </section>

      {/* Overview Section */}
      {solution.overview && solution.overview.title && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {solution.overview.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {solution.overview.description}
                  </p>
                </div>
                {solution.overview.image && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={solution.overview.image}
                      alt={solution.overview.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {solution.services && solution.services.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Our Services & Offerings
                </h2>
                <p className="text-xl text-gray-600">
                  Comprehensive solutions tailored to your needs
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.services.map((service, index) => {
                  const Icon = getIcon(service.icon);
                  return (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                    >
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-700">
                              <Icons.CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brands Section */}
      {solution.brands && solution.brands.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Trusted Brands We Work With
                </h2>
                <p className="text-xl text-gray-600">
                  Industry-leading partners for premium solutions
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {solution.brands.map((brand, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all border border-gray-200 flex items-center justify-center group"
                  >
                    <div className="text-center">
                      {brand.logo && (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-20 h-20 object-contain mx-auto mb-2 grayscale group-hover:grayscale-0 transition-all"
                        />
                      )}
                      <p className="text-xs font-semibold text-gray-900">{brand.name}</p>
                      {brand.specialization && (
                        <p className="text-xs text-gray-500 mt-1">{brand.specialization}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solution Types Section */}
      {solution.solutionTypes && solution.solutionTypes.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Industry Solutions
                </h2>
                <p className="text-xl text-gray-600">
                  Specialized solutions for every sector
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {solution.solutionTypes.map((type, index) => {
                  const Icon = getIcon(type.icon);
                  return (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {type.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {type.description}
                          </p>
                          {type.applications && type.applications.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {type.applications.map((app, aIndex) => (
                                <span
                                  key={aIndex}
                                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {solution.features && solution.features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <p className="text-xl text-gray-600">
                  Advanced capabilities that set us apart
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.features.map((feature, index) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {solution.process && solution.process.steps && solution.process.steps.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {solution.process.title}
                </h2>
                <p className="text-xl text-gray-600">
                  Our systematic approach to excellence
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.process.steps.map((step, index) => {
                  const Icon = getIcon(step.icon);
                  return (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
                    >
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {solution.benefits && solution.benefits.items && solution.benefits.items.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {solution.benefits.title}
                </h2>
                <p className="text-xl text-gray-600">
                  Why choose our solutions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solution.benefits.items.map((benefit, index) => {
                  const Icon = getIcon(benefit.icon);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {solution.stats && solution.stats.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {solution.stats.map((stat, index) => {
                  const Icon = getIcon(stat.icon);
                  return (
                    <div
                      key={index}
                      className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <Icon className="w-10 h-10 mx-auto mb-4 text-blue-300" />
                      <div className="text-4xl font-bold mb-2">{stat.value}</div>
                      <div className="text-blue-200 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {solution.cta && solution.cta.title && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {solution.cta.title}
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  {solution.cta.description}
                </p>
                <Link
                  href={solution.cta.buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  {solution.cta.buttonText}
                  <Icons.ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
