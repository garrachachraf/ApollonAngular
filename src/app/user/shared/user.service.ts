import { AppSettings } from './../../shared/appSettings';
import { DataService } from '../../shared/data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";



@Injectable()
export class UserService extends DataService<any>{
    constructor(http:HttpClient){
        super(http,+AppSettings.API_ENDPOINT+"/showroom");
      }
      
    getAll() {
        return this.getAll();
    }

    getById(id: number) {
        return this.getOne(id);
    }

    create(user: any) {
        return this.add(user);
    }

    update(user: any) {
        return this.update(user);
    }

    delete(id: number) {
        return this.delete(id);
    }
}