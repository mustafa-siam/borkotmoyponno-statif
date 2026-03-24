"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  selected: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
  mode?: "single" | "range";
  className?: string;
}

export function DatePicker({
  selected,
  onSelect,
  mode = "range",
  className,
}: DatePickerProps) {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "LLL dd, y")} -{" "}
                  {format(selected.to, "LLL dd, y")}
                </>
              ) : (
                format(selected.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {mode === "range" ? (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={selected?.from}
              selected={selected}
              onSelect={onSelect}
              numberOfMonths={2}
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={selected && "from" in selected ? selected.from : undefined}
              selected={selected && "from" in selected ? selected.from : undefined}
              onSelect={onSelect as (date: Date | undefined) => void}
              numberOfMonths={1}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}