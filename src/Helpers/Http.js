const DEV = "http://localhost:8080";

const HOST = DEV;

//ej url: "/api/impresores"
export default class Http {
    static getRequest = (data, url, method) => {
        const init = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        return new Request(`${HOST}${url}`, init)
    }

    static post = async (body, url) => {
        console.log(body);
        const request = this.getRequest(body, url, "POST")
        const res = await fetch(request)
        console.log("respuesta:",res);
        /*if (res){
            return ({message:"DB Problem: No puedes pasar!"});
        }*/
        return await res.json()
    }


    static postFichero = async (fichero, url) => {
        const formData = new FormData();
        formData.append("stl", fichero);
        const config = {
            method: "POST",
            headers: {
              "enctype": "multipart/form-data",
              Accept: "application/json",
            },
            body: formData,
          };

        const res = await fetch(url, config);
        
        return await res.json()
    }

    static put = async (body, url) => {
        const request = this.getRequest(body, url, "PUT")
        const res = await fetch(request)
        return await res.json()
    }

    static get = async url => {
        const res = await fetch(`${HOST}${url}` )
        return await res.json()
    }

    static delete = async url => {
        const res = await fetch(`${HOST}${url}`, {
            method: "DELETE"
        })
        return await res.json()
    }
}