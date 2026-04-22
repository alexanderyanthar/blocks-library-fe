interface PageHeroProps {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroBackgroundColour?: string | null;
}

export default function PageHero({ heroTitle, heroSubtitle, heroBackgroundColour }: PageHeroProps) {
  if (!heroTitle && !heroSubtitle && !heroBackgroundColour) return null;

  return (
    <div
      className="w-full px-6 py-16 mb-8"
      style={{ backgroundColor: heroBackgroundColour ?? "transparent" }}
    >
      {heroTitle && (
        <h2 className="text-4xl font-bold mb-4">{heroTitle}</h2>
      )}
      {heroSubtitle && (
        <p className="text-lg">{heroSubtitle}</p>
      )}
    </div>
  );
}
