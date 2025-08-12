import DataTableLoadingSkeleton from "@/components/data-table/data-table-loading-skeleton";
import { webDescription } from "@/lib/utils";
import { Suspense } from "react";
import { getAllStaffs } from "./action";
import ListOfStaffs from "./list-of-staffs";

export default function Home() {
  return (
    <div className="min-h-dvh w-full flex flex-col">
      <main className="h-full space-y-12 flex-1 w-full max-w-5xl mx-auto ">
        <section><h1 className='text-xl md:text-2xl font-bold tracking-tighter text-center before:content-["TIN"] md:before:content-["TaxPayer_Identification_Number"] before:mr-2 '>
          Collection
        </h1>
        <h6 className="text-xs text-muted-foreground text-center max-w-prose w-full mx-auto">
          Please search if your name is available in this list and include your
          TIN
        </h6></section>
        <section>
          <Suspense fallback={<DataTableLoadingSkeleton />}>
            <List />
          </Suspense>
        </section>
      </main>
      <footer className="bg-gradient-to-l from-secondary to-muted text-secondary-foreground px-4 w-full py-2">
        <p className="text-center max-w-prose mx-auto w-full text-xs">
          {webDescription}
        </p>
      </footer>
    </div>
  );
}

async function List() {
  const staffs = await getAllStaffs();
  return <ListOfStaffs staffs={staffs} />;
}
