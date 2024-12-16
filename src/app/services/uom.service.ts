import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { UOM } from "../models/uom/uom";

@Injectable({
    providedIn: "root",
})
export class UomService {
    constructor(private http: HttpClient) {}

    save(uom: any): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom`;
        return this.http.post(url, JSON.stringify(uom), {
            headers: {
                "Content-Type": "application/json",
            },
            observe: "response",
        });
    }

    edit(id: string): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom`;
        return this.http.patch(
            url,
            {},
            {
                headers: {
                    "Content-Type": "application/json-patch+json",
                },
                observe: "response",
            }
        );
    }

    fetchUOMs(
        offset: int,
        size: int,
        ascending: boolean,
        searchValue: string
    ): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom`;
        return this.http.get(url, {
            params: {
                offset: offset,
                limit: size,
                ascending: ascending,
                longName: searchValue,
            },
            observe: "response",
        });
    }

    getUOMById(id: string): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom/${id}`;
        return this.http.get(url, { observe: "response" });
    }

    deleteUOMById(id: string): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom/${id}`;
        return this.http.delete(url, { observe: "response" });
    }

    /**Metadata : Unit Class Types*/
    getUnitClassTypes() {
        let url = `${environment.baseUrl}/unit/metadata/type`;
        return this.http.get(url, { observe: "response" });
    }

    /**Metadata : Unit Class Statuses*/
    getUnitClassStatuses() {
        let url = `${environment.baseUrl}/unit/metadata/status`;
        return this.http.get(url, { observe: "response" });
    }

    /**Metadata : Unit Class Levels*/
    getUnitClassLevels() {
        let url = `${environment.baseUrl}/unit/metadata/level`;
        return this.http.get(url, { observe: "response" });
    }
}
