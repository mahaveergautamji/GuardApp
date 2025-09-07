import PageHeader from '@/components/page-header';
import CommunityFeed from '@/components/community/community-feed';

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Community Forum"
        description="Connect with fellow commuters, share tips, and stay informed about transit safety."
      />
      <CommunityFeed />
    </div>
  );
}
