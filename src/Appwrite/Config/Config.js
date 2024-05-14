import { Client,ID,Account,Databases,Query,Storage } from "appwrite";
import Conf from "../../Conf/Conf";

export class Service{
    client = new Client()
    database
    bucket

    constructor(){
        this.client.setEndpoint(Conf.AppwriteUrl)
        this.client.setProject(Conf.ProjectId)

        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async CreatePost({Title,slug,Content,Image,status,UserId}){
        try {
            console.log(Title);
            return await this.database.createDocument(
                Conf.DatabaseId,
                Conf.CollectionId,
                slug,
                {
                    Title,Content,Image,status,UserId
                }
            )
        } catch (error) {
            console.log("error in createpost",error);
        }
    }

    async UpdatePost(slug,{Title,Content,Image,status}){
        try {
            return await this.database.updateDocument(
                Conf.DatabaseId,
                Conf.CollectionId,
                slug,
                {
                    Title,Content,Image,status,
                }
            )
        } catch (error) {
            console.log("error in updatepost");
        }
    }

    async DeletePost(slug){
        try {
            await this.database.deleteDocument(
                Conf.DatabaseId,
                Conf.CollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in deletepost");
            return false;
        }
    }

    async Getdocument(slug){
       try {

           console.log(slug);
           return await this.database.getDocument(Conf.DatabaseId,Conf.CollectionId,slug)
       } catch (error) {
        console.log("error in getdoc");
       }
    }

    async Listdocument(){
       try {
           return await this.database.listDocuments(Conf.DatabaseId,Conf.CollectionId)
       } catch (error) {
        console.log("error in listdoc");
        return false;
       }
    }

    async Uploadfile(file){
        try {
            return await this.bucket.createFile(
                Conf.BucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async Deletefile(fileID){
       try {
           await this.bucket.deleteFile(Conf.BucketId,fileID)
           return true;
       } catch (error) {
        console.log("error in deletefile");
        return false;
       }
    }

    async Getfilepreview(fileId){
       try {
           return this.bucket.getFilePreview(Conf.BucketId,fileId,300,300)
           
       } catch (error) {
        console.log("error in previewfile");
       }
    }

}

const service = new Service()

export default service