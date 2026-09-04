type Gtag = (
  command: 'event',
  eventName: string,
  parameters: Record<string, string | number | boolean>,
) => void;

type Clarity = (command: 'event', eventName: string) => void;

type TrackedWindow = Window & {
  gtag?: Gtag;
  clarity?: Clarity;
  __codecrafterContactTrackingInstalled?: boolean;
};

function getGtag() {
  return (window as TrackedWindow).gtag;
}

function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  getGtag()?.('event', eventName, parameters);
  (window as TrackedWindow).clarity?.('event', eventName);
}

export function trackContactLead() {
  trackEvent('generate_lead', {
    event_category: 'Contact',
    event_label: 'Contact Form Main',
    page_path: window.location.pathname,
  });
}

export function trackContactFormStart() {
  trackEvent('form_start', {
    event_category: 'Contact',
    form_name: 'Contact Form Main',
    page_path: window.location.pathname,
  });
}

export function trackContactFormSubmit() {
  trackEvent('form_submit', {
    event_category: 'Contact',
    form_name: 'Contact Form Main',
    page_path: window.location.pathname,
  });
}

export function trackContactFormError(errorType: string) {
  trackEvent('form_error', {
    event_category: 'Contact',
    form_name: 'Contact Form Main',
    error_type: errorType,
    page_path: window.location.pathname,
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
    const explicitEvent = link.dataset.analytics;
    const sectionId = link.closest<HTMLElement>('[id]')?.id;
    const placement =
      link.dataset.placement ??
      sectionId ??
      (link.closest('nav') ? 'navigation' : link.closest('footer') ? 'footer' : 'page');

    const ctaEvent = explicitEvent ?? (/#contact(?:-page)?$/.test(href) ? 'cta_click' : '');
    if (ctaEvent) {
      trackEvent(ctaEvent, {
        event_category: 'CTA',
        event_label: placement,
        link_url: href,
        page_path: window.location.pathname,
      });
    }

    let channel = '';
    if (/^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)/i.test(href)) channel = 'whatsapp';
    else if (href.startsWith('tel:')) channel = 'phone';
    else if (href.startsWith('mailto:')) channel = 'email';
    if (!channel) return;

    trackEvent('contact_click', {
      event_category: 'Contact',
      event_label: channel,
      contact_channel: channel,
      contact_placement: placement,
      page_path: window.location.pathname,
    });
  });
}
