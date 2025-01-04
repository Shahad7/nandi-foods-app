import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { UOM } from "../models/uom/uom";
import { LinkedUOM } from "../models/uom/linkedUOM";
import { createPatch, Operation } from "rfc6902";
import { Stats } from "fs";

@Injectable({
    providedIn: "root",
})
export class UomService {
    constructor(private http: HttpClient) {}

    save(uom: any): Observable<any> {
        console.log(uom);
        uom.linkedUOMs = [];
        uom._linkedUOMRows.forEach((elt: any) => {
            if (
                elt.linkedUOMName != "--select--" &&
                elt.linkedUOMName != "" &&
                elt.linkedUOMName.length != 0
            )
                uom.linkedUOMs.push(new LinkedUOM(elt.id, elt.conversionQTY));
        });
        uom.measuredValues = [uom._metric, uom._imperial];
        console.log(JSON.stringify(uom));
        let url = `${environment.baseUrl}/unit/uom`;
        return this.http.post(url, JSON.stringify(uom), {
            headers: {
                "Content-Type": "application/json",
            },
            observe: "response",
        });
    }

    approve(id: string): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom/${id}/approve`;
        return this.http.patch(url, undefined, {
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            observe: "response",
        });
    }

    edit(id: string, newUOM: any, oldUOM: any): Observable<any> {
        let url = `${environment.baseUrl}/unit/uom/${id}`;
        newUOM.measuredValues = [newUOM._metric, newUOM._imperial];
        newUOM._linkedUOMRows.forEach((elt: any) => {
            if (
                elt.linkedUOMName != "--select--" &&
                elt.linkedUOMName != "" &&
                elt.linkedUOMName.length != 0
            )
                newUOM.linkedUOMs.push(
                    new LinkedUOM(elt.id, elt.conversionQTY)
                );
        });
        let patches = createPatch(oldUOM.toJSON(), newUOM.toJSON());
        //temporary
        patches = patches.filter(
            (elt: Operation) =>
                !elt.path.startsWith("/measuredValues") &&
                !elt.path.startsWith("/linkedUOMs") &&
                !elt.path.startsWith("/longName")
        );
        console.log(newUOM);
        console.log(patches);
        return this.http.patch(url, patches, {
            headers: {
                "Content-Type": "application/json-patch+json",
            },
            observe: "response",
        });
    }

    fetchUOMs(
        offset: int,
        size: int,
        ascending: boolean,
        searchValue: string,
        status: string | undefined = undefined,
        sort: string | undefined = undefined
    ): Observable<any> {
        let url = `${environment.baseUrl}/unit`;
        let params: any = {
            offset: offset,
            limit: size,
            ascending: ascending,
            longName: searchValue,
        };
        if (status != undefined) params.status = status;
        if (sort != undefined) params.sort = sort;
        return this.http.get(url, {
            params: params,
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

    /**Metadata : Metric Systems and their Units*/
    getMetricSystemUnits() {
        let url = `${environment.baseUrl}/unit/metadata/metricSystem`;
        return this.http.get(url, { observe: "response" });
    }

    /** @param type : Whether csv or pdf format */
    downloadUOM(type: string) {
        let url = `${environment.baseUrl}/unit/download`;
        return this.http.get(url, {
            headers: {
                Accept:
                    type.toLowerCase() == "pdf"
                        ? "application/pdf"
                        : "text/csv",
            },
            responseType: "blob",
            observe: "response",
        });
    }

    /** @param file : File to be uploaded */
    uploadUOM(file: any) {
        let url = `${environment.baseUrl}/unit/upload`;
        const formData = new FormData();
        formData.append("unitClassList", file);
        return this.http.post(url, formData, {
            observe: "response",
        });
    }
}
