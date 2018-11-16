import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
export class PosterService {
  constructor(private http: Http) {}
  storePosters(posters: any[]) {
    return this.http.post('https://national-park-posters-app.firebaseio.com/data.json', posters)
  }
}
