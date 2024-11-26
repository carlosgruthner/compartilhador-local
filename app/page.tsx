import Image from "next/image";
import ListarArquivos from "./_components/ListarArquivos";




export default function Home() {

  return (
    <main>
      <div>
        <div className="container mx-auto p-2">
          <div className="flex items-center gap-2 w-full pb-3">
            <Image
              src="/assets/icons/downloadcel.png"
              alt="Downloader"
              width={40}
              height={40}
              priority
            />
            <h1 className="font-bold text-2xl">DonwShare</h1>
          </div>

          <span className="text-xs ">Compartilhar arquivos locais</span>
          <ListarArquivos />
        </div>
      </div>
    </main>
  );
};