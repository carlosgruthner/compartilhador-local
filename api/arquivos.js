import { readdir } from "fs/promises";
import { join } from "path";

const arquivos = async (req, res) => {
  const pasta = "./public/compartilhar"; // nome da pasta que você deseja listar
  const arquivos = await readdir(join(process.cwd(), pasta), {
    withFileTypes: true,
  });
  const listaArquivos = arquivos
    .filter((arquivo) => arquivo.isFile())
    .map((arquivo) => ({
      nome: arquivo.name,
      caminho: join(pasta, arquivo.name),
    }));

  return res.json(listaArquivos);
};

export default arquivos;
