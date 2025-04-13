import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [sectionClick, setSectionClick] = useState<boolean>(false);

  useEffect(() => {
    const hash = window.location.hash;
    let myElement: any = "";
    switch (hash) {
      case "#features":
        myElement = document.getElementById("features");
        myElement?.scrollIntoView?.({ behavior: "smooth" });
        break;
      case "#pricing":
        myElement = document.getElementById("pricing");
        myElement?.scrollIntoView?.({ behavior: "smooth" });
        break;
      default:
        break;
    }
  }, [sectionClick]);
  return (
    <div className="py-10 lg:py-20">
      <div className="flex justify-between flex-wrap">
        <div className="flex-1 space-y-3">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img src="/f.png" alt="logo" className="w-[3rem]" />
              <p className="font-bold text-lg">FormsCraft</p>
            </div>
          </Link>
          <p className="text-sm">© FormsCraft. All right reserved</p>
        </div>
        <div className="flex-1 flex justify-around items-center">
          <div className="space-y-2">
            <p className="font-semibold">Resources</p>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/templates">Templates</Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  onClick={() => setSectionClick((prv) => !prv)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/#pricing"
                  onClick={() => setSectionClick((prv) => !prv)}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Legal</p>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/terms">Term</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/r/sO0wT6dD9q">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
