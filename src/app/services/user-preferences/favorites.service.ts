import { Injectable } from '@angular/core';
import { Song } from '../../models/song';
import { Album } from '../../models/album';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private songs: Song[] = [];
  private songsSubject = new Subject<Song[]>();
  private albums: Album[] = [];
  private albumsSubject = new Subject<Album[]>();

  constructor() {}

  private updateSongs() {
    this.songsSubject.next([...this.songs]);
  }

  private updateAlbums() {
    this.albumsSubject.next([...this.albums]);
  }

  public subscribeToSongs(): Observable<Song[]> {
    return this.songsSubject.asObservable();
  }

  public subscribeToAlbums(): Observable<Album[]> {
    return this.albumsSubject.asObservable();
  }

  public addSong(newSong: Song) {
    if (this.isSongInList(newSong.id)) return;
    this.songs.push(newSong);
    this.updateSongs();
  }

  public addAlbum(newAlbum: Album) {
    if (this.isAlbumInList(newAlbum.id)) return;
    this.albums.push(newAlbum);
    this.updateAlbums();
  }

  public deleteSong(idToDelete: string) {
    this.songs = this.songs.filter((song) => song.id !== idToDelete);
    this.updateSongs();
  }

  public deleteAlbum(idToDelete: string) {
    this.albums = this.albums.filter((album) => album.id !== idToDelete);
    this.updateAlbums();
  }

  public isAlbumInList(idToCheck: string) {
    return this.albums.some((album) => album.id === idToCheck);
  }

  public isSongInList(idToCheck: string) {
    return this.songs.some((song) => song.id === idToCheck);
  }

  public getAllSongs() {
    return this.songs;
  }

  public getAllAlbums() {
    return this.albums;
  }
}
