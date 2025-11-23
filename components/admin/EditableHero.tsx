'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Check, Upload, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EditableHeroProps {
  isEditMode?: boolean;
}

export default function EditableHero({ isEditMode = false }: EditableHeroProps) {
  const editing = isEditMode;
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [heroData, setHeroData] = useState({
    title: 'Next-Gen Data Center &',
    subtitle: 'ICT Solutions',
    description: "Pioneering turnkey data center solutions, electro-mechanical systems, and enterprise-grade infrastructure for the Kingdom's digital transformation since 2006.",
    badgeText: 'EST. 2005',
    badgeDescription: '20+ Years of ICT Excellence',
    primaryButtonText: 'Explore Solutions',
    primaryButtonLink: '/solutions/data-center',
    secondaryButtonText: 'View Projects',
    secondaryButtonLink: '/projects',
    backgroundImage: '',
  });

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        if (response.ok) {
          const data = await response.json();
          setHeroData(data);
        }
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
      }
    };
    fetchHeroData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token',
        },
        body: JSON.stringify(heroData),
      });

      if (response.ok) {
        setHasChanges(false);
        alert('Changes saved successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to save hero data:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch('/api/hero');
      if (response.ok) {
        const data = await response.json();
        setHeroData(data);
      }
    } catch (error) {
      console.error('Failed to fetch hero data:', error);
    }
    setHasChanges(false);
  };

  const updateField = (field: keyof typeof heroData, value: string) => {
    setHeroData({ ...heroData, [field]: value });
    setHasChanges(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer admin-token',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateField('backgroundImage', data.url);
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Edit Mode Toolbar */}
      {editing && hasChanges && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg p-1.5 border border-slate-200/50">
          <Button
            onClick={handleSave}
            size="sm"
            className="gap-1"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <X className="w-3 h-3" />
            Cancel
          </Button>
        </div>
      )}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 transition-colors duration-300 py-16">
        {/* Bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-white z-5 pointer-events-none"></div>

        {/* Background Image */}
        {heroData.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroData.backgroundImage}
              alt="Hero background"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}

        {/* Background Image Upload Control */}
        {editing && (
          <div className="absolute top-20 left-4 z-50 flex flex-col gap-2">
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" className="gap-2" disabled={uploading} asChild>
                <span>
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  {uploading ? 'Uploading...' : 'Change Background'}
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {heroData.backgroundImage && (
              <Button
                onClick={() => updateField('backgroundImage', '')}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                Remove Background
              </Button>
            )}
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-linear-to-r from-blue-100 via-purple-100 to-blue-100 backdrop-blur-sm border border-blue-300 rounded-md shadow-sm group">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              {editing ? (
                <Input
                  type="text"
                  value={heroData.badgeText}
                  onChange={(e) => updateField('badgeText', e.target.value)}
                  className="text-xs font-semibold text-blue-700 tracking-wider bg-white/80 h-6 min-w-20 px-2"
                  placeholder="Badge text"
                />
              ) : (
                <span className="text-xs font-semibold text-blue-700 tracking-wider">
                  {heroData.badgeText}
                </span>
              )}
            </div>
            <div className="w-px h-4 bg-slate-400"></div>
            {editing ? (
              <Input
                type="text"
                value={heroData.badgeDescription}
                onChange={(e) => updateField('badgeDescription', e.target.value)}
                className="text-xs font-medium text-slate-700 tracking-wide bg-white/80 h-6 min-w-[200px] px-2"
                placeholder="Badge description"
              />
            ) : (
              <span className="text-xs font-medium text-slate-700 tracking-wide">
                {heroData.badgeDescription}
              </span>
            )}
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 tracking-normal">
            <div className="relative group">
              {editing ? (
                <Input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="bg-linear-to-r from-[#28348c] via-[#3a4ba8] to-[#28348c] bg-clip-text text-transparent block drop-shadow-lg bg-white/80 text-center w-full font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl h-auto py-3"
                  placeholder="Main title"
                />
              ) : (
                <div className="bg-linear-to-r from-[#28348c] via-[#3a4ba8] to-[#28348c] bg-clip-text text-transparent block drop-shadow-lg">
                  {heroData.title}
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-r from-[#28348c]/10 via-[#3a4ba8]/10 to-[#28348c]/10 blur-xl -z-10 scale-110"></div>
            </div>
            <div className="relative mt-2 group">
              {editing ? (
                <Input
                  type="text"
                  value={heroData.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="bg-linear-to-r from-[#28348c] via-[#4556b8] to-[#28348c] bg-clip-text text-transparent block drop-shadow-lg bg-white/80 text-center w-full font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl h-auto py-3"
                  placeholder="Subtitle"
                />
              ) : (
                <div className="bg-linear-to-r from-[#28348c] via-[#4556b8] to-[#28348c] bg-clip-text text-transparent block drop-shadow-lg">
                  {heroData.subtitle}
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-r from-[#28348c]/10 via-[#4556b8]/10 to-[#28348c]/10 blur-xl -z-10 scale-110"></div>
            </div>
          </h1>

          {/* Description */}
          {editing ? (
            <Textarea
              value={heroData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={2}
              className="max-w-3xl mx-auto text-base md:text-lg text-slate-700 leading-relaxed mb-8 font-medium bg-white/80 text-center"
              placeholder="Description text"
            />
          ) : (
            <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-700 leading-relaxed mb-8 font-medium">
              {heroData.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            {editing ? (
              <>
                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                  <Input
                    type="text"
                    value={heroData.primaryButtonText}
                    onChange={(e) => updateField('primaryButtonText', e.target.value)}
                    className="px-6 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm text-white text-center border-blue-700/50 hover:border-blue-800"
                    placeholder="Button text"
                  />
                  <Input
                    type="text"
                    value={heroData.primaryButtonLink}
                    onChange={(e) => updateField('primaryButtonLink', e.target.value)}
                    placeholder="/link-url"
                    className="text-xs h-7 bg-white/90 text-slate-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                  <Input
                    type="text"
                    value={heroData.secondaryButtonText}
                    onChange={(e) => updateField('secondaryButtonText', e.target.value)}
                    className="px-6 h-10 bg-white hover:bg-slate-50 rounded-xl font-semibold text-sm text-slate-700 text-center"
                    placeholder="Button text"
                  />
                  <Input
                    type="text"
                    value={heroData.secondaryButtonLink}
                    onChange={(e) => updateField('secondaryButtonLink', e.target.value)}
                    placeholder="/link-url"
                    className="text-xs h-7 bg-white/90 text-slate-600"
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  href={heroData.primaryButtonLink}
                  className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-sm text-white hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 transform"
                >
                  <span className="relative z-10 drop-shadow-sm">{heroData.primaryButtonText}</span>
                </Link>
                <Link
                  href={heroData.secondaryButtonLink}
                  className="group relative px-6 py-3 bg-white border-2 border-slate-300 hover:border-blue-500 rounded-xl font-semibold text-sm text-slate-700 hover:text-blue-700 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="drop-shadow-sm">{heroData.secondaryButtonText}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
