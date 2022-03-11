import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { AppConfig } from '../@app-config/app-config.constant';

@Injectable({
    providedIn: 'root',
})
export class BankProblemService {

    API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }



    createProblem(data) {
        return this.http.post(this.API_URL + '/BankProblem/add', data);
    }

    editProblem(data) {
        return this.http.post(this.API_URL + '/BankProblem/update/'+data.Id, data);
    }



    approvedProblem(data) {
        return this.http.post(this.API_URL + '/BankProblem/approved-problem', data);
    }
    deelteProblem(data) {
        return this.http.delete(this.API_URL + '/BankProblem/delete/' + data.Id, data);
    }


    getAgents() {
        return this.http.get(this.API_URL + '/query/agents').pipe(map((resposne: any) =>
            resposne.Success ? resposne.Result : []
        ));
    }
    getDepartments() {
        return this.http.get(this.API_URL + '/query/departments').pipe(map((resposne: any) =>
            resposne.Success ? resposne.Result : []
        ));
    }

    getProblems() {
        return this.http.get(this.API_URL + '/BankProblem/list').pipe(map((resposne: any) =>
            resposne.Success ? resposne.Result : []
        ));
    }

    getProblem(id: number) {
        return this.http.get(this.API_URL + '/BankProblem/' + id).pipe(map((resposne: any) =>
            resposne.Success ? resposne.Result : null
        ));
    }

    uploadFile(file:any){

        return this.http.post(this.API_URL + '/File/upload-file', file);
        
    }
    getFile(fileName:string){

        return this.http.get(this.API_URL + '/File/'+ fileName,{
            observe: 'response',
            responseType: 'blob'
        }).pipe(map(res=>{
            return res.body
        }))
        
    }

    onSelectFamily(e){
        const fdivision = AppConfig.FAMILTY_DIVISION[String(e).toUpperCase()]
        return fdivision;
    }

    initIssueValidators(control, _validators){
        control.controls['Code'].setValidators(_validators)
        control.controls['Code'].updateValueAndValidity();
    
        control.controls['Family'].setValidators(_validators);
        control.controls['Family'].updateValueAndValidity();
    
        control.controls['FamilyDivision'].setValidators(_validators);
        control.controls['FamilyDivision'].updateValueAndValidity();
    
        control.controls['Category'].setValidators(_validators);
        control.controls['Category'].updateValueAndValidity();
    }
}