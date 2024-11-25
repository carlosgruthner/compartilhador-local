'use client'
import { Button } from '@/components/ui/button';
import React from 'react'
import { useState, useEffect } from 'react';

interface DownloadProps {
    fileName: string
}
const DownloadButton = ({ fileName }: DownloadProps) => {
    const [downloadUrl, setDownloadUrl] = useState('');

    useEffect(() => {
        // const fileName = 'webDesigner.png';
        const filePath = `/compartilhar/${fileName}`;

        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setDownloadUrl(url);
            });
    }, [fileName]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <Button onClick={handleDownload} className='text-white'>Baixar</Button>
    );
};
export default DownloadButton