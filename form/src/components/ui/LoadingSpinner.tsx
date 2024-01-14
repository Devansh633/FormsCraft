export default function LoadingSpinner({
  width = 4,
  height = 4,
  white = false,
}: {
  width?: number;
  height?: number;
  white?: boolean;
}) {
  return (
    <img
      src={`/loader${white ? "-white" : ""}.svg`}
      className={`w-${width} h-${height} animate-spin`}
    />
  );
}
