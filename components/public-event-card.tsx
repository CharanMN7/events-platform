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

/* eslint-disable @next/next/no-img-element */
const PublicEventCard = ({
  eventName,
  startDate,
  address,
  description,
  bannerUrl,
  eventId,
}: {
  eventName: string;
  startDate: string;
  address: string;
  description: string;
  bannerUrl: string;
  eventId: string;
}) => {
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
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/event/${eventId}`}>View Event</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default PublicEventCard;
