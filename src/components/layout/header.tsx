import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { LogoutButton } from "./logout-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/90 backdrop-blur-sm shadow-soft-sm px-5 md:px-8">
      <MobileNav />
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="flex-1" />
      <LogoutButton />
    </header>
  );
}
