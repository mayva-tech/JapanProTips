"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GuideCarouselCard } from "@/components/editorial/GuideCarouselCard";
import { HOME_GUIDE_CAROUSEL_ITEMS } from "@/lib/home-guide-carousel";
import { cn } from "@/lib/utils";

const ITEM_COUNT = HOME_GUIDE_CAROUSEL_ITEMS.length;
const AUTO_SCROLL_MS = 5500;
const RESUME_DELAY_MS = 4500;
const PROGRAMMATIC_SCROLL_UNLOCK_MS = 700;

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const label = direction === "left" ? "Previous guides" : "Next guides";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full",
        "h-11 w-11 bg-black/50 text-paper-card shadow-editorial backdrop-blur-sm transition",
        "hover:bg-black/65 active:scale-95 sm:h-12 sm:w-12",
        direction === "left" ? "left-2 sm:left-3" : "right-2 sm:right-3",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

function normalizeIndex(index: number): number {
  return ((index % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT;
}

function getSlideScrollLeft(track: HTMLElement, index: number): number {
  const slide = track.querySelectorAll<HTMLElement>("[data-carousel-slide]")[
    index
  ];
  if (!slide) return 0;
  return slide.offsetLeft;
}

export function ImportantGuidesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const isInViewRef = useRef(true);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const activeIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  activeIndexRef.current = activeIndex;

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const clearUnlockTimer = useCallback(() => {
    if (unlockTimerRef.current) {
      clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
  }, []);

  const pauseAutoScroll = useCallback(() => {
    pausedRef.current = true;
    clearResumeTimer();
  }, [clearResumeTimer]);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current && isInViewRef.current) {
        pausedRef.current = false;
      }
    }, RESUME_DELAY_MS);
  }, [clearResumeTimer]);

  const onUserInteract = useCallback(() => {
    pauseAutoScroll();
    scheduleResume();
  }, [pauseAutoScroll, scheduleResume]);

  /** Scroll the track horizontally only; never scrollIntoView (avoids page jump). */
  const scrollTrackToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const normalized = normalizeIndex(index);
      const targetLeft = getSlideScrollLeft(track, normalized);

      isProgrammaticScrollRef.current = true;
      clearUnlockTimer();

      track.scrollTo({ left: targetLeft, behavior });

      unlockTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, behavior === "smooth" ? PROGRAMMATIC_SCROLL_UNLOCK_MS : 80);
    },
    [clearUnlockTimer],
  );

  const goToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const normalized = normalizeIndex(index);
      const current = activeIndexRef.current;
      const wrapsForward = current === ITEM_COUNT - 1 && normalized === 0;
      const wrapsBack = current === 0 && normalized === ITEM_COUNT - 1;
      const scrollBehavior =
        wrapsForward || wrapsBack ? "auto" : behavior;

      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      scrollTrackToIndex(normalized, scrollBehavior);
    },
    [scrollTrackToIndex],
  );

  const goNext = useCallback(() => {
    goToIndex(activeIndexRef.current + 1);
  }, [goToIndex]);

  const goPrev = useCallback(() => {
    goToIndex(activeIndexRef.current - 1);
  }, [goToIndex]);

  const syncActiveIndexFromTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track || isProgrammaticScrollRef.current) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
    );
    if (!slides.length) return;

    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    if (closest !== activeIndexRef.current) {
      activeIndexRef.current = closest;
      setActiveIndex(closest);
    }
  }, []);

  const handleTrackScroll = useCallback(() => {
    syncActiveIndexFromTrack();

    if (isProgrammaticScrollRef.current) return;

    pauseAutoScroll();
    scheduleResume();
  }, [syncActiveIndexFromTrack, pauseAutoScroll, scheduleResume]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      const reduced = mq.matches;
      setAutoScrollEnabled(!reduced);
      if (reduced) pausedRef.current = true;
    };

    applyPreference();
    mq.addEventListener("change", applyPreference);
    return () => mq.removeEventListener("change", applyPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          pauseAutoScroll();
        }
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [pauseAutoScroll]);

  useEffect(() => {
    let ticking = false;

    const onWindowScroll = () => {
      if (!isInViewRef.current) return;

      pauseAutoScroll();
      scheduleResume();

      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
      });
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [pauseAutoScroll, scheduleResume]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncActiveIndexFromTrack();
    track.addEventListener("scroll", handleTrackScroll, { passive: true });
    window.addEventListener("resize", syncActiveIndexFromTrack);

    return () => {
      track.removeEventListener("scroll", handleTrackScroll);
      window.removeEventListener("resize", syncActiveIndexFromTrack);
    };
  }, [handleTrackScroll, syncActiveIndexFromTrack]);

  useEffect(() => {
    if (!autoScrollEnabled) return;

    const tick = window.setInterval(() => {
      if (
        pausedRef.current ||
        !isInViewRef.current ||
        isDraggingRef.current ||
        isProgrammaticScrollRef.current
      ) {
        return;
      }
      goToIndex(activeIndexRef.current + 1);
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(tick);
  }, [autoScrollEnabled, goToIndex]);

  useEffect(() => {
    return () => {
      clearResumeTimer();
      clearUnlockTimer();
    };
  }, [clearResumeTimer, clearUnlockTimer]);

  const handleArrow = (direction: -1 | 1) => {
    onUserInteract();
    if (direction === 1) goNext();
    else goPrev();
  };

  const handleDot = (index: number) => {
    onUserInteract();
    goToIndex(index);
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
    pauseAutoScroll();
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    scheduleResume();
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={scheduleResume}
    >
      <p className="article-body mb-6 max-w-xl sm:mb-8">
        Start with the topics that trip people up most. Each guide opens in one
        click.
      </p>

      <div className="relative">
        <CarouselArrow direction="left" onClick={() => handleArrow(-1)} />
        <CarouselArrow direction="right" onClick={() => handleArrow(1)} />

        <div
          ref={trackRef}
          className={cn(
            "guide-carousel-track -mx-1 flex gap-4 overflow-x-auto px-1 pb-2",
            "snap-x snap-proximity scroll-smooth",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "touch-pan-x overscroll-x-contain",
            "[-webkit-overflow-scrolling:touch]",
          )}
          aria-label="Important Japan guides carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {HOME_GUIDE_CAROUSEL_ITEMS.map((item) => (
            <div
              key={item.href}
              data-carousel-slide
              className="w-full shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <GuideCarouselCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Carousel slides"
        >
          {HOME_GUIDE_CAROUSEL_ITEMS.map((item, index) => (
            <button
              key={item.href}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to ${item.title}`}
              onClick={() => handleDot(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                activeIndex === index
                  ? "h-2 w-6 bg-maroon"
                  : "h-2 w-2 bg-paper-edge hover:bg-tan/80",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
