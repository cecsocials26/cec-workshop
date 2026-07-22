import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-green">
      <Image
        src="/brand/login-background.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/80 via-brand-green-dark/20 to-transparent" />

      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-4xl tracking-[0.15em] text-brand-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] sm:bottom-14 sm:text-5xl">
        The Workshop
      </p>

      <div className="relative flex min-h-screen w-full items-start justify-start px-6 py-10 sm:px-12 sm:py-16">
        <div className="surface-static w-full max-w-xs rounded-sm border border-brand-gold/25 bg-brand-green-dark/50 px-7 py-8 backdrop-blur-sm">
          <div>
            <h1 className="font-heading text-2xl tracking-wide text-brand-ivory">
              Sign in to the Workshop
            </h1>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-brand-gold-soft/80">
              Complete Exterior Care
            </p>
          </div>

          <div className="mt-7">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
