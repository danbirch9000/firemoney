import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';
import { APP_CONFIG, AppConfig } from './app.config';

import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StockWidgetComponent } from './stockwidget/stockwidget.component';
import { SavingsWidgetComponent } from './savingswidget/savingswidget.component';
import { DataService } from './services/data.service';

import { StockService } from './services/stock.service';
import './rxjs-extensions';
export const firebaseConfig = {
    apiKey: "AIzaSyBQD1fUrMMXidnLRFmuyS9kx0DMrOs-Cl0",
    authDomain: "firemoney-fc650.firebaseapp.com",
    databaseURL: "https://firemoney-fc650.firebaseio.com",
    storageBucket: "firemoney-fc650.appspot.com",
    messagingSenderId: "475987892612"
};

@NgModule({
  declarations: [
    AppComponent,
    StockWidgetComponent,
    SavingsWidgetComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }),
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartModule
  ],
  providers: [DataService, StockService, {provide: APP_CONFIG, useValue: AppConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }