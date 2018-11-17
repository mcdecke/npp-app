import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PosterService } from './poster.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'npp-app';

  posters = []
  filteredPosters = []
  search = ''

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

    const search = form.value.search
    console.log(search)

    this.posterService.getPosters()
      .subscribe(
      (posters: any[]) => {
        for (let key in posters) {
          for (let i = 0; i < posters[key].length; i++) {
            if (posters[key][i] !== null && posters[key][i].name == search) {
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

}
