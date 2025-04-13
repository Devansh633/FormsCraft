import { useNavigate } from "react-router-dom";
import { Features } from "./Features";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { PricingTabs } from "./PricingTabs";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <Features />
    </>
  );
};
