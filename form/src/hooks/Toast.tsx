import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface Toast {
  title: string;
  description: string;
}

interface ToastContextProps {
  toast: Toast | null;
  showToast: (title: string, description: any) => void;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((title: string, description: string) => {
    setToast({ title, description });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    const removeToast = setTimeout(() => {
      closeToast();
    }, 5000);

    return () => {
      clearTimeout(removeToast);
    };
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, showToast, closeToast }}>
      {children}
      <ol
        tabIndex={-1}
        className={`${
          toast ? "visible" : "invisible"
        } fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] transition-all duration-400`}
        style={{ zIndex: 2000, opacity: toast ? 1 : 0 }}
      >
        <li
          role="status"
          aria-live="off"
          aria-atomic="true"
          tabIndex={0}
          data-state="open"
          data-swipe-direction="right"
          className="bg-white data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full bg-background border"
          data-radix-collection-item=""
        >
          <div className="grid gap-1">
            <div className="text-sm font-semibold">{toast?.title}</div>
            <div className="text-sm opacity-90 line-clamp-3 break-words">
              {toast?.description}
            </div>
          </div>
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 lg:opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
            toast-close=""
            data-radix-toast-announce-exclude=""
            onClick={closeToast}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" x2="6" y1="6" y2="18"></line>
              <line x1="6" x2="18" y1="6" y2="18"></line>
            </svg>
          </button>
        </li>
      </ol>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
