import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { map } from 'rxjs/operators'

@Injectable()
export class PosterService {
  constructor(private http: Http) { }

  filteredPosters = []

  storePosters(posters: any[]) {
    return this.http.post('https://national-park-posters-app.firebaseio.com/data.json', posters)
    // return this.http.put('https://national-park-posters-app.firebaseio.com/data.json', posters)
  }

  getPosters() {
    return this.http.get('https://national-park-posters-app.firebaseio.com/data.json')
      .pipe(map(
        (response: Response) => {
          const data = response.json()
          return data
        }
      ))
  }


  onGet() {
    this.getPosters()
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

}
