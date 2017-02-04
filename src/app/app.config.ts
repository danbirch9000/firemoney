

import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");


/*
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
*/

export interface IAppConfig {
        apiEndpoint: string;
        title: string;
}

export const AppConfig: IAppConfig = {
        apiEndpoint: 'api.heroes.com',
        title: 'Dependency Injection'
};