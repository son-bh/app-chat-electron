import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import UserMetaCard from './components/UserMetaCard';
// import UserInfoCard from "../components/user-profile/UserInfoCard";
// import UserAddressCard from "../components/user-profile/UserAddressCard";
import PageMeta from '@/components/common/PageMeta';

export default function UserProfile() {
  return (
    <>
      <PageMeta title='Thông tin cá nhân' description='Thông tin cá nhân' />
      <PageBreadcrumb pageTitle='Thông tin cá nhân' />
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6'>
        <h3 className='mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7'>
          Thông tin cá nhân
        </h3>
        <div className='space-y-6'>
          <UserMetaCard />
          {/* <UserInfoCard /> */}
          {/* <UserAddressCard /> */}
        </div>
      </div>
    </>
  );
}
