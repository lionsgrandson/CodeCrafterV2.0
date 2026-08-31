# CodeCrafter SEO baseline from Google Search Console

Source: Google Search Console export uploaded on 2026-08-31.

## Export scope

Search type: Web

Date range: Last 3 months

Total from daily chart: 21 clicks and 1,630 impressions.

The query export contains fewer totals because Search Console omits some low volume and anonymized queries from query level exports. Do not use the query table as the sitewide click total.

## Device baseline

| Device | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Desktop | 12 | 1,101 | 1.09% | 17.08 |
| Mobile | 8 | 525 | 1.52% | 13.16 |
| Tablet | 1 | 4 | 25% | 24.25 |

## Country baseline

| Country | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Israel | 15 | 1,232 | 1.22% | 16.78 |
| United States | 2 | 223 | 0.90% | 11.23 |
| United Kingdom | 0 | 13 | 0% | 14.31 |

The business has also confirmed client history in Israel, the United Kingdom, and the United States. Do not convert client history into a physical office or local service area claim.

## Highest impression pages

| Page | Clicks | Impressions | CTR | Average position | Action |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 10 | 841 | 1.19% | 4.66 | Improve title and intent match while protecting broad commercial ownership |
| `/app-development/` | 0 | 221 | 0% | 39.99 | Strengthen exact Hebrew app intent and internal links |
| `/amitStarProject/` | 5 | 205 | 2.44% | 9.51 | Keep standalone demo out of the commercial index because it is not a CodeCrafter service topic |
| `/custom-software/` | 0 | 74 | 0% | 48.89 | Target `פיתוח תוכנה בהתאמה אישית` explicitly |
| `/en/websites/` | 0 | 68 | 0% | 52.50 | Target website development company intent without competing with the English homepage |
| `/crm-development/` | 0 | 62 | 0% | 27.29 | Own custom CRM development intent |
| `/portfolio/yuval-kadosh/` | 0 | 61 | 0% | 8.33 | Preserve branded project intent |
| `/automation/` | 1 | 42 | 2.38% | 32.74 | Keep business automation intent separate from integrations |
| `/en/` | 4 | 18 | 22.22% | 4.94 | Keep broad English commercial ownership |

## Query opportunities

| Query | Impressions | Average position | Intended owner |
| --- | ---: | ---: | --- |
| `web development company israel` | 160 | 2.34 | `/en/` |
| `custom web development in israel` | 106 | 14.70 | `/en/websites/` |
| `פיתוח תוכנה בהתאמה אישית` | 62 | 45.42 | `/custom-software/` |
| `פיתוח אפליקציה לעסק` | 41 | 40.83 | `/app-development/` |
| `web development services` | 23 | 5.13 | `/en/` |
| `הקמת אפליקציה לנייד לעסק` | 23 | 40.30 | `/app-development/` |
| `website development israel` | 20 | 8.00 | `/en/websites/` |
| `פיתוח אפליקציה לנייד לעסקים` | 19 | 32.58 | `/app-development/` |
| `פיתוח אפליקציית לקוחות` | 18 | 32.78 | `/app-development/` |
| `פיתוח מערכת crm בהתאמה אישית` | 14 | 10.79 | `/crm-development/` |
| `web design company israel` | 14 | 1.07 | `/en/websites/` |
| `website development company israel` | 14 | 1.07 | `/en/websites/` |
| `פיתוח מערכת בהתאמה אישית` | 14 | 22.21 | `/custom-software/` |
| `פיתוח crm מותאם אישית` | 13 | 12.31 | `/crm-development/` |
| `custom website development israel` | 11 | 1.18 | `/en/websites/` |
| `custom software development israel` | 3 | 2.00 | `/en/custom-software/` |
| `ecommerce website development israel` | 6 | 2.50 | `/en/websites/` for now; split only if volume grows enough to justify a unique ecommerce page |

## Branded and project queries

`עמית קדוש` generated 162 impressions and 2 clicks. This belongs to the standalone portfolio project, not the CodeCrafter commercial topic. The build already applies noindex to the standalone Amit demo so the main domain can stay focused on CodeCrafter services.

`יובל קדוש` generated 42 impressions at an average position of 8.12. This belongs to the Yuval Kadosh case study rather than a general service page.

`codecrafter` generated 7 impressions and 1 click at an average position of 2.29. Brand entity consistency should use `CodeCrafter Moshe Schwartzberg` as the full public business name while keeping `CodeCrafter` as the recognizable short brand.

## Cannibalization rules

1. The English homepage owns the broad query `web development company israel` and broad multi service commercial intent.
2. The English websites page owns website specific queries such as `website development company israel`, `custom website development israel`, and web design variants.
3. Custom software pages own software and system development queries. They should not be rewritten as website pages.
4. The app page owns all mobile app creation variants rather than creating thin pages for every wording variation.
5. CRM owns CRM development and CRM cost queries.
6. Automation owns workflow automation. Integrations owns system to system connection intent.
7. Local pages combine the service topic with a real service area and delivery mode. They must not copy each other with only the city changed.
8. Pricing owns generic cost and price intent. Individual service pages may include short price references and should link back to the pricing hub.

## Limitation of this export

The uploaded Search Console files provide separate aggregate query and page tables. They do not provide a query by page matrix, so they cannot prove which URL currently receives each query impression. The ownership map above is the intended architecture based on the aggregate opportunities, existing page roles, and the competitor blueprint.

For a true cannibalization audit later, export Search Console with individual queries filtered by Pages, or provide Search Console API data containing query plus page dimensions.
