// src/pages/CreateListing.tsx
import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import {
  ArrowLeft,
  Wrench,
  Search,
  ImagePlus,
  Link as LinkIcon,
} from "lucide-react";

const CreateListing = () => {
  const [offerSkill, setOfferSkill] = useState("");
  const [wantSkill, setWantSkill] = useState("");
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSelectFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const arr = Array.from(selectedFiles).slice(0, 6); // limit examples
    setFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectFiles(e.dataTransfer.files);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Example payload - replace with API call
    const payload = {
      offerSkill,
      wantSkill,
      description,
      portfolio,
      files,
    };
    // For now just log
    console.log("Create listing payload:", payload);
    // TODO: show toast, navigate, or call backend
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            aria-label="Back"
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            New Skill Trade
          </h1>
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        className="flex-1 overflow-auto max-w-3xl mx-auto px-4 py-6 pb-32 md:pb-40"
      >
        {/* Skill you want to offer */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill you want to offer
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
            <div className="mr-3 text-gray-500">
              <Wrench size={18} />
            </div>
            <input
              type="text"
              value={offerSkill}
              onChange={(e) => setOfferSkill(e.target.value)}
              placeholder="e.g. Web Design"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Skill you're looking for */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill you're looking for
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
            <div className="mr-3 text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={wantSkill}
              onChange={(e) => setWantSkill(e.target.value)}
              placeholder="e.g. Content Writing"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your trade
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Tell us more about the skills you're offering and what you're looking for in return."
            className="w-full border border-gray-200 rounded-xl px-4 py-4 bg-gray-50 text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none"
          />
        </div>

        {/* Showcase upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Showcase your work
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={openFilePicker}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFilePicker();
            }}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 text-gray-600">
              <ImagePlus size={20} />
              <span className="font-medium">Add Examples or Portfolio</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Click to upload or drag & drop (images, pdf, up to 6 files)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => onSelectFiles(e.target.files)}
              className="hidden"
              accept="image/*,.pdf"
              multiple
            />
          </div>

          {/* File previews */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="relative rounded-md border border-gray-200 overflow-hidden bg-white"
                >
                  {/* Show image preview where possible */}
                  {f.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-full h-28 object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-28">
                      <div className="text-sm text-gray-600 px-2">{f.name}</div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                    aria-label={`Remove ${f.name}`}
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or add a link to your portfolio
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
            <div className="mr-3 text-gray-500">
              <LinkIcon size={18} />
            </div>
            <input
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://yourportfolio.com"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>
      </form>

      {/* Sticky bottom CTA */}
      <div className="fixed left-0 right-0 bottom-0 bg-white border-t border-gray-100 py-4 px-4 safe-bottom">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={() => onSubmit()}
            className="bg-[#FF2E2E] w-full py-4 text-lg font-semibold rounded-full shadow-lg"
          >
            Create Listing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
