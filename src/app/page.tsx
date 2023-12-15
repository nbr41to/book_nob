import Image from "next/image";

export default function Page() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">
        本を読むことで、本が読める
      </h1>
      <div className="relative mt-8 min-h-[800px] w-full">
        <Image
          className="object-contain"
          src="/eyecatch.png"
          alt="eyecatch"
          fill
        />
      </div>
    </div>
  );
}
