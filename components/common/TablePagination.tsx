"use client";
import React, { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const TablePagination = ({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: Function }) => {
  const [shownPages, setShownPages] = useState<Array<number>>([]);

  useEffect(() => {
    const remainder = page % 3;
    let pages = [];
    if (remainder == 1) {
      pages = [page, page + 1, page + 2];
    } else if (remainder == 2) {
      pages = [page - 1, page, page + 1];
    } else {
      pages = [page - 2, page - 1, page];
    }

    console.log("pages = ", pages);

    let res = pages.filter((page) => page > 0 && page <= totalPages);
    console.log("res = ", res);

    setShownPages(res);
  }, []);

  return (
    <Pagination className="mt-8 flex items-center justify-end">
      <PaginationContent>
        <PaginationItem className={`${!(page > 1) && "pointer-events-none cursor-not-allowed text-gray-400"}`}>
          <PaginationPrevious onClick={() => onChange(page - 1)} />
        </PaginationItem>

        {shownPages.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => {
                if (i != page) {
                  onChange(i);
                }
              }}
              isActive={i == page}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem className={`${!(page < totalPages) && "pointer-events-none cursor-not-allowed text-gray-400"}`}>
          <PaginationNext onClick={() => onChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
