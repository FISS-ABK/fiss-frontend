"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadProps {
  onUploadSuccess: (imageUrl: string, publicId: string) => void;
  onUploadError?: (error: string) => void;
  onClear?: () => void;
}

export default function CloudinaryUpload({
  onUploadSuccess,
  onUploadError,
  onClear,
}: CloudinaryUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadFile(file);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (file: File) => {
    // Basic validation
    if (!file.type.startsWith("image/")) {
      const msg = "Please select an image file.";
      setErrorMsg(msg);
      if (onUploadError) onUploadError(msg);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const msg = "File size must be less than 5MB.";
      setErrorMsg(msg);
      if (onUploadError) onUploadError(msg);
      return;
    }

    setErrorMsg(null);
    setUploading(true);
    setProgress(10); // Initial progress indicator

    // Create local object URL for instant preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // We will perform a fetch to our Server Route Handler
      setProgress(30);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(80);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await res.json();
      setProgress(100);
      setUploadedUrl(data.imageurl);
      onUploadSuccess(data.imageurl, data.public_id);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "An error occurred during upload.";
      setErrorMsg(message);
      setPreviewUrl(null);
      if (onUploadError) onUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setUploadedUrl(null);
    setErrorMsg(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onClear) onClear();
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-300 ${
          dragActive
            ? "border-[#09283b] bg-blue-50/50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100/50"
        } ${previewUrl || uploadedUrl ? "border-solid bg-white p-4" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
        />

        {/* Normal idle state (no preview or upload yet) */}
        {!previewUrl && !uploadedUrl && !uploading && (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-blue-50 p-4 text-[#09283b]">
              <UploadCloud className="h-8 w-8" />
            </div>
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Drag & drop image here or{" "}
              <button
                type="button"
                onClick={onButtonClick}
                className="text-[#09283b] underline font-bold hover:text-blue-900 transition-colors"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">Supports PNG, JPG, JPEG up to 5MB</p>
          </div>
        )}

        {/* Uploading progress state */}
        {uploading && previewUrl && (
          <div className="flex w-full flex-col items-center justify-center p-4">
            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-lg border bg-gray-100 shadow-inner">
              <Image
                src={previewUrl}
                alt="Uploading Preview"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <Loader2 className="h-8 w-8 animate-spin text-[#09283b]" />
              </div>
            </div>
            <div className="w-full max-w-xs">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-semibold text-gray-700">Uploading image...</span>
                <span className="text-xs font-semibold text-gray-700">{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#09283b] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Finished / Uploaded success state */}
        {!uploading && (uploadedUrl || previewUrl) && (
          <div className="relative flex w-full flex-col items-center justify-center p-2">
            <div className="relative h-48 w-full max-w-md overflow-hidden rounded-lg border bg-gray-50 shadow-md">
              <Image
                src={uploadedUrl || previewUrl || ""}
                alt="Uploaded Preview"
                fill
                className="object-contain"
                unoptimized
              />
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {uploadedUrl && (
              <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-green-700">
                <CheckCircle className="h-4 w-4" />
                Upload completed successfully!
              </div>
            )}
          </div>
        )}

        {/* Error overlay or text */}
        {errorMsg && (
          <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
