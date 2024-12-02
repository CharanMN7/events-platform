"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Attendee {
  id: string;
  event_id: string;
  name: string;
  user_email: string;
  user_phone: string;
}

export function AttendeesTable({ attendees }: { attendees: Attendee[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Phone No.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendees.map((attendee, index) => (
          <TableRow key={attendee.id + index}>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            <TableCell>{attendee.name}</TableCell>
            <TableCell>{attendee.user_email}</TableCell>
            <TableCell className="text-right">{attendee.user_phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
