import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { StockService } from '../services/stock.service';
import { ChartModule } from 'angular2-chartjs';


@Component({
  selector: 'stock-widget',
  templateUrl: './stockwidget.component.html',
  styleUrls: ['./stockwidget.component.scss']
})

export class StockWidgetComponent {
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();

  addUserStock: FirebaseListObservable<any[]>;
  stockData: any;
  errorMessage: any;
  asOfDate: any;
  userStock: any;
  //stocks: string[] = [ "LLOY", "SOU" ];
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


  type = 'line';

options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
            display: false,
            labels: {
                fontColor: 'rgba(255,255,255,1)'
            }
  },
   scales : {
        xAxes : [ {
            gridLines : {
                display : false
            }
        } ],
        yAxes : [ {
            gridLines : {
                display : false
            }
        } ]
    }
};


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
    for (let i in this.stockData) {

      

      this.stockData[i].dataset.quantity = this.userStock[i].quantity;
      this.stockData[i].dataset.chartData = this.buildChartData(this.stockData[i].dataset.data, 7);
    }

  }


  buildChartData(data, days){

var chartData = {
  labels: [],
  datasets: [
    {
      label: "Value",
      data: [],
      backgroundColor: 'rgba(49,165,157, 1)'
    }
  ]
};



    for(var i = days; i >= 0; i--) {
        chartData.datasets[0].data.push(data[i][5]);
        chartData.labels.push(data[i][0]);
    }
    return chartData;
  }





  getSharePriceTotalValue(){
    var total = 0;
    if(this.stockData != undefined){
      for (let stock of this.stockData) {
        total = total + (stock.dataset.quantity * stock.dataset.data[0][5]) / 100;
      }
    }

    this.notify.emit(total);

    return total;
  }

  getQuantityOfShares(code){
    for (let stock of this.userStock) {
      if(stock.code === code){
        return stock.quantity;
      }
    }
  }

  getDescription(name){
    return name.split(" share price")[0];
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