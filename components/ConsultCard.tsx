import Image from "next/image";

type Props = {
  name: string;
  role: string;
  image: string;
  bookingUrl: string;
};

export default function ConsultCard({ name, role, image, bookingUrl }: Props) {
  return (
    <article className="consult-card">
      <div className="consult-card-photo">
        <Image src={image} alt={name} width={72} height={72} sizes="72px" />
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
          Book with {name}
        </a>
      </div>
    </article>
  );
}
