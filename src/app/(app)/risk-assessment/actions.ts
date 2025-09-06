'use server';

import { analyzeRisk, type AnalyzeRiskInput } from '@/ai/flows/ai-risk-assessment';

export async function getRiskAnalysis(input: AnalyzeRiskInput) {
  try {
    const output = await analyzeRisk(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('Error in AI risk analysis:', error);
    return { success: false, error: 'Failed to analyze risk. Please try again.' };
  }
}
