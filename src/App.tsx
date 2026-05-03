import { Navbar, Hero } from './components/Hero';
import { Services, Process } from './components/Services';
import { Portfolio, Testimonials } from './components/Portfolio';
import { WhyWorkWithMe, FinalCTA, Footer } from './components/Footer';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <WhyWorkWithMe />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
