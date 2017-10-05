import { Component, Injectable, OnInit } from '@angular/core';
import {PVector} from './lineData';
import {frameResizer} from './frameResizer';
import { routerTransition } from './router.animations';
import {Guest } from './guest';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
/*{"records":[{"name":"JimBob","message":"Hello katz!"},{"name":"Dr IQ","message":"Hello hello my name is Jim Bobby.
 Been an old friend of shorty there!
 Gratz!"}]}*/

class ParseObject{
    toParseObj: string;
    pitems: PostItem[];
    constructor(objstr: string){
        this.toParseObj = objstr;
        this.pitems = [];
    }
    catchEscape(rs: string[]){
        var i = 0;
        var rtnrs: string[] = [];
        var setcontinue: boolean = false;
        for (let r of rs){
            if (setcontinue){
                i+=1;
                setcontinue = false;
                continue;
            }
            if (r[r.length-1] == "\\" ){
                if ((i+1) < (rs.length-1)){
                    let fr: string = rs[i+1];
                    rtnrs.push(r+fr);
                    setcontinue = true;
                }
            }
            else{
                rtnrs.push(r);
            }
            i+=1 
        }
        return rtnrs;
    }

    iterateParse(strP: string, strset: string[]){
        for (let strp in strset){
            var splitobj = strp.split(strP);
            var nsplitobj = this.catchEscape(splitobj);
        }
    }

    parseString(){
        /*{"records":[{"name":"JimBob","message":"Hello katz!"},{"name":"Dr IQ","message":"Hello hello my name is Jim Bobby.
 Been an old friend of shorty there!
 Gratz!"}]}*/
        //presumes user properly input string for formatting
        var rs = this.toParseObj.split(']}');
        console.log(rs);
        //catch escapes
        var nrs = this.catchEscape(rs);
        console.log(nrs);
        let nrs0 = nrs[0];
        var nrs1 = nrs0.split('{"records":[');
        var nrs2 = this.catchEscape(nrs1);
        console.log(nrs2);
        let nrs3 = nrs2[1];
        var nrs4 = nrs3.split("},{");
        var nrs5 = this.catchEscape(nrs4);
        console.log(nrs5);
        for (let nr of nrs5){
            //split "," for key,value s
            var nrs6 = nr.split(",");
            var nrs7 = this.catchEscape(nrs6);
            console.log(nrs7);
            let nrs8 = nrs7[0].split("\"name\":");
            let namevalue = nrs8[1].split("\"")[1];
            console.log(nrs8);
            let nrs9 = nrs7[1].split("\"message\":");
            let messagevalue = nrs9[1].split("\"")[1];
            this.pitems.push(new PostItem(namevalue,messagevalue));
        }
        return this.pitems;
    }
}
class PostItem {
    constructor(public name: string,
                public message: string) {
    }
  }

@Injectable()
export class SearchService {
  apiRoot: string = 'http://chrisandrachelwedding.atwebpages.com/getrecords.php';
  results: PostItem[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  search() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.apiRoot;
      
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                
                var json=JSON.stringify(res);
                var jobj = JSON.parse(json);
                var jobj2 = jobj["_body"];
                //var jobj3 = JSON.parse(jobj2);
                console.log(jobj2);
                var parseobj = new ParseObject(jobj2);
                this.results = parseobj.parseString();
                console.log(this.results);
                
                /*
                for (let job in jobj){
                    this.results.push(new PostItem(job.name, job.message));
                }
                //this.results = res.json().results.map
                /*
                this.results = jobj.map(item => {
                  return new PostItem(
                      item.name,
                      item.message
                  );
                });*/
                // this.results = res.json().results;
                //posts = res.data.records;
                resolve();
              },
              msg => { // Error
                console.log("hit error");
                reject(msg);
              }
          );
    });
    return promise;
  }
}