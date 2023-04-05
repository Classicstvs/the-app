import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useScrollPosition() {
  const router = useRouter();

  useEffect(() => {
    // Save the current scroll position before navigating to a new page
    const handleRouteChange = () => {
      window.history.scrollRestoration = 'manual';
      const scrollY = window.scrollY;
      sessionStorage.setItem(router.pathname, scrollY.toString());
    };

    // Restore the previous scroll position when returning to a page
    const handleBeforeUnload = () => {
      sessionStorage.removeItem(router.pathname);
    };

    const handleRouteComplete = () => {
      const scrollY = sessionStorage.getItem(router.pathname) || 0;
      window.scrollTo(0, scrollY);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router]);
}
