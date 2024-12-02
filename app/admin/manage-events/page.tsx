"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin-layout";
import { supabase } from "@/lib/supabaseClient";
import AdminEventCard from "@/components/admin-event-card";

export interface Event {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  banner_url: string;
  location: string;
}

const ManageEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      // .lt("start_time", new Date().toISOString()); // Fetch events that haven't started yet
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <AdminLayout title="Manage Events">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {events.map(
          ({ id, name, start_time, description, banner_url, location }) => (
            <AdminEventCard
              key={id}
              eventName={name}
              startDate={start_time}
              address={location}
              description={description}
              bannerUrl={banner_url}
              eventId={id}
              events={events}
              setEvents={setEvents}
              loading={loading}
              setLoading={setLoading}
            />
          )
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;
