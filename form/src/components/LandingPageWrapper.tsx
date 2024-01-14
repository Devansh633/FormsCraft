import { Footer } from "./Footer";
import { Header } from "./Header";

export const LandingPageWrapper = ({ children }: any) => {
  return (
    <div className="px-4 md:px-16 lg:px-20">
      <div className="space-y-6 md:space-y-8">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
