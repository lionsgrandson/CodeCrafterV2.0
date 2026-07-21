type Gtag = (
  command: 'event',
  eventName: string,
  parameters: Record<string, string>,
) => void;

export function trackContactLead() {
  const gtag = (window as Window & { gtag?: Gtag }).gtag;

  gtag?.('event', 'generate_lead', {
    event_category: 'Contact',
    event_label: 'Contact Form Main',
  });
}
