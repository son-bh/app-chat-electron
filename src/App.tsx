import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ScrollToTop } from "./components/common/ScrollToTop";
import Routes from "./routes/Routes";
import PageMeta from "./components/common/PageMeta";
// import { useDeployVersionCheck } from './hooks/useDeployVersionCheck';
import { useServiceWorkerUpdater } from "./sw-update-listener";
import { IS_WEB } from "./shared/constants";

export default function App() {
  console.log("🚀 ~ IS_WEB:", IS_WEB);
  const Router = !IS_WEB ? HashRouter : BrowserRouter;

  if (window && navigator.serviceWorker && IS_WEB) {
    useServiceWorkerUpdater();
  }

  return (
    <>
      <PageMeta title="Chat nội bộ" description="Chat nội bộ" />
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
      <ToastContainer
        className="global-toast !z-[999999]"
        position="top-right"
        limit={1}
        hideProgressBar
        newestOnTop
        pauseOnHover
        autoClose={false}
        closeOnClick={false}
      />
    </>
  );
}
