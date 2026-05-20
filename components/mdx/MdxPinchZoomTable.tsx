"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";

const TABLE_CLASS =
  "w-max min-w-full border-collapse border border-[#d4c9b0] bg-white font-sans text-sm text-dark sm:min-w-[560px] sm:text-base";

type MdxPinchZoomTableProps = {
  children: ReactNode;
};

function pinchDistance(touches: { length: number; item: (i: number) => { clientX: number; clientY: number } | null }) {
  if (touches.length < 2) return 0;
  const a = touches.item(0);
  const b = touches.item(1);
  if (!a || !b) return 0;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function distanceFromTouchList(touches: { length: number; [i: number]: { clientX: number; clientY: number } | undefined }) {
  return pinchDistance({
    length: touches.length,
    item: (i) => touches[i] ?? null,
  });
}

export function MdxPinchZoomTable({ children }: MdxPinchZoomTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const pinchState = useRef<{ distance: number; startScale: number } | null>(
    null,
  );

  scaleRef.current = scale;

  const fitToWidth = useCallback(() => {
    const scroll = scrollRef.current;
    const table = tableRef.current;
    if (!scroll || !table) return;

    const containerWidth = scroll.clientWidth;
    const tableWidth = table.scrollWidth;
    if (tableWidth <= containerWidth) {
      setScale(1);
      return;
    }

    setScale(Math.max(0.32, Math.min(1, containerWidth / tableWidth)));
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) fitToWidth();

    const observer = new ResizeObserver(() => {
      if (window.matchMedia("(max-width: 639px)").matches) fitToWidth();
    });
    const scroll = scrollRef.current;
    const table = tableRef.current;
    if (scroll) observer.observe(scroll);
    if (table) observer.observe(table);
    return () => observer.disconnect();
  }, [fitToWidth]);

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      pinchState.current = {
        distance: distanceFromTouchList(e.touches),
        startScale: scaleRef.current,
      };
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (e.touches.length < 2) pinchState.current = null;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMove = (e: globalThis.TouchEvent) => {
      if (e.touches.length !== 2 || !pinchState.current) return;
      e.preventDefault();

      const distance = distanceFromTouchList(e.touches);
      if (distance <= 0) return;

      const ratio = distance / pinchState.current.distance;
      const next = Math.min(
        1.25,
        Math.max(0.32, pinchState.current.startScale * ratio),
      );
      setScale(next);
    };

    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, []);

  const scaled = scale < 0.995;
  const innerWidth = scaled ? `${(100 / scale).toFixed(3)}%` : "100%";

  return (
    <div className="mdx-table-pinch-zone">
      <div
        ref={scrollRef}
        className="mdx-table-scroll"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className="mdx-table-scale-inner"
          style={{
            transform: scaled ? `scale(${scale})` : undefined,
            transformOrigin: "top left",
            width: innerWidth,
          }}
        >
          <table ref={tableRef} className={TABLE_CLASS}>
            {children}
          </table>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 sm:hidden">
        <button
          type="button"
          onClick={fitToWidth}
          className="font-sans text-xs font-bold text-rust underline decoration-rust/50 underline-offset-2"
        >
          Fit table to screen
        </button>
        {scaled ? (
          <button
            type="button"
            onClick={() => setScale(1)}
            className="font-sans text-xs text-muted underline underline-offset-2"
          >
            Reset size
          </button>
        ) : null}
        <span className="w-full font-sans text-xs text-muted">
          Pinch with two fingers on the table to zoom out and see all columns
        </span>
      </div>
    </div>
  );
}
