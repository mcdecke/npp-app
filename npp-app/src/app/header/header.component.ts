import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PosterService } from '../poster.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search = ''
  list = this.posterService.onGet()

  constructor(private posterService: PosterService) { }

  ngOnInit() {
  }

  onSearch(form: NgForm) {
    this.search = form.value.search
    console.log(this.list)
    console.log(this.search)
  }


}
