import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <div className="pt-0 md:pt-8">
      <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
        <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            Create forms in seconds.
          </h1>
          <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
            Unleash the power of seamless form creation. Customize, Share, and
            Analyze like never before.
          </p>

          <Link
            to="/login"
            className="inline-flex px-8 py-4 mt-8 text-lg font-bold text-white transition-all duration-200 bg-[#ff725e] border border-transparent rounded-md sm:mt-10 hover:bg-black"
          >
            Try our free editor
          </Link>
        </div>

        <div className="xl:col-span-1">
          <img
            className="w-full h-[300px] md:h-[450px]"
            src="/form.svg"
          ></img>
        </div>
      </div>
    </div>
  );
};
