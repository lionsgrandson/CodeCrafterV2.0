import { motion } from 'motion/react';
import { Check, MessageSquare, Globe, Shield, Verified } from 'lucide-react';

export function WhyWorkWithMe() {
  const points = [
    { title: 'Personal Direct Access', desc: 'No agencies, no junior project managers, and no communication delays. You deal directly with the expert lead, Moshe Schwartzberg.' },
    { title: 'Full Spectrum Handling', desc: 'From the first line of code to the final security patch and infrastructure audit, I manage the entire digital lifecycle.' },
    { title: 'Business-First Logic', desc: 'I build solutions measured against your core business KPIs, growth goals, and bottom line — not just pretty templates.' },
    { title: 'The No Jargon Promise', desc: 'I speak your language. No technical obfuscation. Just clear outcomes, transparent progress, and systems that work.' },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-on-surface text-surface overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight font-headline">Why Work With Me</h2>
          <ul className="space-y-8">
            {points.map((point, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 font-headline">{point.title}</h4>
                  <p className="opacity-70 font-light leading-relaxed">{point.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-surface/5 border border-surface/10 rounded-xl"
          >
            <p className="text-2xl font-headline italic font-light opacity-90">"You focus on your business. I will handle everything digital."</p>
          </motion.div>
        </div>
        <div className="relative flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full aspect-[4/5] bg-primary/20 rounded-2xl relative overflow-hidden ring-1 ring-white/10"
          >
            <img 
              className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80&w=1000" 
              alt="Moshe Schwartzberg - Digital Architect"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-headline text-on-surface">Built Around Your Business</h2>
        <p className="text-secondary text-lg mb-12 font-light">We provide custom solutions tailored to your unique requirements, focusing on delivering tangible results and maximum value for your business.</p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden border border-outline-variant/10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Globe className="w-32 h-32 text-primary" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 font-headline text-on-surface">Let us Fix Your Digital Setup</h3>
          <p className="text-secondary text-lg mb-10 font-light">Stop wasting time on broken systems and scattered tools. Start winning.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <button className="bg-primary-gradient text-white px-10 py-5 rounded-lg font-headline font-bold text-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95 text-center">
              Book My Strategy Call
            </button>
            <button className="bg-surface-container text-primary px-10 py-5 rounded-lg font-headline font-bold text-xl flex items-center justify-center gap-3 hover:bg-surface-container-high transition-all active:scale-95 border border-primary/10">
              <MessageSquare className="w-6 h-6 fill-current" />
              Message on WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-8 bg-surface-container-high border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="text-xl font-bold font-headline text-on-surface mb-4">CodeCrafter</div>
          <p className="text-sm text-secondary max-w-xs mb-6 leading-relaxed">
            Architecting the digital future for ambitious businesses. One system at a time.
          </p>
          <div className="flex gap-4">
            <a href="mailto:hello@codecrafter.com" className="text-primary hover:underline underline-offset-4 transition-all font-medium">
              hello@codecrafter.com
            </a>
          </div>
        </div>
        <div>
          <p className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface mb-6">Explore</p>
          <ul className="space-y-3 text-sm">
            {['Services', 'Portfolio', 'Process', 'Testimonials'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-secondary hover:text-primary transition-all">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface mb-6">Legal</p>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-secondary hover:text-primary transition-all">Privacy Policy</a></li>
            <li><a href="#" className="text-secondary hover:text-primary transition-all">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-secondary">© {new Date().getFullYear()} CodeCrafter. All rights reserved.</p>
        <div className="flex gap-6">
          <Globe className="w-4 h-4 text-secondary" />
          <Shield className="w-4 h-4 text-secondary" />
          <Verified className="w-4 h-4 text-secondary" />
        </div>
      </div>
    </footer>
  );
}
