"use client";

import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Download,
  X,
  CheckCircle2,
} from "lucide-react";

import CRM_FIELDS from "@/constants/crmfields";

interface Props {
  onSelect?: (file: File) => void;
  onUpload?: (file: File, rows: any[]) => void;
  isLoading?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function downloadTemplate() {
  const headers = CRM_FIELDS.slice(0, 12).join(",");

  const blob = new Blob([`${headers}\n`], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "sample-leads-template.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function UploadSection({
  onSelect,
  onUpload,
  isLoading = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setSelectedFile(file);
  }

  function clearSelection() {
    setSelectedFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleUpload() {
    if (!selectedFile) return;

    onSelect?.(selectedFile);
    onUpload?.(selectedFile, []);
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Upload your CSV
        </h2>

        <p className="mt-2 max-w-2xl text-slate-600">
          Drag & drop your CSV file below or browse from your
          computer. You'll have a chance to preview everything before
          importing.
        </p>
      </div>

      {/* Dropzone */}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();

          setDragging(false);

          const file = e.dataTransfer.files[0];

          if (file) {
            handleFile(file);
          }
        }}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300

        ${
          dragging
            ? "border-teal-600 bg-teal-50"
            : selectedFile
            ? "border-emerald-500 bg-emerald-50"
            : "border-slate-300 hover:border-teal-500 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFile(file);
            }
          }}
        />

        {!selectedFile ? (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
              <Upload className="h-10 w-10 text-teal-700" />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-900">
              Drag & Drop CSV File
            </h3>

            <p className="mt-2 text-slate-500">
              or click anywhere to browse
            </p>

            <div className="mt-6 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              Maximum size: 5 MB
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-lg">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              File Ready
            </h3>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="text-teal-700" />

                <div className="text-left">
                  <p className="font-medium text-slate-900">
                    {selectedFile.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h4 className="font-semibold text-slate-900">
            Need a template?
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Download a sample CSV with the required CRM headers.
          </p>
        </div>

        <button
          onClick={downloadTemplate}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium transition hover:border-teal-500 hover:text-teal-700"
        >
          <Download size={18} />

          Download Template
        </button>
      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          onClick={clearSelection}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          disabled={!selectedFile || isLoading}
          onClick={handleUpload}
          className="rounded-xl bg-teal-700 px-8 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Preparing Preview..." : "Continue"}
        </button>
      </div>
    </div>
  );
}