import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, MessageSquare, Send, Copy, Check, Sparkles, MapPin, Globe } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject || 'Inquiry: System Analyst Opportunity')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setSentStatus(true);
    setTimeout(() => setSentStatus(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#050507] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest bg-[#121218] px-3 py-1 border border-zinc-800">
              <Mail className="w-3.5 h-3.5" />
              <span>//07_COMMUNICATION_DISPATCH</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase font-display leading-[0.95]">
              READY FOR SYSTEM <br />
              <span className="text-[#ccff00]">ANALYSIS ROLES.</span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
              Membuka peluang kerja sama posisi <strong className="text-white">System Analyst / IT Integration Specialist</strong>, konsultasi alur kerja BPMN, atau diskusi integrasi backend microservices.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3.5 pt-2">
              <div className="bg-[#0e0e16] border-2 border-zinc-800/90 p-4 sm:p-5 flex items-center justify-between hover:border-zinc-600 transition-colors shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-[#181824] text-[#ccff00] border border-zinc-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-zinc-400 uppercase">DIRECT EMAIL ADDRESS</div>
                    <div className="text-sm sm:text-base font-mono-code font-bold text-white mt-0.5">{personalInfo.email}</div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3.5 py-2 bg-[#181824] hover:bg-[#ccff00] hover:text-black text-xs font-mono-code text-zinc-300 border border-zinc-700 flex items-center gap-1.5 transition-colors font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <a
                href={personalInfo.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e0e16] border-2 border-zinc-800/90 p-4 sm:p-5 flex items-center justify-between group hover:border-[#ccff00] transition-all shadow-[4px_4px_0px_#000000]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-[#181824] text-[#ccff00] border border-zinc-700">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-zinc-400 uppercase">WHATSAPP DIRECT</div>
                    <div className="text-sm sm:text-base font-mono-code font-bold text-white mt-0.5">{personalInfo.phone}</div>
                  </div>
                </div>
                <span className="text-xs font-mono-code font-bold text-[#ccff00] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>CONNECT</span>
                  <span>›</span>
                </span>
              </a>

              <div className="flex items-center gap-4 text-xs font-mono-code text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Bandung, Indonesia (UTC+07:00 WIB)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-6 bg-[#0c0c14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00]">
            <h3 className="text-2xl font-extrabold text-white font-display uppercase tracking-wide mb-1">
              DISPATCH COLLABORATION INQUIRY
            </h3>
            <p className="text-xs font-mono-code text-zinc-400 mb-6">
              Kirim brief kebutuhan sistem, request review arsitektur, atau undangan interview teknis langsung.
            </p>

            <form onSubmit={handleSendEmail} className="space-y-4 font-mono-code text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 uppercase font-bold">
                  SUBJECT / ROLE / TOPIC:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. System Analyst Opportunity / Technical Interview"
                  className="w-full bg-[#12121c] border-2 border-zinc-700 p-3.5 text-white focus:border-[#ccff00] focus:outline-none placeholder:text-zinc-600 font-mono-code"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 uppercase font-bold">
                  MESSAGE & SPECIFICATIONS:
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan detail posisi, lingkup sistem yang ingin dianalisis, atau jadwal diskusi..."
                  className="w-full bg-[#12121c] border-2 border-zinc-700 p-3.5 text-white focus:border-[#ccff00] focus:outline-none placeholder:text-zinc-600 resize-none font-sans text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ccff00] text-black font-extrabold text-sm py-4 border-2 border-white shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
              >
                <span>TRANSMIT DISPATCH VIA MAIL</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>

              {sentStatus && (
                <div className="p-3 bg-[#102012] border border-[#ccff00] text-[#ccff00] text-center font-bold">
                  Mail client dispatched successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
