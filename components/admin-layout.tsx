"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Plus } from "lucide-react";
import AdminPageLayout from "./admin-page-layout";
import { usePathname, useRouter } from "next/navigation";

const pathName = {
  manageEvents: "/admin/manage-events",
  analytics: "/admin/analytics",
};

const isActive = (currPath: string, btnPath: string) => {
  return currPath == btnPath ? "border" : "border border-white";
};

const AdminLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <header className="fixed top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-foreground">
          <Link href="/" className="cursor-link">
            ANTF-AP
          </Link>
        </h1>
        <Button variant="outline" onClick={() => router.push("/")}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <div className="fixed top-16 h-screen left-0 border-r w-48">
        <div className="flex flex-col gap-2 p-4">
          <Button className="w-full mb-2" asChild>
            <span>
              <Plus className="mr-2 h-4 w-4" />
              <Link href="/admin/create-event">Create Event</Link>
            </span>
          </Button>
          <Link
            href="/admin/manage-events"
            className={`hover:bg-gray-100 p-2 rounded-md text-sm ${isActive(
              pathname,
              pathName.manageEvents
            )}`}
          >
            Manage Events
          </Link>
          <Link
            href="/admin/analytics"
            className={`hover:bg-gray-100 p-2 rounded-md text-sm ${isActive(
              pathname,
              pathName.analytics
            )}`}
          >
            Analytics
          </Link>
        </div>
      </div>

      <AdminPageLayout title={title}>{children}</AdminPageLayout>
    </div>
  );
};

export default AdminLayout;
