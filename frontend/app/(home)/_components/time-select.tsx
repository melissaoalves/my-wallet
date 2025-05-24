// app/(home)/_components/time-select.tsx
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../_components/ui/select";
import { useRouter } from "next/navigation";

const TimeSelect = ({ setMonth }: { setMonth: (month: string) => void }) => {
  const handleMonthChange = (month: string) => {
    setMonth(month);
  };

  return (
    <Select onValueChange={handleMonthChange}>
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 12 }, (_, index) => {
          const month = String(index + 1).padStart(2, '0');
          return (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;