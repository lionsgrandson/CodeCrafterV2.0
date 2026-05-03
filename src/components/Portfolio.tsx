import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function Portfolio() {
  const projects = [
    {
      title: 'Global Logistics Automation',
      before: 'Manual spreadsheets and 40% data error rate',
      after: 'Fully automated CRM with 0.5% error rate',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Architectural Project Portal',
      before: 'Scattered emails and slow client intake process',
      after: 'Self-service portal with 3x faster onboarding',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface-container-low" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight font-headline text-on-surface">Real Work. Real Results.</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-outline-variant/10"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={project.img} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white text-2xl font-bold font-headline">{project.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase font-bold text-secondary mb-1 tracking-widest">Before</p>
                    <p className="text-on-surface/70 text-sm font-light">{project.before}</p>
                  </div>
                  <div className="border-l border-outline-variant/30 pl-4">
                    <p className="text-xs uppercase font-bold text-primary mb-1 tracking-widest">After</p>
                    <p className="text-on-surface font-bold text-sm tracking-tight">{project.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    {
      name: 'Mark Henderson',
      role: 'CEO, VentureFlow',
      text: '"Finally, someone who speaks business first and code second. Our internal systems went from a mess to a machine in weeks."',
      avatar: 'https://i.pravatar.cc/150?u=mark',
    },
    {
      name: 'Sarah Jenkins',
      role: 'COO, CreativePulse',
      text: '"The automation Moshe built for us literally gave me back 10 hours a week. It\'s the best investment we made this year."',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      featured: true,
    },
    {
      name: 'David Chen',
      role: 'Founder, SecureRoot',
      text: '"Total peace of mind. I no longer worry about our security or if the website will crash during a launch."',
      avatar: 'https://i.pravatar.cc/150?u=david',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-surface" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight font-headline text-on-surface">Success Stories</h2>
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
                  <img className="w-full h-full object-cover" src={review.avatar} alt={review.name} referrerPolicy="no-referrer" />
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
