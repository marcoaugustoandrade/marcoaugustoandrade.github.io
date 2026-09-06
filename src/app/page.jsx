import Image from "next/image";
import Link from "next/link";
import { Github, Gitlab, Linkedin, Mail } from "lucide-react";

const role = "Professor EBTT · IFRO Campus Vilhena";
const ifroUrl = "https://portal.ifro.edu.br";
const fslabUrl = "https://fslab.ifro.edu.br";

const socialLinks = [
  { href: "https://github.com/marcoaugustoandrade", label: "GitHub", Icon: Github },
  { href: "https://gitlab.fslab.dev/marco", label: "GitLab", Icon: Gitlab },
  {
    href: "https://www.linkedin.com/in/marco-antonio-augusto-de-andrade-55b036169/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
];

const NewTab = () => <span className="sr-only"> (abre em nova aba)</span>;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3F487A]";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#392C59] via-[#3F487A] to-[#3A6193] px-6 py-10 text-gray-50">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="group relative h-36 w-36 sm:h-40 sm:w-40">
          <div
            className="absolute -inset-4 rounded-full bg-sky-300/25 blur-2xl transition-colors duration-500 group-hover:bg-sky-300/40 motion-reduce:transition-none"
            aria-hidden
          />
          <div
            className="absolute -inset-1 rounded-full border border-white/40 transition-colors duration-500 group-hover:border-sky-200/80 motion-reduce:transition-none"
            aria-hidden
          />
          <Image
            src="/marco.png"
            alt="Foto de Marco Andrade"
            width={200}
            height={200}
            priority
            className="relative h-full w-full rounded-full object-cover"
          />
        </div>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Marco Andrade
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em]">
          <Link
            href={ifroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-sm text-sky-100 transition hover:text-white motion-reduce:transition-none ${focusRing}`}
          >
            {role}
            <NewTab />
          </Link>
        </p>
        <p className="mt-5 max-w-md text-balance text-lg leading-relaxed text-white/85">
          Atua no{" "}
          <Link
            href={fslabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-sm font-medium text-white underline decoration-sky-300 underline-offset-4 transition hover:decoration-white motion-reduce:transition-none ${focusRing}`}
          >
            FSLab
            <NewTab />
          </Link>{" "}
          com Engenharia de Software, Programação e Sistemas de Informação para
          conectar pesquisa aplicada e formação de talentos.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="mailto:marco.andrade@ifro.edu.br"
            className={`inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#1f1a2c] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-sky-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            Contato
          </Link>

          <div className="flex items-center gap-1">
            {socialLinks.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-white/80 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-sky-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span className="sr-only">
                  {label}
                  <NewTab />
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
