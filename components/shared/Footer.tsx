'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { trackEvent } from '@/lib/hooks/useAnalytics';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
  description?: string;
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

interface Solution {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactData, setContactData] = useState<ContactPageData | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await fetch('/api/contact-page');
        const data = await res.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
    
    const fetchSolutions = async () => {
      try {
        const res = await fetch('/api/solutions?published=true');
        const data = await res.json();
        setSolutions(data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      }
    };
    
    fetchContactData();
    fetchSolutions();
  }, []);



  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-800/50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo.png"
                    alt="WeCare Tech"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  WeCare Tech
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-500">Infrastructure Solutions</p>
              </div>
              </Link>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Delivering world-class infrastructure solutions across Saudi Arabia. 
                Specialized in Data Centers, Security Systems, and ICT Infrastructure 
                with 18+ years of expertise.
              </p>              {/* Contact Info */}
              <div className="space-y-3">
                {contactData?.contactInfo.map((item, index) => {
                  const IconComponent = item.icon === 'Phone' ? Phone : item.icon === 'Mail' ? Mail : item.icon === 'MapPin' ? MapPin : Clock;
                  const isLink = item.link && (item.icon === 'Phone' || item.icon === 'Mail');
                  
                  if (isLink) {
                    return (
                      <a 
                        key={index}
                        href={item.link} 
                        className="flex items-center gap-3 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500/30 transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{item.details.join(', ')}</span>
                      </a>
                    );
                  }
                  
                  return (
                    <div key={index} className="flex items-start gap-3 text-slate-600 dark:text-gray-400">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-sm">
                        {item.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-6">
                Solutions
              </h4>
              <ul className="space-y-3">
                {solutions.map((item) => (
                  <li key={item._id}>
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm group"
                      onClick={() => {
                        trackEvent({
                          eventType: 'footer_click',
                          page: window.location.pathname,
                          metadata: {
                            linkName: item.title,
                            linkHref: `/solutions/${item.slug}`,
                            section: 'Solutions',
                          },
                        });
                      }}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm group"
                      onClick={() => {
                        trackEvent({
                          eventType: 'footer_click',
                          page: window.location.pathname,
                          metadata: {
                            linkName: item.name,
                            linkHref: item.href,
                            section: 'Company',
                          },
                        });
                      }}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-200 dark:border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">Stay Updated</h4>
              <p className="text-slate-600 dark:text-gray-400 text-sm">
                Subscribe to our newsletter for latest updates and insights
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800/50 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500/50 transition-all"
              />
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-200 dark:border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-slate-500 dark:text-gray-500 text-sm text-center md:text-left">
              <p>© {currentYear} WeCare Tech. All rights reserved.</p>
              <p className="text-xs mt-1">
                Crafted with excellence in Saudi Arabia
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {contactData?.socialLinks?.linkedin && (
                <a
                  href={contactData.socialLinks.linkedin}
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {contactData?.socialLinks?.twitter && (
                <a
                  href={contactData.socialLinks.twitter}
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {contactData?.socialLinks?.facebook && (
                <a
                  href={contactData.socialLinks.facebook}
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {contactData?.socialLinks?.instagram && (
                <a
                  href={contactData.socialLinks.instagram}
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800/50 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;
