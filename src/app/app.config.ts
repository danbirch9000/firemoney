

import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
        apiEndpoint: string;
        title: string;
}

export const AppConfig: IAppConfig = {
        apiEndpoint: 'api.heroes.com',
        title: 'Dependency Injection'
};