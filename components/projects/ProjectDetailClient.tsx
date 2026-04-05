'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';
import { trackEvent } from '@/lib/hooks/useAnalytics';

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    trackEvent({
      eventType: 'project_view',
      page: `/projects/${project._id}`,
      metadata: { projectTitle: project.title, projectCategory: project.category, client: project.client, location: project.location },
    });
  }, [project]);

  if (!project.images || project.images.length === 0) return null;

  const prev = () => setIdx((i) => (i - 1 + project.images.length) % project.images.length);
  const next = () => setIdx((i) => (i + 1) % project.images.length);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <Image
          src={project.images[idx]}
          alt={`${project.title} — ${idx + 1}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/80 to-transparent" />

        {project.images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors backdrop-blur-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-400 tracking-widest">
              {String(idx + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {project.images.length > 1 && (
        <div className="flex gap-2">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative w-14 h-10 overflow-hidden border transition-all ${i === idx ? 'border-blue-500' : 'border-white/10 opacity-50 hover:opacity-75'}`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
