import { Link } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useEffect } from "react";

export const PricingTabs = ({
  handlePayment = () => null,
}: {
  handlePayment: () => void;
}) => {
  return (
    <section className="pb-10 bg-gray-50 sm:pb-16 lg:pb-16" id="pricing">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
            Pricing &amp; Plans
          </h2>
        </div>

        <div className="hidden mt-16 lg:flex w-full justify-center items-center">
          <table className="w-[800px]">
            <thead>
              <tr>
                <th className="py-8 pr-4"></th>

                <th className="px-4 py-8 text-center">
                  <span className="text-base font-medium text-blue-600">
                    Free
                  </span>
                  <p className="mt-6 text-6xl font-bold">$0</p>
                  <p className="mt-2 text-base font-normal text-gray-500">
                    No hidden charges
                  </p>
                </th>

                <th className="px-4 py-8 text-center bg-gray-900 rounded-t-xl">
                  <span className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full">
                    Premium
                  </span>
                  <p className="mt-6 text-6xl font-bold text-white">
                    $49
                    <span className="line-through text-[20px] ml-2 text-gray-400">
                      $69
                    </span>
                  </p>
                  <p className="mt-2 text-base font-normal text-gray-200">
                    Lifetime (early bird)
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  Number Of Forms
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  Unlimited
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Unlimited
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  Submissions Per Form
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  Unlimited
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Unlimited
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  Upload File Size
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  5 mb
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  Unlimited
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  FormsCraft Tag
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    // fill="currentColor"
                  >
                    <path
                      className="stroke-gray-500"
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  -
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  <div className="flex space-x-2 items-center">
                    <span>AI Form Generator</span>
                    <svg
                      className="w-4 h-4 stroke-purple-600"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15c4.875 0 7-2.051 7-7 0 4.949 2.11 7 7 7-4.89 0-7 2.11-7 7 0-4.89-2.125-7-7-7zM2 6.5c3.134 0 4.5-1.318 4.5-4.5 0 3.182 1.357 4.5 4.5 4.5-3.143 0-4.5 1.357-4.5 4.5 0-3.143-1.366-4.5-4.5-4.5z"
                        className="stroke-purple-600"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  -
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
              </tr>

              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  New Feature Updates
                </td>

                <td className="px-4 py-4 text-center border-b border-gray-200">
                  -
                </td>

                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                  <svg
                    className="w-5 h-5 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </td>
              </tr>

              <tr>
                <td className="py-6 pr-4"></td>

                <td className="px-4 py-6 text-center">
                  <Link
                    to="/login"
                    title=""
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </td>

                <td className="px-4 py-6 text-center text-white bg-yellow-500 rounded-b-xl">
                  <div
                    className={`${
                      //   !window?.LemonSqueezy
                      false ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                    } inline-flex items-center font-semibold text-white`}
                    onClick={handlePayment}
                  >
                    <div className="flex items-center space-x-2">
                      {/* {!window?.LemonSqueezy && <LoadingSpinner white={true} />} */}
                      <p> Get Started</p>
                    </div>
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="block mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 lg:hidden">
        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">
            <span className="text-sm font-medium text-blue-600"> Free </span>
            <p className="mt-2 text-xl font-bold">$0</p>
            <span className="mt-1 text-sm font-normal text-gray-500">
              No hidden charges
            </span>
          </div>

          <div className="px-2 py-2">
            <span className="text-sm font-medium text-blue-600"> Premium </span>
            <p className="mt-2 text-xl font-bold">
              $49
              <span className="line-through text-[20px] ml-2 text-gray-500">
                $69
              </span>
            </p>
            <span className="mt-1 text-sm font-normal text-gray-500">
              Lifetime (early bird)
            </span>
          </div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <p className="font-semibold">Number Of Forms</p>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">Unlimited</div>

          <div className="px-2 py-2">Unlimited</div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <p className="font-semibold">Submissions Per Form</p>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">Unlimited</div>

          <div className="px-2 py-2">Unlimited</div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <p className="font-semibold">Upload File Size</p>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">5 mb</div>

          <div className="px-2 py-2">Unlimited</div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <p className="font-semibold">FormsCraft Tag</p>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">
            <svg
              className="w-5 h-5 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="px-2 py-2">-</div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <div className="font-semibold">
            <div className="flex space-x-2 items-center">
              <span>AI Form Generator</span>
              <svg
                className="w-4 h-4 stroke-purple-600"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 15c4.875 0 7-2.051 7-7 0 4.949 2.11 7 7 7-4.89 0-7 2.11-7 7 0-4.89-2.125-7-7-7zM2 6.5c3.134 0 4.5-1.318 4.5-4.5 0 3.182 1.357 4.5 4.5 4.5-3.143 0-4.5 1.357-4.5 4.5 0-3.143-1.366-4.5-4.5-4.5z"
                  className="stroke-purple-600"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">-</div>

          <div className="px-2 py-2">
            <svg
              className="w-5 h-5 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="px-2 py-4 sm:px-4">
          <p className="font-semibold">New Feature Updates</p>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-2 py-2">-</div>

          <div className="px-2 py-2">
            <svg
              className="w-5 h-5 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 text-center divide-x divide-gray-200">
          <div className="px-1 py-2 sm:px-4">
            <span className="text-sm font-medium text-blue-600"> Free </span>
            <p className="mt-2 text-xl font-bold">$0</p>
            <span className="mt-1 text-sm font-normal text-gray-500">
              No hidden charges
            </span>
            <Link
              to="/login"
              title=""
              className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-black border border-transparent rounded-md"
              role="button"
            >
              Get Started
            </Link>
          </div>

          <div className="px-1 py-2 sm:px-4">
            <span className="text-sm font-medium text-blue-600"> Team </span>
            <p className="mt-2 text-xl font-bold">
              $49
              <span className="line-through text-[20px] ml-2 text-gray-500">
                $69
              </span>
            </p>
            <span className="mt-1 text-sm font-normal text-gray-500">
              Lifetime (early bird)
            </span>
            <div
              onClick={handlePayment}
              className={`${
                // !window?.LemonSqueezy
                false ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              } flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-black border border-transparent rounded-md`}
              role="button"
            >
              <div className="flex items-center space-x-2">
                {/* {!window?.LemonSqueezy && <LoadingSpinner white={true} />} */}
                <span>Get Started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
