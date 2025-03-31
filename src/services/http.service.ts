import axiosInstance from "../config/axios.config";

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
            let token = "";
            this.#headers = {
                ...this.#headers,
                Authorization: "Bearer" + token,
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

    async getRequest(url: string, config: any = {}) {
        try {
            this.#setConfig(config);
            const { data, status } = await axiosInstance.get(url, this.#config)
            return {
                result: data,
                status: status
            }
        }
        catch (exception) {
            // todo : exception
            console.log("Exception: ", exception);
        }
    }
    async postRequest(url: string, data: any, config: any = {}) {
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
        } catch (exception) {
            // todo : exception
            console.log("Exception: ", exception);
        }
    }
    async putRequest(url: string, data: any, config: any = {}) {
        try {
            this.#setConfig(config);
        } catch (exception) {
            // todo : exception
            console.log("Exception: ", exception);
        }
    }
    async patchRequest(url: string, data: string, config: any = {}) {
        try {
            this.#setConfig(config);
        } catch (exception) {
            // todo : exception
            console.log("Exception: ", exception);
        }
    }
    async deleteRequest(url: string, config: any = {}) {
        try {
            this.#setConfig(config);
        } catch (exception) {
            // todo : exception
            console.log("Exception: ", exception);
        }
    }
}

export default HttpService;
