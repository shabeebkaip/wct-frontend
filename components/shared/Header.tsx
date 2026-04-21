'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronDown, Phone, Mail, Download, ArrowRight,
  Server, Cable, Network, Camera, Monitor,
  Wifi, Activity, Shield, Sparkles,
} from 'lucide-react';
import { trackEvent } from '@/lib/hooks/useAnalytics';

interface Brochure {
  _id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  active: boolean;
}

const SERVICES = [
  {
    icon: Server,
    title: 'Data Center Solutions',
    description: 'Turnkey server rooms — power, cooling, cabling, racks & commissioning',
    href: '/services/data-center',
  },
  {
    icon: Cable,
    title: 'Structured Cabling',
    description: 'Cat 5e, Cat 6 & Cat 6A copper networks built to TIA & ISO standards',
    href: '/services/structured-cabling',
  },
  {
    icon: Network,
    title: 'Fiber Optic Networks',
    description: 'Singlemode & multimode fiber — installation, splicing & OTDR certification',
    href: '/services/fiber-optic',
  },
  {
    icon: Activity,
    title: 'Network Infrastructure',
    description: 'Switches, routers, firewalls and enterprise LAN design & deployment',
    href: '/services/network',
  },
  {
    icon: Wifi,
    title: 'Wi-Fi Design & Survey',
    description: 'Enterprise wireless with Ekahau Sidekick 2 site surveys & heatmaps',
    href: '/services/wifi',
  },
  {
    icon: Camera,
    title: 'Security Systems',
    description: 'CCTV surveillance, IP cameras, access control & biometric entry',
    href: '/services/security',
  },
  {
    icon: Monitor,
    title: 'AV & Low Current',
    description: 'Audio visual, digital signage, PA systems, intercom & building automation',
    href: '/services/av-low-current',
  },
  {
    icon: Sparkles,
    title: 'AI Solutions',
    description: 'Intelligent video analytics, AI network management & business automation',
    href: '/services/ai-solutions',
  },
  {
    icon: Shield,
    title: 'Cable Certification',
    description: 'DSX-5000 copper, OptiFiber Pro OTDR & Ekahau Wi-Fi certification',
    href: '/products',
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [menuTop, setMenuTop] = useState(88);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track header bottom to position fixed mega menu
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setMenuTop(headerRef.current.getBoundingClientRect().bottom + 8);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [scrolled]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 100);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const darkHeroPages = ['/', '/about', '/projects', '/contact', '/products', '/services', '/services/data-center', '/services/structured-cabling', '/services/fiber-optic', '/services/network', '/services/wifi', '/services/security', '/services/av-low-current', '/services/ai-solutions'];
  const isHeroMode = darkHeroPages.includes(pathname) && !scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4 md:py-5'}`}
      >
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
                  className={`object-contain transform group-hover:scale-110 transition-all duration-300 ${isHeroMode ? 'brightness-0 invert' : ''}`}
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
                          ? isHeroMode ? 'text-white bg-white/12' : 'text-blue-600 bg-blue-50'
                          : isHeroMode ? 'text-white/75 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isHeroMode ? 'bg-blue-400' : 'bg-blue-600'}`} />
                      )}
                    </Link>
                  );
                })}

                {/* ── Services trigger + mega menu in ONE hover zone ── */}
                {/*
                  KEY: Both the button and the mega menu panel are DOM children
                  of this single wrapper div. `mouseleave` fires only when the
                  mouse exits the wrapper AND all its descendants — so moving
                  from the button to the fixed panel (any gap) never closes it.
                */}
                <div
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname?.startsWith('/solutions')
                        ? isHeroMode ? 'text-white bg-white/12' : 'text-blue-600 bg-blue-50'
                        : isHeroMode ? 'text-white/75 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Services
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega menu — fixed position so it breaks out of nav pill,
                      but still a DOM child so mouseleave works correctly */}
                  <div
                    className={`fixed left-4 right-4 transition-all duration-300 ease-out ${
                      servicesOpen
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                    style={{ top: menuTop }}
                  >
                    <div className={`rounded-2xl border overflow-hidden shadow-2xl ${
                      isHeroMode
                        ? 'bg-[#080C14]/96 backdrop-blur-xl border-white/10 shadow-black/60'
                        : 'bg-white/96 backdrop-blur-xl border-slate-200 shadow-slate-900/12'
                    }`}>
                      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                      <div className="p-6 lg:p-8">
                        <div className="grid lg:grid-cols-4 gap-8">

                          {/* Services grid */}
                          <div className="lg:col-span-3">
                            <p
                              className={`text-[10px] font-medium uppercase tracking-[0.35em] mb-5 ${isHeroMode ? 'text-blue-400' : 'text-blue-600'}`}
                              style={{ fontFamily: 'monospace' }}
                            >
                              Our Services
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                              {SERVICES.map((service) => {
                                const Icon = service.icon;
                                const isActive = pathname === service.href;
                                return (
                                  <Link
                                    key={service.title}
                                    href={service.href}
                                    onClick={() => setServicesOpen(false)}
                                    className={`group flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                                      isHeroMode
                                        ? `border-white/[0.06] hover:border-blue-500/40 hover:bg-white/[0.04] ${isActive ? 'border-blue-500/40 bg-white/[0.04]' : ''}`
                                        : `hover:border-blue-200 hover:bg-blue-50/60 ${isActive ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-slate-50/60'}`
                                    }`}
                                  >
                                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                      isHeroMode
                                        ? 'bg-blue-500/15 group-hover:bg-blue-500/30'
                                        : 'bg-blue-100 group-hover:bg-blue-600'
                                    }`}>
                                      <Icon className={`w-4 h-4 transition-colors duration-200 ${
                                        isHeroMode ? 'text-blue-400' : 'text-blue-600 group-hover:text-white'
                                      }`} />
                                    </div>
                                    <div className="min-w-0">
                                      <p className={`text-sm font-semibold leading-tight mb-0.5 transition-colors duration-200 ${
                                        isHeroMode ? 'text-white/90 group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-700'
                                      }`}>
                                        {service.title}
                                      </p>
                                      <p className="text-xs leading-relaxed text-slate-500">
                                        {service.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right panel */}
                          <div className="lg:col-span-1 flex flex-col gap-3">
                            <div className={`flex-1 rounded-xl border p-5 flex flex-col ${
                              isHeroMode
                                ? 'bg-blue-600/10 border-blue-500/25'
                                : 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-700'
                            }`}>
                              <span
                                className={`text-[9px] font-medium uppercase tracking-[0.3em] mb-3 ${isHeroMode ? 'text-blue-400' : 'text-blue-200'}`}
                                style={{ fontFamily: 'monospace' }}
                              >
                                Certified Expertise
                              </span>
                              <p className="font-black tracking-tight text-white text-base leading-tight mb-2">
                                Industry-Leading Test Instruments
                              </p>
                              <p className={`text-xs leading-relaxed mb-5 ${isHeroMode ? 'text-slate-400' : 'text-blue-100'}`}>
                                Every installation certified using the Fluke DSX-5000, OptiFiber Pro OTDR &amp; Ekahau Sidekick 2.
                              </p>
                              <Link
                                href="/products"
                                onClick={() => setServicesOpen(false)}
                                className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/pl ${
                                  isHeroMode ? 'text-blue-400 hover:text-blue-300' : 'text-white hover:text-blue-100'
                                }`}
                              >
                                View Products
                                <ArrowRight className="w-3.5 h-3.5 group-hover/pl:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            <Link
                              href="/contact"
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center justify-between px-5 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 group/cta hover:shadow-lg hover:shadow-blue-500/30"
                            >
                              <div>
                                <p className="text-white font-semibold text-sm">Get a Free Quote</p>
                                <p className="text-blue-200 text-xs mt-0.5">Response within 24 hrs</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-white group-hover/cta:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>

                        </div>
                      </div>
                    </div>
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
                      isHeroMode ? 'text-white/75 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
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
                    isHeroMode ? 'text-white/75 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
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
                  isHeroMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white backdrop-blur-xl border-l border-slate-200 z-40 lg:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="WCT Solutions" fill className="object-contain" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 border border-blue-200'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4">
                <p className="px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Services
                </p>
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  const isActive = pathname === service.href;
                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50 border border-blue-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-slate-200 space-y-3">
            {brochure && (
              <a
                href={brochure.fileUrl}
                download={brochure.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-300"
                onClick={async () => {
                  try {
                    await trackEvent({
                      eventType: 'brochure_download',
                      page: pathname,
                      metadata: { fileName: brochure.fileName, brochureTitle: brochure.title, source: 'mobile-menu' },
                    });
                  } catch (error) {
                    console.error('Failed to track brochure download:', error);
                  }
                }}
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </a>
            )}
            <a
              href="tel:+966123456789"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-50 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300"
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
