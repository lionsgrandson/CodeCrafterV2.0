import type { SeoPage } from './seoPages'

// English originals for the established Hebrew case studies. Generic automatic
// fallback translations obscure real search intent and can leak Hebrew H1s into
// English pages. Keep all claims limited to documented public project facts.
export const englishCaseStudyContent: Record<string, Partial<SeoPage>> = {
  'portfolio/sumsup': {
    title: 'SumsUp White-Label Tax Services Website | CodeCrafter Case Study',
    description: 'How CodeCrafter presented SumsUp, a white-label tax preparation and planning platform for bookkeeping firms, through a clear business website.',
    h1: 'SumsUp — explaining a white-label tax services platform',
    intro: [
      'SumsUp helps bookkeeping firms offer tax preparation and planning under their own brand with a specialist team working behind the scenes. The website needed to make this less familiar delivery model understandable to busy business owners.',
      'The central task was to connect the bookkeeping firm’s need to expand services with a clear explanation of the platform, without implying that the firm must refer its clients elsewhere or hire an in-house tax team.',
    ],
    sections: [
      { heading: 'The challenge', paragraphs: ['A white-label service can be difficult to explain. Visitors need to understand who serves the client, what remains under the bookkeeping firm’s brand, and why the arrangement differs from a normal referral.'] },
      { heading: 'What was built', items: ['A progressive explanation of the service model', 'Copy connecting growth, client continuity, and reduced operational overhead', 'Responsive content structured for bookkeeping firms', 'Clear pathways from the explanation to an enquiry'] },
      { heading: 'Implementation and verification boundaries', paragraphs: ['The public deliverable is a responsive business website organized around the value proposition and visitor journey. The case study does not claim a specific technology stack, conversion rate, revenue increase, or operational performance result without supporting project evidence.'] },
      { heading: 'What visitors can verify', paragraphs: ['SumsUp has a public-facing website explaining its white-label tax services to bookkeeping firms. The live project and relevant CodeCrafter development service pages are linked below.'] },
    ],
  },
  'portfolio/coderecovery': {
    title: 'CodeRecovery Data Recovery Website | CodeCrafter Case Study',
    description: 'A responsive service website for a data recovery laboratory, presenting diagnosis, practical information and clear contact routes without unverified success claims.',
    h1: 'CodeRecovery — a clear service website for data recovery',
    intro: [
      'People looking for data recovery may be dealing with an urgent equipment or file problem. The site needed to explain the service in accessible language and make the next contact step clear.',
      'The public project presents the laboratory’s work without claiming a recovery outcome before a professional diagnosis.',
    ],
    sections: [
      { heading: 'The visitor problem', paragraphs: ['Technical recovery work can be unfamiliar to a customer. The public-facing page needs to reduce confusion and help a visitor understand when and how to request an assessment.'] },
      { heading: 'The website approach', items: ['Straightforward explanations of a technical service', 'A clear information hierarchy', 'Responsive presentation for desktop and mobile', 'Visible pathways to make contact'] },
      { heading: 'Evidence and limitations', paragraphs: ['The published service site is the evidence for this case study, and a screenshot is hosted within the CodeCrafter portfolio. Recovery rates, lead totals, technical equipment, and private client data are not claimed without verified documentation.'] },
    ],
  },
  'portfolio/yuval-kadosh': {
    title: 'Yuval Kadosh Speaker and Coaching Website | CodeCrafter Case Study',
    description: 'A Hebrew website that brings together Yuval Kadosh’s personal story, speaking, writing and coaching services in one navigable experience.',
    h1: 'Yuval Kadosh — one home for speaking, writing and coaching',
    intro: [
      'Yuval Kadosh is an author, speaker and mentor whose work spans personal resilience, storytelling and coaching. The website needed to present these activities together without losing the human story behind them.',
      'A visitor can explore the story and services through a single organized experience, rather than trying to piece them together from disconnected material.',
    ],
    sections: [
      { heading: 'The content challenge', paragraphs: ['The website needed to make a personal narrative and several professional offerings understandable while keeping contact and enquiry routes simple.'] },
      { heading: 'The result visible on the website', items: ['A central home for the story and professional offerings', 'Readable Hebrew content hierarchy', 'Responsive presentation', 'Clear next steps for visitors exploring coaching or speaking'] },
      { heading: 'Evidence and limitations', paragraphs: ['The live project brings the public-facing activities together. This case study does not imply unprovided booking statistics, conversion rates, or revenue results.'] },
    ],
  },
  'portfolio/project-orion': {
    title: 'Project Orion Strategic Consulting Website | CodeCrafter Case Study',
    description: 'A discreet business website presenting strategic consulting, business intelligence, cybersecurity and security-oriented services with clear navigation.',
    h1: 'Project Orion — a discreet consulting website',
    intro: [
      'Project Orion needed a professional public presence for strategic consulting, business intelligence, cybersecurity and security-related services.',
      'The task was to clarify service categories and guide relevant enquiries without publishing client-sensitive details or making technical security assertions that cannot be publicly verified.',
    ],
    sections: [
      { heading: 'The communication challenge', paragraphs: ['Visitors need to understand the organization’s areas of work quickly. A restrained design and clear language are particularly important where the service itself involves confidentiality.'] },
      { heading: 'The public-facing solution', items: ['Organized service descriptions', 'Responsive layout and accessible navigation', 'A deliberate hierarchy between overview and contact', 'Presentation appropriate to discreet consulting services'] },
      { heading: 'What is and is not claimed', paragraphs: ['The case study describes the public website only. It does not reveal private clients, internal intelligence practices, security architecture, vendor certifications, or results that are not publicly documented.'] },
    ],
  },
}
