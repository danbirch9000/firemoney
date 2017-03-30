import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { FinanceService } from '../services/finance.service';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'calculator-widget',
  templateUrl: './calculatorwidget.component.html',
  styleUrls: ['./calculatorwidget.component.scss']
})


export class CalculatorWidgetComponent {


        savings: any;

  constructor(public af: AngularFire, private financeService: FinanceService,) {


        var numberOfPeriods = 1 / 12;
        var savings = [{ total : 10000, yearInterest: 0, totalInterest: 0 }];
        var test = [];
        for(var i = 0; i < 11 ; i++){
            test[i] = financeService.getValueAfterOneYear(savings, i, 200);
            test[i].year = i;
            if(i>0){
                test[i].totalInterest = test[i].yearInterest + test[i - 1].totalInterest;
            }
        };



          this.savings = test;
  }

}