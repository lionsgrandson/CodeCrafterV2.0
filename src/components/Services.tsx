import { motion } from 'motion/react';
import { Globe, Users, Zap, Search, ShieldAlert } from 'lucide-react';

export function Services() {
  const services = [
    {
      title: 'Professional Digital Footprint',
      desc: 'If they can\'t find you, you don\'t exist. I build high-end sites that make you the obvious choice and win client trust immediately.',
      icon: Globe,
      color: 'bg-primary/10 text-primary',
      span: 'md:col-span-8',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Lead & Content Management',
      desc: 'Losing a lead is losing a paycheck. Simple CRM and CMS tools that require zero technical expertise to manage.',
      icon: Users,
      color: 'bg-secondary text-white',
      span: 'md:col-span-4'
    },
    {
      title: 'Workflow Automation',
      desc: 'Eliminate human error in mundane tasks. Custom systems that run themselves while you sleep.',
      icon: Zap,
      color: 'bg-tertiary text-white',
      span: 'md:col-span-4'
    },
    {
      title: 'Cost & Infrastructure Analysis',
      desc: 'Stop paying for ghost subscriptions. I audit your tech stack to cut the fat and dramatically reduce monthly overhead.',
      icon: Search,
      color: 'bg-surface-container-highest text-on-surface',
      span: 'md:col-span-8',
      image: 'https://images.unsplash.com/photo-1551288049-bbda64626d5b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '24/7 Safety Net',
      desc: 'Total peace of mind with on-call emergency support. No more sites crashing five minutes before a major launch.',
      icon: ShieldAlert,
      color: 'bg-on-surface text-surface',
      span: 'md:col-span-12'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface-container-low" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight font-headline text-on-surface">The Problem-Solver Service Grid</h2>
          <p className="text-secondary text-lg">You don’t need a vendor. You need a partner who fixes the leaks and builds systems that actually work.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`${service.span} bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow border border-outline-variant/5`}
              style={{ backgroundColor: service.image ? undefined : undefined }}
            >
              <div className={`${service.span === 'md:col-span-12' ? 'flex items-center gap-8' : ''}`}>
                <div className="flex-1">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{service.title}</h3>
                  <p className="text-secondary font-light leading-relaxed max-w-md">{service.desc}</p>
                </div>
                {service.image && (
                   <div className="mt-8 overflow-hidden rounded-lg aspect-[21/9] hidden md:block">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                      src={service.image} 
                      alt={service.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { title: 'The Tech Audit', desc: 'I go under the hood to identify every digital leak and bottleneck holding your growth back.' },
    { title: 'The Custom Build', desc: 'No cookie-cutters here. I implement high-performance systems tailored to your specific workflow.' },
    { title: 'The Handover', desc: 'Zero tech degree required. I deliver systems that are simple to manage and impossible to break.' },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface" id="process">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight font-headline">Simple Process. Real Results.</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[32px] left-0 w-full h-px bg-outline-variant/30 -z-10"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-surface-container-lowest border border-outline-variant/20 rounded-full flex items-center justify-center mx-auto mb-8 text-xl font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm font-headline">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline text-on-surface">{step.title}</h3>
              <p className="text-secondary leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
