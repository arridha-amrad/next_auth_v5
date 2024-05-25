import { LucideLoader2 } from "lucide-react";

function Loading() {
  return (
    <section className="fixed inset-0 flex items-center justify-center">
      <LucideLoader2 className="w-6 h-6 animate-spin" />
    </section>
  );
}

export default Loading;
