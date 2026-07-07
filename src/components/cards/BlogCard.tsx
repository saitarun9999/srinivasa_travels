import Link from "next/link";
import type { BlogPost } from "@/types";

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-card border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
        {post.excerpt}
      </p>
      <p className="mt-5 border-t border-line pt-4 text-xs text-ink-faint">
        {formatDate(post.date)} · {post.readMinutes} min read
      </p>
    </Link>
  );
}
