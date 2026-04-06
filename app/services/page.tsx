'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Globe, ArrowUpRight } from 'lucide-react';

type Lang = 'en' | 'ar';

interface ServiceData {
  variant: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuresEn: string[];
  featuresAr: string[];
  tech: string[];
  image: string;
}

const SERVICES: ServiceData[] = [
  {
    variant: 'odoo',
    titleEn: 'Odoo ERP Solutions',
    titleAr: 'حلول Odoo ERP',
    descriptionEn:
      'Stop juggling disconnected tools. We implement and customize Odoo to unify your entire business — accounting, inventory, CRM, HR, and manufacturing — on a single platform your team will actually love using.',
    descriptionAr:
      'توقف عن تشتيت عملك بين أدوات منفصلة. ننفذ ونخصص أودو لربط أعمالك بالكامل — المحاسبة والمخازن وإدارة العملاء والموارد البشرية والتصنيع — على منصة واحدة يحبها فريقك.',
    featuresEn: [
      'Odoo Implementation & Setup',
      'Custom Module Development',
      'Accounting & Finance',
      'CRM & Sales Pipeline',
      'Inventory & Warehouse',
      'Manufacturing & MRP',
      'HR & Payroll',
      'Migration & Integration',
    ],
    featuresAr: [
      'تطبيق وإعداد أودو',
      'تطوير وحدات مخصصة',
      'المحاسبة والمالية',
      'إدارة العملاء والمبيعات',
      'المخازن والمستودعات',
      'التصنيع وتخطيط الموارد',
      'الموارد البشرية والرواتب',
      'الهجرة والتكامل',
    ],
    tech: ['Odoo', 'Python', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop',
  },
  {
    variant: 'ai',
    titleEn: 'AI & Automation Solutions',
    titleAr: 'حلول الذكاء الاصطناعي والأتمتة',
    descriptionEn:
      'Stop losing hours to tasks a machine can do better. We embed AI into the core of your operations — intelligent document processing, predictive analytics, AI-powered chatbots, and workflow automation that learns and improves over time.',
    descriptionAr:
      'توقف عن إهدار الوقت في مهام يمكن للآلة أن تؤديها بشكل أفضل. ندمج الذكاء الاصطناعي في صميم عملياتك — معالجة ذكية للمستندات، تحليلات تنبؤية، روبوتات دردشة مدعومة بالذكاء الاصطناعي، وأتمتة سير العمل التي تتعلم وتتحسن مع الوقت.',
    featuresEn: [
      'Custom AI Model Development',
      'LLM Integration (GPT / Claude / Gemini)',
      'Intelligent Document Processing',
      'AI-Powered Chatbots & Assistants',
      'Predictive Analytics & Forecasting',
      'Computer Vision Solutions',
      'Workflow & Process Automation',
      'AI Audit & Strategy Consulting',
    ],
    featuresAr: [
      'تطوير نماذج ذكاء اصطناعي مخصصة',
      'تكامل نماذج اللغة الكبيرة (GPT / Claude / Gemini)',
      'معالجة المستندات بالذكاء الاصطناعي',
      'روبوتات الدردشة والمساعدين الأذكياء',
      'التحليلات التنبؤية والتوقعات',
      'حلول رؤية الحاسوب',
      'أتمتة سير العمل والعمليات',
      'استشارات استراتيجية الذكاء الاصطناعي',
    ],
    tech: ['OpenAI', 'Python', 'TensorFlow', 'FastAPI', 'Docker'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80&fit=crop',
  },
  {
    variant: 'web',
    titleEn: 'Web Application Development',
    titleAr: 'تطوير تطبيقات الويب',
    descriptionEn:
      'We architect and build high-performance web applications that scale with your business. From customer-facing platforms to complex internal dashboards — built with the best modern stack and engineered to last.',
    descriptionAr:
      'نصمم وننبي تطبيقات ويب عالية الأداء تتوسع مع أعمالك. من المنصات الموجهة للعملاء إلى لوحات التحكم الداخلية المعقدة — مبنية بأحدث التقنيات ومهندسة لتدوم.',
    featuresEn: [
      'Next.js & React Apps',
      'SaaS Platform Development',
      'E-commerce & Marketplaces',
      'Admin Dashboards & Portals',
      'REST & GraphQL APIs',
      'Performance Optimization',
      'SEO-Ready Architecture',
      'Cloud Deployment (AWS / GCP)',
    ],
    featuresAr: [
      'تطبيقات Next.js و React',
      'تطوير منصات SaaS',
      'التجارة الإلكترونية والأسواق',
      'لوحات التحكم والبوابات',
      'واجهات REST و GraphQL',
      'تحسين الأداء',
      'بنية صديقة للسيو',
      'النشر السحابي (AWS / GCP)',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&fit=crop',
  },
  {
    variant: 'mobile',
    titleEn: 'Mobile App Development',
    titleAr: 'تطوير تطبيقات الجوال',
    descriptionEn:
      'We build polished, fast, and feature-rich mobile apps for iOS and Android. Whether you need cross-platform efficiency or native performance, we deliver apps your users will keep coming back to.',
    descriptionAr:
      'نبني تطبيقات جوال مصقولة وسريعة وغنية بالميزات لنظامَي iOS و Android. سواء احتجت كفاءة متعددة المنصات أو أداءً أصليًا، نسلم تطبيقات يعود إليها مستخدموك.',
    featuresEn: [
      'Flutter Cross-Platform Apps',
      'React Native Development',
      'iOS (Swift) & Android (Kotlin)',
      'Offline-First Architecture',
      'Push Notifications & Analytics',
      'App Store & Play Store Publishing',
      'In-App Purchases & Subscriptions',
      'API Integration & Real-time Sync',
    ],
    featuresAr: [
      'تطبيقات Flutter متعددة المنصات',
      'تطوير React Native',
      'iOS (Swift) و Android (Kotlin)',
      'بنية تعمل بدون إنترنت',
      'إشعارات فورية وتحليلات',
      'النشر على App Store و Play Store',
      'مشتريات واشتراكات داخل التطبيق',
      'تكامل API ومزامنة فورية',
    ],
    tech: ['Flutter', 'React Native', 'Swift', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&fit=crop',
  },
  {
    variant: 'uiux',
    titleEn: 'UI/UX Design',
    titleAr: 'تصميم الواجهة وتجربة المستخدم',
    descriptionEn:
      "Great products are defined by how they feel, not just how they look. We research your users, prototype rapidly, and craft interfaces that convert — backed by data and refined through testing.",
    descriptionAr:
      'المنتجات العظيمة تُعرَّف بما تُشعِر به لا بمظهرها فحسب. نبحث مستخدميك، ونبني نماذج أولية بسرعة، ونصمم واجهات تحوّل الزوار — مدعومة بالبيانات ومصقولة بالاختبار.',
    featuresEn: [
      'User Research & Personas',
      'Wireframing & Information Architecture',
      'High-Fidelity Prototyping',
      'Design Systems & Component Libraries',
      'Usability Testing',
      'Brand Identity & Visual Design',
      'Motion Design & Micro-interactions',
      'Figma Handoff & Dev Collaboration',
    ],
    featuresAr: [
      'بحث المستخدمين والشخصيات',
      'الهياكل السلكية ومعمارية المعلومات',
      'نماذج أولية عالية الدقة',
      'أنظمة التصميم ومكتبات المكونات',
      'اختبار قابلية الاستخدام',
      'هوية العلامة والتصميم البصري',
      'تصميم الحركة والتفاعلات الدقيقة',
      'تسليم Figma والتعاون مع المطورين',
    ],
    tech: ['Figma', 'Framer', 'Adobe XD'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80&fit=crop',
  },
  {
    variant: 'marketing',
    titleEn: 'Digital Marketing',
    titleAr: 'التسويق الرقمي',
    descriptionEn:
      "We don't chase vanity metrics. We build data-driven marketing engines — SEO, paid ads, and content — that drive qualified traffic, generate real leads, and grow your revenue predictably.",
    descriptionAr:
      'لا نلاحق مقاييس الغرور. نبني محركات تسويق مدفوعة بالبيانات — SEO وإعلانات مدفوعة ومحتوى — تجلب زيارات مؤهلة وتولّد عملاء محتملين حقيقيين وتنمّي إيراداتك بشكل منتظم.',
    featuresEn: [
      'Technical SEO & Content Strategy',
      'Google Ads & Meta Campaigns',
      'LinkedIn B2B Marketing',
      'Conversion Rate Optimization (CRO)',
      'Social Media Management',
      'Email Marketing Automation',
      'Analytics & Performance Reporting',
      'Competitor & Market Analysis',
    ],
    featuresAr: [
      'السيو التقني واستراتيجية المحتوى',
      'حملات Google و Meta الإعلانية',
      'التسويق عبر LinkedIn للشركات',
      'تحسين معدل التحويل (CRO)',
      'إدارة وسائل التواصل الاجتماعي',
      'أتمتة التسويق عبر البريد الإلكتروني',
      'التحليلات وتقارير الأداء',
      'تحليل المنافسين والسوق',
    ],
    tech: ['Google Ads', 'Meta', 'LinkedIn', 'Google Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop',
  },
];

// Per-service accent colors
const ACCENTS = [
  { border: 'border-purple-500/20', text: 'text-purple-400', bg: 'bg-purple-500/10', check: 'text-purple-400', num: 'text-purple-500/30' },
  { border: 'border-blue-500/20',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   check: 'text-blue-400',   num: 'text-blue-500/30'   },
  { border: 'border-cyan-500/20',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   check: 'text-cyan-400',   num: 'text-cyan-500/30'   },
  { border: 'border-green-500/20',  text: 'text-green-400',  bg: 'bg-green-500/10',  check: 'text-green-400',  num: 'text-green-500/30'  },
  { border: 'border-pink-500/20',   text: 'text-pink-400',   bg: 'bg-pink-500/10',   check: 'text-pink-400',   num: 'text-pink-500/30'   },
  { border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/10', check: 'text-orange-400', num: 'text-orange-500/30' },
];

// Tech badge colors
const TECH_STYLE: Record<string, string> = {
  Odoo:             'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Python:           'bg-blue-500/10 text-blue-300 border-blue-500/20',
  PostgreSQL:       'bg-sky-500/10 text-sky-300 border-sky-500/20',
  Docker:           'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  OpenAI:           'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  TensorFlow:       'bg-orange-500/10 text-orange-300 border-orange-500/20',
  FastAPI:          'bg-teal-500/10 text-teal-300 border-teal-500/20',
  React:            'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'Next.js':        'bg-slate-500/10 text-slate-300 border-slate-500/20',
  'Node.js':        'bg-green-500/10 text-green-300 border-green-500/20',
  TypeScript:       'bg-blue-500/10 text-blue-300 border-blue-500/20',
  Tailwind:         'bg-sky-500/10 text-sky-300 border-sky-500/20',
  Flutter:          'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'React Native':   'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  Swift:            'bg-orange-500/10 text-orange-300 border-orange-500/20',
  Firebase:         'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  Figma:            'bg-purple-500/10 text-purple-300 border-purple-500/20',
  Framer:           'bg-pink-500/10 text-pink-300 border-pink-500/20',
  'Adobe XD':       'bg-pink-500/10 text-pink-300 border-pink-500/20',
  'Google Ads':     'bg-red-500/10 text-red-300 border-red-500/20',
  Meta:             'bg-blue-500/10 text-blue-300 border-blue-500/20',
  LinkedIn:         'bg-sky-500/10 text-sky-300 border-sky-500/20',
  'Google Analytics': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
};

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>('en');
  const isAr = lang === 'ar';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#080C14] text-white"
    >
      {/* Fixed grid background */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Blue ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-700/[0.07] blur-[160px] -z-10 pointer-events-none" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">

        {/* Ghost text backdrop */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none tracking-tighter text-white/[0.022]"
          style={{ fontSize: 'clamp(12rem, 28vw, 26rem)' }}
        >
          {isAr ? 'خدمات' : 'SVC'}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-16">

          {/* Label row */}
          <div className={`flex items-center gap-4 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.35em]">
              {isAr ? 'ما نقدمه' : 'What We Offer'}
            </span>
            <span className="flex-1 h-px bg-white/[0.06]" />
            {/* Language toggle */}
            <button
              onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-200 font-mono text-[10px] uppercase tracking-widest"
            >
              <Globe className="w-3 h-3" />
              {isAr ? 'English' : 'عربي'}
            </button>
          </div>

          {/* Headline */}
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
            <div className="relative">
              <div className={`absolute ${isAr ? '-right-6' : '-left-6'} top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent hidden lg:block`} />
              <h1
                className="font-black leading-[0.88] tracking-tighter text-white"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
              >
                {isAr ? (
                  <>ما نبنيه<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">لك</span></>
                ) : (
                  <>What We<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">Build</span></>
                )}
              </h1>
            </div>

            <div className={`lg:max-w-xs lg:pb-3 space-y-5 ${isAr ? 'text-right' : ''}`}>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isAr
                  ? 'ستة تخصصات. فريق واحد. نتائج قابلة للقياس.'
                  : 'Six specializations. One team. Measurable outcomes.'}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-[10px] text-blue-500 hover:text-white uppercase tracking-widest transition-colors duration-200"
              >
                {isAr ? 'ابدأ مشروعك' : 'Start a project'}
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.06]">
              {[
                { value: '6',    labelEn: 'Service Areas',      labelAr: 'مجال خدمة' },
                { value: '50+',  labelEn: 'Projects Delivered',  labelAr: 'مشروع منجز' },
                { value: '8+',   labelEn: 'Years of Expertise',  labelAr: 'سنوات خبرة' },
                { value: '24/7', labelEn: 'Support Available',   labelAr: 'دعم متاح' },
              ].map((s) => (
                <div key={s.labelEn} className={`px-6 first:pl-0 last:pr-0 py-2 ${isAr ? 'text-right' : ''}`}>
                  <div
                    className="font-black tracking-tighter text-white leading-none mb-1"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    {s.value}
                  </div>
                  <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                    {isAr ? s.labelAr : s.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-blue-600/40 via-white/[0.06] to-transparent" />
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SERVICES.map((service, idx) => {
              const accent = ACCENTS[idx];
              const title = isAr ? service.titleAr : service.titleEn;
              const desc  = isAr ? service.descriptionAr : service.descriptionEn;
              const features = isAr ? service.featuresAr : service.featuresEn;

              return (
                <div
                  key={service.variant}
                  className={`group relative flex flex-col rounded-xl border bg-white/[0.02] hover:bg-white/[0.035] transition-colors duration-300 overflow-hidden ${accent.border}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080C14]/40 to-[#080C14]" />

                    {/* Service number — bottom of image */}
                    <div className={`absolute bottom-4 ${isAr ? 'right-5' : 'left-5'} flex items-end gap-3`}>
                      <span
                        className={`font-black tabular-nums leading-none ${accent.num}`}
                        style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Variant pill */}
                    <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'}`}>
                      <span className={`font-mono text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border ${accent.bg} ${accent.text} ${accent.border}`}>
                        {service.variant}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col flex-1 p-6 gap-5 ${isAr ? 'text-right' : ''}`}>

                    {/* Title */}
                    <h2 className="font-black text-white leading-tight tracking-tight" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)' }}>
                      {title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {desc}
                    </p>

                    {/* Divider */}
                    <div className={`h-px bg-white/[0.06]`} />

                    {/* Features grid */}
                    <div>
                      <p className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.3em] mb-3">
                        {isAr ? 'ما يتضمنه' : 'Includes'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {features.map((f, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 ${isAr ? 'flex-row-reverse' : ''}`}
                          >
                            <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent.check}`} />
                            <span className="text-slate-400 text-xs leading-relaxed">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.06]" />

                    {/* Tech stack */}
                    <div>
                      <p className="font-mono text-[9px] text-slate-700 uppercase tracking-[0.3em] mb-3">
                        {isAr ? 'التقنيات المستخدمة' : 'Tech Stack'}
                      </p>
                      <div className={`flex flex-wrap gap-1.5 ${isAr ? 'justify-end' : ''}`}>
                        {service.tech.map((t) => (
                          <span
                            key={t}
                            className={`font-mono text-[10px] px-2.5 py-1 rounded border ${TECH_STYLE[t] ?? 'bg-slate-500/10 text-slate-300 border-slate-500/20'}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="h-px bg-white/[0.06] mb-16" />
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${isAr ? 'md:flex-row-reverse text-right' : ''}`}>
          <div>
            <p className="font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em] mb-5">
              {isAr ? 'هل أنت مستعد؟' : 'Ready to build?'}
            </p>
            <h2
              className="font-black tracking-tighter text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              {isAr ? (
                <>دعنا نناقش<br />مشروعك.</>
              ) : (
                <>Let&apos;s discuss<br />your project.</>
              )}
            </h2>
          </div>
          <Link
            href="/contact"
            className="group shrink-0 inline-flex items-center gap-3 font-mono text-xs text-white uppercase tracking-widest border border-white/10 hover:border-blue-500/50 px-8 py-4 transition-colors duration-200"
          >
            {isAr ? 'تواصل معنا' : 'Contact Us'}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
}
