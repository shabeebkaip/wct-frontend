"use client";

import React, { useState, useEffect } from "react";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle,
  Building2, MessageSquare, Users, Linkedin, Twitter, Facebook,
  Instagram, ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Phone, Mail, MapPin, Clock, Users, CheckCircle, MessageSquare, Building2,
};

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string | null;
  description?: string;
}

interface Reason {
  icon: string;
  title: string;
  description: string;
}

interface ContactPageData {
  badge: string;
  title: string;
  description: string;
  contactInfo: ContactInfo[];
  reasons?: Reason[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const SERVICES = [
  { value: "data-center", label: "Data Center Solutions" },
  { value: "structured-cabling", label: "Structured Cabling" },
  { value: "security", label: "Security Systems" },
  { value: "audio-visual", label: "Audio-Visual Solutions" },
  { value: "low-current", label: "Low Current Systems" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", service: "", message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pageData, setPageData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact-page')
      .then(r => r.json())
      .then(setPageData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact-page' }),
      });
      if (res.ok) {
        setFormStatus("success");
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType: 'contact_form', page: '/contact', metadata: { service: formData.service, company: formData.company } }),
        }).catch(() => {});
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: pageData?.socialLinks?.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: pageData?.socialLinks?.twitter, label: "Twitter" },
    { icon: Facebook, href: pageData?.socialLinks?.facebook, label: "Facebook" },
    { icon: Instagram, href: pageData?.socialLinks?.instagram, label: "Instagram" },
  ].filter(s => s.href);

  if (loading || !pageData) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="w-6 h-6 border border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* ── DARK HERO ───────────────────────────────────────── */}
      <div className="bg-[#080C14] text-white relative min-h-screen flex flex-col justify-center">
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-blue-700/[0.07] blur-[140px] pointer-events-none" />

        <div className="relative w-full">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
            {/* Label row */}
            <div className="flex items-center gap-4 mb-10">
              <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.35em]">Get In Touch</span>
              <span className="flex-1 h-px bg-white/[0.06]" />
              <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest">Response within 24h</span>
            </div>

            {/* Headline */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="relative">
                <div className="absolute -left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent hidden lg:block" />
                <h1
                  className="font-black leading-[0.85] tracking-tighter"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
                >
                  Let&apos;s<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
                    Talk
                  </span>
                </h1>
              </div>
              <div className="lg:max-w-xs lg:pb-3">
                <p className="text-slate-500 text-sm leading-relaxed">{pageData.description}</p>
              </div>
            </div>

            {/* Quick contact strip */}
            <div className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
              <a href="tel:+966112063919" className="group flex items-center gap-4 px-0 sm:px-6 first:pl-0 py-4 sm:py-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="font-mono text-xs text-slate-300 group-hover:text-blue-400 transition-colors">+966 11 206 3919</p>
                </div>
              </a>
              <a href="mailto:wct@wecaretech.com" className="group flex items-center gap-4 px-0 sm:px-6 py-4 sm:py-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-mono text-xs text-slate-300 group-hover:text-blue-400 transition-colors">wct@wecaretech.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4 px-0 sm:px-6 py-4 sm:py-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">Location</p>
                  <p className="font-mono text-xs text-slate-300">Riyadh, Saudi Arabia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-blue-600/40 via-white/[0.06] to-transparent" />
        </div>
      </div>

      {/* ── WHITE FORM + INFO SECTION ────────────────────────── */}
      <div className="bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 xl:gap-24">

            {/* Form */}
            <div>
              <div className="mb-10">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-4">Send a Message</p>
                <h2 className="font-black tracking-tighter text-slate-900 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                  Describe your project
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your company"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 rounded-lg" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+966 XX XXX XXXX"
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Service Interested In *</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 rounded-lg appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
                    placeholder="Tell us about your project requirements..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none rounded-lg" />
                </div>

                <button type="submit" disabled={formStatus === "loading"}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-widest text-white transition-colors duration-200 rounded-lg">
                  {formStatus === "loading" ? (
                    <><div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" />Send Message<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" /></>
                  )}
                </button>

                {formStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span className="font-mono text-xs">Message sent successfully. We&apos;ll respond within 24 hours.</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="font-mono text-xs">Something went wrong. Please try again or call us directly.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Contact info + Map + Social */}
            <div className="space-y-10">

              {/* Contact info */}
              {pageData.contactInfo.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-6">Contact Details</p>
                  <div className="divide-y divide-slate-100">
                    {pageData.contactInfo.map((info, i) => {
                      const Icon = iconMap[info.icon] || Phone;
                      return (
                        <div key={i} className="flex items-start gap-4 py-5">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">{info.title}</p>
                            {info.details.map((d, j) => <p key={j} className="text-sm text-slate-700">{d}</p>)}
                            {info.description && <p className="font-mono text-[10px] text-slate-400 mt-1">{info.description}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Map */}
              <div>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-4">Our Location</p>
                <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: '240px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.814039427773!2d46.786617299999996!3d24.6908022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f069fba2e45b1%3A0x8539bb9b74ddaa47!2sWe%20Care%20Technology!5e1!3m2!1sen!2sin!4v1761551742118!5m2!1sen!2sin"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="WeCare Technology Office Location"
                  />
                </div>
              </div>

              {/* Social */}
              {socialLinks.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-4">Follow Us</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                        <s.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHT CREAM: WHY US ──────────────────────────────── */}
      {pageData.reasons && pageData.reasons.length > 0 && (
        <div className="bg-[#F4F3EF] text-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.3em] mb-3">Why Work With Us</p>
                <h2 className="font-black tracking-tighter text-slate-900 leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  The WCT Difference
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.reasons.map((reason, i) => {
                const Icon = iconMap[reason.icon] || Users;
                return (
                  <div key={i} className="group p-8 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-300 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-black tracking-tight text-slate-900 text-lg mb-2">{reason.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── DARK FOOTER CTA ─────────────────────────────────── */}
      <div className="bg-[#080C14] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-3">Need Immediate Help?</p>
              <h2 className="font-black tracking-tighter text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                Call us directly
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+966112063919"
                className="inline-flex items-center gap-3 font-mono text-xs text-white uppercase tracking-widest border border-white/10 hover:border-blue-500/50 px-6 py-3.5 transition-colors duration-200">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                +966 11 206 3919
              </a>
              <a href="mailto:wct@wecaretech.com"
                className="inline-flex items-center gap-3 font-mono text-xs text-slate-400 hover:text-white uppercase tracking-widest border border-white/[0.06] hover:border-white/20 px-6 py-3.5 transition-colors duration-200">
                <Mail className="w-3.5 h-3.5" />
                wct@wecaretech.com
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
