import { Drawer } from "vaul";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-bg/70" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[80dvh] w-full max-w-phone flex-col rounded-t-2xl bg-surface pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-border)] outline-none",
          )}
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />
          <Drawer.Title className="font-display px-5 pt-4 text-xl tracking-tight text-fg">
            {title}
          </Drawer.Title>
          <div className="overflow-y-auto px-5 pb-5 pt-3">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
