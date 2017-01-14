import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


export class Stock {
  constructor(public id: number, public dataset_code: string, public name: string) { }
}

/*
https://www.quandl.com/api/v3/datasets/GOOG/LON_LLOY.json?api_key=f4bqZx6uxW97nrryM_y_
https://www.quandl.com/api/v3/datasets/GOOG/LON_SOU.json?api_key=f4bqZx6uxW97nrryM_y_
*/

@Injectable()
export class StockService {
  constructor(private http: Http) { }

  getStockValue(stocks) {
    console.log("stocks")
    console.log(stocks)

  let observableBatch = [];

  stocks.forEach(( componentarray, key ) => {
    observableBatch.push(this.http.get( 'https://www.quandl.com/api/v3/datasets/LSE/'+ stocks[key] +'.json?api_key=f4bqZx6uxW97nrryM_y_')
    .map((res: Response) => res.json())
    .do(dataset => console.log(dataset))
    .catch(this.handleError)
    );
  });

  return Observable.forkJoin(observableBatch);


  /*
    return Observable.forkJoin(
        this.http.get('https://www.quandl.com/api/v3/datasets/LSE/LLOY.json?api_key=f4bqZx6uxW97nrryM_y_')
          .map((res:Response) => res.json())
          .do(dataset => console.log(dataset))
          .catch(this.handleError),
        this.http.get('https://www.quandl.com/api/v3/datasets/LSE/SOU.json?api_key=f4bqZx6uxW97nrryM_y_')
          .map((res:Response) => res.json())
          .do(dataset => console.log(dataset))
          .catch(this.handleError)
    )*/

    /*return this.http.get('https://www.quandl.com/api/v3/datasets/LSE/LLOY.json?api_key=f4bqZx6uxW97nrryM_y_')
      .map((response: Response) => <Stock>response.json().dataset)
      .do(dataset => console.log(dataset))
      .catch(this.handleError);*/





  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}