"use client";

import { useState } from "react";
import Papa from "papaparse";
import { api } from "@/services/api";

import Navbar from "@/components/layouts/navbar";
import Stepper from "@/components/layouts/stepper";
import UploadSection from "@/components/upload/uploadsection";
import CRMPreview from "@/components/preview/crmpreview";
import ImportResult from "@/components/import/importresult";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<Record<string, any>[]>([]);
  const [parsedRows, setParsedRows] = useState<Record<string, any>[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    successfulParsed: 0,
    skippedRecords: 0,
    totalImported: 0,
    totalSkipped: 0,
  });

  async function uploadCSV(selectedFile: File) {
    setError(null);
    setFile(selectedFile);

    setIsUploading(true);

    setShowPreview(false);
    setShowResult(false);

    setParsedRows([]);

    try {
      const parsed = await new Promise<any[]>((resolve, reject) => {
        Papa.parse(selectedFile, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data as any[]),
          error: reject,
        });
      });

      const normalizedRows = parsed.filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            value !== ""
        )
      );

      setPreviewRows(normalizedRows);
      setShowPreview(true);
    } catch {
      setPreviewRows([]);
      setError(
        "We couldn't parse the CSV file. Please verify the format and try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

//   async function confirmImport() {
//     if (!file) return;

//     setError(null);
//     setIsConfirming(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await api.post<{
//         success: boolean;
//         mappedRows?: Record<string, any>[];
//       }>("/ai/analyze", formData);

//       // const mappedRows = response.data.mappedRows ?? [];
//       const mappedRows = response.data.mappedRows ?? [];

// console.log("Response:", response.data);
// console.log("Mapped Rows:", mappedRows);
// console.log("First Row:", mappedRows[0]);

//       const successfulParsed = mappedRows.length;

//       const skippedRecords = Math.max(
//         0,
//         previewRows.length - successfulParsed
//       );

//       setParsedRows(mappedRows);

//       setStats({
//         successfulParsed,
//         skippedRecords,
//         totalImported: successfulParsed,
//         totalSkipped: skippedRecords,
//       });

//       setShowResult(true);
//     } catch (err: any) {
//       setError(
//         err.response?.data?.message ??
//           "Import failed. Please try again."
//       );
//     } finally {
//       setIsConfirming(false);
//     }
//   }

async function confirmImport() {
  if (!file) return;

  setError(null);
  setIsConfirming(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<{
      success: boolean;
      mappedRows?: Record<string, any>[];
    }>("/ai/analyze", formData);

    
    console.log("FULL RESPONSE:", response.data);

    const mappedRows = response.data.mappedRows ?? [];

    // console.log("FIRST ROW:", mappedRows[0]);
    // console.log("ALL KEYS:", Object.keys(mappedRows[0] || {}));

    const successfulParsed = mappedRows.length;

    const skippedRecords = Math.max(
      0,
      previewRows.length - successfulParsed
    );

    setParsedRows(mappedRows);

    setStats({
      successfulParsed,
      skippedRecords,
      totalImported: successfulParsed,
      totalSkipped: skippedRecords,
    });

    setShowResult(true);
  } catch (err: any) {
    setError(
      err.response?.data?.message ??
        "Import failed. Please try again."
    );
  } finally {
    setIsConfirming(false);
  }
}

  function restart() {
    setFile(null);

    setPreviewRows([]);
    setParsedRows([]);

    setShowPreview(false);
    setShowResult(false);

    setError(null);

    setStats({
      successfulParsed: 0,
      skippedRecords: 0,
      totalImported: 0,
      totalSkipped: 0,
    });
  }

  const currentStep = isConfirming
    ? 2
    : showResult
    ? 3
    : showPreview
    ? 1
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
            AI Powered CRM Import
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Import Your CRM Data
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Upload a CSV, review your records, let AI map your data,
            and safely import everything into your CRM.
          </p>
        </div>

        {/* Stepper */}
        <div className="mx-auto mb-8 max-w-5xl">
          <Stepper currentStep={currentStep} />
        </div>

        {/* Error */}
        {error && (
          <div className="mx-auto mb-8 max-w-5xl rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="w-full">
          {!showPreview && !showResult && (
            <UploadSection
              onSelect={uploadCSV}
              isLoading={isUploading}
            />
          )}

          {showPreview && !showResult && (
            <CRMPreview
              rows={previewRows}
              loading={isConfirming}
              onConfirm={confirmImport}
              fileName={file?.name ?? ""}
            />
          )}

          {showResult && (
            <ImportResult
              records={parsedRows}
              imported={stats.totalImported}
              skipped={stats.totalSkipped}
              onRestart={restart}
            />
          )}
        </div>
      </section>
    </main>
  );
}