/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import PublicLayout from "@/components/public-layout";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Event } from "@/app/admin/manage-events/page";

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

const TheEvent = ({ params }: { params: { event_id: string } }) => {
  // Fetch event data from API based on id
  // Populate the page with the event data

  const [event, setEvent] = useState<Event>({
    id: "",
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    banner_url: "",
    location: "",
  } as Event);

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

    fetchEvents(params.event_id);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset errors on new submission

    try {
      // Insert the new registration into the Supabase table
      const { data, error } = await supabase.from("registrations").insert([
        {
          event_id: event.id, // Make sure `event` is passed as a prop to this component
          name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
        },
      ]);

      if (error) {
        throw error; // Handle any errors from Supabase
      }

      // Success
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "" }); // Reset form fields
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto p-6 my-6 lg:px-48">
        <img
          src={event.banner_url}
          alt=""
          className="w-full h-56 md:h-80 object-cover rounded-3xl mb-6"
        />
        <h2 className="text-2xl md:text-4xl font-bold my-4">{event.name}</h2>
        <div className="flex flex-wrap justify-between items-center rounded-lg border px-4">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button>Register</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-2 my-4">
                    <span className="text-[#007aff] text-xs block truncate flex gap-2 flex-start">
                      <Calendar className="w-4 h-4" />
                      <span className="truncate">
                        {formatIsoDate(event.start_time)}
                      </span>
                    </span>
                    <span className=" text-gray-500 text-xs flex gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{"Visakhapatnam"}</span>
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                {success && (
                  <p className="mt-4 text-green-600">
                    Thank you for registering!
                  </p>
                )}
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <p className="my-4">{event.description}</p>
      </div>
    </PublicLayout>
  );
};
export default TheEvent;
