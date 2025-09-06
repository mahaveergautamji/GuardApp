import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Building } from 'lucide-react';

export default function EmergencyContacts() {
  return (
    <Card className="bg-destructive/10 border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <Phone />
          Emergency Assistance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button
          variant="destructive"
          className="w-full justify-start gap-3 pl-4"
        >
          <Phone className="h-5 w-5" />
          Call 911
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 pl-4 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Building className="h-5 w-5" />
          Contact Transit Authority
        </Button>
      </CardContent>
    </Card>
  );
}
