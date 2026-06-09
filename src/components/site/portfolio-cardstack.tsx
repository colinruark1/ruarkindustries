"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "./projects";

const MAX_VISIBLE = 4; // cards rendered behind the front one
const SWIPE_THRESHOLD = 60; // px of drag needed to commit a swipe

export function PortfolioCardstack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const shuffleRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const cardEls = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const stack = stackRef.current;
    const list = listRef.current;
    const progress = progressRef.current;
    if (!stack || !list) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // `order` holds indices into PROJECTS; order[0] is the front card.
    let order = PROJECTS.map((_, i) => i);

    // Position every card based on its depth from the front.
    function layout(dragOffset: number) {
      const dots = progress ? progress.children : ([] as unknown as HTMLCollection);
      for (let depth = 0; depth < order.length; depth++) {
        const el = cardEls.current[order[depth]];
        if (!el) continue;
        const hidden = depth >= MAX_VISIBLE;
        el.style.zIndex = String(order.length - depth);
        el.style.opacity = hidden ? "0" : "1";
        el.style.pointerEvents = depth === 0 ? "auto" : "none";
        el.classList.toggle("is-front", depth === 0);

        let translateY = depth * -22; // px each card peeks above the one in front
        const scale = 1 - depth * 0.05;
        const brightness = Math.max(0.55, 1 - depth * 0.12);
        let rotate = 0;

        if (depth === 0 && dragOffset) {
          translateY += dragOffset;
          rotate = Math.max(-8, Math.min(8, dragOffset / -18));
        }

        el.style.transform = `translateY(${translateY}px) scale(${scale.toFixed(
          3,
        )}) rotate(${rotate}deg)`;
        el.style.filter = `brightness(${brightness.toFixed(2)})`;
      }

      for (let d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("is-active", d === order[0]);
      }
    }

    let transitionTimer: number | undefined;
    function withTransition(fn: () => void) {
      list!.classList.add("is-animating");
      fn();
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        list!.classList.remove("is-animating");
      }, 350);
    }

    const next = () =>
      withTransition(() => {
        order.push(order.shift()!);
        layout(0);
      });
    const prev = () =>
      withTransition(() => {
        order.unshift(order.pop()!);
        layout(0);
      });
    const shuffle = () =>
      withTransition(() => {
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }
        layout(0);
      });
    const reset = () =>
      withTransition(() => {
        order = PROJECTS.map((_, i) => i);
        layout(0);
      });

    // ----- Pointer drag on the front card -----
    let dragging = false;
    let startY = 0;
    let frontEl: HTMLLIElement | null = null;

    function onPointerDown(e: PointerEvent) {
      const front = cardEls.current[order[0]];
      if (!front || !front.contains(e.target as Node)) return;
      dragging = true;
      startY = e.clientY;
      frontEl = front;
      list!.classList.remove("is-animating");
      front.setPointerCapture?.(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      layout(e.clientY - startY);
    }
    function onPointerUp(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      const delta = e.clientY - startY;
      frontEl?.releasePointerCapture?.(e.pointerId);
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        if (delta < 0) next();
        else prev();
      } else {
        withTransition(() => layout(0));
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    }

    layout(0);

    prevRef.current?.addEventListener("click", prev);
    nextRef.current?.addEventListener("click", next);
    shuffleRef.current?.addEventListener("click", shuffle);
    resetRef.current?.addEventListener("click", reset);
    stack.addEventListener("keydown", onKeyDown);

    if (!prefersReduced) {
      list.addEventListener("pointerdown", onPointerDown);
      list.addEventListener("pointermove", onPointerMove);
      list.addEventListener("pointerup", onPointerUp);
      list.addEventListener("pointercancel", onPointerUp);
    }

    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    const shuffleBtn = shuffleRef.current;
    const resetBtn = resetRef.current;
    return () => {
      window.clearTimeout(transitionTimer);
      prevBtn?.removeEventListener("click", prev);
      nextBtn?.removeEventListener("click", next);
      shuffleBtn?.removeEventListener("click", shuffle);
      resetBtn?.removeEventListener("click", reset);
      stack.removeEventListener("keydown", onKeyDown);
      list.removeEventListener("pointerdown", onPointerDown);
      list.removeEventListener("pointermove", onPointerMove);
      list.removeEventListener("pointerup", onPointerUp);
      list.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="cardstack" id="cardstack" ref={stackRef} tabIndex={0}>
      <div
        className="cardstack-progress"
        id="cardstack-progress"
        aria-hidden="true"
        ref={progressRef}
      >
        {PROJECTS.map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <button
        className="cardstack-nav cardstack-prev"
        id="cardstack-prev"
        aria-label="Previous project"
        ref={prevRef}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <ul className="cardstack-cards" id="cardstack-cards" aria-live="polite" ref={listRef}>
        {PROJECTS.map((project, i) => (
          <li
            key={i}
            className="cardstack-card"
            ref={(el) => {
              if (el) cardEls.current[i] = el;
            }}
          >
            <div
              className={`cardstack-media${project.img ? "" : ` cardstack-media-${project.variant || "a"}`}`}
            >
              {project.img ? (
                <img src={project.img} alt={project.title} draggable={false} />
              ) : null}
            </div>
            <div className="cardstack-info">
              <h3>{project.title}</h3>
              <p>{project.meta}</p>
              <Link
                href={`/${project.slug}`}
                className="cardstack-link"
                onPointerDown={(e) => e.stopPropagation()}
              >
                View case study →
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="cardstack-nav cardstack-next"
        id="cardstack-next"
        aria-label="Next project"
        ref={nextRef}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="cardstack-controls">
        <button
          className="cardstack-btn"
          id="cardstack-shuffle"
          type="button"
          aria-label="Shuffle projects"
          title="Shuffle"
          ref={shuffleRef}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3h5v5" />
            <path d="M4 20 21 3" />
            <path d="M21 16v5h-5" />
            <path d="m15 15 6 6" />
            <path d="M4 4l5 5" />
          </svg>
        </button>
        <p className="cardstack-hint" id="cardstack-hint">
          Drag a card up or down, or use the arrows.
        </p>
        <button
          className="cardstack-btn"
          id="cardstack-reset"
          type="button"
          aria-label="Reset order"
          title="Reset"
          ref={resetRef}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
