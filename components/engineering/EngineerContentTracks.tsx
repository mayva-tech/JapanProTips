import type { EngineerContentTrack } from "@/lib/engineering-copy";

type EngineerContentTracksProps = {
  tracks: EngineerContentTrack[];
};

export function EngineerContentTracks({ tracks }: EngineerContentTracksProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {tracks.map((track) => (
        <article
          key={track.id}
          className="editorial-card border border-paper-edge bg-paper-card p-5"
        >
          <p className="editorial-kicker mb-2">{track.share}</p>
          <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-dark">
            {track.title}
          </h3>
          <p className="article-body mt-3 text-sm">{track.description}</p>
          <ul className="article-body mt-4 list-none space-y-2 pl-0 text-sm">
            {track.examples.map((example) => (
              <li
                key={example}
                className="before:mr-2 before:font-bold before:text-rust before:content-['›']"
              >
                {example}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
