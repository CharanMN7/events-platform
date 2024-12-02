/* eslint-disable @next/next/no-img-element */
"use client";
import AdminEventCard from "@/components/admin-event-card";
// import { events } from "@/api-mock/events-data";
import PublicEventCard from "@/components/public-event-card";
import PublicLayout from "@/components/public-layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Event = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  banner_url: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

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
    <PublicLayout>
      <main className="mx-auto p-6 my-6 lg:px-48">
        <img src="https://placehold.co/100x100" alt="" />
        <h2 className="text-3xl font-bold mt-8 mb-4">
          A big bold vision statement
        </h2>
        <p className="md:w-9/12 my-4 text-gray-600">
          Our mission is to prevent, disrupt, and dismantle narcotics
          trafficking, smuggling, and cultivation networks through
          intelligence-driven enforcement, interagency collaboration, and
          community engagement. Here, you can find our community initiatives
          that you cna attend to learn more about what you cna do, as a
          responsible citizen
        </p>
        <Button asChild>
          <Link href="#events">Find an Event</Link>
        </Button>
      </main>

      <Separator />

      <section className="mx-auto p-6 lg:px-48" id="events">
        <h2 className="text-2xl font-semibold text-center my-2">
          Find Awareness Events
        </h2>
        <p className="text-center text-gray-600">
          Join us in attending events that are tailored to help you stay
          informed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {events.map(({ id, name, start_time, description, banner_url }) => (
            <PublicEventCard
              key={id}
              eventName={name}
              startDate={start_time}
              address={"Visakhapatnam"}
              description={description}
              bannerUrl={banner_url}
              eventId={id}
            />
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
