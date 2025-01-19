"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditEvent({
  params,
}: {
  params: { event_id: string };
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("events")
      .update({
        name,
        description,
        start_time: startTime,
        end_time: endTime,
        location: location,
        banner_url: bannerUrl,
      })
      .eq("id", params.event_id);

    if (error) {
      console.error("Error updating event:", error);
    } else {
      router.push(`/admin/manage-events/view/${params.event_id}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchEvent = async (id: string) => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        const fetchedEvent = data;
        console.log("Fetched Event:", fetchedEvent); // Log fetched data
        setName(fetchedEvent.name);
        setDescription(fetchedEvent.description);
        setLocation(fetchedEvent.location);
        setStartTime(fetchedEvent.start_time);
        setEndTime(fetchedEvent.end_time);
        setBannerUrl(fetchedEvent.banner_url);
      }
    };

    console.log(params.event_id);
    fetchEvent(params.event_id);
  }, [params.event_id]);

  useEffect(() => {
    console.log("State Updated:", {
      name,
      description,
      location,
      startTime,
      endTime,
      bannerUrl,
    });
  }, [name, description, location, startTime, endTime, bannerUrl]);

  return (
    <AdminLayout title="Edit Event">
      <div className="w-9/12">
        <form onSubmit={handleUpdate}>
          <p className="mt-4 mb-2">Enter the event name</p>
          <Input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="event_name"
            required
          />

          <p className="mt-4 mb-2">Enter your event description</p>
          <Textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="event_description"
            required
          />

          <p className="mt-4 mb-2">Start time</p>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-max"
            name="start_time"
            required
          />

          <p className="mt-4 mb-2">End time</p>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-max"
            name="end_time"
            required
          />

          <p className="mt-4 mb-2">Location</p>
          <Input
            type="text"
            value={location}
            placeholder="Institute Name, City Name"
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            required
          />

          <p className="mt-4 mb-2">Enter the Image URL here</p>
          <Input
            type="text"
            placeholder="https://urlofyour.image/bannerImg.jpg"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            name="banner_url"
            required
          />
          <Button type="submit" disabled={loading} className="mt-6">
            {loading ? "Updating..." : "Edit Event"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
