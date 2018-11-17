import { Component, OnInit } from '@angular/core';
import { PosterService} from '../poster.service'

@Component({
  selector: 'app-add-poster',
  templateUrl: './add-poster.component.html',
  styleUrls: ['./add-poster.component.css']
})
export class AddPosterComponent implements OnInit {

  title = 'npp-app';

  posters = [{
    name: 'YYYYYosemite National Park',
    url: "https://www.national-park-posters.com/wp-content/uploads/2014/11/Yosemite-National-Park.jpg",
    text: "The Yosemite National Park poster is an original work by Robert Decker. The “Tunnel View” provides one of the most famous views of the Yosemite Valley. From here you can see El Capitan and Bridalveil Fall, with Half Dome in the background."
  }]

  constructor (private posterService: PosterService){}

  onAddPoster(name: string, url: string, text: string)
  {
    this.posters.push({
      name: name,
      url: url,
      text: text
    })
  }

  onAdd() {
    console.log('here!!!')
    this.posterService.storePosters(this.posters)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
  }

  ngOnInit() {
  }

}
