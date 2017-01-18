import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, AuthProviders } from 'angularfire2';

@Injectable()

export class UserService {
        public db: any;
        user = {};
        isAuth = false;

        constructor(private af: AngularFire, private auth: FirebaseAuth) {
                this.af.auth.subscribe(user => {
                if(user) {
                        // user logged in
                        this.user = user;
                        this.isAuth = true;
                        console.log(user);
                }
                else {
                        // user not logged in
                        this.user = {};
                        this.isAuth = false;
                }
                });
        }



        login() {
                this.af.auth.login({
                        provider: AuthProviders.Google
                });
        }

        test(){
        return this.http.get('api/vehicles.json')
                .map((response: Response) => <Vehicle[]>response.json().data)
                .toPromise()
                .catch(this.handleError);

        }

}