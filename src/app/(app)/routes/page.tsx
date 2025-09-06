import PageHeader from '@/components/page-header';
import RoutePlanner from '@/components/routes/route-planner';

export default function RoutesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Safe Route Planner"
        description="Plan your journey using the safest available routes, based on real-time data."
      />
      <RoutePlanner />
    </div>
  );
}
