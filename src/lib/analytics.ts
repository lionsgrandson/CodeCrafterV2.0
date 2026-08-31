type Gtag = (
  command: 'event',
  eventName: string,
  parameters: Record<string, string>,
) => void;

type TrackedWindow = Window & {
  gtag?: Gtag;
  __codecrafterContactTrackingInstalled?: boolean;
};

function getGtag() {
  return (window as TrackedWindow).gtag;
}

export function trackContactLead() {
  getGtag()?.('event', 'generate_lead', {
    event_category: 'Contact',
    event_label: 'Contact Form Main',
  });
}

export function installContactClickTracking() {
  const trackedWindow = window as TrackedWindow;
  if (trackedWindow.__codecrafterContactTrackingInstalled) return;
  trackedWindow.__codecrafterContactTrackingInstalled = true;

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const link = target?.closest('a[href]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href') ?? '';
    let channel = '';
    if (/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)/i.test(href)) channel = 'whatsapp';
    else if (href.startsWith('tel:')) channel = 'phone';
    else if (href.startsWith('mailto:')) channel = 'email';
    if (!channel) return;

    getGtag()?.('event', 'contact_click', {
      event_category: 'Contact',
      event_label: channel,
      contact_channel: channel,
      page_path: window.location.pathname,
    });
  });
}
