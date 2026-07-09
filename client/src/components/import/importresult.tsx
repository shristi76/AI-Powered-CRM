"use client";

import {
  CheckCircle2,
  Database,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface Props {
  records: Record<string, any>[];
  imported: number;
  skipped: number;
  onRestart: () => void;
}

export default function ImportResult({
  records,
  imported,
  skipped,
  onRestart,
}: Props) {
  console.log("✅ NEW ImportResult component rendered");
  const headers = records.length ? Object.keys(records[0]) : [];
  console.log("Records:", records);
console.log("Headers:", headers);
console.log("Records:", records);
console.log("Headers:", headers);
console.log("Header count:", headers.length);
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
      {/* Success Header */}

      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Import Completed Successfully
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Your CSV has been analyzed and converted into CRM-ready data.
          Review the imported records below.
        </p>
      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <StatCard
          icon={<Database size={22} />}
          title="Imported"
          value={imported}
          color="emerald"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          title="Skipped"
          value={skipped}
          color="amber"
        />

        <StatCard
          icon={<CheckCircle2 size={22} />}
          title="Success Rate"
          value={
            imported + skipped === 0
              ? "0%"
              : `${Math.round(
                  (imported / (imported + skipped)) * 100
                )}%`
          }
          color="teal"
        />
      </div>

      {/* Table */}

      {records.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
          <div className="w-full overflow-x-auto">
            <div className="max-h-[550px] overflow-y-auto">
             
              <table className="table-auto min-w-max !w-auto border-collapse border border-black">
  <thead>
    <tr>
      {headers.map((header) => (
        <th
          key={header}
          style={{
            border: "1px solid black",
            padding: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {records.map((row, index) => (
      <tr key={index}>
        {headers.map((header) => (
          <td
            key={header}
            style={{
              border: "1px solid black",
              padding: "8px",
              whiteSpace: "nowrap",
            }}
          >
            {String(row[header] ?? "")}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}

      <div className="mt-10 flex justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-800 hover:shadow-lg"
        >
          <RotateCcw size={18} />
          Import Another CSV
        </button>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "teal";
}

function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  const colors = {
    emerald:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    amber:
      "bg-amber-50 text-amber-700 border-amber-200",

    teal:
      "bg-teal-50 text-teal-700 border-teal-200",
  };

  return (
    <div
      className={`rounded-2xl border p-6 ${colors[color]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          {title}
        </span>

        {icon}
      </div>

      <p className="mt-5 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}