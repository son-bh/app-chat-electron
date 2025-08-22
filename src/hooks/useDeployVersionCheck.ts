import { useEffect, useRef } from 'react';

interface VersionData {
  buildId: string;
  timestamp: string;
  gitCommit: string;
}

export function useDeployVersionCheck(checkIntervalMs: number = 30000): void {
  const activeDeployVersion = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkForNewDeployVersion = async (): Promise<void> => {
      try {
        const response = await fetch('/version.json', { cache: 'no-store' });
        const data: VersionData = await response.json();

        if (!activeDeployVersion.current) {
          activeDeployVersion.current = data.buildId;
        } else if (activeDeployVersion.current !== data.buildId) {
          if (isMounted) {
            console.log(
              `🔄 New deploy detected — Commit ${data.gitCommit} @ ${data.timestamp}`
            );
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Deploy version check failed:', error);
      }
    };

    checkForNewDeployVersion();
    const intervalId = setInterval(checkForNewDeployVersion, checkIntervalMs);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [checkIntervalMs]);
}
