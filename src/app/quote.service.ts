import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Quote } from './quote';

@Injectable()
export class QuoteService {

    url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=JSONP_CALLBACK";;
    constructor(private jsonp:Jsonp) { }

    getQuotes(): Observable<Quote[]> {
        return this.jsonp.get(this.url)
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}