import ProfileSidebar from '../components/account/ProfileSidebar';
import WelcomeBanner from '../components/account/WelcomeBanner';
import RecentActivity from '../components/account/RecentActivity';
import RecentlyViewed from '../components/account/RecentlyViewed';

export default function AccountPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <ProfileSidebar />
          </div>
          <div className="flex-1">
            <WelcomeBanner />
            <RecentActivity />
            <RecentlyViewed />
          </div>
        </div>
      </div>
    </main>
  );
}
