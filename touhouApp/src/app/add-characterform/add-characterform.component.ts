import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-addcharacterform',
  templateUrl: './add-characterform.component.html',
  styleUrls: ['./add-characterform.component.css']
})
export class AddCharacterformComponent{
  private cService: CharactersService;
  private character =  {
    name: "",
    species: "",
    capable_of: "",
    residence: "",
    hair_color: "",
    eye_color: ""
  }


  constructor(cService: CharactersService){
    this.cService = cService;
  }

  addCharacter(){
    for(let key in this.character){
      if(this.character[key] == ""){
        console.log("empty");
      }
    }

    this.cService.post(this.character);
    
  }

}
