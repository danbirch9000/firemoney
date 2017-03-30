import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as financejs from 'financejs';
@Injectable()



export class FinanceService {

      getValueAfterOneYear(data, years, contributions){
    
        var yearVal = data;
        var currentTotal = data[data.length-1].total;
        var months = 1 + (years * 12);
        for(var i = 1; i < months ; i++){
            yearVal[i] = { total: null, yearInterest: null }
            yearVal[i].total = financejs.Finance.prototype.CI(10/12, 1, data[i-1].total + contributions, 1);
        };

        var lastIndex = yearVal.length - 1;
        yearVal[lastIndex].yearInterest = this.to2Decimal((yearVal[lastIndex].total - currentTotal) - (contributions * 12));

        return yearVal[lastIndex];
    }

    to2Decimal(num){
        return parseFloat((Math.round(num * 100) / 100).toFixed(2));
    }

}

/*
var module = (function () {

    var finance = new Finance();

    function init(){
        var numberOfPeriods = 1 / 12;
        var savings = [{ total : 10000, yearInterest: 0, totalInterest: 0 }];
        var test = [];
        for(var i = 0; i < 11 ; i++){
            test[i] = getValueAfterOneYear(savings, i, 200);
            test[i].year = i;
            if(i>0){
                test[i].totalInterest = test[i].yearInterest + test[i - 1].totalInterest;
            }
        };
        console.log(test);
    }

    function getValueAfterOneYear(data, years, contributions){
    
        var yearVal = data;
        var currentTotal = data[data.length-1].total;
        var months = 1 + (years * 12);
        for(var i = 1; i < months ; i++){
            yearVal[i] = { total: null, yearInterest: null }
            yearVal[i].total = finance.CI(10/12, 1, data[i-1].total + contributions, 1);
        };

        var lastIndex = yearVal.length - 1;
        yearVal[lastIndex].yearInterest = to2Decimal((yearVal[lastIndex].total - currentTotal) - (contributions * 12));

        return yearVal[lastIndex];
    }

    function to2Decimal(num){
        return parseFloat((Math.round(num * 100) / 100).toFixed(2));
    }

    return {
        init: init
    };

})();

module.init();

*/