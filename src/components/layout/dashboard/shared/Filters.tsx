import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Heading from "./Heading";

interface FiltersProps {
  searchRef: any;
  handleSearch: () => void;
  limit: number;
  handleLimitChange: React.ChangeEventHandler<HTMLSelectElement>;
  headingTitle: string;
  headingSubtitle: string;
  rowClassName?: string;
}

export default function Filters({
  searchRef,
  handleSearch,
  limit,
  handleLimitChange,
  headingTitle,
  headingSubtitle,
  rowClassName = "",
}: FiltersProps) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-5 flex justify-between flex-wrap gap-4 lg:gap-0">
        <Heading title={headingTitle} subTitle={headingSubtitle} />
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex gap-2 w-[350px]">
            <Input ref={searchRef} placeholder="Enter query" />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <div className={rowClassName}>
            <label htmlFor="limit" className="text-sm font-medium">
              Rows:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 px-2 py-1 cursor-pointer"
            >
              {[2, 5, 10, 25, 50, 100,200, 500].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
