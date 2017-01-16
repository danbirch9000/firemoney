import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, AuthProviders } from 'angularfire2';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  errorMessage: any;
  isAuth = false;
  authColor = 'warn';
  user = {};

  constructor(public af: AngularFire, private stockService: StockService) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        this.isAuth = true;
        console.log(user);
      }
      else {
        // user not logged in
        this.user = {};
        this.isAuth = false;
      }
    });

  }

  isaValue = 5020.61;
  bufferValue = 3741.75;
  tryToSave = 2000;


login() {
  this.af.auth.login({
    provider: AuthProviders.Google
  });
}
 
logout() {
  this.af.auth.logout();
}


}
