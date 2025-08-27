import axiosInstance from "../config/axios.config";
import { getFromLocalstorage } from "../utilities/helpers";

export  interface IResult{
    data?:any,
    error?:any,
    options:any,
    status:string

}
export interface IResponseType {
    result:IResult,
    status:number
}

abstract class HttpService {
    #headers: any = {};
    #params: any = {};
    #config: any = {
        headers: this.#headers,
        params: this.#params,
    };

    #setConfig(config: any) {
        this.#headers = {
            "Content-Type": "application/json",
        };

        //if file upload
        if (config.file || config.files) {
            this.#headers = {
                "Content-Type": "multipart/form-data",
            };
        }

        //auth bearer
        if (config.auth) {
            const token = getFromLocalstorage("accessToken");
            this.#headers = {
                ...this.#headers,
               Authorization: `Bearer ${token}`
            };
        }
        
        //params
        if (config.params) {
            this.#params = config.params;
        }
        this.#config = {
            headers: this.#headers,
            params: this.#params,
        };
    }

    getRequest = async (url: string, config: any = {}) => {
        try {
            this.#setConfig(config);
            const { data: responseData, status } = await axiosInstance.get(url, this.#config);
            return {
                result: responseData,
                status: status
            };
        } catch (error: any) {
            console.error("GET Request Error:", {
                url,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.config?.headers
            });
            throw {
                response: error.response?.data || error.message,
                status: error.response?.status || 500
            };
        }
    };
    async postRequest(url: string, data: any, config: any = {}):Promise<IResponseType> {
        try {
            //sets the headers and params
            this.#setConfig(config);
            const { data: responseData, status } = await axiosInstance.post(
                url,
                data,
                this.#config
            );
            
            return {
                result: responseData,
                status: status,
            };
        } catch (exception:any) {
            // todo : exception
            // console.log("Exception: ", exception);
            throw {
                response:exception?.response?.data,
                status:exception?.status

            }
        }
    }
    async putRequest(url: string, data: any, config: any = {}):Promise<IResponseType> {
        try {
            this.#setConfig(config);
            const { data: responseData, status } = await axiosInstance.put(
                url,
                data,
                this.#config
            );
            
            return {
                result: responseData,
                status: status,
            };
        } catch (exception:any) {
            // todo : exception
            console.log("Exception: ", exception);
            throw {
                response:exception?.response?.data,
                status:exception?.status

            }
        }
    }
    async patchRequest(url: string, data: string, config: any = {}):Promise<IResponseType >{
        try {
            this.#setConfig(config);
            const { data: responseData, status } = await axiosInstance.patch(
                url,
                data,
                this.#config
            );
            
            return {
                result: responseData,
                status: status,
            };
        } catch (exception:any) {
            // todo : exception handling
            
           console.log(exception);
           throw {
            response:exception?.response?.data,
            status:exception?.status

        }
           
        }
    }
    async deleteRequest(url: string, config: any = {}):Promise<IResponseType> 
    {
        try {
            this.#setConfig(config);
            const {data:responseData , status} = await axiosInstance.delete(
                url,this.#config
            )
            return {
                result:responseData,
                status:status
            }

        } catch (exception:any) {
            // todo : exception
            console.log("Exception: ", exception);
            throw {
                response:exception?.response?.data,
                status:exception?.status

            }
        }
    }
}

export default HttpService;
