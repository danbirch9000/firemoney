import { Injectable, Inject,  Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, AuthProviders } from 'angularfire2';
import { StockService } from './services/stock.service';
import { APP_CONFIG, IAppConfig } from './app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  errorMessage: any;
  isAuth: boolean = false;
  authColor: string = 'warn';
  user: any;
  /*
  user = {
      hasStarted: <boolean> null,
      hasFinished: <boolean> null,
      id: <number> null,
  };*/


  constructor(public af: AngularFire, private stockService: StockService, @Inject(APP_CONFIG) private config: IAppConfig) {

    this.af.auth.subscribe(user => {
      if(user) {
        console.log(user);
        // user logged in
        this.user = user;
        this.isAuth = true;
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

    onNotify(e){
        //console.log(e);
        
    }


login() {
  this.af.auth.login({
    provider: AuthProviders.Google
  });
}
 
logout() {
  this.af.auth.logout();
}


}
