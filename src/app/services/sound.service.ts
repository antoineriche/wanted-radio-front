import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';
import { AudioPart } from 'src/app/model/audio-part';
import { AudioPartCategory } from 'src/app/model/audio-part-category';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private audioService: AudioService) { }

  public getAllSounds(): AudioPart[]{
    return [
      this.makeSound("Coquin", "toof-coquin.mp3"),
      this.makeSound("Filou", "toof-filou.mp3"),
      this.makeSound("Géniaal", "toof-genial.mp3"),
      this.makeSound("Grosse merde", "toof-grosse-merde.mp3"),
      this.makeSound("Hann", "toof-haaaan.mp3"),
      this.makeSound("Caca", "toof-hoooooa.mp3"),
      this.makeSound("Okay", "toof-okay.mp3"),
      this.makeSound("Ta gueule", "toof-ta-gueule.mp3"),
      this.makeSound("Ouais, ta gueule", "toof-ouais-ta-gueule.mp3"),
      this.makeSound("Ouaww", "toof-ouaw.mp3"),
      this.makeSound("Moui", "toof-oui.mp3"),
      this.makeSound("Pardon", "toof-pardon.mp3"),
      this.makeSound("Salope", "toof-salope.mp3"),
      this.makeSound("Super !", "toof-super.mp3"),
      this.makeSound("Vomis", "toof-vomis.mp3"),
      this.makeSound("Exactement monsieur", "exactement-monsieur.mp3"),
      this.makeSound("Rires", "rires.mp3"),
      this.makeSound("C'est clair (Eddy Malou)", "c-est-clair.mp3"),
      this.makeSound("Cri horrible", "cri-horrible.mp3"),
      this.makeSound("Taisez-vous", "taisez-vous.mp3"),
      this.makeSound("Ta gueule !", "ta-gueule.mp3"),
      this.makeSound("Mer noire ?", "mer-noire.mp3"),
      this.makeSound("Mer noire (non)", "mer-noire-non.mp3"),
      this.makeSound("Mer noire (oui)", "mer-noire-oui.mp3"),
      this.makeSound("Vas-y", "vas-y.mp3"),
      this.makeSound("Calmes-toi", "calmes-toi-court.mp3"),
    ];
  }

  public getCazaToofSongs():AudioPart[] {
    return [
      this.makeSound("01. Macron anonymat complet", "macron-anonymat-complet.mp3"),
      this.makeSound("02. Macron plus les mêmes règles", "macron-regles.mp3"),
      this.makeSound("03. Cet animal étrange", "cet-animal-etrange.mp3"),
      this.makeSound("04. Neirda", "neirda.mp3"),
      this.makeSound("05. En vrai c'est plutot", "en-vrai-c-est-plutot.mp3"),
      this.makeSound("06. Le minotaure", "le-minotaure.mp3"),
      this.makeSound("07. J'suis apeuré", "j-suis-apeure.mp3"),
      this.makeSound("08. Putain quelle rime de batard", "rime-de-batard.mp3"),
      this.makeSound("09. Tellement beau", "tellement-beau.mp3"),
      this.makeSound("10. C'est cela oui", "c-est-cela-oui.mp3"),
      this.makeSound("11. Calmes-toi (long)", "calmes-toi-long.mp3"),
      this.makeSound("12. Vie d'palace", "vie-d-palace.mp3"),
      this.makeSound("13. Calmes-toi (court)", "calmes-toi-court.mp3"),
      this.makeSound("14. Gros mytho", "gros-mytho.mp3"),
      this.makeSound("15. Pas de compte", "pas-de-compte.mp3"),
      this.makeSound("16. Comptes en Suisse", "comptes-en-suisse.mp3"),
      this.makeSound("17. La Bible", "la-Bible.mp3"),
      this.makeSound("18. Tais-toi NeirDa", "tais-toi-neir-da.mp3"),
      this.makeSound("19. Echo", "echo.mp3"),
      this.makeSound("20. Citation Joey Starr sur That's my people", "citation-joey-starr-sur-thats-my-people.mp3"),
      this.makeSound("21. Les mettre tous d'accord", "les-mettre-tous-daccord.mp3"),
      this.makeSound("22. Gros boulard égotrip", "gros-boulard-egotrip.mp3"),
      this.makeSound("23. Conclusion", "conclusion.mp3")
    ];
  }

  public playSound(sound: AudioPart){
    this.audioService.playSound(sound.source);
  }

  public playSoundWithName(source: string){
    this.audioService.playSound(source);
  }

  public getPresentationSounds():AudioPart[]{
    return [
      this.makeSound("C'est quoi ton blaze ?", "presentation-blaze.mp3"),
      this.makeSound("Tu r'présentes quoi ?", "presentation-rpz.mp3"),
      this.makeSound("Tu r'présentes quoi ? (2)", "presentation-rpz-court.mp3"),
    ]
  }

  public makeSound(title:string, source:string, category?:AudioPartCategory):AudioPart {
    let audio = new AudioPart();
    audio.source = source;
    audio.title = title;
    return audio;
  }
}
