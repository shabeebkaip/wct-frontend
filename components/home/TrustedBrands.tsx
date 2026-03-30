'use client';
import Image from 'next/image';

interface Brand {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface TrustedBrandsData {
  title: string;
  description: string;
  categories: string[];
  brands: Brand[];
  trustBadge: string;
}

interface TrustedBrandsProps {
  data: TrustedBrandsData;
}

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="mx-3 flex items-center justify-center w-44 h-20 shrink-0 rounded-2xl bg-white border border-slate-200 px-6 hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
      <Image
        src={brand.src}
        alt={brand.alt}
        width={brand.width || 120}
        height={brand.height || 48}
        className="max-w-full h-auto object-contain  group-hover:grayscale-0 transition-all duration-300"
        style={{ maxHeight: '42px' }}
      />
    </div>
  );
}

const TrustedBrands = ({ data }: TrustedBrandsProps) => {
  const { title, description, categories, brands, trustBadge } = data;

  const row1 = brands.slice(0, Math.ceil(brands.length / 2));
  const row2 = brands.slice(Math.ceil(brands.length / 2));

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-blue-600" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
            Technology Partners
          </span>
          <div className="h-px w-8 bg-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
        <p className="text-slate-500 text-base max-w-2xl mx-auto">{description}</p>

        {/* Category pills */}
        {categories && categories.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 text-xs font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Row 1 — scrolls left */}
      {row1.length > 0 && (
        <div className="relative mb-4">
          {/* fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-slate-50 to-transparent" />
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee">
              {[...row1, ...row1].map((brand, i) => (
                <BrandLogo key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Row 2 — scrolls right */}
      {row2.length > 0 && (
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-slate-50 to-transparent" />
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee-reverse">
              {[...row2, ...row2].map((brand, i) => (
                <BrandLogo key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trust badge */}
      {trustBadge && (
        <div className="max-w-7xl mx-auto px-6 mt-10 text-center">
          <p className="text-xs text-slate-400 tracking-wide">{trustBadge}</p>
        </div>
      )}
    </section>
  );
};

export default TrustedBrands;
