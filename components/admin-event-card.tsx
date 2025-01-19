/* eslint-disable @next/next/no-img-element */
"use client";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { DeleteButton } from "./delete-btn";
import { Event } from "@/app/admin/manage-events/page";
import { useRouter } from "next/navigation";

function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
}

interface AdminEventCardProps {
  eventName: string;
  startDate: string;
  address: string;
  description: string;
  bannerUrl: string;
  eventId: string;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminEventCard: React.FC<AdminEventCardProps> = ({
  eventName,
  startDate,
  address,
  description,
  bannerUrl,
  eventId,
  events,
  setEvents,
  loading,
  setLoading,
}) => {
  const router = useRouter();
  return (
    <Card>
      <img
        src={bannerUrl}
        alt=""
        className="w-full h-48 object-fit rounded-t-xl"
      />
      <CardHeader>
        <CardTitle className="text-lg">{eventName}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span className="text-[#007aff] text-xs block truncate flex gap-2 flex-start">
            <Calendar className="w-4 h-4" />
            <span className="truncate">{formatIsoDate(startDate)}</span>
          </span>
          {/* text-[#FF0436] */}
          <span className=" text-gray-500 text-xs flex gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{address}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" asChild>
          <Link href={`/admin/manage-events/view/${eventId}`}>View Event</Link>
        </Button>
        <div className="w-full flex flex-1 gap-4 mt-4">
          <DeleteButton
            eventId={eventId}
            events={events}
            setEvents={setEvents}
            loading={loading}
            setLoading={setLoading}
            className="w-full"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/admin/manage-events/edit/${eventId}`)}
          >
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default AdminEventCard;
