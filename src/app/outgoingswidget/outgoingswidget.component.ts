import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'outgoings-widget',
  templateUrl: './outgoingswidget.component.html',
  styleUrls: ['./outgoingswidget.component.scss']
})

export class OutgoingsWidgetComponent {

  firebaseUserOutgoings: FirebaseListObservable<any[]>;
  errorMessage: any;
  isAuthenticated = false;
  user = { "uid" : null };
  newOutgoing: any = { 'description' : '', 'amount' : null, 'date' : null, 'account': '' };
  createNewOutgoing: boolean;
  usersOutgoings: any;
  totalUserOutgoings: number = 0;

  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.isAuthenticated = true;
        this.firebaseUserOutgoings = af.database.list("users/"+this.user.uid+"/outgoings", {
  query: {
    orderByChild: 'date'
  }
});



        this.firebaseUserOutgoings.subscribe(
          userOutgoings => this.handleFirebaseReturn(userOutgoings),
          error =>  this.errorMessage = <any>error
        );
      } else {
        this.user = { "uid" : null} ;
        this.isAuthenticated = false;
      }
    });
    this.createNewOutgoing = false;
  }

  handleFirebaseReturn(data){

    this.usersOutgoings = data;

    this.totalUserOutgoings = 0;
    let total = 0;
    for (let x of this.usersOutgoings) {
      this.totalUserOutgoings = this.totalUserOutgoings + parseFloat(x.amount);
    }
    this.notify.emit(this.totalUserOutgoings);

  }

  addNewOutgoing(){

    var i = parseFloat(this.newOutgoing.amount)
    this.newOutgoing.amount = i;

    this.firebaseUserOutgoings.push(this.newOutgoing);
    this.createNewOutgoing = false;
  }

  deleteOutgoing(outgoing){
    this.firebaseUserOutgoings.remove(outgoing.$key);
  }

}