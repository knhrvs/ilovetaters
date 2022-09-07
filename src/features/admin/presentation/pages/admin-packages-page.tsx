import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Head } from "../components/head";
import { AdminPackages } from "../tables/admin-packages-table";

export function ProdAdd() {
  return (
    // dont change code here
    <div className="flex min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-secondary">
        <Head />

        {/* change page info here */}
        <div className="relative flex">
          <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">
            Packages Availability
          </h1>
        </div>
        <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
          <AdminPackages />
        </div>
      </div>
    </div>
  );
}
