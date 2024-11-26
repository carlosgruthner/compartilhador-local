

import { readdir, stat } from 'fs/promises';
import { join } from 'path';
// import DownloadButton from './DownloadButton';
import TableList from './TableList';

// listando aquivos dentro da pasta public/compartilhar

const ListarArquivos = async () => {
    const pasta = 'public/compartilhar'; // nome da pasta que você deseja listar
    const arquivos = await readdir(join(process.cwd(), pasta), { withFileTypes: true });
    const listaArquivos = await Promise.all(arquivos.filter((arquivo) => arquivo.isFile()).map(async (arquivo) => {
        const stats = await stat(join(process.cwd(), pasta, arquivo.name));
        return {
            id: arquivo.name,
            nome: arquivo.name,
            caminho: join(pasta, arquivo.name),
            tamanho: stats.size,
        };
    }));
    return (
        <div>
            {/* <h1>Arquivos</h1>
            <ul>
                {listaArquivos.map((arquivo) => (
                    <li key={arquivo.nome}>
                        <DownloadButton fileName={arquivo.nome} />
                    </li>
                ))}
            </ul> */}
            <TableList data={listaArquivos} />
        </div>
    );
};

export default ListarArquivos;