type ResearchArtworkProps = {
  variant: "relationship" | "cooperation" | "education" | "culture";
};

export default function ResearchArtwork({ variant }: ResearchArtworkProps) {
  return (
    <div className={`research-art research-art-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 400 280" fill="none" focusable="false">
        <path className="research-art-grid" d="M0 70H400M0 140H400M0 210H400M100 0V280M200 0V280M300 0V280" />
        {variant === "relationship" && <>
          <circle className="research-art-line research-art-light" cx="155" cy="140" r="81" />
          <circle className="research-art-line research-art-red" cx="245" cy="140" r="81" />
          <path className="research-art-line research-art-light" d="M178 140H222M200 118V162" />
          <path className="research-art-fine research-art-light" d="M30 42H62M30 42V74M370 238H338M370 238V206" />
        </>}
        {variant === "cooperation" && <>
          <path className="research-art-line research-art-navy" d="M60 92H144Q178 92 178 126V188M60 188H144" />
          <path className="research-art-line research-art-red" d="M340 188H256Q222 188 222 154V92M340 92H256" />
          <path className="research-art-fine research-art-navy" d="M126 140H274" strokeDasharray="5 8" />
          <circle className="research-art-paper" cx="200" cy="140" r="23" />
          <path className="research-art-line research-art-red" d="M192 140H208M200 132V148" />
        </>}
        {variant === "education" && <>
          <path className="research-art-line research-art-navy" d="M69 78H151Q186 78 200 98Q214 78 249 78H331V208H249Q218 208 200 226Q182 208 151 208H69Z" />
          <path className="research-art-line research-art-red" d="M200 99V225" />
          <path className="research-art-fine research-art-navy" d="M97 114H155M97 140H164M97 166H155M241 114H303M237 140H303M246 166H303" />
          <path className="research-art-line research-art-red" d="M282 48V83M269 60H296" />
        </>}
        {variant === "culture" && <>
          <circle className="research-art-fine research-art-navy" cx="200" cy="140" r="95" strokeDasharray="3 9" />
          <path className="research-art-line research-art-navy" d="M142 99H258Q278 99 285 120L306 180Q312 201 295 207Q282 211 269 196L249 175H151L131 196Q118 211 105 207Q88 201 94 180L115 120Q122 99 142 99Z" />
          <path className="research-art-line research-art-red" d="M132 138H168M150 120V156" />
          <circle className="research-art-red-fill" cx="255" cy="126" r="8" />
          <circle className="research-art-red-fill" cx="276" cy="149" r="8" />
          <path className="research-art-fine research-art-red" d="M193 51V36M207 52L215 40M180 53L173 41" />
        </>}
      </svg>
    </div>
  );
}
