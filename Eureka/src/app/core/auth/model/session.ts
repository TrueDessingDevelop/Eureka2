import { User } from "../../user/model/user";

export class Session {
     token!: string;
     user!: User;
     
     constructor( object: any){
      this.token = (object.username) ? object.token : null;
      this.user = (object.password) ? object.user : null;
    }
  }