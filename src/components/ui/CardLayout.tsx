import type { cardLayoutProps } from "../../types/tasks";

function CardLayout({ children }: cardLayoutProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5 items-start">
        {children}
    </section>
  );
}

export default CardLayout;
