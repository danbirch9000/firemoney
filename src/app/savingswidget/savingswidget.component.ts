import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'savings-widget',
  templateUrl: './savingswidget.component.html',
  styleUrls: ['./savingswidget.component.scss']
})

export class SavingsWidgetComponent {

  userSavings: FirebaseListObservable<any[]>;
  errorMessage: any;
  newStock: any;
  isAuth = false;
  user = { "uid" : null};
  newSavings = {"name" : null, "balance" : null}

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.isAuth = true;
        this.userSavings = af.database.list("users/"+this.user.uid+"/savings");
        this.userSavings.subscribe(
          userStock => this.handleUserSavingsReturn(userStock),
          error =>  this.errorMessage = <any>error
        );
      } else {
        this.user = { "uid" : null} ;
        this.isAuth = false;
      }
    });
  }

  handleUserSavingsReturn(data){
          console.log(data);
  }


  addSavings(){
    this.userSavings.push(this.newSavings);
  }



}