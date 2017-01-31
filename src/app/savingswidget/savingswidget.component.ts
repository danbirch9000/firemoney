import { Component, Output, EventEmitter } from '@angular/core';
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
  newSavings = {"name" : null, "balance" : null};
  updateSavings = {"name" : null, "balance" : null};
  savingsData: any;
  savingsTotal: number = 0;
  createNewSavingsAccount: boolean;

@Output() notify: EventEmitter<number> = new EventEmitter<number>();

  constructor(public af: AngularFire) {

    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.isAuth = true;
        this.userSavings = af.database.list("users/"+this.user.uid+"/savings");
        this.userSavings.subscribe(
          userSavings => this.handleUserSavingsReturn(userSavings),
          error =>  this.errorMessage = <any>error
        );
      } else {
        this.user = { "uid" : null} ;
        this.isAuth = false;
      }
    });

    this.createNewSavingsAccount = false;
  }

  handleUserSavingsReturn(data){
          this.savingsData = data;
          let total = 0;
          for (let x of this.savingsData) {
            this.savingsTotal = this.savingsTotal + parseFloat(x.balance);
          }
          console.log(this.savingsTotal);
          this.notify.emit(this.savingsTotal);
  }

  addNewSavingsAccount(){
      this.userSavings.push(this.newSavings);
      this.createNewSavingsAccount = false;
  }



  saveUpdateToSavingsAccount(saving){
    this.userSavings.update(saving.$key, { balance: saving.balance, name: saving.name });
  }

  deleteSavingsAccount(saving){
    this.userSavings.remove(saving.$key);
  }


}