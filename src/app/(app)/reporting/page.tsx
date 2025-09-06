import IncidentForm from '@/components/reporting/incident-form';
import PageHeader from '@/components/page-header';

export default function ReportingPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Report an Incident"
        description="Your report helps improve safety for everyone. Please provide as much detail as possible."
      />
      <IncidentForm />
    </div>
  );
}
