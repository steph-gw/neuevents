export default function SprigDivider() {
  return (
    <div className="hv2-sprig" aria-hidden>
      <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 H70" stroke="#B5893B" strokeWidth="1" fill="none" />
        <path d="M130,20 H200" stroke="#B5893B" strokeWidth="1" fill="none" />
        <g stroke="#B5893B" strokeWidth="1" fill="none">
          <ellipse cx="100" cy="20" rx="7" ry="3" />
          <ellipse cx="100" cy="20" rx="7" ry="3" transform="rotate(60 100 20)" />
          <ellipse cx="100" cy="20" rx="7" ry="3" transform="rotate(120 100 20)" />
          <circle cx="100" cy="20" r="2.4" />
        </g>
      </svg>
    </div>
  );
}
