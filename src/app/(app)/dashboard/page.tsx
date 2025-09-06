import type { NextPage } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Siren, MapPin, Clock, ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/page-header';
import EmergencyContacts from '@/components/dashboard/emergency-contacts';
import IncidentChart from '@/components/dashboard/incident-chart';
import RecentIncidents from '@/components/dashboard/recent-incidents';

const DashboardPage: NextPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Dashboard" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to TransitGuard</CardTitle>
            <CardDescription>
              Your partner in safe and smart public transportation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Here you can view real-time safety alerts, report incidents, and plan your
              journey with safety in mind. Stay aware and travel smart.
            </p>
          </CardContent>
        </Card>
        <EmergencyContacts />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Siren className="text-primary" />
            Real-Time Alerts
          </CardTitle>
          <CardDescription>
            Active incidents and high-risk zone warnings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>High-Risk Zone: Central Station</AlertTitle>
            <AlertDescription>
              Increased theft reports between 8 PM - 11 PM. Please be vigilant.
            </AlertDescription>
          </Alert>
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertTitle>Reported Incident: Maple Avenue</AlertTitle>
            <AlertDescription>
              A harassment incident was reported 15 minutes ago near Bus Stop #7.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <IncidentChart />
        </div>
        <div className="lg:col-span-2">
          <RecentIncidents />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
