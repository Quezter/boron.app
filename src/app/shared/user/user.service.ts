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
        return this.http.post(
                Config.apiUrl + "login",
                {
                    'username': user.name,
                    'password': user.password
                }
            ).toPromise();
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
