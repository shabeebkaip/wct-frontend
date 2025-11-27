"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  MessageSquare,
  Users,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  MessageSquare,
  Building2,
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [pageData, setPageData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactPageData();
  }, []);

  const fetchContactPageData = async () => {
    try {
      const res = await fetch('/api/contact-page');
      const data = await res.json();
      setPageData(data);
    } catch (error) {
      console.error('Error fetching contact page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page',
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const socialLinksArray = [
    { icon: Linkedin, link: pageData?.socialLinks?.linkedin || "", label: "LinkedIn" },
    { icon: Twitter, link: pageData?.socialLinks?.twitter || "", label: "Twitter" },
    { icon: Facebook, link: pageData?.socialLinks?.facebook || "", label: "Facebook" },
    { icon: Instagram, link: pageData?.socialLinks?.instagram || "", label: "Instagram" },
  ].filter(social => social.link);

  if (loading || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-900 dark:text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/30 via-slate-50 to-white dark:from-blue-900/20 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 mb-6">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                {pageData.badge}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-gray-100 dark:via-blue-100 dark:to-gray-100 bg-clip-text text-transparent">
              {pageData.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {pageData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {pageData.contactInfo.map((info, index) => {
              const IconComponent = iconMap[info.icon] || Phone;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-sm"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-600 dark:text-gray-400 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.description && (
                      <p className="text-xs text-slate-500 dark:text-gray-500">{info.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Info */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="+966 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                      >
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="data-center">
                          Data Center Solutions
                        </option>
                        <option value="structured-cabling">
                          Structured Cabling
                        </option>
                        <option value="security">Security Systems</option>
                        <option value="audio-visual">
                          Audio-Visual Solutions
                        </option>
                        <option value="low-current">Low Current Systems</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {formStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span className="text-sm">
                        Thank you! Your message has been sent successfully.
                      </span>
                    </div>
                  )}
                  {formStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span className="text-sm">
                        Oops! Something went wrong. Please try again.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Side - Info & Map */}
            <div className="space-y-8">
              {/* Why Contact Us */}
              {pageData.reasons && pageData.reasons.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-6">
                    Why Contact Us?
                  </h3>
                  <div className="space-y-4">
                    {pageData.reasons.map((reason, index) => {
                      const IconComponent = iconMap[reason.icon] || Users;
                      return (
                        <div
                          key={index}
                          className="group flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg dark:shadow-none"
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-gray-100 mb-2">
                              {reason.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-gray-400">
                              {reason.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-800/50 shadow-lg dark:shadow-none">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.814039427773!2d46.786617299999996!3d24.6908022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f069fba2e45b1%3A0x8539bb9b74ddaa47!2sWe%20Care%20Technology!5e1!3m2!1sen!2sin!4v1761551742118!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WeCare Technology Office Location"
                />
              </div>

              {/* Social Links */}
              {socialLinksArray.length > 0 && (
                <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-slate-200 dark:border-gray-800/50 shadow-lg dark:shadow-none">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-6">
                    Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    {socialLinksArray.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/50 hover:scale-110 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-100/80 via-blue-50/50 to-transparent dark:from-blue-600/10 dark:via-blue-500/5 dark:to-transparent backdrop-blur-sm border border-blue-300 dark:border-blue-500/30 overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-500/20 dark:via-transparent dark:to-transparent" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-gray-100 mb-4">
                Need Immediate Assistance?
              </h2>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                For urgent matters or technical support, call us directly. Our
                team is available during business hours to assist you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:+966112063919"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
                <a
                  href="mailto:wct@wecaretech.com"
                  className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
