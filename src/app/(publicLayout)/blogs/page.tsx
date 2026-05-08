import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { publicApi } from "@/lib/api/skillsync";

export default async function BlogsPage() {
  const result = await Promise.allSettled([publicApi.blogs()]);
  const blogs = result[0].status === "fulfilled" ? result[0].value.data : [];

  return (
    <main className="container-shell py-12">
      <SectionHeading
        eyebrow="Blog"
        title="Learning articles and platform guidance"
        description="Articles are loaded from the backend blog module."
      />
      {result[0].status === "rejected" ? (
        <div className="mt-6">
          <StatusMessage message="Start the backend API to load blog posts." title="Blog data unavailable" tone="danger" />
        </div>
      ) : null}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {blogs.map((blog) => (
          <Link className="card flex min-h-[430px] flex-col overflow-hidden" href={`/blogs/${blog.slug}`} key={blog.id}>
            <div className="relative h-48 bg-muted">
              {blog.thumbnail ? <Image alt={blog.title} className="object-cover" fill src={blog.thumbnail} /> : null}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm font-bold text-primary">{new Date(blog.createdAt).toLocaleDateString()}</p>
              <h2 className="mt-3 text-xl font-bold">{blog.title}</h2>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{blog.excerpt}</p>
              <span className="mt-auto pt-5 text-sm font-bold text-secondary">Read details</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
