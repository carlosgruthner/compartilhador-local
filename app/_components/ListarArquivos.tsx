

import { readdir } from 'fs/promises';
import { join } from 'path';
// import DownloadButton from './DownloadButton';
import TableList from './TableList';

// listando aquivos dentro da pasta public/compartilhar

const ListarArquivos = async () => {
    const pasta = 'public/compartilhar'; // nome da pasta que você deseja listar
    const arquivos = await readdir(join(process.cwd(), pasta), { withFileTypes: true });
    const listaArquivos = arquivos.filter((arquivo) => arquivo.isFile()).map((arquivo) => ({
        nome: arquivo.name,
        caminho: join(pasta, arquivo.name),
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