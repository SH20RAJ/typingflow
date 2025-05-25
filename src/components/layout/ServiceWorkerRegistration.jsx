'use client';

import { useRegisterServiceWorker } from '@/lib/hooks/useRegisterServiceWorker';

export function ServiceWorkerRegistration() {
  useRegisterServiceWorker();
  return null;
}
