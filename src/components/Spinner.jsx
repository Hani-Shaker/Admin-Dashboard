export default function Spinner({ className = 'h-8 w-8' }) {
  return (
    <div role="status" aria-label="Loading"
      className={`${className} animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600`} />
  );
}
