import {
    HttpEvent,
    HttpHandler,
    HttpHandlerFn,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export const RedirectInterceptorService: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const reqToLogin = new HttpRequest("GET", `${window.origin}/login`);
    const urlHead = `${environment.keycloakServerUrl}/realms/${environment.realm}/protocol/openid-connect/auth`;
    if (req.url.startsWith(urlHead)) {
        alert("hey");
        return next(reqToLogin);
    }
    alert("here");
    return next(req);
};
