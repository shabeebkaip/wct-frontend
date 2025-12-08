import Image from 'next/image';

interface LogoCardProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function LogoCard({ src, alt, width = 120, height = 60 }: LogoCardProps) {
  return (
    <div className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
      <div className="relative w-full h-12 flex items-center justify-center">
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
