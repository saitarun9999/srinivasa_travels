import Link from "next/link";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

/** Sticky bottom bar on mobile: quick nav plus always-reachable Call & WhatsApp. */
export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <Link
        href="/"
        className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-ink-soft"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
        Home
      </Link>
      <Link
        href="/fleet"
        className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-ink-soft"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 16l1.5-5.5C7 9 8 8.5 9.5 8.5h5c1.5 0 2.5.5 3 2L19 16" />
          <rect x="4" y="15.5" width="16" height="4" rx="1.5" />
          <circle cx="8" cy="19.5" r="1.4" />
          <circle cx="16" cy="19.5" r="1.4" />
        </svg>
        Fleet
      </Link>
      <a
        href={`tel:${site.phone}`}
        className="relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold text-primary"
      >
        <span className="absolute -top-5 grid size-12 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
          </svg>
        </span>
        <span className="mt-7">Call</span>
      </a>
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-[#128c4b]"
      >
        <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.8-1.8-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.6 3.5a11.5 11.5 0 0 0 4.4 4.8c1.6 1 2.9 1.3 3.9 1 .8-.2 1.5-.8 1.7-1.5.2-.6.2-1.2.1-1.3z" />
        </svg>
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-ink-soft"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="5" width="18" height="15" rx="2.5" />
          <path d="m3 8 9 6 9-6" />
        </svg>
        Enquire
      </Link>
    </nav>
  );
}
