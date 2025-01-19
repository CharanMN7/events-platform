/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin-layout";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/delete-btn";
import { Attendee, AttendeesTable } from "@/components/attendees-table";
import { Event } from "../../page";

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

const ViewEvent = ({ params }: { params: { event_id: string } }) => {
  const router = useRouter();
  const [event, setEvent] = useState<Event>({
    id: "",
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    banner_url: "",
    location: "",
  } as Event);
  const [attendees, setAttendees] = useState<Attendee[]>([]); // Initialize with an empty array

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async (id: string) => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data[0]);
      }
    };

    const fetchAttendees = async (id: string) => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("event_id", id);
      if (error) {
        console.error("Error fetching attendees:", error);
      } else {
        setAttendees(data || []); // Ensure data is an array
        console.log(data);
      }
    };

    fetchEvents(params.event_id);
    fetchAttendees(params.event_id);
  }, [params.event_id]);

  return (
    <AdminLayout title="View Event">
      <div className="my-6 lg:px-48">
        <div className="p-6 border rounded-3xl">
          <img
            src={event.banner_url}
            alt=""
            className="w-full h-56 md:h-80 object-cover rounded-2xl mb-6"
          />
          <h2 className="text-2xl md:text-4xl font-bold my-4">{event.name}</h2>

          <div className="flex flex-col gap-2 my-4">
            <span className="text-[#007aff] text-xs block truncate flex gap-2 flex-start">
              <Calendar className="w-4 h-4" />
              <span className="truncate">
                {formatIsoDate(event.start_time)}
              </span>
            </span>
            <span className=" text-gray-500 text-xs flex gap-2">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>

          <p className="my-4">{event.description}</p>

          <div className="flex gap-4">
            <DeleteButton
              eventId={event.id}
              events={events}
              setEvents={setEvents}
              loading={loading}
              setLoading={setLoading}
              className=""
            />
            <Button
              variant="outline"
              className=""
              onClick={() =>
                router.push(`/admin/manage-events/edit/${event.id}`)
              }
            >
              Edit
            </Button>
          </div>

          <div className="my-6">
            <h2 className="text-2xl font-semibold">Attendees</h2>
            <AttendeesTable attendees={attendees} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ViewEvent;
