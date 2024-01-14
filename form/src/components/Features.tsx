import { useState } from "react";

export const Features = () => {
  const features = [
    {
      icon: "/copy.svg",
      title: "Drag and drop fields",
      description:
        "Drag and drop fields from left panel and you can reorder within the fields in created form",
      path: "/drag.mp4",
      color: "red",
    },
    {
      icon: "/template.svg",
      title: "Use pre made templates",
      description: "Create a form in seconds using our form templates",
      path: "/template.mp4",
    },
    {
      icon: "/download.svg",
      title: "Download submissions",
      description: "Collect submissions and download them in csv format",
      path: "/download.mp4",
    },
    // {
    //   icon: "/magic.svg",
    //   title: "AI Form Generator",
    //   description: "Now you can generate forms using AI in seconds",
    //   path: "/form-ai.MOV",
    // },
  ];

  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-16" id="features">
      <div className="py-10">
        {/* <p className="text-3xl font-bold text-center">Features</p> */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
            Features
          </h2>
        </div>
        <div className="py-10 lg:py-20">
          <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
            <div className="flex flex-col justify-center items-center space-y-4">
              {features?.map?.((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className={`${
                    selectedFeature === index
                      ? "shadow-md border-gray-300"
                      : "border-transparent"
                  } flex space-x-4 max-w-[400px] p-4 border cursor-pointer rounded-md`}
                >
                  <img
                    src={item?.icon}
                    alt="feature-icon"
                    className="w-7 h-7 text-black"
                  />
                  <div className="xl:col-span-1 space-y-2 px-0 lg:px-2 ">
                    <p className="relative text-lg font-semibold">
                      <span>{item?.title}</span>
                      {item?.tag && (
                        <span className="text-[10px] absolute top-0 ml-2 p-1 leading-3 rounded-md border-2 border-purple-600 text-purple-600 font-bold">
                          {item?.tag}
                        </span>
                      )}
                    </p>
                    <p className="text-sm">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="xl:col-span-1">
              <video
                src={features[selectedFeature]?.path}
                autoPlay
                loop
                muted
                playsInline
                className="shadow-xl w-full rounded-md bg-gray-200 p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
