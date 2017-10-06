import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSidenavModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapToolbarComponent } from './components/map/toolbar/map-toolbar.component';

import { SharedService } from './shared/shared.service';
import { MapsComponent } from './components/map/toolbar/maps/maps.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapToolbarComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSidenavModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
