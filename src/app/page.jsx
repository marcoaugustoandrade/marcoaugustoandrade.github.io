import { Github, Gitlab, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[#392C59] to-[#3A6193] text-gray-50 h-screen flex justify-center border-[#392E5B] border-t-4">
    <div className="flex flex-col justify-center items-center">
      <img className="rounded-full border-2 hover:border-[#3A6193]" src="marco.png" alt="Foto de Marco Andrade" height="200" width="200" />
      <div>
        <h1 className="p-4 text-3xl font-semibold">MARCO ANDRADE</h1>
        <div className="flex justify-center">
          <a href="mailto:marco.andrade@ifro.edu.br" className="bg-[#535F88] px-12 py-4 rounded-full w-[270px] hover:bg-[#535F88]/50 text-center">Contato</a>
        </div>
        <div className="flex justify-around p-4 mb-2 pt-16">
          <span>
            <Link href="https://portal.ifro.edu.br" target="_blank" className="hover:underline hover:underline-offset-2">IFRO</Link>
          </span>
          <span className="text-[#3A6193]">|</span>
          <span>
            <Link href="https://fslab.ifro.edu.br" target="_blank" className="hover:underline hover:underline-offset-2">FSLab</Link>
          </span>
        </div>
        <div className="p-4 flex justify-around">
          <Link href="https://github.com/marcoaugustoandrade" target="_blank" >
            <Github />
          </Link>
          <Link href="https://gitlab.fslab.dev/marco" target="_blank">
            <Gitlab />
          </Link>
          <Link href="https://www.linkedin.com/in/marco-antonio-augusto-de-andrade-55b036169/" target="_blank">
            <Linkedin />
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
}
