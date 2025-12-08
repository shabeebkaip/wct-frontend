'use client';
import LogoCard from '../shared/LogoCard';

interface TrustedBrandsData {
  title: string;
  description: string;
  categories: string[];
  brands: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  trustBadge: string;
}

interface TrustedBrandsProps {
  data: TrustedBrandsData;
}

const TrustedBrands = ({ data }: TrustedBrandsProps) => {
  const { title, description, categories, brands, trustBadge } = data;

  return (
    <section className="relative bg-linear-to-b from-white via-slate-50 to-blue-50 py-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Brand Categories */}
        {categories && categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="px-5 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Brand Grid - Compact Card Design */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <LogoCard
              key={index}
              src={brand.src}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
            />
          ))}
        </div>

        {/* Trust Badge */}
        {trustBadge && (
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              {trustBadge}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustedBrands;
