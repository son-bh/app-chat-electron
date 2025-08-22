import useUserStore from "@/store/userStore";

const CurrentUser = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  return (
    <>
      <div className="border-b pb-2">
        <div className="flex p-2 items-center rounded-lg justify-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  transition-colors">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              You
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {userInfo.username}
            </h4>
            <p className="text-xs text-green-600 dark:text-green-400">
              Đang hoạt động
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentUser;
