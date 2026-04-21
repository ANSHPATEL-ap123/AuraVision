import { useState, useRef, useCallback } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 20;

/**
 * Reads a File and returns a Base64 data URL string.
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function UploadZone({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const validateFile = useCallback((file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Please upload a JPG, PNG, or WebP image.';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  }, []);

  const handleFile = useCallback(async (file) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    // Convert to Base64 DataURL so App.jsx can display it AND send it to the API
    const base64 = await fileToBase64(file);
    onUpload(base64);
  }, [validateFile, onUpload]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="animate-slide-in-up">
      <div
        className={`upload-zone flex flex-col items-center justify-center gap-4 p-10 cursor-pointer transition-all ${isDragging ? 'dragover' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        id="upload-drop-zone"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleInputChange}
          className="hidden"
          id="file-input"
        />

        {/* Icon */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
          isDragging
            ? 'bg-accent/20 border border-accent/40 glow-accent'
            : 'bg-bg-tertiary border border-border'
        }`}>
          <Upload className={`w-7 h-7 transition-colors ${isDragging ? 'text-accent-light' : 'text-text-tertiary'}`} />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary">
            {isDragging ? 'Release to upload' : 'Drop your image here'}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            or <span className="text-accent-light hover:underline">browse files</span>
          </p>
        </div>

        {/* Accepted formats */}
        <div className="flex items-center gap-2 mt-1">
          {['JPG', 'PNG', 'WebP'].map((fmt) => (
            <span
              key={fmt}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-bg-tertiary text-text-tertiary border border-border"
            >
              {fmt}
            </span>
          ))}
          <span className="text-[10px] text-text-tertiary">
            up to {MAX_SIZE_MB}MB
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-error/10 border border-error/20 text-sm text-error animate-slide-in-up">
          {error}
        </div>
      )}
    </div>
  );
}
