import type { EngineeringService } from "@/lib/engineering-copy";

type ServiceGridProps = {
  services: EngineeringService[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {services.map((service) => (
        <article
          key={service.id}
          className="editorial-card flex flex-col border border-paper-edge bg-paper-card p-6"
        >
          <h3 className="editorial-heading mb-3 text-ink">{service.title}</h3>
          <p className="article-body mb-4 flex-1">{service.description}</p>
          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-dark">
            Typical deliverables
          </p>
          <ul className="article-body mb-4 list-none space-y-2 pl-0">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="before:mr-2 before:font-bold before:text-rust before:content-['›']"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="font-sans text-sm font-bold text-muted">
            {service.pricingPlaceholder}
          </p>
        </article>
      ))}
    </div>
  );
}
