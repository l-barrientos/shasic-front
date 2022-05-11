import { Profile } from './Profile';
import { Event } from './Event';
export class Artist extends Profile {
  location: string | null;
  bio: string | null;
  following: boolean | null;
  followers: number | null;
  events: Event[] | null;
}
