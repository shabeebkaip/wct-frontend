'use client';

export default function HeroVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center min-h-[580px]">

      {/* Network topology card */}
      <div className="relative z-10 w-full max-w-[540px] bg-slate-900/70 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-950/60">

        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Infrastructure Topology</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold">
            <span className="text-green-400">● Live</span>
            <span className="text-slate-500">KSA Region</span>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="px-4 pt-4 pb-2">
          <svg viewBox="0 0 480 380" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Grid */}
              <pattern id="hgrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
              </pattern>
              {/* Glow filter */}
              <filter id="hglow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="hglow-sm" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Animated traffic dot along paths */}
              <circle id="dot" r="2.5" fill="#60a5fa"/>
            </defs>

            <rect width="480" height="380" fill="url(#hgrid)"/>

            {/* ── TIER 0: Internet cloud ── */}
            {/* Cloud shape */}
            <g filter="url(#hglow-sm)">
              <ellipse cx="240" cy="28" rx="36" ry="14" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="218" cy="32" rx="18" ry="10" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="262" cy="32" rx="18" ry="10" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="240" cy="36" rx="38" ry="10" fill="rgba(30,41,59,0.95)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
            </g>
            <text x="240" y="32" textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="8" fontFamily="monospace" fontWeight="bold">INTERNET</text>
            {/* WAN line down */}
            <line x1="240" y1="46" x2="240" y2="76" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeDasharray="4,2"/>
            <text x="248" y="64" fill="rgba(99,102,241,0.6)" fontSize="6" fontFamily="monospace">WAN</text>
            {/* animated traffic dot WAN */}
            <circle r="2.5" fill="#a78bfa">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 240 46 L 240 76"/>
            </circle>

            {/* ── TIER 1: Firewall ── */}
            <g filter="url(#hglow-sm)">
              <rect x="200" y="76" width="80" height="34" rx="6" fill="rgba(127,29,29,0.3)" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
            </g>
            {/* Shield icon */}
            <path d="M218 84 l6-3 6 3 v8 c0 3-3 5-6 6 c-3-1-6-3-6-6 z" fill="rgba(239,68,68,0.3)" stroke="rgba(239,68,68,0.8)" strokeWidth="1"/>
            <text x="240" y="90" textAnchor="middle" fill="rgba(252,165,165,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">FIREWALL</text>
            <text x="240" y="101" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="6" fontFamily="monospace">FW-01 | NAT/VPN/IPS</text>
            {/* Status dot */}
            <circle cx="272" cy="83" r="2.5" fill="rgba(74,222,128,0.9)" filter="url(#hglow-sm)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            {/* Line to router */}
            <line x1="240" y1="110" x2="240" y2="138" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
            <text x="248" y="128" fill="rgba(59,130,246,0.5)" fontSize="6" fontFamily="monospace">10GbE</text>
            <circle r="2.5" fill="#60a5fa">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 240 110 L 240 138"/>
            </circle>

            {/* ── TIER 2: Core Router ── */}
            <g filter="url(#hglow)">
              <rect x="178" y="138" width="124" height="44" rx="8" fill="rgba(37,99,235,0.25)" stroke="rgba(59,130,246,0.9)" strokeWidth="1.8"/>
            </g>
            {/* Port rows */}
            {[0,1,2,3,4,5,6,7].map(p => (
              <rect key={p} x={186 + p * 13} y={146} width="9" height="5" rx="1.5"
                fill={p < 6 ? "rgba(59,130,246,0.8)" : "rgba(74,222,128,0.9)"}/>
            ))}
            <text x="240" y="165" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="8" fontFamily="monospace" fontWeight="bold">CORE ROUTER</text>
            <text x="240" y="175" textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="6" fontFamily="monospace">CR-01 | BGP/OSPF | 40GbE</text>
            {/* Animated center ping */}
            <circle cx="240" cy="160" r="3" fill="rgba(59,130,246,0.9)" filter="url(#hglow)">
              <animate attributeName="r" values="3;6;3" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite"/>
            </circle>

            {/* ── Lines: Router → 3 Distribution Switches ── */}
            <line x1="240" y1="182" x2="100" y2="228" stroke="rgba(59,130,246,0.45)" strokeWidth="1.5"/>
            <line x1="240" y1="182" x2="240" y2="228" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
            <line x1="240" y1="182" x2="380" y2="228" stroke="rgba(59,130,246,0.45)" strokeWidth="1.5"/>
            <text x="162" y="214" fill="rgba(59,130,246,0.5)" fontSize="5.5" fontFamily="monospace">10GbE</text>
            <text x="244" y="214" fill="rgba(59,130,246,0.5)" fontSize="5.5" fontFamily="monospace">10GbE</text>
            <text x="304" y="214" fill="rgba(59,130,246,0.5)" fontSize="5.5" fontFamily="monospace">10GbE</text>
            {/* Traveling dots */}
            {["M 240 182 L 100 228","M 240 182 L 240 228","M 240 182 L 380 228"].map((path, i) => (
              <circle key={i} r="2" fill="#60a5fa" opacity="0.9">
                <animateMotion dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" path={path}/>
              </circle>
            ))}

            {/* ── TIER 3: Distribution Switches ── */}
            {([
              { cx: 100, label: "DS-01", sub: "L3 | VLAN 10-30" },
              { cx: 240, label: "DS-02", sub: "L3 | VLAN 40-60" },
              { cx: 380, label: "DS-03", sub: "L3 | VLAN 70-90" },
            ]).map(({ cx, label, sub }) => (
              <g key={label}>
                <g filter="url(#hglow-sm)">
                  <rect x={cx - 44} y="228" width="88" height="30" rx="5" fill="rgba(67,56,202,0.2)" stroke="rgba(99,102,241,0.75)" strokeWidth="1.4"/>
                </g>
                {[0,1,2,3,4,5].map(p => (
                  <rect key={p} x={cx - 36 + p * 12} y={234} width="8" height="4" rx="1"
                    fill={p < 4 ? "rgba(99,102,241,0.8)" : "rgba(74,222,128,0.7)"}/>
                ))}
                <text x={cx} y={249} textAnchor="middle" fill="rgba(199,210,254,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">{label}</text>
                <text x={cx} y={256} textAnchor="middle" fill="rgba(99,102,241,0.55)" fontSize="5.5" fontFamily="monospace">{sub}</text>
                {/* online dot */}
                <circle cx={cx + 36} cy={232} r="2" fill="rgba(74,222,128,0.9)" filter="url(#hglow-sm)"/>
              </g>
            ))}

            {/* ── Lines: Switches → Servers ── */}
            {/* DS-01 → SRV-01, SRV-02 */}
            <line x1="100" y1="258" x2="60" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="100" y1="258" x2="140" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* DS-02 → SRV-03, SRV-04 */}
            <line x1="240" y1="258" x2="200" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="240" y1="258" x2="280" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* DS-03 → SRV-05, SRV-06 */}
            <line x1="380" y1="258" x2="340" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="380" y1="258" x2="420" y2="308" stroke="rgba(99,102,241,0.3)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* GbE labels */}
            {[60, 200, 340].map((x, i) => (
              <text key={i} x={x + 8} y={287} fill="rgba(99,102,241,0.45)" fontSize="5" fontFamily="monospace">1GbE</text>
            ))}

            {/* ── TIER 4: Server Racks ── */}
            {([
              { cx: 60,  label: "SRV-01", role: "WEB",  online: true  },
              { cx: 140, label: "SRV-02", role: "APP",  online: true  },
              { cx: 200, label: "SRV-03", role: "DB",   online: true  },
              { cx: 280, label: "SRV-04", role: "DB",   online: true  },
              { cx: 340, label: "SRV-05", role: "STOR", online: false },
              { cx: 420, label: "SRV-06", role: "BACK", online: true  },
            ]).map(({ cx, label, role, online }) => (
              <g key={label}>
                {/* Rack chassis */}
                <rect x={cx - 22} y={308} width="44" height="52" rx="3" fill="rgba(15,23,42,0.95)" stroke="rgba(51,65,85,0.9)" strokeWidth="1.3"/>
                {/* Rack units (1U slots) */}
                {[0,1,2,3].map(u => (
                  <g key={u}>
                    <rect x={cx - 18} y={311 + u * 10} width="36" height="7" rx="1.5"
                      fill="rgba(30,41,59,0.8)" stroke="rgba(51,65,85,0.6)" strokeWidth="0.8"/>
                    {/* Drive activity bars */}
                    <rect x={cx - 14} y={313 + u * 10} width={u === 0 ? 20 : u === 1 ? 16 : u === 2 ? 22 : 12} height="3" rx="1"
                      fill={`rgba(59,130,246,${0.3 + u * 0.15})`}/>
                    {/* Status LED per unit */}
                    <circle cx={cx + 14} cy={314.5 + u * 10} r="1.5"
                      fill={online && u < 3 ? "rgba(74,222,128,0.9)" : u === 3 ? "rgba(234,179,8,0.8)" : "rgba(239,68,68,0.7)"}/>
                  </g>
                ))}
                {/* Role badge */}
                <rect x={cx - 12} y={353} width="24" height="7" rx="2" fill="rgba(37,99,235,0.4)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.8"/>
                <text x={cx} y={358.5} textAnchor="middle" fill="rgba(147,197,253,0.9)" fontSize="5" fontFamily="monospace" fontWeight="bold">{role}</text>
                {/* Label */}
                <text x={cx} y={370} textAnchor="middle" fill="rgba(71,85,105,0.8)" fontSize="5.5" fontFamily="monospace">{label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Metrics footer */}
        <div className="grid grid-cols-4 divide-x divide-white/8 border-t border-white/8">
          {[
            { label: 'Uptime',    value: '99.9%',   color: 'text-green-400'  },
            { label: 'Latency',   value: '< 1ms',   color: 'text-blue-400'   },
            { label: 'Bandwidth', value: '40 GbE',  color: 'text-indigo-400' },
            { label: 'Servers',   value: '6 / 6',   color: 'text-emerald-400'},
          ].map((m) => (
            <div key={m.label} className="px-3 py-3 text-center">
              <p className={`text-sm font-black ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
