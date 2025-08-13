import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { ThemeToggler } from "@/components/theme-toggler";
import { webDescription } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import { getAllStaffs } from "./action";
import ListOfStaffs from "./list-of-staffs";
import SocialMediaShare from "./social-media-share";

export default function Home() {
  return (
    <div className="min-h-dvh w-full flex flex-col">
      <main className="h-full space-y-12 flex-1 w-full py-4 max-w-5xl mx-auto px-3 ">
        <section className="flex flex-row items-center justify-between sm:justify-evenly border-b-2 pb-2 ">
          <Image src={"/logo.png"} alt="logo" width={85} height={85} />
          <div>
            {" "}
            <h1 className='text-xl md:text-2xl font-bold tracking-tighter uppercase md:capitalize text-center before:content-["TIN"] sm:before:content-["TaxPayer_Identification_Number"] before:mr-2 '>
              Collection
            </h1>
            <h6 className="text-sm text-foreground text-center max-w-prose w-full mx-auto">
              Please search if your name is available in this list and include
              your TIN (TaxPayer Identification Number)
            </h6>
          </div>
          <Image
            src={"/coat-of-arms.png"}
            alt="logo"
            width={85}
            height={85}
            className="hidden sm:flex"
          />
        </section>
        <section>
          <Suspense fallback={<DataTableLoadingSkeleton />}>
            <List />
          </Suspense>
        </section>
      </main>
      <footer className="bg-gradient-to-l  space-y-2 text-slate-200 dark:from-slate-900 dark:to-slate-900 dark:via-slate-800 from-slate-800 via-slate-500 to-slate-800 w-full">
        <section className="px-4 py-2 flex flex-col items-center space-y-2">
          <Image
            src={"/coat-of-arms.png"}
            alt="logo"
            width={85}
            height={85}
            className="flex sm:hidden"
          />
          <p className="text-center max-w-xl mx-auto w-full text-xs">
            {webDescription}
          </p>
          <p className="text-xs px-4 font-bold text-center max-w-prose mx-auto w-full">
            Copyright 2025 Lira City Council
          </p>
        </section>
        <div className="flex justify-between items-center px-3 w-full text-sm dark:text-muted-foreground bg-background/5 py-1.5 dark:bg-background/20">
          <SocialMediaShare />
          <ThemeToggler />
        </div>
      </footer>
    </div>
  );
}

async function List() {
  const staffs = await getAllStaffs();
  return <ListOfStaffs staffs={staffs} />;
}
