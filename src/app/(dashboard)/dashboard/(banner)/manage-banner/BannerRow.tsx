"use client";

import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, MoreHorizontal, UserCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalDelete from "@/components/layout/dashboard/shared/DeleteGlobal/GlobalDelete";

interface IData {
  _id: string;
  slug: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface IBannerRowProps {
  item: IData;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  handleSelect: (id: string) => void;
  selected: boolean;
  handleDelete: (id: string) => void;
  isDeleting: boolean;
}

export const BannerRow: FC<IBannerRowProps> = ({
  item,
  index,
  moveRow,
  handleSelect,
  selected,
  handleDelete,
  isDeleting,
}) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drop] = useDrop({
    accept: "row",
    hover: (dragItem: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveRow(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <TableRow
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="transition-all duration-200"
    >
      <TableCell>
        <Checkbox
          className="cursor-pointer"
          checked={selected}
          onCheckedChange={() => handleSelect(item._id)}
        />
      </TableCell>
      <TableCell>
        {item.photo ? (
          <Image
            width={150}
            height={100}
            src={item.photo}
            alt="Banner image"
            className="rounded-md object-cover h-20 w-32"
          />
        ) : (
          <Skeleton className="h-20 w-32 rounded-md" />
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-blue-600" />
          <span>
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full cursor-pointer">
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/dashboard/update-banner/${item._id}`}>
              <button className="flex items-center gap-2 text-blue-600 p-2 hover:bg-blue-50 w-full cursor-pointer">
                <UserCog className="w-4 h-4" />
                Edit
              </button>
            </Link>
            <GlobalDelete
              onConfirm={() => handleDelete(item._id)}
              loading={isDeleting}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
