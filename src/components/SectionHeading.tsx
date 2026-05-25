type SectionHeadingProps = {
  label: string;
  id: string;
};

export default function SectionHeading({ label, id }: SectionHeadingProps): JSX.Element {
  return (
    <>
      <div
        className="pf-section-heading pf-section-heading--mobile sticky top-0 z-30 -mx-2 mt-8 w-full bg-surface/80 px-4 py-2 backdrop-blur lg:hidden"
        data-section={id}
      >
        <span className="text-base font-bold uppercase tracking-wide ink-strong">{label}</span>
      </div>
      <div
        className="pf-section-heading pf-section-heading--desktop mb-6 hidden w-full px-2 pl-4 lg:block"
        data-section={id}
      >
        <span className="text-base font-bold uppercase tracking-wide ink-strong">{label}</span>
      </div>
      <h2 id={`${id}-heading`} className="sr-only">
        {label}
      </h2>
    </>
  );
}
