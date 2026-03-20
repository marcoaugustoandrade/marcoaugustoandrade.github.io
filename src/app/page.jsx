import Image from "next/image";
import Link from "next/link";
import { Github, Gitlab, Linkedin, Mail } from "lucide-react";

const summary =
  "Professor EBTT no IFRO Campus Vilhena. Atua com Engenharia de Software, Programação e Sistemas de Informação para conectar pesquisa aplicada e formação de talentos.";

const socialLinks = [
  { href: "https://github.com/marcoaugustoandrade", label: "GitHub", Icon: Github },
  { href: "https://gitlab.fslab.dev/marco", label: "GitLab", Icon: Gitlab },
  {
    href: "https://www.linkedin.com/in/marco-antonio-augusto-de-andrade-55b036169/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#392C59] via-[#3F487A] to-[#3A6193] px-4 py-16 text-gray-50">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center px-4">
        <div className="group relative mb-4 h-36 w-36 transform transition duration-500 hover:scale-105 sm:h-48 sm:w-48">
          <div className="absolute inset-0 rounded-full bg-[#3A6193]/40 blur-2xl transition group-hover:bg-[#4ad1ff]/40" />
          <div className="absolute -inset-3 rounded-full border border-white/20 opacity-60 transition group-hover:opacity-90" aria-hidden />
          <div className="absolute -inset-1 rounded-full border border-white/60 opacity-80 transition group-hover:border-white" aria-hidden />
          <Image
            src="/marco.png"
            alt="Foto de Marco Andrade"
            width={200}
            height={200}
            priority
            className="relative rounded-full border border-white/40 object-cover transition duration-500 group-hover:brightness-110"
          />
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]">
          Marco Andrade
        </h1>
        <p className="mt-2 text-base leading-relaxed text-white/80">{summary}</p>
        <div className="mt-2 h-px w-16 rounded-full bg-white/40" aria-hidden />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="mailto:marco.andrade@ifro.edu.br"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-[#1f1a2c] transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Mail className="h-4 w-4" />
            Contato
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
          <Link href="https://portal.ifro.edu.br" target="_blank" className="transition hover:-translate-y-0.5 hover:text-yellow-200">
            IFRO
          </Link>
          <span className="opacity-50">•</span>
          <Link href="https://fslab.ifro.edu.br" target="_blank" className="transition hover:-translate-y-0.5 hover:text-yellow-200">
            FSLab
          </Link>
        </div>

        <div className="mt-6 flex gap-6">
          {socialLinks.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              className="text-white/80 transition hover:-translate-y-0.5 hover:text-yellow-200"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
