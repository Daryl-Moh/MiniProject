import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Portfolio } from "../models/portfolio";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    stocksList: Portfolio[] = []

    private API_URI: string = "/api/email";

    constructor(
        private httpClient: HttpClient,
        private authSvc: AuthService) {}

    sendEmail(userEmail: string): Promise<any> {
        const params = new HttpParams()
            .set("userEmail", userEmail);
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authSvc.JWT}`);
        console.log('[sendEmail] >>> params = ' + this.authSvc.JWT);
        console.log('[sendEmail] >>> params = ' + params);
        console.log('[sendEmail] >>> headers = ', headers);

        const url = `${this.API_URI}/send?${params.toString()}`;
        console.log('[sendEmail] >>> url = ', url);

        try {
            return lastValueFrom(this.httpClient
                .post<any>(url, null, { headers: headers }));
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }
}