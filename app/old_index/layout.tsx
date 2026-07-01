import LegacySkin from "@/components/LegacySkin";

export default function OldIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LegacySkin>{children}</LegacySkin>;
}
