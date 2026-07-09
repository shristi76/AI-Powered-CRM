"use client";

import { Check } from "lucide-react";

interface Props {
  currentStep: number;
}

const steps = [
  {
    title: "Upload",
    description: "Select your CSV",
  },
  {
    title: "Preview",
    description: "Review records",
  },
  {
    title: "Confirm",
    description: "AI Mapping",
  },
  {
    title: "Results",
    description: "Import complete",
  },
];

export default function Stepper({ currentStep }: Props) {
  return (
    <div className="mb-10">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-slate-200 md:block" />

        <div
          className="absolute left-0 top-5 hidden h-0.5 bg-teal-600 transition-all duration-500 md:block"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 bg-white transition-all duration-300
                  ${
                    completed
                      ? "border-teal-600 bg-teal-600 text-white"
                      : active
                      ? "border-teal-600 text-teal-700 shadow-lg shadow-teal-200"
                      : "border-slate-300 text-slate-500"
                  }`}
                >
                  {completed ? (
                    <Check size={18} />
                  ) : (
                    <span className="text-sm font-semibold">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="mt-4">
                  <h3
                    className={`text-sm font-semibold ${
                      active || completed
                        ? "text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}