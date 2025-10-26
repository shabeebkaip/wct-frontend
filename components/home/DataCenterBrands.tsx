'use client';
import LogoLoop from '../LogoLoop';

const DataCenterBrands = () => {
  const brands = [
    {
      src: '/datacenter-brands/vertiv.svg',
      alt: 'Vertiv',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/huawei.jpg',
      alt: 'Huawei',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/apc.gif',
      alt: 'APC',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/liebert.jpg',
      alt: 'Liebert',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/SDMO.avif',
      alt: 'SDMO',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/airedale.webp',
      alt: 'Airedale',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/eaton.png',
      alt: 'Eaton',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/schneider.jpeg',
      alt: 'Schneider Electric',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/yuasa.png',
      alt: 'Yuasa',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/edpac.png',
      alt: 'Edpac',
      width: 120,
      height: 60,
    },
    {
      src: '/datacenter-brands/cat.png',
      alt: 'CAT',
      width: 120,
      height: 60,
    },
   
  ];

  return (
    <section className="relative bg-black py-20 overflow-hidden border-t border-gray-800/50">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Data Center Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Partnering with world-leading brands to deliver cutting-edge infrastructure, 
            power management, cooling systems, and mission-critical solutions
          </p>
        </div>

        {/* Brand Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Power & UPS Systems
          </span>
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Cooling Solutions
          </span>
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Infrastructure & Racks
          </span>
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Generators & Backup Power
          </span>
        </div>

        {/* Logo Loop */}
        <div className="relative px-4">
          {/* Subtle glow effect behind logo loop */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 blur-3xl"></div>
          
          <LogoLoop
            logos={brands}
            speed={40}
            direction="left"
            logoHeight={60}
            gap={80}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="rgba(0, 0, 0, 1)"
            scaleOnHover={true}
            ariaLabel="Data Center Partner Brands"
            className="relative z-10"
          />
        </div>

        {/* Brand List Grid - Alternative Static View */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-blue-500/30 transition-all duration-300 hover:bg-gray-800/40 group"
            >
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                <span className="text-sm font-medium">{brand.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataCenterBrands;
