'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { name: 'Contact', href: '/contact' },
  ];

  const solutions = [
    { name: 'Data Center Solutions', href: '/solutions/data-center' },
    { name: 'CCTV Surveillance', href: '/solutions/cctv' },
    { name: 'Low Current Systems', href: '/solutions/low-current' },
    { name: 'Structured Cabling', href: '/solutions/structured-cabling' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4 md:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl border transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-slate-200 dark:border-gray-800/80 shadow-lg shadow-slate-900/10 dark:shadow-black/50' 
              : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg border-slate-200/70 dark:border-gray-800/50 shadow-md shadow-slate-900/5 dark:shadow-black/30'
          }`}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group relative z-10">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                  <Image
                    src="/logo.png"
                    alt="WCT Solutions"
                    fill
                    className="object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    WeCare Tech
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-gray-400">Infrastructure Solutions</p>
                </div>
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
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                          : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
                
                {/* Solutions Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname?.startsWith('/solutions') 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' 
                        : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                    }`}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    Solutions
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-gray-800/80 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden transition-all duration-300 ${
                      solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                  >
                    {solutions.map((solution) => {
                      const isActive = pathname === solution.href;
                      return (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className={`block px-4 py-3 text-sm transition-all duration-200 ${
                            isActive
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-l-2 border-blue-600 dark:border-blue-500'
                              : 'text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-l-2 hover:border-blue-500'
                          }`}
                        >
                          {solution.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <a
                  href="/GFS PROFILE.pptx"
                  download="WeCare-Tech-Company-Profile.pptx"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                  title="Download Company Brochure"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Brochure</span>
                </a>
                <a
                  href="tel:+966123456789"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get Quote</span>
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
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
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">WeCare Tech</h2>
                <p className="text-xs text-slate-600 dark:text-gray-400">Infrastructure Solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
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
                    const isActive = pathname === solution.href;
                    return (
                      <Link
                        key={solution.name}
                        href={solution.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30'
                            : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        {solution.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="p-6 border-t border-slate-200 dark:border-gray-800 space-y-3">
            <a
              href="/GFS PROFILE.pptx"
              download="WeCare-Tech-Company-Profile.pptx"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Brochure</span>
            </a>
            <a
              href="tel:+966123456789"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300 shadow-md shadow-blue-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>Get Quote</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
