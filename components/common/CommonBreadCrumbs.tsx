"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Fragment } from "react";

interface BreadCrumbItemInterface {
  title: String;
  url: String | null;
}

const CommonBreadCrumbs = ({ data }: { data: Array<BreadCrumbItemInterface> }) => {
  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {data?.map((breadcrumb, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>{breadcrumb?.url ? <BreadcrumbLink href={`/${breadcrumb.url}`}>{breadcrumb.title}</BreadcrumbLink> : <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>}</BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default CommonBreadCrumbs;
