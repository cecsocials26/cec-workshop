import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-brand-green px-4">
      <div className="surface-static w-full max-w-sm rounded-sm border border-brand-gold/25 bg-brand-green-dark/40 px-8 py-10">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-brand-gold/40">
            <Image
              src="/brand/cec-crest.png"
              alt="Complete Exterior Care crest"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl tracking-wide text-brand-ivory">
              Sign in to the Workshop
            </h1>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/80">
              Complete Exterior Care
            </p>
          </div>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
