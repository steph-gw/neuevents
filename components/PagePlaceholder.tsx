import InquiryButton from "@/components/InquiryButton";

type Props = {
  eyebrow: string;
  title: string;
  titleEm?: string;
  description: string;
};

export default function PagePlaceholder({
  eyebrow,
  title,
  titleEm,
  description,
}: Props) {
  return (
    <main className="page-placeholder">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="section-title">
        {title}
        {titleEm ? (
          <>
            <br />
            <em>{titleEm}</em>
          </>
        ) : null}
      </h1>
      <p className="page-placeholder-desc">{description}</p>
      <InquiryButton className="btn btn-light" />
    </main>
  );
}
