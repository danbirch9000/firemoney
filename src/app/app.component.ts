import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  item: FirebaseObjectObservable<any[]>;
  stockData: any;
  errorMessage: any;
  asOfDate: any;

  constructor(af: AngularFire, private stockService: StockService) {
    this.item = af.database.object('/items/description');
    this.item.subscribe(x => console.log(x));
  }

  soundOilSharePrice = 75.22;
  lloydsSharePrice = 15.00;
  isaValue = 5020.61;
  bufferValue = 3741.75;
  tryToSave = 2000;

   getStock() {
      this.stockService.getStockValue()
        .subscribe(
          stock => this.formatResult(stock),
          error =>  this.errorMessage = <any>error
      );
  }


  formatResult(data){
    this.lloydsSharePrice = data.data[0][1];
    this.asOfDate = data.data[0][0];
  }




  ngOnInit() { 
    this.getStock();
  }

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
