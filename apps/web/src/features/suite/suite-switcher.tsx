"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rallly/ui/dropdown-menu";
import { Icon } from "@rallly/ui/icon";
import { SidebarMenuButton, SidebarMenuItem } from "@rallly/ui/sidebar";
import { HomeIcon, LayoutGridIcon } from "lucide-react";
import React from "react";
import { CURRENT_SUBDOMAIN, suiteTools } from "@/features/suite/tools";

const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://app.wanakusuite.com";

/**
 * Cross-app "waffle" switcher for the Wanaku Suite — Rally's analog of the
 * shared `SuiteSwitcher` in the other tools, built on Rally's own dropdown +
 * sidebar primitives. It mirrors the portal launcher: only tools the signed-in
 * user can access are shown. Accessible slugs come from the portal's
 * `/api/suite/access` endpoint (the `.wanakusuite.com` session cookie is sent
 * cross-subdomain). It fails OPEN — if that fetch hasn't resolved or errors,
 * every tool is shown, since each tool gates access on its own server.
 */
export function SuiteSwitcher() {
  // null = not loaded / failed → fail open (show all). A Set → filter to it.
  const [accessible, setAccessible] = React.useState<Set<string> | null>(null);

  React.useEffect(() => {
    let active = true;
    fetch(`${portalUrl}/api/suite/access`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data && Array.isArray(data.slugs)) {
          setAccessible(new Set<string>(data.slugs));
        }
      })
      .catch(() => {
        /* fail open — leave accessible null */
      });
    return () => {
      active = false;
    };
  }, []);

  const canSee = (slug: string) =>
    accessible === null || accessible.has(slug) || slug === CURRENT_SUBDOMAIN;

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <LayoutGridIcon />
            <span>Wanaku Suite</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end" className="w-56">
          <DropdownMenuItem asChild>
            <a href={portalUrl}>
              <Icon>
                <HomeIcon />
              </Icon>
              Wanaku Portal
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            Tools
          </DropdownMenuLabel>
          {suiteTools
            .filter((tool) => canSee(tool.subdomain))
            .map((tool) => {
              const isCurrent = tool.subdomain === CURRENT_SUBDOMAIN;
              if (isCurrent) {
                return (
                  <DropdownMenuItem
                    key={tool.subdomain}
                    disabled
                    className={`border-l-2 ${tool.accent} font-medium text-primary opacity-100`}
                  >
                    {tool.name}
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem
                  key={tool.subdomain}
                  asChild
                  className={`border-l-2 ${tool.accent}`}
                >
                  <a href={tool.href}>{tool.name}</a>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
