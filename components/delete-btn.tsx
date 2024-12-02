"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Event } from "@/app/admin/manage-events/page";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  eventId: string;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export function DeleteButton({
  eventId,
  events,
  setEvents,
  loading,
  setLoading,
  className,
}: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async (eventId: string) => {
    setLoading(true);
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      console.error("Error deleting event:", error);
    } else {
      setEvents(events.filter((event: Event) => event.id !== eventId));
    }
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={className}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(eventId);
                router.push("/admin/manage-events");
              }}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
