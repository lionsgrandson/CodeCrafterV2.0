// The legacy portfolio translations use parallel arrays for project details
// and image assets. Keep project case-study destinations in one shared map
// so visible cards and structured data always link to the same internal page.
export const portfolioCaseStudySlugsByIndex: Record<number, string> = {
  0: 'portfolio/yuval-kadosh',
  1: 'portfolio/rainbow-asd',
  3: 'portfolio/sumsup',
  7: 'portfolio/project-orion',
  8: 'portfolio/shimon-photography',
  9: 'portfolio/aderet-argaman',
  10: 'portfolio/coderecovery',
}

export const additionalCaseStudySlugsById: Record<string, string> = {
  'ilan-shachar': 'portfolio/ilan-shachar',
  'green-therapy': 'portfolio/green-therapy',
}
