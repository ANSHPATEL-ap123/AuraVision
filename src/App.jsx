import React, { useState, useEffect } from 'react'; // Added useEffect
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { upscaleImage } from './services/api';

function App() {
  const [original, setOriginal] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false); // New state for the badge

  // New logic to check if your Render backend is awake
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Points to your backend health endpoint
        const res = await fetch('http://localhost:3005/api/health');
        if (res.ok) setIsOnline(true);
        else setIsOnline(false);
      } catch (err) {
        setIsOnline(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginal(reader.result);
      setEnhanced(null);
    };
    reader.readAsDataURL(file);
  };

  const handleEnhance = async () => {
    if (!original) return alert("Please upload an image first!");
    if (!description) return alert("Please describe the image (e.g., 'A white duck')");

    setIsLoading(true);
    try {
      const result = await upscaleImage(original, description);
      setEnhanced(result);
    } catch (err) {
      alert(err.message || "AI is busy, try again in 10s");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Pass the real status to the Header */}
      <Header isOnline={isOnline} />

      <div className="flex">
        <Sidebar onEnhance={handleEnhance} isLoading={isLoading} />

        <main className="flex-1 p-10 flex flex-col items-center">
          {!original && (
            <div className="mt-20 flex flex-col items-center p-12 border-2 border-dashed border-white/10 rounded-3xl bg-[#111]">
              <input type="file" onChange={handleUpload} className="mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
              <p className="text-white/40 text-sm">Upload your photo to clarify</p>
            </div>
          )}

          {original && (
            <div className="w-full max-w-xl mb-8">
              <label className="block text-xs font-bold text-blue-400 uppercase mb-2 tracking-widest">What is in this photo?</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. A majestic white duck, a red car, a green leaf..."
                className="w-full bg-[#1a1a1a] border border-white/10 p-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {original && (
              <div className="space-y-4">
                <p className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest">Original</p>
                <img src={original} className="w-full h-[400px] object-contain rounded-2xl bg-black border border-white/5" alt="original" />
              </div>
            )}

            {enhanced && (
              <div className="space-y-4 animate-in fade-in duration-700">
                <p className="text-center text-[10px] font-bold text-blue-400 uppercase tracking-widest">AI Enhanced</p>
                <img src={enhanced} className="w-full h-[400px] object-contain rounded-2xl bg-black border border-blue-500/30 shadow-2xl shadow-blue-500/10" alt="enhanced" />
                <a href={enhanced} download="enhanced.png" className="block text-center bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                  📥 DOWNLOAD ENHANCED IMAGE
                </a>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-400 font-medium animate-pulse">AI is working its magic...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;