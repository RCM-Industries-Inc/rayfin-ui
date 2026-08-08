/**
 * Machine-readable identity for the RCM web foundation installed by shadcn.
 *
 * Component source is intentionally copied into consuming repositories. This
 * marker lets agents and validation scripts recognize the coordinated baseline
 * without making applications depend on rayfin-ui at runtime.
 */
export const RCM_WEB_FOUNDATION = {
  contractVersion: 1,
  release: '1.0.1',
  style: 'radix-nova',
  brandFoundation: {
    repository: 'RCM-Industries-Inc/rcm-toolkit',
    path: '.agents/skills/rcm-industries-design',
    skill: 'rcm-industries-design',
    baseline: 'Modern Teal v2',
  },
  webRegistry: 'RCM-Industries-Inc/rayfin-ui',
  requiredBrandAssets: [
    '/brand/Logo_RCM_Teal.png',
    '/brand/Logo_RCM_White.png',
  ],
} as const;
