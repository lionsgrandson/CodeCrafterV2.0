import { motion } from 'motion/react';
import { Menu, MessageSquare } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold font-headline text-on-surface tracking-tight">CodeCrafter</div>
        <div className="hidden md:flex space-x-8 items-center">
          {[
            { label: 'What We Solve', href: '#services' },
            { label: 'Our Work', href: '#portfolio' },
            { label: 'The Process', href: '#process' },
            { label: 'Success Stories', href: '#testimonials' }
          ].map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="font-headline tracking-tight text-sm uppercase font-semibold text-secondary hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-primary-gradient text-white px-6 py-2 rounded-lg font-headline text-sm font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20">
            Get a Free Tech Audit
          </button>
        </div>
        <button className="md:hidden text-on-surface p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <header className="relative pt-32 pb-24 px-6 md:px-8 overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs mb-4 block">Crafting Code. Creating Solutions.</span>
          <h1 className="text-5xl md:text-7xl text-editorial-hero mb-6 text-on-surface">
            Stop Losing Money to Broken Systems and Manual Work.
          </h1>
          <p className="text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            I fix the digital leaks in your business. From professional websites that win trust to automations that save you 10+ hours a week, I handle the tech so you can handle the growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary-gradient text-white px-8 py-5 rounded-lg font-headline font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all active:scale-95 text-center">
              Book My Strategy Call
            </button>
            <button className="bg-surface-container-low text-primary px-8 py-5 rounded-lg font-headline font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all active:scale-95 border border-primary/10">
              <MessageSquare className="w-5 h-5 fill-current" />
              Message on WhatsApp
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-secondary font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Lead: Moshe Schwartzberg
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group hidden md:block"
        >
          <div className="absolute -inset-4 bg-primary/5 rounded-xl rotate-3 transition-transform group-hover:rotate-1"></div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-2xl border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern architectural workspace"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
