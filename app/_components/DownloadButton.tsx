import { Button } from '@/components/ui/button';
import React from 'react';
import { useState, useEffect } from 'react';

interface DownloadProps {
    fileNames: string[];
    count: number
}

const DownloadButton = ({ fileNames, count }: DownloadProps) => {
    const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const urls = await Promise.all(fileNames.map((fileName) => {
                const filePath = `/compartilhar/${fileName}`;
                return fetch(filePath)
                    .then(response => response.blob())
                    .then(blob => URL.createObjectURL(blob));
            }));
            setDownloadUrls(urls);
        };
        fetchFiles();
    }, [fileNames]);

    const handleDownload = () => {
        fileNames.forEach((fileName, index) => {
            const link = document.createElement('a');
            link.href = downloadUrls[index];
            link.download = fileName;
            link.click();
        });
    };

    return (
        <div>
            <h1 className='text-sm pb-3'>Arquivos selecionados: <span className='font-bold text-green-500'>{count}</span></h1>
            <Button onClick={handleDownload} className='text-white'>Baixar</Button>
        </div>
    );
};
export default DownloadButton;