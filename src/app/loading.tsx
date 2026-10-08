import { BrandLoader } from "@/components/ui/BrandLoader";

/** Shown while a route streams in during navigation. */
export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-ivory text-oxblood">
      <BrandLoader size={64} label="Loading" />
    </div>
  );
}
