import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CharactersService {// mongod --dbpath C:\data\mongodb
  private characters: any[];
  private http: HttpClient;
  private postData: JSON;
  private watchers: Observer[] = []; 
  private target: string;

  constructor(http: HttpClient){
    this.http = http;
    this.requestCharacters();
   }
   
  private requestCharacters(){  
    this.http.get('http://localhost:8080/characters', {
      observe: 'response',
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
      }).subscribe(
      res => {
        let body:any = res.body;
        this.characters = body.items;
        this.notifyWatchers();
      },
      err => {
        console.log(err);
      }
    );
  }

  private uploadCharacters(){
    this.http.post('http://localhost:8080/characters', this.postData, {
      observe: 'response',
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    }).subscribe(
      res => {
        this.requestCharacters();
      },
      err => {
        console.log(err);
      }
    );
  }

  private editCharacters(){
    this.http.patch('http://localhost:8080/characters/' + this.target, this.postData, {
      observe: 'response',
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    }).subscribe(
      res => {
        this.requestCharacters();
      },
      err => {
        console.log(err);
      }
    );
  }

  private deleteCharacters(){
    this.http.delete('http://localhost:8080/characters/' + this.target, {
      observe: 'response',
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    }).subscribe(
      res => {
        this.requestCharacters();
      },
      err => {
        console.log(err);
      }
    );
  }

  private notifyWatchers() {
    for(let i=0; i < this.watchers.length; i+=1){
      console.log("notify");
      this.watchers[i].recieveUpdate();
    }
  }

  public watch(watcher:Observer){
    this.watchers.push(watcher);
  }

  public get(){
    return this.characters;
  }

  public post(character){
    console.log(typeof(character));
    this.postData = character;
    this.uploadCharacters();
  }

  public patch(data, target){
    this.target = target;
    this.postData = data;
    this.editCharacters();
  }

  public delete(target){
    this.target = target;
    this.deleteCharacters();
  }
}
