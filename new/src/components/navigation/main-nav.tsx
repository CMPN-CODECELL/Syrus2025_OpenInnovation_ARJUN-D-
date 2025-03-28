"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@/components/wallet/connect-button";
import { useWeb3 } from "@/components/wallet/web3-provider";

export function MainNav() {
  const pathname = usePathname();
  const { isConnected, address } = useWeb3();

  const isMentorAuth = pathname === "/mentor-auth" || pathname.startsWith("/mentor-auth/");
  const isDashboardMentor = pathname.startsWith("/dashboard-mentor");
  const isMentorSection = isMentorAuth || isDashboardMentor;

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      active: pathname === "/marketplace",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
      hidden: isMentorSection,
    },
    {
      href: "/dashboard-mentor",
      label: "Mentor Dashboard",
      active: isDashboardMentor,
      hidden: !isConnected || isMentorAuth,
    },
  ];

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      {routes
        .filter(route => !route.hidden)
        .map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}

      {/* Mentor Button - only show on home page when not connected */}
      {pathname === "/" && !isConnected && (
        <Button asChild variant="outline" className="ml-4 bg-emerald-500 text-white hover:bg-emerald-600">
          <Link href="/mentor-auth">Become a Mentor</Link>
        </Button>
      )}
      
      {/* Show wallet connect button on mentor-auth and dashboard-mentor pages */}
      {isMentorSection && (
        <ConnectButton />
      )}
    </div>
  );
} 