'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Download } from 'lucide-react';
import { trackEvent } from '@/lib/hooks/useAnalytics';

interface Solution {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
  order: number;
}

interface Brochure {
  _id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  active: boolean;
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };
    // Evaluate immediately on route change, then listen
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Fetch solutions from database
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch('/api/solutions');
        if (response.ok) {
          const data = await response.json();
          // Filter published solutions and sort by order
          const publishedSolutions = data
            .filter((solution: Solution) => solution.published)
            .sort((a: Solution, b: Solution) => a.order - b.order);
          setSolutions(publishedSolutions);
        }
      } catch (error) {
        console.error('Error fetching solutions:', error);
      }
    };
    fetchSolutions();
  }, []);

  // Fetch active brochure
  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await fetch('/api/brochures?active=true');
        if (response.ok) {
          const data = await response.json();
          setBrochure(data);
        }
      } catch (error) {
        console.error('Error fetching brochure:', error);
      }
    };
    fetchBrochure();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  // Hero mode: pages with dark hero sections + not scrolled → transparent dark header
  const darkHeroPages = ['/', '/about', '/projects', '/contact', '/products'];
  const isHeroMode = darkHeroPages.includes(pathname) && !scrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-4 md:py-5'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl border transition-all duration-500 ${
            isHeroMode
              ? 'bg-white/5 backdrop-blur-md border-white/10 shadow-none'
              : scrolled
                ? 'bg-white/80 backdrop-blur-md border-white/20 shadow-2xl shadow-slate-900/10'
                : 'bg-white/70 backdrop-blur border-white/30 shadow-xl shadow-slate-900/5'
          }`}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group relative z-10">
                <Image
                  src="/logo.png"
                  alt="WCT Solutions"
                  width={150}
                  height={150}
                  className={`object-contain transform group-hover:scale-110 transition-all duration-300 ${
                    isHeroMode ? 'brightness-0 invert' : ''
                  }`}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? isHeroMode
                            ? 'text-white bg-white/12'
                            : 'text-blue-600 bg-blue-50'
                          : isHeroMode
                            ? 'text-white/75 hover:text-white hover:bg-white/10'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                          isHeroMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                      )}
                    </Link>
                  );
                })}

                {/* Solutions Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname?.startsWith('/solutions')
                        ? isHeroMode
                          ? 'text-white bg-white/12'
                          : 'text-blue-600 bg-blue-50'
                        : isHeroMode
                          ? 'text-white/75 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    Solutions
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white backdrop-blur-xl border border-slate-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                      solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    {solutions.map((solution) => {
                      const isActive = pathname === `/solutions/${solution.slug}`;
                      return (
                        <Link
                          key={solution._id}
                          href={`/solutions/${solution.slug}`}
                          className={`block px-4 py-3 text-sm transition-all duration-200 ${
                            isActive
                              ? 'text-blue-600 bg-blue-50 border-l-2 border-blue-600'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-blue-50 hover:border-l-2 hover:border-blue-500'
                          }`}
                        >
                          {solution.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {brochure && (
                  <a
                    href={brochure.fileUrl}
                    download={brochure.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isHeroMode
                        ? 'text-white/75 hover:text-white hover:bg-white/10'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                    title="Download Company Brochure"
                    onClick={async () => {
                      try {
                        await trackEvent({
                          eventType: 'brochure_download',
                          page: pathname,
                          metadata: { fileName: brochure.fileName, brochureTitle: brochure.title },
                        });
                      } catch (error) {
                        console.error('Failed to track brochure download:', error);
                      }
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Brochure</span>
                  </a>
                )}
                <a
                  href="tel:+966123456789"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isHeroMode
                      ? 'text-white/75 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get Quote</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isHeroMode
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900/98 backdrop-blur-xl border-l border-slate-200 dark:border-gray-800 z-40 lg:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="WCT Solutions"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30'
                        : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Mobile Solutions Section */}
              <div className="pt-4">
                <p className="px-4 pb-2 text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wider">
                  Solutions
                </p>
                <div className="space-y-2">
                  {solutions.map((solution) => {
                    const isActive = pathname === `/solutions/${solution.slug}`;
                    return (
                      <Link
                        key={solution._id}
                        href={`/solutions/${solution.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30'
                            : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        {solution.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="p-6 border-t border-slate-200 dark:border-gray-800 space-y-3">
            {brochure && (
              <a
                href={brochure.fileUrl}
                download={brochure.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                onClick={async () => {
                  // Track the download
                  try {
                    await trackEvent({
                      eventType: 'brochure_download',
                      page: pathname,
                      metadata: {
                        fileName: brochure.fileName,
                        brochureTitle: brochure.title,
                        source: 'mobile-menu',
                      },
                    });
                  } catch (error) {
                    console.error('Failed to track brochure download:', error);
                  }
                  // Let the download continue normally
                }}
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </a>
            )}
            <a
              href="tel:+966123456789"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300 shadow-md shadow-blue-500/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Mail className="w-4 h-4" />
              <span>Get Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
