import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicApi } from "@/lib/api/skillsync";

type BlogDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const result = await Promise.allSettled([publicApi.blogBySlug(slug)]);

  if (result[0].status === "rejected") {
    notFound();
  }

  const blog = result[0].value.data;

  return (
    <main>
      <section className="bg-surface py-12">
        <div className="container-shell">
          <p className="text-sm font-bold text-primary">{new Date(blog.createdAt).toLocaleDateString()}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{blog.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{blog.excerpt}</p>
        </div>
      </section>
      <article className="container-shell py-12">
        {blog.thumbnail ? (
          <div className="card relative mb-10 aspect-[16/7] overflow-hidden">
            <Image alt={blog.title} className="object-cover" fill priority src={blog.thumbnail} />
          </div>
        ) : null}
        <SectionHeading title="Article" />
        <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-8 text-muted-foreground">{blog.content}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-semibold" key={tag}>{tag}</span>
          ))}
        </div>
      </article>
    </main>
  );
}
