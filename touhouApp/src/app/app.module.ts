import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CharactersService } from './service/characters.service';
import { AddCharacterformComponent } from './add-characterform/add-characterform.component';
import { EditCharacterFormComponent } from './edit-character-form/edit-character-form.component';
import { CharacterComponent } from './character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCharacterformComponent,
    EditCharacterFormComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CharactersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
