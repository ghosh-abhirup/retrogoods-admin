"use client";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

const CommonTable = ({ tableFields, children }: { tableFields: Array<String>; children: ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableFields?.map((field) => (
            <TableHead className="uppercase font-bold text-md">{field}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default CommonTable;
