import { Component, Input  } from '@angular/core';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})

export class CharacterComponent{
  @Input() character;

  private detail = false;
  private editCharacter = false;
  private cService: CharactersService;

  constructor(cService: CharactersService){
    this.cService = cService;
  }

  toggleDetail(e){
      this.detail = !this.detail;
    }

  showEdit(e){
    this.editCharacter = true;
  }

  delete(e){
    this.cService.delete(this.character._id);
  }
}
