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

export const TokenInterceptorService: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const token: string | null = sessionStorage.getItem("token");
    if (!req.url.endsWith("login")) {
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    //might need to reconfigure
                    Authorization: `Bearer ${token}`,
                },
            });
            return next(cloned);
        }
    }
    return next(req);
};
