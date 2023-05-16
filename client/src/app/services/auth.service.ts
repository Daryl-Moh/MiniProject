import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly JWT_TOKEN_NAME = "jwt"
    
    constructor(
        private http: HttpClient,
        private router: Router) { }

    get isLoggedIn() {
        return !!localStorage.getItem('jwt')
    }

    get givenname() {
        const token = localStorage.getItem('jwt')
        if (null != token) {
            const decodedJWT: any = jwt_decode(token)
            return decodedJWT['givenname']
        } else {
            return ""
        }
    }

    get userID() { 
        const token = localStorage.getItem('jwt')
        if (null != token) {
            const decodedJWT: any = jwt_decode(token)
            return decodedJWT['sub']
        } else {
            return ""
        }
    }

    get JWT() {
        const token = localStorage.getItem(this.JWT_TOKEN_NAME)
            return token
        
    }

    register(givenname: string, familyname: string, email: string, password: string): Promise<any> {
        const body = { givenname, familyname, email, password }
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

    logout() {
        localStorage.removeItem('jwt')
        console.log('jwt deleted from local storage')
        this.router.navigate(['/login'])
    }

}

