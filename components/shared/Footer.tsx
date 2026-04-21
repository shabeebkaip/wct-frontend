'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail, Phone, MapPin, ArrowRight,
  Linkedin, Twitter, Facebook, Instagram,
  Server, Cable, Network, Activity, Wifi,
  Camera, Monitor, Sparkles, Shield,
} from 'lucide-react';
import { trackEvent } from '@/lib/hooks/useAnalytics';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
}

interface ContactPageData {
  contactInfo: ContactInfo[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const SERVICES = [
  { name: 'Data Center Solutions', href: '/services/data-center', icon: Server },
  { name: 'Structured Cabling',    href: '/services/structured-cabling', icon: Cable },
  { name: 'Fiber Optic Networks',  href: '/services/fiber-optic', icon: Network },
  { name: 'Network Infrastructure',href: '/services/network', icon: Activity },
  { name: 'Wi-Fi Design & Survey', href: '/services/wifi', icon: Wifi },
  { name: 'Security Systems',      href: '/services/security', icon: Camera },
  { name: 'AV & Low Current',      href: '/services/av-low-current', icon: Monitor },
  { name: 'AI Solutions',          href: '/services/ai-solutions', icon: Sparkles },
  { name: 'Cable Certification',   href: '/products', icon: Shield },
];

const COMPANY = [
  { name: 'About Us',      href: '/about' },
  { name: 'Our Projects',  href: '/projects' },
  { name: 'Services',      href: '/services' },
  { name: 'Products',      href: '/products' },
  { name: 'Contact Us',    href: '/contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactData, setContactData] = useState<ContactPageData | null>(null);

  useEffect(() => {
    fetch('/api/contact-page')
      .then(r => r.json())
      .then(setContactData)
      .catch(() => {});
  }, []);

  const getContactIcon = (icon: string) => {
    if (icon === 'Phone') return Phone;
    if (icon === 'Mail') return Mail;
    return MapPin;
  };

  return (
    <footer className="relative bg-white border-t border-slate-100 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── CTA Banner ── */}
      <div className="relative border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-2">
                Ready to start a project?
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Let's build something
                <span className="text-blue-600"> that lasts.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-600/30"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="WeCare Tech" fill className="object-contain" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-lg tracking-tight group-hover:text-blue-600 transition-colors">WeCare Tech</p>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">Infrastructure Solutions</p>
              </div>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-xs">
              Delivering high-performance infrastructure across Saudi Arabia — data centres, structured cabling, security, AV, and AI solutions with 18+ years of expertise.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              {contactData?.contactInfo.map((item, i) => {
                const Icon = getContactIcon(item.icon);
                const isLink = item.link && (item.icon === 'Phone' || item.icon === 'Mail');
                const content = (
                  <div className="flex items-center gap-3 group/c">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover/c:border-blue-300 group-hover/c:bg-blue-50 transition-all duration-200">
                      <Icon className="w-3.5 h-3.5 text-slate-500 group-hover/c:text-blue-600 transition-colors" />
                    </div>
                    <span className="text-slate-500 text-sm group-hover/c:text-slate-800 transition-colors">{item.details[0]}</span>
                  </div>
                );
                return isLink ? (
                  <a key={i} href={item.link}>{content}</a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Services column */}
          <div className="lg:col-span-5">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {SERVICES.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 text-slate-500 hover:text-blue-600 transition-colors duration-200 group/s"
                    onClick={() => trackEvent({ eventType: 'footer_click', page: window.location.pathname, metadata: { linkName: item.name, linkHref: item.href, section: 'Services' } })}
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-300 group-hover/s:text-blue-500 transition-colors shrink-0" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Company column */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors duration-200 text-sm group/c2"
                    onClick={() => trackEvent({ eventType: 'footer_click', page: window.location.pathname, metadata: { linkName: item.name, linkHref: item.href, section: 'Company' } })}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/c2:opacity-100 group-hover/c2:translate-x-0 transition-all duration-200 text-blue-500 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-xs">
              © {currentYear} WeCare Technology. All rights reserved. · Saudi Arabia
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { key: 'linkedin', Icon: Linkedin, href: contactData?.socialLinks?.linkedin },
                { key: 'twitter',  Icon: Twitter,  href: contactData?.socialLinks?.twitter },
                { key: 'facebook', Icon: Facebook, href: contactData?.socialLinks?.facebook },
                { key: 'instagram',Icon: Instagram,href: contactData?.socialLinks?.instagram },
              ].filter(s => s.href).map(({ key, Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  aria-label={key}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-11 h-11 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-4 h-4 -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;
