import { current } from "@reduxjs/toolkit";
import Conf from "../../Conf/Conf";
import { Client,Account,ID } from "appwrite";

// export class AuthService {
//     Client = new Client();
//     Account

//     constructor(){
//         this.Client.setEndpoint(Conf.AppwriteUrl)
//         .setProject(Conf.ProjectId)
//         console.log(Client);

//         this.Account = new Account(this.Client)
//     }

//     async Createaccount({data}) {
//         try {
//             console.log(data.email,data.password,data.name);
//             const UserAcoount = await this.Account.create(ID.unique(),data.email,data.password,data.name)  
//             if(UserAcoount){
//                 console.log("account is creation");
//                 const mail = data.email
//                 const pass = data.password
//                 return this.Login({Email: mail, Password: pass});
//             }

//             else{
//                 console.log("account not created");
//                 return UserAcoount;
//             }

//         } catch (error) {
//             throw(error)
//             console.log("error in this.Createaccount");
//         }

//     }

//     async Login({Email,Password}){
//         console.log(Password);
//         try {
//             console.log(typeof(Password));
//             console.log(typeof(Email));
//             return await this.Account.createEmailPasswordSession({email:Email,password:Password})
//         } catch (error) {
//             console.log("error in this.login");
//             throw(error)

//         }
//     }

//     async Getcurrentuser(){
//         try {
//             return await this.Account.get();
//         } catch (error) {
//             throw(error)
//             console.log("error in this.currentuser");

//         }

//         return null;
//     }

//     async Logout(){
//         try {
//             await this.Account.deleteSessions();
//         } catch (error) {
//             console.log("error in this.logout");

//         }
//     }

// }

// const authService = new AuthService()

// export default authService 


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(Conf.AppwriteUrl)
            .setProject(Conf.ProjectId);
        this.account = new Account(this.client);
            
    }

    async Createaccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
                console.log("logedin")
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            console.log("login come")
            // console.log(password)

            return await this.account.createEmailPasswordSession(email, password);
            console.log("login ends")
        } catch (error) {
            throw error;
        }
    }

    async Getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: GetCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
