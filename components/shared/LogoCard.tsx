import Image from 'next/image';

interface LogoCardProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function LogoCard({ src, alt, width = 120, height = 60 }: LogoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-blue-50 via-cyan-50 to-emerald-50 transition-opacity duration-300" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.10),transparent_40%)]" />

      <div className="relative flex items-center justify-center px-6 py-4">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="max-w-full h-auto object-contain"
          style={{ maxHeight: '48px' }}
        />
      </div>
    </div>
  );
}
