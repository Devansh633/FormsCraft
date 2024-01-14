import { createContext, useContext, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

interface BackdropContextProps {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const BackdropContext = createContext<BackdropContextProps | undefined>(
  undefined
);

export const BackdropProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <BackdropContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      {isLoading && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50"
          style={{ zIndex: 1000 }}
        >
          {/* Loader component can be replaced with your preferred loader */}
          <div className="loader">
            <LoadingSpinner width={6} height={6} />
          </div>
        </div>
      )}
    </BackdropContext.Provider>
  );
};

export const useBackdrop = () => {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error("useBackdrop must be used within a BackdropProvider");
  }
  return context;
};
