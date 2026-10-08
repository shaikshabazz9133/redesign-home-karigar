/** Skeleton shown while a project page streams in. */
export default function Loading() {
  return (
    <div className="container-site animate-pulse pt-32 md:pt-40" role="status" aria-label="Loading project">
      <div className="h-4 w-48 rounded-full bg-linen" />
      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="h-3 w-32 rounded-full bg-linen" />
          <div className="h-14 w-3/4 rounded-md bg-linen" />
          <div className="h-14 w-1/2 rounded-md bg-linen" />
        </div>
        <div className="grid grid-cols-2 gap-6 lg:col-span-5">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-16 rounded-md bg-linen" />
          ))}
        </div>
      </div>
      <div className="mt-16 aspect-[21/9] rounded-sm bg-linen" />
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[4/3] rounded-sm bg-linen" />
        ))}
      </div>
    </div>
  );
}
