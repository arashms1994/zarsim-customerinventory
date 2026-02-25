import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SkeletonTable } from "./ui/SkeletonTable";
import { Checkbox } from "./ui/checkbox";
import {
  ArrowUpDown,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from "lucide-react";
import type {
  IInventoryTableProps,
  IPartListProductItem,
  SortKey,
  SortOrder,
} from "@/lib/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



export function InventoryTable({ data, isInitialLoad }: IInventoryTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [bcod3Filter, setBcod3Filter] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const getBcod3Name = (row: IPartListProductItem) =>
    String(row.BCod3Name ?? "");

  const uniqueBCod3Names = useMemo(() => {
    const names = new Set(
      data.map((r) => getBcod3Name(r)).filter(Boolean)
    );
    return Array.from(names).sort();
  }, [data]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [filterOpen]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    result = result.filter((row) => row.Mandeh_T !== 0);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (row) =>
          getBcod3Name(row).toLowerCase().includes(q) ||
          String(row.KalaName ?? "").toLowerCase().includes(q) ||
          String(row.Mandeh_T ?? "").toLowerCase().includes(q)
      );
    }

    if (bcod3Filter.size > 0) {
      result = result.filter((row) =>
        bcod3Filter.has(getBcod3Name(row))
      );
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const aStr = String(aVal ?? "");
        const bStr = String(bVal ?? "");
        const aNum = typeof aVal === "number" ? aVal : Number.NaN;
        const bNum = typeof bVal === "number" ? bVal : Number.NaN;

        let cmp: number;
        if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
          cmp = aNum - bNum;
        } else {
          cmp = aStr.localeCompare(bStr, "fa");
        }
        return sortOrder === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, bcod3Filter, sortKey, sortOrder]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  function toggleBcod3(name: string) {
    setBcod3Filter((prev) => {
      const next = new Set(prev);
      const currentlyIncluded = prev.size === 0 || prev.has(name);
      if (prev.size === 0) {
        uniqueBCod3Names.forEach((n) => next.add(n));
      }
      if (currentlyIncluded) next.delete(name);
      else next.add(name);
      return next.size === 0 ? new Set() : next;
    });
  }


  if (isInitialLoad) return <SkeletonTable />;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between w-full">
        <div className="relative flex-1 max-w-80">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو در همه ستون‌ها..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full h-9 rounded-lg border border-input bg-transparent py-2 pr-9 pl-3",
              "text-sm placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          />
        </div>

        <div ref={filterRef} className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((o) => !o)}
            className={cn(
              "h-10 w-full max-w-3xs flex items-center justify-between gap-2",
              "px-4 rounded-lg border border-input bg-muted/30 hover:bg-muted/50",
              "text-sm font-medium"
            )}
          >
            {bcod3Filter.size === 0
              ? "فیلتر براساس مشتری"
              : `${bcod3Filter.size} مشتری انتخاب شده`}
            <ChevronDownIcon
              className={cn("size-4 transition-transform", filterOpen && "rotate-180")}
            />
          </button>
          {filterOpen && (
            <div
              className={cn(
                "absolute top-full left-0 mt-1 z-50 min-w-44 max-h-64 overflow-y-auto",
                "rounded-lg border border-input bg-popover shadow-lg p-2 space-y-1"
              )}
            >
              <label className="flex items-center gap-2 cursor-pointer text-sm py-1 px-2 rounded hover:bg-muted/50">
                <Checkbox
                  checked={bcod3Filter.size === 0}
                  onCheckedChange={() => setBcod3Filter(new Set())}
                />
                <span>همه</span>
              </label>
              {uniqueBCod3Names.map((name) => (
                <label
                  key={name}
                  className="flex items-center gap-2 cursor-pointer text-sm py-1 px-2 rounded hover:bg-muted/50"
                >
                  <Checkbox
                    checked={bcod3Filter.size === 0 || bcod3Filter.has(name)}
                    onCheckedChange={() => toggleBcod3(name)}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="rounded-lg border border-[#1e7677] w-full">
        <Table>
          <TableHeader className="bg-red-400 rounded-t-lg">
            <TableRow className="bg-red-400 rounded-t-lg">
              <TableHead
                className="cursor-pointer select-none hover:bg-muted/30 transition-all duration-300 rounded-tr-lg"
                onClick={() => toggleSort("BCod3Name")}
              >
                <span className="flex items-center gap-1">
                  مشتری
                  {sortKey === "BCod3Name" ? (
                    sortOrder === "asc" ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )
                  ) : (
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                  )}
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:bg-muted/50"
                onClick={() => toggleSort("KalaName")}
              >
                <span className="flex items-center gap-1">
                  شرح محصول
                  {sortKey === "KalaName" ? (
                    sortOrder === "asc" ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )
                  ) : (
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                  )}
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none hover:bg-muted/50 rounded-tl-lg"
                onClick={() => toggleSort("Mandeh_T")}
              >
                <span className="flex items-center gap-1">
                  موجودی (متر)
                  {sortKey === "Mandeh_T" ? (
                    sortOrder === "asc" ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    )
                  ) : (
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                  )}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  داده‌ای یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((row, i) => (
                <TableRow
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-blue-300"}
                >
                  <TableCell>{getBcod3Name(row)}</TableCell>
                  <TableCell>{row.KalaName}</TableCell>
                  <TableCell>{row.Mandeh_T}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
