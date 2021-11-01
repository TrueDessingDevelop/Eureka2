export class User {
    _id!: String;
    username!: String;
    email!: String;
    rol!: String;
    constructor(){
      
    }
    
    newUserByAuth0(username:string | any,email:String | any){
      
      this.username = username;
      this.email = email;
      
    }
  }