"use client";

import { FileSpreadsheet, Eye, ArrowRight } from "lucide-react";

interface Props {
  rows: Record<string, any>[];
  loading: boolean;
  onConfirm: () => void;
  fileName?: string;
}

export default function CRMPreview({
  rows,
  loading,
  onConfirm,
  fileName,
}: Props) {
  if (!rows.length) return null;

  const headers = Object.keys(rows[0]);

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100">
            <Eye className="h-7 w-7 text-teal-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Review Imported Data
            </h2>

            <p className="mt-2 text-slate-600">
              Verify your CSV before AI mapping begins.
            </p>
          </div>
        </div>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue"}

          {!loading && <ArrowRight size={18} />}
        </button>
      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Uploaded File
          </p>

          <div className="mt-3 flex items-center gap-2">
            <FileSpreadsheet className="text-teal-700" size={20} />

            <span className="font-semibold text-slate-900">
              {fileName ?? "CSV File"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Total Records
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {rows.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Preview
          </p>

          <p className="mt-2 text-3xl font-bold text-teal-700">
            {Math.min(rows.length, 25)}
          </p>
        </div>
      </div>

      {/* Table */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <div className="max-h-[550px] overflow-y-auto">
            <table className="table-auto min-w-max !w-auto text-sm">
              <thead className="sticky top-0 bg-slate-100">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap border-b border-slate-200 px-5 py-4 text-left font-semibold text-slate-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 25).map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="max-w-xs whitespace-nowrap px-5 py-4 text-slate-600"
                      >
                        <div className="truncate">
                          {String(row[header] ?? "")}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">
       

        Showing first {Math.min(rows.length, 10)} rows from the uploaded file.
      </p>
    </div>
  );
}