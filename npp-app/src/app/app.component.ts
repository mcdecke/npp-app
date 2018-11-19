import { Component, Renderer2 } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PosterService } from './poster.service'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'npp-app';

  faCoffee = faCoffee

  posters = []
  filteredPosters = []
  search = ''
  posterNav = 0
  expanded = false

  constructor(private posterService: PosterService) { }

  onAddPoster(form: NgForm) {
    console.log(form.value.name)
    console.log(form.value.url)
    console.log(form.value.text)
    this.posters.push({
      name: form.value.name,
      url: form.value.url,
      text: form.value.text
    })
    console.log(this.posters)
    this.onSave()
  }

  onSave() {
    console.log('app')
    this.posterService.storePosters(this.posters)
      .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
      )
  }

  onGet() {
    this.posterService.getPosters()
      .subscribe(
      (posters: any[]) => {
        for (let key in posters) {
          for (let i = 0; i < posters[key].length; i++) {
            if (posters[key][i] !== null) {
              this.filteredPosters.push({
                name: posters[key][i].name,
                url: posters[key][i].url,
                text: posters[key][i].text
              })
            }
          }
        }
        console.log(this.filteredPosters)
      },
      (error) => console.log(error)
      )
  }

  onSearch(form: NgForm) {

    const search = form.value.search.toLowerCase()
    console.log(search)
    this.filteredPosters = []

    this.posterService.getPosters()
      .subscribe(
      (posters: any[]) => {
        for (let key in posters) {
          for (let i = 0; i < posters[key].length; i++) {
            if (posters[key][i] !== null ) {
              const ans = posters[key][i].name.toLowerCase()
              console.log(ans.match(search))

              if(ans.match(search)){
                this.filteredPosters.push({
                  name: posters[key][i].name,
                  url: posters[key][i].url,
                  text: posters[key][i].text
                })
              }
              console.log(ans)
            }
          }
        }
        console.log(this.filteredPosters)
      },
      (error) => console.log(error)
      )
  }

  onLeft(){
    if(this.posterNav > 0){
      this.posterNav -= 1
    }
    else {
      this.posterNav = this.filteredPosters.length - 1
    }
  }

  onRight(){
    if(this.posterNav < this.filteredPosters.length - 1){
      this.posterNav += 1
    }
    else {
      this.posterNav = 0
    }
  }

  toggleShow(event: any){
    this.expanded = !this.expanded
  }

}
