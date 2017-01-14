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
  lloydsSharePrice : 15.00;
  soundOilSharePrice : 75.22;
  isaValue : 5020.61;
  bufferValue : 3741.75;
  tryToSave : 2000;

  stocks: string[] = [ "LLOY", "SOU" ];

  constructor(af: AngularFire, private stockService: StockService) {
    this.item = af.database.object('/items/description');
    this.item.subscribe(x => console.log(x));
  }

  

   getStock() {
      this.stockService.getStockValue(this.stocks)
      .subscribe(
          stock => this.formatResult(stock),
          error =>  this.errorMessage = <any>error
      );
  }

  formatResult(data){
    console.log("About to format data: ");
    console.log(data);
    this.lloydsSharePrice = data[0].dataset.data[0][1];
    this.soundOilSharePrice = data[1].dataset.data[0][1];
    this.asOfDate = data[0].dataset.data[0][0];
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
