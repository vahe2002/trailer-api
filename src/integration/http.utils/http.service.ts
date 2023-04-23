import { Injectable } from "@nestjs/common"
import axios, { AxiosPromise } from 'axios'

@Injectable()
export class HttpService {
    async get(url:string, config?:any){
        try {
            return await axios.get(url, config)
        } catch (err){
            return err.response;
        }
    }
}