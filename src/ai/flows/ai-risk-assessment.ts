'use server';

/**
 * @fileOverview Analyzes incident reports and transit routes to identify high-risk areas and times.
 *
 * - analyzeRisk - A function that analyzes risk based on incident reports and route data.
 * - AnalyzeRiskInput - The input type for the analyzeRisk function.
 * - AnalyzeRiskOutput - The return type for the analyzeRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncidentReportSchema = z.object({
  location: z.string().describe('The location where the incident occurred.'),
  time: z.string().describe('The time the incident occurred (e.g., 10:00 PM).'),
  incidentType: z.string().describe('The type of incident (e.g., theft, harassment).'),
  description: z.string().optional().describe('A more detailed description of the incident.'),
});

const TransitRouteSchema = z.object({
  routeName: z.string().describe('The name of the transit route.'),
  stops: z.array(z.string()).describe('A list of stops along the route.'),
});

const AnalyzeRiskInputSchema = z.object({
  incidentReports: z.array(IncidentReportSchema).describe('A list of incident reports.'),
  transitRoutes: z.array(TransitRouteSchema).describe('A list of transit routes.'),
});
export type AnalyzeRiskInput = z.infer<typeof AnalyzeRiskInputSchema>;

const RiskAssessmentSchema = z.object({
  riskLevel: z.string().describe('The level of risk (e.g., high, medium, low).'),
  riskFactors: z.array(z.string()).describe('The factors contributing to the risk.'),
});

const HighRiskAreaSchema = z.object({
  area: z.string().describe('The name of the high-risk location.'),
  times: z.array(z.string()).describe('The times of day when the risk is highest (e.g., 8:00 PM - 10:00 PM).'),
  riskFactors: z.array(z.string()).describe('Factors contributing to the risk in this location'),
});

const AnalyzeRiskOutputSchema = z.object({
  overallRiskAssessment: RiskAssessmentSchema.describe('The overall risk assessment for the transit system.'),
  highRiskAreas: z.array(HighRiskAreaSchema).describe('A list of high-risk areas and times.'),
});
export type AnalyzeRiskOutput = z.infer<typeof AnalyzeRiskOutputSchema>;

export async function analyzeRisk(input: AnalyzeRiskInput): Promise<AnalyzeRiskOutput> {
  return analyzeRiskFlow(input);
}

const analyzeRiskPrompt = ai.definePrompt({
  name: 'analyzeRiskPrompt',
  input: {schema: AnalyzeRiskInputSchema},
  output: {schema: AnalyzeRiskOutputSchema},
  prompt: `You are an AI assistant that analyzes incident reports and transit routes to identify high-risk areas and times.

  Analyze the following incident reports:
  {{#each incidentReports}}
  - Location: {{this.location}}, Time: {{this.time}}, Incident: {{this.incidentType}}, Description: {{this.description}}
  {{/each}}

  And the following transit routes:
  {{#each transitRoutes}}
  - Route Name: {{this.routeName}}, Stops: {{this.stops}}
  {{/each}}

  Based on this information, identify the overall risk assessment for the transit system, including the level of risk and the factors contributing to the risk.  Also identify specific high-risk areas and the times of day when the risk is highest, along with the factors that contribute to the risk in those locations.

  Consider factors such as the frequency of incidents, the severity of incidents, the time of day, and the location of incidents. Consider the route and stops to determine specific high-risk locations.

  Format your response as a JSON object that matches the AnalyzeRiskOutputSchema.  Include an overallRiskAssessment, and a highRiskAreas array.
  `,
});

const analyzeRiskFlow = ai.defineFlow(
  {
    name: 'analyzeRiskFlow',
    inputSchema: AnalyzeRiskInputSchema,
    outputSchema: AnalyzeRiskOutputSchema,
  },
  async input => {
    const {output} = await analyzeRiskPrompt(input);
    return output!;
  }
);

