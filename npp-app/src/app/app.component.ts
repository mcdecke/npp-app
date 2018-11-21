import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PosterService } from './poster.service'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  @ViewChild('f') parkForm: NgForm
  title = 'npp-app';

  faCoffee = faCoffee

  posters = []
  filteredPosters = [{
    name: "Yosemite National Park",
    url: "https://www.national-park-posters.com/wp-content/uploads/2014/11/Yosemite-National-Park.jpg",
    text: "Established in 1890, Yosemite National Park is best known for its magnificent valley. But successful early efforts to include the surrounding mountains and forests also helped pave the way for the United States national park system. Within its nearly 1,200 square miles, you will also see waterfalls, grand meadows, ancient giant sequoias, vast wilderness, and North America’s tallest exposed granite monoliths.",
    shop: 905,
    state: "California"
  }]

  search = ''
  posterNav = 0
  expanded = false

  constructor(private posterService: PosterService) { }

  onAddPoster(form: NgForm) {
    this.posters = []
    console.log(form.value.name)
    console.log(form.value.url)
    console.log(form.value.text)
    this.posters.push({
      name: form.value.name,
      url: form.value.url,
      text: form.value.text,
      shop: form.value.shop,
      state: form.value.state
    })
    console.log(this.posters)
    this.parkForm.reset()

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
                text: posters[key][i].text,
                shop: posters[key][i].shop,
                state: posters[key][i].state
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
                  text: posters[key][i].text,
                  shop: posters[key][i].shop,
                  state: posters[key][i].state
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

  toggleShow(){
    this.expanded = !this.expanded
  }

}
