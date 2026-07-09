import type { ReactNode } from "react";
import Link from "next/link";
import adoptersLogo from "@/assets/adopters-logo-reversed.png";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "dark" | "light" | "outline" | "text";
  className?: string;
};

export function Container({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 xl:px-0 ${className}`}>{children}</div>;
}

export function Button({
  children,
  href = "#",
  variant = "primary",
  className = ""
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] text-brand-dark shadow-[0_10px_28px_rgba(91,228,94,0.18)] hover:opacity-90",
    dark: "bg-brand-darker text-white hover:bg-[#07352b]",
    light: "bg-white text-brand-dark hover:bg-paper",
    outline:
      "border border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]",
    text: "text-brand-green hover:text-brand-green-bright"
  };

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-6 text-center text-sm font-extrabold transition ${variants[variant]} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}

export function Label({
  children,
  dark = false,
  centered = false
}: {
  children: ReactNode;
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`site-label flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.18em] ${centered ? "justify-center" : ""}`}>
      <span className={`h-0.5 w-6 shrink-0 ${dark ? "bg-brand-green" : "bg-[#16b57f]"}`} />
      <span className={dark ? "text-gradient-green" : "text-[#0f7f63]"}>{children}</span>
    </div>
  );
}

export function SectionHeader({
  label,
  title,
  body,
  dark = false,
  centered = false,
  className = ""
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}) {
  if (centered) {
    return (
      <div className={`mx-auto max-w-[980px] text-center ${className}`}>
        <Label dark={dark} centered>
          {label}
        </Label>
        <h2
          className={`mt-4 text-balance text-3xl font-black leading-[1.05] md:text-5xl ${
            dark ? "text-white" : "text-[#021d17]"
          }`}
        >
          {title}
        </h2>
        {body ? (
          <p className={`mx-auto mt-5 max-w-[850px] text-base leading-7 ${dark ? "text-muted-dark" : "text-muted-light"}`}>
            {body}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <Label dark={dark}>{label}</Label>
      <h2
        className={`mt-4 max-w-[620px] text-balance text-3xl font-black leading-[1.05] md:text-5xl ${
          dark ? "text-white" : "text-[#021d17]"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 max-w-[550px] text-base leading-7 ${dark ? "text-muted-dark" : "text-muted-light"}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      alt="Adopters"
      className={`block h-[30px] w-[166px] object-contain ${className}`}
      height={30}
      src={adoptersLogo.src}
      width={166}
    />
  );
}
