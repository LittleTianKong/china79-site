export default function AboutOriginArtwork() {
  return (
    <div className="about-origin-art" aria-hidden="true">
      <svg viewBox="0 0 520 300" fill="none" focusable="false">
        <path
          className="about-origin-grid"
          d="M60 50H460M60 100H460M60 150H460M60 200H460M60 250H460M60 50V250M110 50V250M160 50V250M210 50V250M260 50V250M310 50V250M360 50V250M410 50V250M460 50V250"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          className="about-origin-line"
          d="M110 150H410"
          stroke="currentColor"
          strokeWidth="1"
        />
        <g transform="translate(147.2 51.6) scale(.6)">
          <path
            className="about-origin-bracket about-origin-accent"
            d="M158 14H14V314H158V258H74V70H158Z"
            fill="currentColor"
          />
          <path
            className="about-origin-bracket"
            d="M218 14H362V314H218V258H302V70H218Z"
            fill="currentColor"
          />
        </g>
        <rect className="about-origin-accent" x="254" y="144" width="12" height="12" fill="currentColor" />
      </svg>
    </div>
  );
}
