"use client";

import { useState } from "react";
import type { FAQ } from "@/types";

/** Accessible FAQ accordion. Content stays in the DOM for SEO. */
export default function Accordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-card border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-[15px] font-medium text-ink">
                {item.question}
              </span>
              <span
                aria-hidden
                className={`grid size-7 shrink-0 place-items-center rounded-full border border-line text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-45 border-accent bg-accent/10" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
