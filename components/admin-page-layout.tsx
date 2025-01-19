"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

const AdminPageLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const currentPath = paths[paths.length - 1];

  return (
    <main className="mt-16 ml-48 p-4">
      <Breadcrumb className="mt-4 mb-6">
        <BreadcrumbList>
          {paths.map((path, index) => (
            <>
              {path === currentPath ? (
                <BreadcrumbItem key={index + path}>{path}</BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    key={index + path}
                    href={`http://localhost:3000/${paths
                      .slice(0, index + 1)
                      .join("/")}`}
                    className="underline"
                  >
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}

              {index < paths.length - 1 && index !== 0 ? (
                <BreadcrumbSeparator />
              ) : (
                ""
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl font-bold">{title}</h2>
      {children}
    </main>
  );
};
export default AdminPageLayout;
