import { Download, Check } from 'lucide-react';
import { useState } from 'react';
import { downloadImage } from '../services/api';

export default function DownloadButton({ imageUrl, originalFilename }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const getClarifiedFilename = () => {
    if (!originalFilename) return 'image-clarified.png';
    const lastDot = originalFilename.lastIndexOf('.');
    if (lastDot === -1) return `${originalFilename}-clarified.png`;
    const name = originalFilename.substring(0, lastDot);
    const ext = originalFilename.substring(lastDot);
    return `${name}-clarified${ext}`;
  };

  const handleDownload = async () => {
    if (isDownloading || !imageUrl) return;

    setIsDownloading(true);
    setDownloaded(false);

    try {
      await downloadImage(imageUrl, getClarifiedFilename());
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading || !imageUrl}
      className={`group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
        downloaded
          ? 'bg-success/20 border border-success/30 text-success'
          : 'bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white glow-accent glow-accent-hover hover:scale-[1.02] active:scale-[0.98]'
      } disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100`}
      id="download-btn"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4" />
          Saved!
        </>
      ) : isDownloading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          Download 4K
        </>
      )}
    </button>
  );
}
