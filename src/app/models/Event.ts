export class Event {
  id: number;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventImage: string;
  ticketsUrl: string | null;
  details: string | null;
  following: boolean | null;
  followers: number | null;
}
