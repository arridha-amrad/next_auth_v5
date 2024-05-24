import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-15">
      <section className="w-full h-screen flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin" />
      </section>
    </div>
  );
}

export default Loading;
