import { AudioPartCategory } from './audio-part-category';

export class AudioSong {
    title: string;
    source: string;
    currentTime: number;

    constructor(){}
}

export class AudioPart {
    
    name: string;
    title: string;
    source: string;
    category: AudioPartCategory;

    constructor(){}
}