'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

const incidentFormSchema = z.object({
  incidentType: z.string({
    required_error: 'Please select an incident type.',
  }),
  location: z.string().min(3, 'Location must be at least 3 characters.'),
  time: z.string().nonempty('Please enter the time of the incident.'),
  description: z.string().optional(),
  media: z.any().optional(),
});

type IncidentFormValues = z.infer<typeof incidentFormSchema>;

const defaultValues: Partial<IncidentFormValues> = {
  incidentType: undefined,
  location: '',
  description: '',
};

export default function IncidentForm() {
  const { toast } = useToast();
  const form = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues,
  });

  function onSubmit(data: IncidentFormValues) {
    console.log(data);
    toast({
      title: 'Report Submitted',
      description: 'Thank you for helping improve our community\'s safety.',
    });
    form.reset();
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="incidentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="theft">Theft</SelectItem>
                      <SelectItem value="harassment">Harassment</SelectItem>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="overcrowding">Overcrowding</SelectItem>
                      <SelectItem value="reckless_driving">Reckless Driving</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Stop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Central Station" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Incident</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of the incident..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Upload Media (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="file" className="pl-12" {...field} />
                      <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
