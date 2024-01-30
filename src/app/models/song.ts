import { Album } from './album';
import { Artist } from './artist';

export type Song = {
  id: string;
  album: Album;
  artists: Artist[];
  albumNumber: number;
  songNumber: number;
  duration: number;
  urlOpenOnSpotify: string;
  name: string;
  popularity: number;
};
