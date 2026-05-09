import { motion } from 'motion/react';
import { Globe, Users, Zap, Search, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../App';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.services.items[0].title,
      desc: t.services.items[0].desc,
      icon: Globe,
      color: 'bg-primary/10 text-primary',
      span: 'md:col-span-8',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
      icon: Users,
      color: 'bg-secondary text-white',
      span: 'md:col-span-4',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
      icon: Zap,
      color: 'bg-tertiary text-white',
      span: 'md:col-span-4',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
      icon: Search,
      color: 'bg-surface-container-highest text-on-surface',
      span: 'md:col-span-8',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=900'
    },
    {
      title: t.services.items[4].title,
      desc: t.services.items[4].desc,
      icon: ShieldAlert,
      color: 'bg-on-surface text-surface',
      span: 'md:col-span-12',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface-container-low" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-start max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight font-headline text-on-surface">{t.services.headline}</h2>
          <p className="text-secondary text-lg font-light">{t.services.subline}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`${service.span} bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/10 cursor-default`}
            >
              <div className={`${service.span === 'md:col-span-12' ? 'flex flex-col md:flex-row items-center gap-8' : ''}`}>
                <div className="flex-1 w-full">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{service.title}</h3>
                  <p className="text-secondary font-light leading-relaxed max-w-md">{service.desc}</p>
                </div>
                <div className={`${service.span === 'md:col-span-12' ? 'mt-8 md:mt-0 md:w-[42%]' : 'mt-8'} overflow-hidden rounded-lg aspect-[21/9]`}>
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                      src={service.image} 
                      alt={service.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLanguage();
  const steps = [
    { title: t.process.steps[0].title, desc: t.process.steps[0].desc },
    { title: t.process.steps[1].title, desc: t.process.steps[1].desc },
    { title: t.process.steps[2].title, desc: t.process.steps[2].desc },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface" id="process">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight font-headline text-on-surface">{t.process.headline}</h2>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-[32px] right-0 left-0 h-px bg-outline-variant/30 -z-10"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={false}
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
