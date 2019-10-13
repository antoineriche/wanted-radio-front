import { ArtistType } from "./artist-type";
import { Media } from './media';
import { Project } from './project';
import { GameInfo } from './game-info';

export class ArtistDetails {
    
  artistName: string;
  artistType: ArtistType;
  toDiscuss: string;
  
  favoriteSong: Media;
  songToPlay: Media;
  
  project: Project;
  
  gameInfo: GameInfo;

  constructor(){
  }

}

export class RapperDetails {

  artistDetails: ArtistDetails;
  beatToPlay: Media;

  constructor(){
  }
}

export class BeatBoxerDetails {

  artistDetails: ArtistDetails;
  //beatToPlay: Media;

  constructor(){
  }
}