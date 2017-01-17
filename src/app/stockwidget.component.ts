import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { StockService } from './services/stock.service';

@Component({
  selector: 'stock-widget',
  templateUrl: './stockwidget.component.html',
  styleUrls: ['./stockwidget.component.css']
})

export class StockWidgetComponent {
  userStockInfo: FirebaseObjectObservable<any[]>;
  addUserStock: FirebaseListObservable<any[]>;
  stockData: any;
  errorMessage: any;
  asOfDate: any;
  userStock: any;
  stocks: string[] = [ "LLOY", "SOU" ];
  newStock: any;

  constructor(public af: AngularFire, private stockService: StockService) {
    this.userStockInfo = af.database.object('/users/yEa5gTrFZAUyjpECKve7y6f45DB3/stocks');
    /*this.userStockInfo.subscribe(
      userStock => this.handleUserStockReturn(userStock),
      error =>  this.errorMessage = <any>error
    );*/

    this.addUserStock = af.database.list("users/yEa5gTrFZAUyjpECKve7y6f45DB3/stocks");
    this.addUserStock.subscribe(
      userStock => this.handleUserStockReturn(userStock),
      error =>  this.errorMessage = <any>error
    );

    this.newStock = { "code": "", "quantity":"" }
  }

        
  lloydsSharePrice = 64.64;
  soundOilSharePrice = 73.00;
  isaValue = 5020.61;
  bufferValue = 3741.75;
  tryToSave = 2000;
  

   getStock(stockCodes) {
      this.stockService.getStockValue(stockCodes)
      .subscribe(
          stock => this.formatResult(stock),
          error =>  this.errorMessage = <any>error
      );
  }

  //create an array of stock codes that a user has, used to pass to service.
  handleUserStockReturn(userStock){
    console.log(userStock);
    
    this.userStock = userStock
    var stockCodes = [];
    for (let stock of userStock) {
      stockCodes.push(stock.code);
    }
    console.log(stockCodes);
    this.getStock(stockCodes);
  }


  formatResult(data){
    console.log(data);
    this.stockData = data;
    this.lloydsSharePrice = data[1].dataset.data[0][5];
    this.soundOilSharePrice = data[0].dataset.data[0][5];
    this.asOfDate = data[0].dataset.data[0][0];
  }

  getLloydsShareValue = function(){
    
    let totalShares = 4447.880305	+ 1774;
    let valueShares = (totalShares * this.lloydsSharePrice) / 100;
  //console.log(totalShares + " " + this.lloydsSharePrice);
    return valueShares;
  };

  getSoundOilShareValue = function(){
    let totalShares = 525.660377;
    let valueShares = (totalShares * this.soundOilSharePrice) / 100;
    return valueShares;
  };

getSharePriceValue(stock,i){
  return (this.getQuantityOfShares(stock.dataset_code) * stock.data[0][5]) / 100;
}

getQuantityOfShares(code){
  for (let stock of this.userStock) {
      if(stock.code === code){
        return stock.quantity;
      }
  }
}

addStock(){
  this.addUserStock.push(this.newStock);
}


}
