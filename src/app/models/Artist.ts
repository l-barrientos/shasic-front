import { Profile } from './Profile';
export class Artist extends Profile {
  eventsNum: number | null;
  bio: string | null;
  following: boolean | null;
  followers: number | null;
  location: string | null;
}
