import DashboardHeader from "@/modules/template/dashboard-header";
import LeftSidebar from "@/modules/template/left-sidebar";
import ShellContainer from "@/modules/template/shell-container";
import React from "react";

export default function Page() {
  return (
    <main className="bg-blue-400 w-full">
      <div className="flex flex-col w-full lg:flex-row bg-red-400">
        <LeftSidebar />
        <div className="hidden md:block md:w-[calc(100vw-320px)]">
          <DashboardHeader />
          <ShellContainer />
        </div>
      </div>
    </main>
  );
}
