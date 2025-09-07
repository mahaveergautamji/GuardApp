import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
}

const frontendEngineers: TeamMember[] = [
  { name: 'MD Shairaj', role: 'Frontend Engineer' },
  { name: 'Vivek Kumar', role: 'Frontend Engineer' },
];

const backendEngineers: TeamMember[] = [
  { name: 'Aryan Singh', role: 'Backend Engineer' },
  { name: 'Mahaveer Gautam', role: 'Backend Engineer' },
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="flex items-center gap-4">
    <Avatar className="h-12 w-12">
      <AvatarImage src={`https://picsum.photos/seed/${member.name}/48/48`} data-ai-hint="people portrait" />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{member.name}</p>
      <p className="text-sm text-muted-foreground">{member.role}</p>
    </div>
  </div>
);

export default function CreditsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Project Credits"
        description="Meet the talented team behind TransitGuard."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frontend Engineers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {frontendEngineers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Backend Engineers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {backendEngineers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
