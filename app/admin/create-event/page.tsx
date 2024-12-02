"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleBannerUpload = async () => {
  //   // if (!bannerFile) return null;

  //   const formData = new FormData();
  //   // formData.append("file", bannerFile);

  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   return data.url || null;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Upload the banner to Cloudinary
    // const bannerUrl = await handleBannerUpload();

    // Insert new event into Supabase
    const { data, error } = await supabase.from("events").insert([
      {
        name,
        description,
        start_time: startTime,
        end_time: endTime,
        location: location,
        banner_url: bannerUrl,
      },
    ]);

    if (error) {
      console.error("Error creating event:", error);
    } else {
      console.log("Event created successfully:", data);
      router.push("/");
    }

    setLoading(false);
    router.push("/admin/manage-events");
  };

  return (
    <AdminLayout title="Create Event">
      <div className="w-9/12">
        <form onSubmit={handleSubmit}>
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

          <p className="mt-4 mb-2"> Location</p>
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
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
