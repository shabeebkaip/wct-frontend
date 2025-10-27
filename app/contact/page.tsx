"use client";

import React, { useState } from "react";
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

    // Simulate API call
    setTimeout(() => {
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
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+966 11 206 3919"],
      link: "tel:+966112063919",
      description: "Available all time",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["wct@wecaretech.com"],
      link: "mailto:wct@wecaretech.com",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["4310 Jarir, 7476", "Riyadh 12837, Saudi Arabia"],
      link: "https://maps.google.com",
      description: "Visit us at our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Thursday: 8:00 AM - 5:00 PM",
        "Friday: 8:00 AM - 12:00 PM",
      ],
      link: null,
      description: "Weekend: Saturday & Sunday closed",
    },
  ];

  const reasons = [
    {
      icon: Users,
      title: "Expert Team",
      description: "50+ certified engineers ready to assist you",
    },
    {
      icon: CheckCircle,
      title: "Quick Response",
      description: "Get replies within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Detailed Consultation",
      description: "Free technical consultation for your project",
    },
    {
      icon: Building2,
      title: "Site Visit",
      description: "On-site assessment available in Riyadh",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, link: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, link: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, link: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, link: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                Get in Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-gray-100 via-blue-100 to-gray-100 bg-clip-text text-transparent">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? Our team of experts is ready to help you
              transform your IT infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </div>
              </div>
            ))}
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
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
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="+966 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                      className="block text-sm font-medium text-gray-300 mb-2"
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
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
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">
                  Why Contact Us?
                </h3>
                <div className="space-y-4">
                  {reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-6 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <reason.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-100 mb-2">
                          {reason.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800/50">
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
              <div className="p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50">
                <h3 className="text-xl font-bold text-gray-100 mb-6">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/50 hover:scale-110 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-blue-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-2xl bg-linear-to-br from-blue-600/10 via-blue-500/5 to-transparent backdrop-blur-sm border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
                Need Immediate Assistance?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
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
                  className="px-8 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium border border-gray-700 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2"
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
