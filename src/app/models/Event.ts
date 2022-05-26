import { Artist } from './Artist';
export class Event {
  id: number;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventImage: string | null;
  ticketsUrl: string | null;
  details: string | null;
  following: boolean | null;
  followers: number | null;
  artists: Artist[] | any[] | null;
}
