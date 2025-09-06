import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { recentIncidents } from '@/lib/mock-data';

const getBadgeVariant = (type: string) => {
  switch (type.toLowerCase()) {
    case 'theft':
      return 'destructive';
    case 'harassment':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function RecentIncidents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
        <CardDescription>
          A log of the latest reported incidents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  <Badge variant={getBadgeVariant(incident.type)}>
                    {incident.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{incident.location}</TableCell>
                <TableCell className="text-muted-foreground">{incident.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
