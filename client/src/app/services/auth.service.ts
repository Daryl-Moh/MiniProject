import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router) { }

    get isLoggedIn() {
        return !!localStorage.getItem('jwt')
    }

    get givenName() {
        const token = localStorage.getItem('jwt')
        if (null != token) {
            const decodedJWT: any = jwt_decode(token)
            return decodedJWT['givenname']
        } else {
            return ""
        }
    }

    register(givenname: string, familyname: string, email: string, password: string): Promise<any> {
        const body = { givenname, familyname, email, password, isGoogleLogin: false }
        return firstValueFrom(
            this.http.post<any>("/api/auth/register", body)
        )
    }

    login(email: string, password: string): Promise<any> {
        const body = { email, password }
        return firstValueFrom(
            this.http.post<any>("/api/auth/login", body)
        )
    }

    googleRegister(credentials: string): Promise<any> {
        console.info(credentials)
        const headers = new HttpHeaders()
            .set("Content-type", "application/json")
        return firstValueFrom(
            this.http.post("/api/auth/googlelogin", credentials, { headers })
        )
    }

    logout() {
        localStorage.removeItem('jwt')
        console.log('jwt deleted from local storage')
        this.router.navigate(['/'])
    }

}

