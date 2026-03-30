'use client';

export default function HeroVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center min-h-[580px]">
      <div className="relative z-10 w-full max-w-[540px] bg-slate-900/70 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-950/60">

        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Data Center Live View</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold">
            <span className="text-green-400">● Operational</span>
            <span className="text-slate-500">KSA-DC-01</span>
          </div>
        </div>

        {/* SVG Diagram */}
        <div className="px-4 pt-4 pb-2">
          <svg viewBox="0 0 480 395" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dcgrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
              </pattern>
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow-sm" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <rect width="480" height="395" fill="url(#dcgrid)"/>

            {/* ═══ NETWORK ENTRY STRIP (top) ═══ */}

            {/* Internet Cloud */}
            <g filter="url(#glow-sm)">
              <ellipse cx="70" cy="20" rx="26" ry="10" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="55" cy="24" rx="13" ry="8" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="85" cy="24" rx="13" ry="8" fill="rgba(30,41,59,0.9)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
              <ellipse cx="70" cy="27" rx="28" ry="7" fill="rgba(30,41,59,0.95)" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2"/>
            </g>
            <text x="70" y="24" textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">INTERNET</text>

            {/* Internet → Firewall */}
            <line x1="96" y1="22" x2="136" y2="22" stroke="rgba(99,102,241,0.55)" strokeWidth="1.5" strokeDasharray="3,2"/>
            <text x="114" y="19" textAnchor="middle" fill="rgba(99,102,241,0.55)" fontSize="5.5" fontFamily="monospace">WAN</text>
            <circle r="2" fill="#a78bfa">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 96 22 L 136 22"/>
            </circle>

            {/* Firewall */}
            <g filter="url(#glow-sm)">
              <rect x="136" y="12" width="72" height="22" rx="4" fill="rgba(127,29,29,0.3)" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5"/>
            </g>
            <text x="172" y="22" textAnchor="middle" fill="rgba(252,165,165,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">FIREWALL-01</text>
            <text x="172" y="29" textAnchor="middle" fill="rgba(239,68,68,0.55)" fontSize="5" fontFamily="monospace">NGF | IPS | VPN</text>
            <circle cx="201" cy="16" r="2" fill="rgba(74,222,128,0.9)" filter="url(#glow-sm)">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
            </circle>

            {/* Firewall → Core Switch */}
            <line x1="208" y1="22" x2="250" y2="22" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
            <text x="228" y="19" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="5.5" fontFamily="monospace">10GbE</text>
            <circle r="2" fill="#60a5fa">
              <animateMotion dur="1.4s" repeatCount="indefinite" path="M 208 22 L 250 22"/>
            </circle>

            {/* Core Switch */}
            <g filter="url(#glow-sm)">
              <rect x="250" y="11" width="96" height="24" rx="4" fill="rgba(37,99,235,0.2)" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5"/>
            </g>
            {[0,1,2,3,4,5,6].map(p => (
              <rect key={p} x={255 + p * 11} y={14} width="8" height="5" rx="1"
                fill={p < 5 ? "rgba(59,130,246,0.8)" : "rgba(74,222,128,0.9)"}/>
            ))}
            <text x="298" y="27" textAnchor="middle" fill="rgba(147,197,253,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">CORE-SW-01</text>
            <circle cx="338" cy="14" r="2" fill="rgba(74,222,128,0.9)" filter="url(#glow-sm)">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
            </circle>

            {/* Region tag */}
            <text x="368" y="19" fill="rgba(99,102,241,0.55)" fontSize="6" fontFamily="monospace" fontWeight="bold">KSA</text>
            <text x="368" y="27" fill="rgba(99,102,241,0.4)" fontSize="5" fontFamily="monospace">REGION</text>
            <line x1="348" y1="22" x2="365" y2="22" stroke="rgba(99,102,241,0.35)" strokeWidth="1" strokeDasharray="2,2"/>

            {/* Core Switch → 3 Rack drop lines */}
            {/* Rack centers: x=85, x=240, x=395 */}
            <line x1="298" y1="35" x2="85"  y2="66" stroke="rgba(59,130,246,0.35)" strokeWidth="1.2" strokeDasharray="4,2"/>
            <line x1="298" y1="35" x2="240" y2="66" stroke="rgba(59,130,246,0.5)"  strokeWidth="1.2" strokeDasharray="4,2"/>
            <line x1="298" y1="35" x2="395" y2="66" stroke="rgba(59,130,246,0.35)" strokeWidth="1.2" strokeDasharray="4,2"/>
            {["M 298 35 L 85 66","M 298 35 L 240 66","M 298 35 L 395 66"].map((path, i) => (
              <circle key={i} r="1.8" fill="#60a5fa" opacity="0.85">
                <animateMotion dur={`${1.3 + i * 0.25}s`} repeatCount="indefinite" path={path}/>
              </circle>
            ))}

            {/* ═══ RACK 1 — COMPUTE (x=20, w=130, center=85) ═══ */}
            <g>
              <rect x="20"  y="66" width="130" height="258" rx="4" fill="rgba(8,12,22,0.97)"  stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              <rect x="20"  y="66" width="130" height="18"  rx="4" fill="rgba(15,23,42,1)"    stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              {/* Accent stripe */}
              <rect x="20"  y="84" width="4"   height="240" fill="rgba(37,99,235,0.5)" rx="1"/>
              <text x="85"  y="78" textAnchor="middle" fill="rgba(147,197,253,0.85)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">RACK-01 · COMPUTE</text>

              {/* 1U Patch Panel */}
              <rect x="27" y="87" width="115" height="10" rx="1.5" fill="rgba(20,28,48,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                <circle key={i} cx={31 + i * 9} cy={92} r="2.5" fill={i < 10 ? "rgba(59,130,246,0.6)" : "rgba(51,65,85,0.4)"}/>
              ))}
              <text x="27" y="105" fill="rgba(51,65,85,0.7)" fontSize="5" fontFamily="monospace">PATCH PANEL 24P</text>

              {/* 1U TOR Switch */}
              <rect x="27" y="100" width="115" height="11" rx="1.5" fill="rgba(37,99,235,0.14)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.8"/>
              {[0,1,2,3,4,5].map(p => (
                <rect key={p} x={31 + p * 14} y={103} width="10" height="4.5" rx="1"
                  fill={p < 4 ? "rgba(59,130,246,0.75)" : "rgba(74,222,128,0.85)"}/>
              ))}
              <text x="128" y="108.5" textAnchor="end" fill="rgba(147,197,253,0.75)" fontSize="5.5" fontFamily="monospace">TOR-SW</text>
              <circle cx="132" cy="103.5" r="1.5" fill="rgba(74,222,128,0.9)">
                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
              </circle>

              {/* Blank */}
              <rect x="27" y="113" width="115" height="5" rx="1" fill="rgba(10,14,25,0.5)" stroke="rgba(30,41,59,0.25)" strokeWidth="0.5"/>

              {/* 8 × 1U Compute Servers */}
              {[
                { name:'SRV-01', cpu:28, mem:20, on:true  },
                { name:'SRV-02', cpu:22, mem:16, on:true  },
                { name:'SRV-03', cpu:34, mem:28, on:true  },
                { name:'SRV-04', cpu:18, mem:14, on:true  },
                { name:'SRV-05', cpu:30, mem:22, on:true  },
                { name:'SRV-06', cpu:0,  mem:0,  on:false },
                { name:'SRV-07', cpu:26, mem:20, on:true  },
                { name:'SRV-08', cpu:32, mem:24, on:true  },
              ].map(({ name, cpu, mem, on }, i) => {
                const sy = 120 + i * 15;
                return (
                  <g key={name}>
                    <rect x="27" y={sy} width="115" height="12" rx="1.5"
                      fill={on ? "rgba(15,23,42,0.9)" : "rgba(28,16,16,0.85)"}
                      stroke={on ? "rgba(51,65,85,0.55)" : "rgba(90,30,30,0.5)"}
                      strokeWidth="0.7"/>
                    {/* CPU bar track */}
                    <rect x="31" y={sy+3} width="38" height="2.5" rx="1" fill="rgba(30,41,59,0.5)"/>
                    <rect x="31" y={sy+3} width={cpu} height="2.5" rx="1"
                      fill={on ? `rgba(59,130,246,${0.5 + (i%3)*0.12})` : "rgba(239,68,68,0.3)"}/>
                    {/* MEM bar track */}
                    <rect x="31" y={sy+7} width="38" height="2" rx="1" fill="rgba(30,41,59,0.5)"/>
                    <rect x="31" y={sy+7} width={mem} height="2" rx="1" fill="rgba(99,102,241,0.5)"/>
                    {/* Name */}
                    <text x="85" y={sy+8} textAnchor="middle" fill="rgba(148,163,184,0.65)" fontSize="5" fontFamily="monospace">{name}</text>
                    {/* Power LED */}
                    <circle cx="133" cy={sy+6} r="2"
                      fill={on ? "rgba(74,222,128,0.9)" : "rgba(239,68,68,0.75)"}>
                      {on && <animate attributeName="opacity" values="1;0.35;1" dur={`${2.2+i*0.25}s`} repeatCount="indefinite"/>}
                    </circle>
                    {/* HDD activity */}
                    {on && i % 2 === 0 && (
                      <circle cx="127" cy={sy+6} r="1.5" fill="rgba(234,179,8,0.75)">
                        <animate attributeName="opacity" values="1;0.1;0.9;0.1;1" dur={`${0.4+i*0.1}s`} repeatCount="indefinite"/>
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Temp / Power */}
              <text x="27"  y="307" fill="rgba(234,179,8,0.65)"  fontSize="5.5" fontFamily="monospace">TEMP  23°C  ▲ HOT AISLE</text>
              <text x="27"  y="316" fill="rgba(59,130,246,0.55)" fontSize="5.5" fontFamily="monospace">PWR   3.2kW / 4.0kW</text>
            </g>

            {/* ═══ RACK 2 — NETWORK (x=175, w=130, center=240) ═══ */}
            <g>
              <rect x="175" y="66" width="130" height="258" rx="4" fill="rgba(8,12,22,0.97)"  stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              <rect x="175" y="66" width="130" height="18"  rx="4" fill="rgba(15,23,42,1)"    stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              <rect x="175" y="84" width="4"   height="240" fill="rgba(99,102,241,0.5)" rx="1"/>
              <text x="240" y="78" textAnchor="middle" fill="rgba(199,210,254,0.85)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">RACK-02 · NETWORK</text>

              {/* 2U Core Switch */}
              <rect x="182" y="87" width="115" height="22" rx="1.5" fill="rgba(37,99,235,0.2)" stroke="rgba(59,130,246,0.7)" strokeWidth="1"/>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(p => (
                <rect key={p} x={186 + p * 8} y={90} width="6" height="5" rx="1"
                  fill={p < 10 ? "rgba(59,130,246,0.78)" : "rgba(74,222,128,0.9)"}/>
              ))}
              <text x="240" y="104" textAnchor="middle" fill="rgba(147,197,253,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">CORE SWITCH</text>
              <circle cx="289" cy="98" r="3" fill="rgba(59,130,246,0.9)" filter="url(#glow)">
                <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.25;1" dur="2.2s" repeatCount="indefinite"/>
              </circle>
              <text x="182" y="114" fill="rgba(51,65,85,0.7)" fontSize="5" fontFamily="monospace">CR-01 · BGP/OSPF · 40GbE</text>

              {/* 1U Distribution Switch */}
              <rect x="182" y="114" width="115" height="11" rx="1.5" fill="rgba(67,56,202,0.15)" stroke="rgba(99,102,241,0.55)" strokeWidth="0.8"/>
              {[0,1,2,3,4].map(p => (
                <rect key={p} x={186 + p * 13} y={117} width="10" height="4.5" rx="1" fill="rgba(99,102,241,0.7)"/>
              ))}
              <text x="257" y="122" fill="rgba(199,210,254,0.75)" fontSize="6" fontFamily="monospace">DIST-SW-01</text>
              <circle cx="289" cy="117.5" r="1.5" fill="rgba(74,222,128,0.9)">
                <animate attributeName="opacity" values="1;0.2;1" dur="2.8s" repeatCount="indefinite"/>
              </circle>

              {/* 1U Firewall Appliance */}
              <rect x="182" y="127" width="115" height="11" rx="1.5" fill="rgba(127,29,29,0.2)" stroke="rgba(239,68,68,0.5)" strokeWidth="0.8"/>
              <path d="M188 130 l3.5-2 3.5 2 v4.5 c0 2-1.5 3-3.5 3.5 c-2-0.5-3.5-1.5-3.5-3.5z"
                fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.65)" strokeWidth="0.8"/>
              <text x="240" y="135.5" textAnchor="middle" fill="rgba(252,165,165,0.8)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">FIREWALL APPLIANCE</text>
              <circle cx="289" cy="130.5" r="1.5" fill="rgba(74,222,128,0.9)">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.9s" repeatCount="indefinite"/>
              </circle>

              {/* 1U Load Balancer */}
              <rect x="182" y="140" width="115" height="11" rx="1.5" fill="rgba(15,23,42,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="240" y="148" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="6" fontFamily="monospace">LOAD BALANCER</text>
              <circle cx="289" cy="144" r="1.5" fill="rgba(74,222,128,0.9)"/>

              {/* 1U VPN Concentrator */}
              <rect x="182" y="153" width="115" height="11" rx="1.5" fill="rgba(15,23,42,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="240" y="161" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="6" fontFamily="monospace">VPN CONCENTRATOR</text>
              <circle cx="289" cy="157" r="1.5" fill="rgba(74,222,128,0.9)"/>

              {/* 1U KVM + Blank */}
              <rect x="182" y="166" width="115" height="8"  rx="1" fill="rgba(10,14,25,0.55)" stroke="rgba(30,41,59,0.25)" strokeWidth="0.5"/>
              <text x="240" y="172" textAnchor="middle" fill="rgba(51,65,85,0.6)" fontSize="5" fontFamily="monospace">KVM CONSOLE</text>

              {/* 1U Patch Panel */}
              <rect x="182" y="176" width="115" height="10" rx="1.5" fill="rgba(20,28,48,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <circle key={i} cx={186 + i * 9.5} cy={181} r="2.5" fill={i < 9 ? "rgba(59,130,246,0.55)" : "rgba(51,65,85,0.4)"}/>
              ))}

              {/* Blank */}
              <rect x="182" y="188" width="115" height="6" rx="1" fill="rgba(10,14,25,0.5)"/>

              {/* 2U UPS */}
              <rect x="182" y="196" width="115" height="22" rx="1.5" fill="rgba(67,56,202,0.12)" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8"/>
              <text x="240" y="207" textAnchor="middle" fill="rgba(199,210,254,0.85)" fontSize="7" fontFamily="monospace" fontWeight="bold">UPS UNIT · 6kVA</text>
              {[0,1,2,3,4,5,6,7].map(i => (
                <rect key={i} x={186 + i * 12} y={210} width="9" height="4.5" rx="1"
                  fill={i < 7 ? "rgba(99,102,241,0.65)" : "rgba(51,65,85,0.3)"}/>
              ))}
              <text x="182" y="222" fill="rgba(51,65,85,0.65)" fontSize="5" fontFamily="monospace">ONLINE · 87% CHARGE</text>

              {/* 1U PDU */}
              <rect x="182" y="220" width="115" height="10" rx="1.5" fill="rgba(15,23,42,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="240" y="228" textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="6" fontFamily="monospace">POWER DIST UNIT</text>

              <text x="182" y="307" fill="rgba(234,179,8,0.65)"  fontSize="5.5" fontFamily="monospace">TEMP  25°C  ▲ HOT AISLE</text>
              <text x="182" y="316" fill="rgba(59,130,246,0.55)" fontSize="5.5" fontFamily="monospace">PWR   2.8kW / 6.0kW</text>
            </g>

            {/* ═══ RACK 3 — STORAGE (x=330, w=130, center=395) ═══ */}
            <g>
              <rect x="330" y="66" width="130" height="258" rx="4" fill="rgba(8,12,22,0.97)"  stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              <rect x="330" y="66" width="130" height="18"  rx="4" fill="rgba(15,23,42,1)"    stroke="rgba(51,65,85,0.85)" strokeWidth="1.8"/>
              <rect x="330" y="84" width="4"   height="240" fill="rgba(16,185,129,0.5)" rx="1"/>
              <text x="395" y="78" textAnchor="middle" fill="rgba(167,243,208,0.85)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">RACK-03 · STORAGE</text>

              {/* 1U Patch Panel */}
              <rect x="337" y="87" width="115" height="10" rx="1.5" fill="rgba(20,28,48,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                <circle key={i} cx={341 + i * 9} cy={92} r="2.5" fill={i < 10 ? "rgba(16,185,129,0.55)" : "rgba(51,65,85,0.4)"}/>
              ))}

              {/* 1U Storage Switch */}
              <rect x="337" y="99" width="115" height="11" rx="1.5" fill="rgba(5,150,105,0.15)" stroke="rgba(16,185,129,0.55)" strokeWidth="0.8"/>
              {[0,1,2,3,4,5].map(p => (
                <rect key={p} x={341 + p * 14} y={102} width="10" height="4.5" rx="1"
                  fill={p < 4 ? "rgba(16,185,129,0.7)" : "rgba(74,222,128,0.9)"}/>
              ))}
              <text x="444" y="107.5" textAnchor="end" fill="rgba(167,243,208,0.7)" fontSize="5.5" fontFamily="monospace">SAN-SW</text>

              {/* 2U SAN Controller */}
              <rect x="337" y="112" width="115" height="22" rx="1.5" fill="rgba(5,150,105,0.12)" stroke="rgba(16,185,129,0.6)" strokeWidth="1"/>
              <text x="395" y="121" textAnchor="middle" fill="rgba(167,243,208,0.9)" fontSize="7" fontFamily="monospace" fontWeight="bold">SAN CONTROLLER</text>
              <text x="337" y="130" fill="rgba(51,65,85,0.65)" fontSize="5" fontFamily="monospace">CTRL-01 · FC 16Gb · RAID-6</text>
              <circle cx="444" cy="121" r="2.5" fill="rgba(16,185,129,0.9)" filter="url(#glow-sm)">
                <animate attributeName="r" values="2.5;4;2.5" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
              </circle>

              {/* 2U NAS */}
              <rect x="337" y="136" width="115" height="20" rx="1.5" fill="rgba(15,23,42,0.9)" stroke="rgba(51,65,85,0.55)" strokeWidth="0.8"/>
              <text x="395" y="144" textAnchor="middle" fill="rgba(148,163,184,0.85)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">NAS STORAGE</text>
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <circle key={i} cx={341 + i * 10} cy={151} r="2.2"
                  fill={i % 3 !== 2 ? "rgba(74,222,128,0.8)" : "rgba(234,179,8,0.7)"}>
                  <animate attributeName="opacity" values="1;0.15;1" dur={`${0.35+i*0.12}s`} repeatCount="indefinite"/>
                </circle>
              ))}
              <text x="337" y="160" fill="rgba(51,65,85,0.65)" fontSize="5" fontFamily="monospace">480TB USABLE · 68% USED</text>

              {/* 2U Disk Shelf #1 */}
              <rect x="337" y="158" width="115" height="20" rx="1.5" fill="rgba(12,20,36,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="395" y="166" textAnchor="middle" fill="rgba(148,163,184,0.65)" fontSize="6" fontFamily="monospace">DISK SHELF A ×24</text>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                <rect key={i} x={341 + i * 8.5} y={168} width="6" height="6" rx="0.8"
                  fill={i < 11 ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.45)"}/>
              ))}

              {/* 2U Disk Shelf #2 */}
              <rect x="337" y="180" width="115" height="20" rx="1.5" fill="rgba(12,20,36,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="395" y="188" textAnchor="middle" fill="rgba(148,163,184,0.65)" fontSize="6" fontFamily="monospace">DISK SHELF B ×24</text>
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
                <rect key={i} x={341 + i * 8.5} y={190} width="6" height="6" rx="0.8"
                  fill="rgba(16,185,129,0.5)"/>
              ))}

              {/* 1U Backup / Tape */}
              <rect x="337" y="202" width="115" height="10" rx="1.5" fill="rgba(15,23,42,0.9)" stroke="rgba(51,65,85,0.5)" strokeWidth="0.7"/>
              <text x="395" y="210" textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="6" fontFamily="monospace">BACKUP TAPE LIB</text>

              {/* Blank */}
              <rect x="337" y="214" width="115" height="6" rx="1" fill="rgba(10,14,25,0.5)"/>

              {/* 1.5U UPS */}
              <rect x="337" y="222" width="115" height="14" rx="1.5" fill="rgba(67,56,202,0.12)" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8"/>
              <text x="395" y="232" textAnchor="middle" fill="rgba(199,210,254,0.8)" fontSize="6.5" fontFamily="monospace" fontWeight="bold">UPS · 4kVA ONLINE</text>

              <text x="337" y="307" fill="rgba(234,179,8,0.65)"  fontSize="5.5" fontFamily="monospace">TEMP  22°C  ▲ HOT AISLE</text>
              <text x="337" y="316" fill="rgba(16,185,129,0.55)" fontSize="5.5" fontFamily="monospace">PWR   2.4kW / 4.0kW</text>
            </g>

            {/* ═══ INTER-RACK FIBER CONNECTIONS ═══ */}
            {/* Rack1 TOR → Rack2 Core */}
            <line x1="150" y1="104" x2="182" y2="97"  stroke="rgba(59,130,246,0.3)"  strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="150" y1="109" x2="182" y2="104" stroke="rgba(99,102,241,0.25)" strokeWidth="1"   strokeDasharray="3,2"/>
            <circle r="1.5" fill="#60a5fa" opacity="0.8">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 150 104 L 182 97"/>
            </circle>
            {/* Rack2 Core → Rack3 SAN */}
            <line x1="297" y1="104" x2="337" y2="104" stroke="rgba(16,185,129,0.3)"  strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="297" y1="109" x2="337" y2="109" stroke="rgba(5,150,105,0.25)"  strokeWidth="1"   strokeDasharray="3,2"/>
            <circle r="1.5" fill="#34d399" opacity="0.8">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 297 104 L 337 104"/>
            </circle>

            {/* ═══ FLOOR STRIP ═══ */}
            <rect x="10" y="327" width="460" height="6" rx="2.5" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.12)" strokeWidth="0.8"/>
            <text x="240" y="344" textAnchor="middle" fill="rgba(51,65,85,0.6)" fontSize="5.5" fontFamily="monospace">DC FLOOR · KSA-DC-01 · ROW-A · RACKS 01 – 03</text>

            {/* Aggregate power bar */}
            <rect x="30"  y="352" width="420" height="5" rx="2" fill="rgba(30,41,59,0.7)"/>
            <rect x="30"  y="352" width="252" height="5" rx="2" fill="rgba(59,130,246,0.5)">
              <animate attributeName="width" values="252;260;252" dur="4s" repeatCount="indefinite"/>
            </rect>
            <text x="30"  y="368" fill="rgba(59,130,246,0.5)"   fontSize="5.5" fontFamily="monospace">POWER UTIL: 8.4kW / 14kW  (60%)</text>
            <text x="390" y="368" fill="rgba(74,222,128,0.6)"   fontSize="5.5" fontFamily="monospace">PUE: 1.38</text>

            {/* Cooling indicators */}
            <text x="30"  y="382" fill="rgba(99,102,241,0.45)"  fontSize="5.5" fontFamily="monospace">❄ CRAC-01: 18kW  ● CRAC-02: 18kW  ● CRAC-03: 18kW</text>
          </svg>
        </div>

        {/* Metrics footer */}
        <div className="grid grid-cols-4 divide-x divide-white/8 border-t border-white/8">
          {[
            { label: 'Uptime',   value: '99.99%', color: 'text-green-400'   },
            { label: 'Avg Temp', value: '23°C',   color: 'text-blue-400'    },
            { label: 'Power',    value: '8.4 kW', color: 'text-indigo-400'  },
            { label: 'Servers',  value: '7 / 8',  color: 'text-emerald-400' },
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
