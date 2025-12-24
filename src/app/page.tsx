import { FaucetCore } from "@/components/FaucetCore";
import { StacksProvider } from "@/hooks/use-stacks";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 font-body bg-background text-primary scanline-effect">
      <StacksProvider>
        <FaucetCore />
      </StacksProvider>
    </main>
  );
}
