# CodeCrafter 2026 service architecture

Date: 2026-09-17

This document records the search-intent and factual-scope decisions behind the September 2026 commercial expansion. It is a maintenance guide, not marketing copy.

## Research inputs

- The existing Google Search Console baseline remains authoritative for demonstrated demand on app development, custom software, CRM, automation, English website development, and the English homepage.
- Oracle's public explanation of ERP was used only as a conceptual reference for connected business processes, shared data, cross-department workflows, and a single source of truth. CodeCrafter does not claim to sell or implement Oracle ERP.
- Codit, Sheleg, and Webshuk pages were reviewed only for the breadth of terminology customers may encounter. No competitor prose, claims, projects, prices, metrics, or case studies were reused.
- The new ERP, inventory, portal, and Web App pages use original CodeCrafter copy and deliberately state capability boundaries.

The repository has no verified keyword-volume export for the new ERP family. For that reason, targeting uses clear category terminology rather than invented volume figures. Search Console should determine later refinements after the pages have enough impressions.

## Intent ownership

| Route | Primary intent | Closest page | Distinction |
| --- | --- | --- | --- |
| `/erp-development/` | Integrated multi-module business management | `/custom-software/` | ERP crosses departments through shared data and workflows; custom software remains the broad category and can solve one focused process. |
| `/inventory-systems/` | Stock, warehouse, location, and movement history | `/erp-development/` | Inventory owns physical and logical stock operations; ERP owns the cross-department connection. |
| `/business-portals/` | Authenticated self-service for external or internal audiences | `/web-app-development/` | A portal is defined by audience, identity, permitted information, and requests; Web App is the broader browser-software category. |
| `/web-app-development/` | Interactive operational software in a browser | `/app-development/` | Web Apps run in a browser; the app page retains installed/mobile-focused intent. |
| `/crm-development/` | Leads, customers, sales, and service relationships | `/erp-development/` | CRM owns the relationship lifecycle; ERP connects that information to broader operations. |
| `/locations/north/` | Real northern service area and delivery mode | city pages | The regional page connects Haifa remote delivery and Karmiel meeting availability without claiming a branch. |
| `/locations/center/` | Real central service area and delivery mode | Tel Aviv page | The regional page covers central delivery while the Tel Aviv page retains its specific arranged-meeting detail. |

## Pages deliberately not created

- Project-management systems: addressed as a module within custom software and ERP because the current evidence does not establish a separate commercial intent strong enough for a substantial page.
- Customer-service systems: addressed within CRM, portals, and ERP; a separate page would currently overlap those owners.
- Order management, procurement, supplier management, and dashboards: included as capabilities and modules, not published as thin standalone pages.
- Additional city pages: not created because there is no verified differentiated delivery model or physical presence to support them.

## ERP truth boundaries

CodeCrafter may position the service as modular custom business-management software, an ERP-style platform, or a verified extension/integration around an existing ERP. The site must not imply:

- sale or partnership with Oracle, SAP, Priority, or another named ERP vendor;
- certified accounting, payroll, tax, statutory reporting, manufacturing MRP, or regulatory modules;
- a guaranteed integration before API, permissions, licensing, and provider constraints are checked;
- a fixed price before modules, users, migration, reports, permissions, integrations, security, and maintenance are scoped.

## Geography truth boundaries

CodeCrafter does not claim offices or branches in Tel Aviv, Haifa, Jerusalem, Beer Sheva, Northern Israel, or Central Israel. Location pages state service availability and the factual meeting/remote-delivery mode already established in the repository.

## Measurement plan

1. Preserve existing titles and intent ownership for pages with demonstrated impressions unless page/query evidence supports a change.
2. Monitor the four new service pairs by query and page after discovery and indexing.
3. Strengthen the existing owner when several wording variants express the same intent.
4. Create supporting informational content only when it answers a distinct question and can link naturally to the commercial owner.
5. Do not infer indexing from a successful deployment or live URL test; report Search Console's actual state separately.
