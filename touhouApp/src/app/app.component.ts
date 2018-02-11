import { Component } from '@angular/core';
import { CharactersService } from './service/characters.service';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements Observer{
  private cService: CharactersService
  private characters: any[];
  private characterValues:string[] = [];
  private addClicked = false; 
  
  
  constructor(cService: CharactersService){
    this.cService = cService;
    cService.watch(this);
  }

  recieveUpdate(){
    this.characters = this.cService.get();
  }

  showAdd(e){
   e.target.style.visibility = "hidden";
   this.addClicked = true;
  }
  /*
  toggleDetail(e){ //Beter to do this on the character components, themselfs but I already wrote this
    if(e.target.nodeName != "BUTTON"){
      if (e.target.nodeName == "LI"){
        let detail = e.target.getElementsByClassName("detail")[0];
        detail.classList.toggle('detailOpen');
      }
      else{
        let parent = e.target.parentElement;

        if(parent.nodeName != null){
          if (parent.nodeName == "LI"){
            return
          }

          else{
            while(parent.nodeName != "LI"){
              parent = parent.parentElement;
            }
          }
          let detail = parent.getElementsByClassName("detail")[0];
          detail.classList.toggle('detailOpen');
        }
      }
    }
  }*/

}
