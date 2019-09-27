import {ArtistDetails} from "./artist-details";
import { Media } from "./media";

export class RapperDetails extends ArtistDetails {

    beatToPlay: Media;
    songToPlay: Media;

    constructor(){
        super();
    }
}