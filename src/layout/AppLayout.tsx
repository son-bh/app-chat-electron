import { SidebarProvider, useSidebar } from "../context/SidebarContext";
// import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useQueryGetMe } from "@/services";
import { useEffect } from "react";
import useUserStore from "@/store/userStore";
import { StorageKeys } from "@/shared/constants";
import { CookiesStorage } from "@/shared/utils/cookie-storage";
import { useLocation } from "react-router-dom";
import { LayoutWidthProvider } from "@/provides/LayoutWidthProvider";

const LayoutContent = ({ children }: { children?: React.ReactNode }) => {
  const { isMobile } = useSidebar();
  const { data } = useQueryGetMe();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (data?.data) {
      CookiesStorage.setCookieData(
        StorageKeys.UserInfo,
        JSON.stringify(data?.data)
      );
      setUserInfo(data?.data);
    }
  }, [data]);

  // Logic ban đầu: ẩn children khi mobile và là home page
  const shouldHideChildren = isMobile && isHomePage;

  return (
    <div className="min-h-screen flex">
      {/* <div>
        <Backdrop />
      </div> */}

      <div className={shouldHideChildren ? "w-full" : ""}>
        <AppSidebar />
      </div>

      {!shouldHideChildren && (
        <LayoutWidthProvider>
          <div className={`flex-1 transition-all duration-300 ease-in-out`}>
            <div className="mx-auto md:px-0">{children}</div>
          </div>
        </LayoutWidthProvider>

      )}
    </div>
  );
};

const AppLayout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default AppLayout;
