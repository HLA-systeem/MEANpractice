import { Component, Input } from '@angular/core';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-editCharacterForm',
  templateUrl: './edit-character-form.component.html',
  styleUrls: ['./edit-character-form.component.css'],
})
export class EditCharacterFormComponent {
  @Input() character;

  private cService: CharactersService;

  constructor(cService: CharactersService){
    this.cService = cService;
  }

  changeCharacter(){
    this.cService.patch(this.character,this.character._id);
  }
  

}
