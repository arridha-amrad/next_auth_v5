import { Loader } from "lucide-react";

function Loading() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Loader className="w-6 h-6 animate-spin" />
    </section>
  );
}

export default Loading;
