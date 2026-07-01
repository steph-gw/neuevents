import Image from "next/image";

type Props = {
  name: string;
  bookAs?: string;
  role: string;
  image: string;
  bookingUrl: string;
};

export default function ConsultCard({ name, bookAs, role, image, bookingUrl }: Props) {
  const bookingName = bookAs ?? name;

  return (
    <article className="consult-card">
      <div className="consult-card-photo">
        <Image src={image} alt={name} width={88} height={88} sizes="88px" />
      </div>
      <div className="consult-card-body">
        <h3 className="consult-card-name">{name}</h3>
        <p className="consult-card-role">{role}</p>
        <a
          href={bookingUrl}
          className="btn consult-card-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book with {bookingName}
        </a>
      </div>
    </article>
  );
}
