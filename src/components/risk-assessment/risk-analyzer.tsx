'use client';

import * as React from 'react';
import { useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Shield, MapPin, Clock, ShieldAlert } from 'lucide-react';
import type { AnalyzeRiskInput, AnalyzeRiskOutput } from '@/ai/flows/ai-risk-assessment';
import { getRiskAnalysis } from '@/app/(app)/risk-assessment/actions';
import { mockAnalyzeRiskInput } from '@/lib/mock-data';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export default function RiskAnalyzer() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = React.useState<AnalyzeRiskOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [incidentReports, setIncidentReports] = React.useState(
    JSON.stringify(mockAnalyzeRiskInput.incidentReports, null, 2)
  );
  const [transitRoutes, setTransitRoutes] = React.useState(
    JSON.stringify(mockAnalyzeRiskInput.transitRoutes, null, 2)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const input: AnalyzeRiskInput = {
          incidentReports: JSON.parse(incidentReports),
          transitRoutes: JSON.parse(transitRoutes),
        };
        const response = await getRiskAnalysis(input);
        if (response.success) {
          setResult(response.data!);
        } else {
          setError(response.error!);
        }
      } catch (e) {
        setError('Invalid JSON format in input data.');
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Analysis Input</CardTitle>
          <CardDescription>
            Provide incident and route data in JSON format. Mock data is pre-filled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="incident-reports">Incident Reports</Label>
                <Textarea
                  id="incident-reports"
                  value={incidentReports}
                  onChange={(e) => setIncidentReports(e.target.value)}
                  rows={10}
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transit-routes">Transit Routes</Label>
                <Textarea
                  id="transit-routes"
                  value={transitRoutes}
                  onChange={(e) => setTransitRoutes(e.target.value)}
                  rows={10}
                  className="font-mono text-xs"
                />
              </div>
            </div>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Risk
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold font-headline">Analysis Results</h2>
        {isPending && (
          <Card className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">AI is analyzing the data...</p>
          </Card>
        )}
        {error && (
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield /> Overall Risk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Risk Level:</span>
                  <Badge variant={result.overallRiskAssessment.riskLevel.toLowerCase() === 'high' ? 'destructive' : 'secondary'}>
                    {result.overallRiskAssessment.riskLevel}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contributing Factors:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {result.overallRiskAssessment.riskFactors.map((factor, i) => (
                      <li key={i}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold font-headline">High-Risk Areas</h3>
              {result.highRiskAreas.map((area, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="text-destructive" /> {area.area}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <strong>High-Risk Times:</strong>
                      <span>{area.times.join(', ')}</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                        Risk Factors:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {area.riskFactors.map((factor, j) => (
                          <Badge key={j} variant="outline">{factor}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
