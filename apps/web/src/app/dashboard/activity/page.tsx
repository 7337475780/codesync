import { ActivityCenter } from '@/components/activity/activity-center';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity | Enterprise Dashboard',
  description: 'Enterprise Activity Center',
};

export default function ActivityPage() {
  return (
    <div className="p-6 md:p-8">
      <ActivityCenter />
    </div>
  );
}
