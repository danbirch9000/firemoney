import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


//http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A,LLOY
/*
LLOY 4447.880305	+ 1774
SOU 525.660377


65.68
78.75



*/

export class AppComponent {
  item: FirebaseObjectObservable<any[]>;
  
  constructor(af: AngularFire) {
    this.item = af.database.object('/items/description');
    this.item.subscribe(x => console.log(x));
  }

  soundOilSharePrice = 78.75;
  lloydsSharePrice = 65.68;

  getLloydsShareValue = function(){
    let totalShares = 4447.880305	+ 1774;
    let valueShares = (totalShares * 65.68) / 100;
    return valueShares;
  }

  getSoundOilShareValue = function(){
    let totalShares = 525.660377;
    let valueShares = (totalShares * 78.75) / 100;
    return valueShares;
  }

}
