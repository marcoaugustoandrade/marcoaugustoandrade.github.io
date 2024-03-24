export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[#392C59] to-[#3A6193] text-gray-50 h-screen flex justify-center border-[#392E5B] border-t-4">
    <div className="flex flex-col justify-center items-center">
      <img className="rounded-full border-2 " src="marco.png" alt="Foto de Marco Andrade" height="200" width="200" />
      <div>
        <h1 className="p-4 text-3xl">MARCO ANDRADE</h1>
        <div className="flex justify-center">
          <a href="mailto:marco.andrade@ifro.edu.br" className="bg-[#535F88] px-12 py-4 rounded-full w-[270px] hover:bg-[#535F88]/50 text-center">Contato</a>
        </div>
      </div>
    </div>
    </main>
  );
}
