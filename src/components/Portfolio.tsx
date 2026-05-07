import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '../App';

export function Portfolio() {
  const { t } = useLanguage();
  const projects = t.portfolio.projects.map((project, idx) => ({
    ...project,
    img: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800', // Furniture/Mahogony
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', // Lecture/Yuval
      'https://images.unsplash.com/photo-1594608661623-aa0bd3a07d9d?auto=format&fit=crop&q=80&w=800', // Rainbow/Autism
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', // Therapy
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', // Tax
      'https://images.unsplash.com/photo-1541462608141-ad4d157ee921?auto=format&fit=crop&q=80&w=800', // Creative Portfolio
    ][idx % 6]
  }));

  return (
    <section className="py-24 px-6 md:px-8 bg-surface-container-low" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight font-headline text-on-surface">{t.portfolio.headline}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.a 
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 flex flex-col h-full"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" 
                  src={project.img} 
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold font-headline">{project.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-secondary mb-1 tracking-widest opacity-60">{t.portfolio.before}</p>
                    <p className="text-on-surface/70 text-sm font-light leading-snug">{project.before}</p>
                  </div>
                  <div className="border-t border-outline-variant/20 pt-4">
                    <p className="text-[10px] uppercase font-bold text-primary mb-1 tracking-widest">{t.portfolio.after}</p>
                    <p className="text-on-surface font-bold text-sm tracking-tight leading-snug">{project.after}</p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const reviews = [
    {
      name: t.testimonials.items[0].name,
      role: t.testimonials.items[0].role,
      text: t.testimonials.items[0].text,
      avatar: 'https://i.pravatar.cc/150?u=mark',
    },
    {
      name: t.testimonials.items[1].name,
      role: t.testimonials.items[1].role,
      text: t.testimonials.items[1].text,
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      featured: true,
    },
    {
      name: t.testimonials.items[2].name,
      role: t.testimonials.items[2].role,
      text: t.testimonials.items[2].text,
      avatar: 'https://i.pravatar.cc/150?u=david',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight font-headline text-on-surface">{t.testimonials.headline}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-xl flex flex-col shadow-sm border-t-4 transition-all hover:-translate-y-1 ${review.featured ? 'bg-surface-container-high border-primary' : 'bg-surface-container-low border-transparent'}`}
            >
              <div className="flex text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <p className="text-lg font-light text-on-surface-variant mb-8 flex-1 leading-relaxed italic">
                {review.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 ring-2 ring-primary/10">
                  <img className="w-full h-full object-cover" src={review.avatar} alt={review.name} loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-on-surface font-headline tracking-tight">{review.name}</p>
                  <p className="text-xs text-secondary uppercase font-bold tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
