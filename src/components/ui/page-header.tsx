type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ description, eyebrow, title }: PageHeaderProps) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase text-primary">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
