import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBQD1fUrMMXidnLRFmuyS9kx0DMrOs-Cl0",
    authDomain: "firemoney-fc650.firebaseapp.com",
    databaseURL: "https://firemoney-fc650.firebaseio.com",
    storageBucket: "firemoney-fc650.appspot.com",
    messagingSenderId: "475987892612"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
