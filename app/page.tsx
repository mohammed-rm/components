import Image from "next/image";
import AnimatedNumberPage from "@/animated-components/animated-number";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-stone-900">
      <AnimatedNumberPage />
    </main>
  );
}
