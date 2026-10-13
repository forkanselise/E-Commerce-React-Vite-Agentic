import { useEffect } from 'react';

let lockCount = 0;
let originalHtmlOverflow = '';
let originalBodyOverflow = '';
let originalPaddingRight = '';

// Active wheel & touch blocker for background outside scrollable modals
function preventBackgroundScroll(e) {
  // If the event target is inside any modal-scrollable container, let it scroll normally
  if (e.target && e.target.closest && e.target.closest('.modal-scrollable')) {
    return;
  }
  // Otherwise, if scrolling occurred outside (on backdrop or background), block it completely!
  if (e.cancelable) {
    e.preventDefault();
  }
}

export function lockBodyScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    originalHtmlOverflow = document.documentElement.style.overflow;
    originalBodyOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    // Attach non-passive event listeners to intercept wheel and touchmove events outside modals
    window.addEventListener('wheel', preventBackgroundScroll, { passive: false });
    window.addEventListener('touchmove', preventBackgroundScroll, { passive: false });
  }
  lockCount++;
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.style.overflow = originalHtmlOverflow;
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalPaddingRight;

    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');

    window.removeEventListener('wheel', preventBackgroundScroll);
    window.removeEventListener('touchmove', preventBackgroundScroll);
  }
}

/**
 * Hook to lock body and root scroll when a modal or drawer is open.
 * Supports multiple nested or simultaneous modals without premature unlock.
 * Intercepts background wheel & touch events outside .modal-scrollable containers.
 * @param {boolean} isLocked - whether scroll should currently be locked
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
