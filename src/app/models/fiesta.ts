export interface Party {
  id?: string;
  name: string;
  place: string;
  date: string;
  startTime: string;
  endTime: string;
  ticketsAvailable: boolean;
  dressCode: string;
  musicType: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  photos: string[];
}
