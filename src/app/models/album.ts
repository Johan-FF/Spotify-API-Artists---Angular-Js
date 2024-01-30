import { Artist } from './artist';

export type Album = {
  id: string;
  artists: Artist[];
  availableMarkets: string[];
  urlOpenOnSpotify: string;
  image: string;
  name: string;
  releaseDate: string;
  totalSongs: number;
};
