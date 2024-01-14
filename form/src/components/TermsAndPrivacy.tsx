import { useEffect } from "react";

export const TermsAndPrivacy = ({ data }: { data: any }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="flex justify-center items-center py-10">
      <div className="space-y-8 max-w-[600px]">
        <h1 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
          {data?.title}
        </h1>
        <p className="font-semibold">Last Updated: {data?.last_updated}</p>
        <p>{data?.description}</p>
        {data?.points?.map?.((point: any, index: number) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold">{`${
              index + 1
            }. ${point?.title}`}</h3>
            <p>{point?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
