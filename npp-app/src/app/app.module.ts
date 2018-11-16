import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InfoAreaComponent } from './info-area/info-area.component';
import { PosterService } from './poster.service'
import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InfoAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [PosterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
