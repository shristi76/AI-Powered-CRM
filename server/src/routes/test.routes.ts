//test without prompt

import { Router } from "express";
import { HeaderAnalysisService } from "../services/ai/header-analysis.service";
import { PromptBuilderService } from "../services/ai/prompt-builder.service";
import { CRM_SCHEMA } from "../constants/crm-schema";

const router = Router();

router.get("/prompt", (req, res) => {
  const analysis = [
    {
      originalHeader: "Customer Name",
      sampleValue: "Rahul Sharma",
      inferredType: "text" as const,
    },
    {
      originalHeader: "Phone",
      sampleValue: "9876543210",
      inferredType: "phone" as const,
    },
    {
      originalHeader: "Email",
      sampleValue: "rahul@gmail.com",
      inferredType: "email" as const,
    },
  ];

  const prompt = PromptBuilderService.build({
    crmFields: CRM_SCHEMA,
    headerAnalysis: analysis,
  });

  res.json(prompt);
});

export default router;