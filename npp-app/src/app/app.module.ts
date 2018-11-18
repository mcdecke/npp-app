import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InfoAreaComponent } from './info-area/info-area.component';
import { PosterService } from './poster.service'
import { HttpModule } from '@angular/http'
import { AddPosterComponent } from './add-poster/add-poster.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InfoAreaComponent,
    AddPosterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    AngularFontAwesomeModule,
  ],
  providers: [PosterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
