import { Logo } from "./Logo";
import { MainNav } from "./MainNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-indigo/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Logo />
        <MainNav />
      </div>
    </header>
  );
}
