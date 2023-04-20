import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {members} from '../../dataType';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }

  getMembers() {
    return this.http.get<members[]>('http://localhost:3000/members');
  }


}
