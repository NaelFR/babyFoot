import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PlayOff } from './play-off.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PlayOffService {

    private resourceUrl = SERVER_API_URL + 'api/play-offs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(playOff: PlayOff): Observable<PlayOff> {
        const copy = this.convert(playOff);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(playOff: PlayOff): Observable<PlayOff> {
        const copy = this.convert(playOff);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PlayOff> {
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
     * Convert a returned JSON object to PlayOff.
     */
    private convertItemFromServer(json: any): PlayOff {
        const entity: PlayOff = Object.assign(new PlayOff(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a PlayOff to a JSON which can be sent to the server.
     */
    private convert(playOff: PlayOff): PlayOff {
        const copy: PlayOff = Object.assign({}, playOff);

        copy.startDate = this.dateUtils.toDate(playOff.startDate);

        copy.endDate = this.dateUtils.toDate(playOff.endDate);
        return copy;
    }
}
