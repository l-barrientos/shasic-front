export class PublicArtist {
  id: number;
  email: string;
  userName: string;
  fullName: string;
  eventsNum: number | null;
  profileImage: string;
  bio: string | null;
  following: boolean | null;
  followers: number | null;
  location: string | null;
}
