import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { StockService } from './services/stock.service';

@Component({
  selector: 'stock-widget',
  templateUrl: './stockwidget.component.html',
  styleUrls: ['./stockwidget.component.css']
})

export class StockWidgetComponent {
  addUserStock: FirebaseListObservable<any[]>;
  stockData: any;
  errorMessage: any;
  asOfDate: any;
  userStock: any;
  stocks: string[] = [ "LLOY", "SOU" ];
  newStock: any;
  isAuth = false;
  addStockCardIsActive: Boolean;
  user = { "uid" : null} ;

  constructor(public af: AngularFire, private stockService: StockService) {
    this.addStockCardIsActive = false;
    this.newStock = { "code": "", "quantity":"" }
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.isAuth = true;
        this.addUserStock = af.database.list("users/"+this.user.uid+"/stocks");
        this.addUserStock.subscribe(
          userStock => this.handleUserStockReturn(userStock),
          error =>  this.errorMessage = <any>error
        );
      } else {
        this.user = { "uid" : null} ;
        this.isAuth = false;
      }
    });
  }

  getStock(stockCodes) {
      this.stockService.getStockValue(stockCodes)
      .subscribe(
          stock => this.formatResult(stock),
          error =>  this.errorMessage = <any>error
      );
  }

  //create an array of stock codes that a user has, used to pass to service.
  handleUserStockReturn(userStock){
    this.userStock = userStock
    var stockCodes = [];
    for (let stock of userStock) {
      stockCodes.push(stock.code);
    }
    this.getStock(stockCodes);
  }

  formatResult(data){
    this.stockData = data;
    this.asOfDate = data[0].dataset.data[0][0];
  }

  getSharePriceValue(stock,i){
    return (this.getQuantityOfShares(stock.dataset_code) * stock.data[0][5]) / 100;
  }

  getSharePriceTotalValue(){
    var total = 0;
    if(this.stockData != undefined){
      for (let stock of this.stockData) {
        total = total + (this.getQuantityOfShares(stock.dataset.dataset_code) * stock.dataset.data[0][5]) / 100;
      }
    }

    return total;
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

  showAddStockCard(){
    this.addStockCardIsActive = true;
  }

  hideAddStockCard(){
    this.addStockCardIsActive = false;
  }

}