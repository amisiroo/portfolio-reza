import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MessageSquare, Send, Copy, Check, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject || 'Inquiry: System Integration / Collaboration')}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 bg-[#050507] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest bg-[#121218] px-3 py-1 border border-zinc-800">
              <Mail className="w-3.5 h-3.5" />
              <span>//06_COMMUNICATION_DISPATCH</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white uppercase font-display leading-[0.95]">
              READY FOR PRODUCTION <br />
              <span className="text-[#ccff00]">DEPLOYMENT.</span>
            </h2>

            <p className="text-base text-zinc-300 font-sans leading-relaxed">
              Membuka peluang kerja sama strategis, posisi penuh waktu sebagai <strong className="text-white">System Analyst / Technical Integration Specialist</strong>, atau konsultasi arsitektur workflow korporat.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-4">
              <div className="bg-[#0e0e16] border-2 border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#181824] text-[#ccff00]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-zinc-400">DIRECT EMAIL</div>
                    <div className="text-sm font-mono-code font-bold text-white">{personalInfo.email}</div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 bg-[#181824] hover:bg-[#ccff00] hover:text-black text-xs font-mono-code text-zinc-300 border border-zinc-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              <a
                href={personalInfo.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e0e16] border-2 border-zinc-800 p-4 flex items-center justify-between group hover:border-[#ccff00] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#181824] text-[#ccff00]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-zinc-400">WHATSAPP DIRECT</div>
                    <div className="text-sm font-mono-code font-bold text-white">{personalInfo.phone}</div>
                  </div>
                </div>
                <span className="text-xs font-mono-code text-[#ccff00] group-hover:translate-x-1 transition-transform">
                  CONNECT ›
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-6 bg-[#0c0c14] border-2 border-white p-6 sm:p-8 shadow-[6px_6px_0px_#ccff00]">
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide mb-1">
              DISPATCH COLLABORATION INQUIRY
            </h3>
            <p className="text-xs font-mono-code text-zinc-400 mb-6">
              Kirim brief kebutuhan sistem atau jadwal interview teknis langsung.
            </p>

            <form onSubmit={handleSendEmail} className="space-y-4 font-mono-code text-xs">
              <div>
                <label className="block text-zinc-300 mb-1.5 uppercase font-bold">
                  SUBJECT / TOPIC:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. System Analyst Role / LOS Camunda Project Inquiry"
                  className="w-full bg-[#12121c] border border-zinc-700 p-3 text-white focus:border-[#ccff00] focus:outline-none placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 uppercase font-bold">
                  PROJECT / DRILL SPECIFICATIONS:
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan detail proyek, timeline, atau lingkup arsitektur yang ingin didiskusikan..."
                  className="w-full bg-[#12121c] border border-zinc-700 p-3 text-white focus:border-[#ccff00] focus:outline-none placeholder:text-zinc-600 resize-none font-sans text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ccff00] text-black font-extrabold text-sm py-3.5 border-2 border-white shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#ffffff] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
              >
                <span>TRANSMIT DISPATCH VIA MAIL</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
