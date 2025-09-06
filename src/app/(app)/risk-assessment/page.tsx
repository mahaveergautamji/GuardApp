import PageHeader from '@/components/page-header';
import RiskAnalyzer from '@/components/risk-assessment/risk-analyzer';

export default function RiskAssessmentPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="AI-Powered Risk Assessment"
        description="Analyze incident reports and transit routes to identify high-risk areas and times."
      />
      <RiskAnalyzer />
    </div>
  );
}
