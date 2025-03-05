"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <div className="flex items-center h-full justify-center">
        <div className="flex flex-col absolute top-[30%]">
          <div className="flex items-center justify-center gap-8 mt-10">
            <div onClick={() => router.push('/home')}>
              <div className="group flex-row w-44 mx-auto">
                <div className="w-44
                h-44
                bg-red-600
                rounded-md
                flex
                items-center
                justify-center
                border-2
                border-transparent
                group-hover:cursor-pointer
                group-hover:border-white
                overflow-hidden">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
