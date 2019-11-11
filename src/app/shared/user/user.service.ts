import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "./user.model";
import { Config } from "../config";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    login(user: User) {
        console.log('try login');
        return this.http.post(
            Config.apiUrl + "/login",
            JSON.stringify({
                username: user.name,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            map(response => response),
            tap(data => {
                Config.token = (<any>data)._kmd.authtoken
            }),
            catchError(this.handleErrors)
        );
    }

    getCommonHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": Config.authHeader
        }
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
