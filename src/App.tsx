import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ScrollToTop } from "./components/common/ScrollToTop";
import Routes from "./routes/Routes";
import PageMeta from "./components/common/PageMeta";
// import { useDeployVersionCheck } from './hooks/useDeployVersionCheck';
import { useServiceWorkerUpdater } from "./sw-update-listener";

export default function App() {
  useServiceWorkerUpdater();

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
