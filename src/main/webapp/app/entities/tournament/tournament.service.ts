import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Tournament } from './tournament.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TournamentService {

    private resourceUrl = SERVER_API_URL + 'api/tournaments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tournament: Tournament): Observable<Tournament> {
        const copy = this.convert(tournament);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tournament: Tournament): Observable<Tournament> {
        const copy = this.convert(tournament);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Tournament> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Tournament.
     */
    private convertItemFromServer(json: any): Tournament {
        const entity: Tournament = Object.assign(new Tournament(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a Tournament to a JSON which can be sent to the server.
     */
    private convert(tournament: Tournament): Tournament {
        const copy: Tournament = Object.assign({}, tournament);

        copy.startDate = this.dateUtils.toDate(tournament.startDate);

        copy.endDate = this.dateUtils.toDate(tournament.endDate);
        return copy;
    }
}
