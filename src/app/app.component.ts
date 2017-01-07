import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


//http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A,LLOY

export class AppComponent {
  item: FirebaseObjectObservable<any[]>;

  testData = this.dataService.getVehicles();
  

  constructor(af: AngularFire, private dataService: DataService) {
    this.item = af.database.object('/items/description');
    this.item.subscribe(x => console.log(x));
    console.log(this.testData);
  }

  soundOilSharePrice = 78.75;
  lloydsSharePrice = 65.68;
  isaValue = 5020.61;
  bufferValue = 3741.75;
  tryToSave = 2000;


  getLloydsShareValue = function(){
    let totalShares = 4447.880305	+ 1774;
    let valueShares = (totalShares * this.lloydsSharePrice) / 100;
    return valueShares;
  };

  getSoundOilShareValue = function(){
    let totalShares = 525.660377;
    let valueShares = (totalShares * this.soundOilSharePrice) / 100;
    return valueShares;
  };

}
