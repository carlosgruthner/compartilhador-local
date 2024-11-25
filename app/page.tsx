import ListarArquivos from "./_components/ListarArquivos";




export default function Home() {

  return (
    <main>
      <div>
        <div className="container mx-auto p-2">
          <h1>Carlos Gruthner</h1>
          <span className="text-xs">Compartilhar arquivos locais</span>
          <ListarArquivos />
        </div>
      </div>
    </main>
  );
};