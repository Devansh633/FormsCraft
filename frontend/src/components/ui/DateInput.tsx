export const DateInput = ({ preview = false }: { preview?: boolean }) => {
  return (
    <div className="mt-1">
      <input
        type="date"
        disabled={preview}
        className="text-sm font-semibold bg-white text-gray-400 w-full p-2 border-2 border-gray-300 rounded-md shadow-sm outline-none"
        readOnly
      />
    </div>
  );
};
