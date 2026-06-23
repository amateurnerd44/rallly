/**
 * The Wanaku Suite tool list — the data behind the cross-app switcher.
 *
 * Mirrors the canonical list shared across the suite (see `repsuite-core`'s
 * `lib/suite/tools.ts`). When the suite gains or loses a tool, re-sync this file
 * so Rally's switcher shows the same set as every other tool.
 */
export type SuiteTool = {
  /** Display name in the switcher. */
  name: string;
  /** Full-origin destination. */
  href: string;
  /** Stable subdomain id — used to mark the current tool. */
  subdomain: string;
  /** Tailwind border-color class for the accent stripe. */
  accent: string;
};

export const suiteTools: SuiteTool[] = [
  {
    name: "Orders",
    href: "https://orders.wanakusuite.com",
    subdomain: "orders",
    accent: "border-blue-500",
  },
  {
    name: "Sign Docs",
    href: "https://sign.wanakusuite.com",
    subdomain: "sign",
    accent: "border-emerald-500",
  },
  {
    name: "Email Blast",
    href: "https://mail.wanakusuite.com",
    subdomain: "mail",
    accent: "border-amber-500",
  },
  {
    name: "Catalog Flip",
    href: "https://zine.wanakusuite.com",
    subdomain: "zine",
    accent: "border-purple-500",
  },
  {
    name: "Rally",
    href: "https://rally.wanakusuite.com",
    subdomain: "rally",
    accent: "border-rose-500",
  },
  {
    name: "Fancy Forms",
    href: "https://forms.wanakusuite.com",
    subdomain: "forms",
    accent: "border-indigo-500",
  },
  {
    name: "Catalog Pricer",
    href: "https://pricer.wanakusuite.com",
    subdomain: "pricer",
    accent: "border-teal-500",
  },
  {
    name: "Product Info",
    href: "https://products.wanakusuite.com",
    subdomain: "products",
    accent: "border-cyan-500",
  },
];

/** This app's own subdomain — highlighted + non-navigable in the switcher. */
export const CURRENT_SUBDOMAIN = "rally";
