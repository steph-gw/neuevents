import type { Metadata } from "next";
import ClientPerksDirectory from "@/components/perks/ClientPerksDirectory";
import ClientPerksGate from "@/components/perks/ClientPerksGate";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Client Perks | neu events",
    description: "Exclusive vendor perks for neu events clients.",
    openGraphTitle: "Client Perks | neu events",
    openGraphDescription: "Exclusive vendor perks for neu events clients.",
    path: "/just-for-clients",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function JustForClientsPage() {
  return (
    <main className="client-perks-v2-page">
      <ClientPerksGate>
        <ClientPerksDirectory />
      </ClientPerksGate>
    </main>
  );
}
