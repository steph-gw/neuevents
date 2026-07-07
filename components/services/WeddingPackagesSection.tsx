import WeddingPackagesCollapsible from "@/components/services/WeddingPackagesCollapsible";

export default function WeddingPackagesSection() {
  return (
    <section id="wedding-services" className="svc-v2-section svc-v2-section--alt">
      <div className="hv2-wrap">
        <header className="svc-v2-section-header">
          <p className="hv2-eyebrow">Wedding Services</p>
          <h2 className="svc-v2-section-title hv2-serif">
            Planning Packages for
            <br />
            Every Couple
          </h2>
          <p className="svc-v2-section-lead">
            No matter the size, every wedding deserves careful planning and
            attention. Let us bring you peace of mind on your big day, knowing
            that we&apos;re there to help with all of your details.
          </p>
        </header>

        <WeddingPackagesCollapsible />
      </div>
    </section>
  );
}
