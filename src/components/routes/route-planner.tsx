'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Walk, Bus, ShieldAlert, Clock } from 'lucide-react';
import { routeStops } from '@/lib/mock-data';

export default function RoutePlanner() {
  const [start, setStart] = React.useState<string | undefined>();
  const [end, setEnd] = React.useState<string | undefined>();
  const [plannedRoute, setPlannedRoute] = React.useState(false);

  const handleFindRoute = () => {
    if (start && end) {
      setPlannedRoute(true);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Journey</CardTitle>
            <CardDescription>Select your start and end points.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="start-point">From</Label>
              <Select value={start} onValueChange={setStart}>
                <SelectTrigger id="start-point">
                  <SelectValue placeholder="Select a starting point" />
                </SelectTrigger>
                <SelectContent>
                  {routeStops.map((stop) => (
                    <SelectItem key={stop} value={stop}>
                      {stop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-point">To</Label>
              <Select value={end} onValueChange={setEnd}>
                <SelectTrigger id="end-point">
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent>
                  {routeStops.map((stop) => (
                    <SelectItem key={stop} value={stop} disabled={stop === start}>
                      {stop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleFindRoute} disabled={!start || !end}>
              Find Safest Route
            </Button>
          </CardFooter>
        </Card>
      </div>

      {plannedRoute && (
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Safe Route</CardTitle>
              <CardDescription>
                From: {start} &rarr; To: {end}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <Walk className="h-6 w-6 text-primary" />
                  <div className="h-10 w-px bg-border" />
                </div>
                <div>
                  <p className="font-semibold">Walk to Oak Street Bus Stop</p>
                  <p className="text-sm text-muted-foreground">3 min walk</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <Bus className="h-6 w-6 text-primary" />
                  <div className="h-24 w-px bg-border" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Take Bus 42A towards Downtown</p>
                  <p className="text-sm text-muted-foreground">5 stops, approx. 15 mins</p>
                  <Alert variant="destructive" className="mt-2">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>High-Risk Zone on this segment!</AlertTitle>
                    <AlertDescription>
                      This route passes through Central Station. High risk of theft reported between 8 PM - 11 PM.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <Walk className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Walk to {end}</p>
                  <p className="text-sm text-muted-foreground">5 min walk</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Total Time: Approx. 23 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Safety Rating: Moderate</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
