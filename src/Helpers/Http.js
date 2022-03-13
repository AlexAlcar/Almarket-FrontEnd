const DEV = "http://localhost:8080";
//const PROD = "http://www.tacumba.es:3000" || "http://271.182.168.229:3000" || "http://localhost:3000";
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
        if (res.status !== 200){
            return ({message:"DB Problem: No puedes pasar!"});
        }
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

    /*static getFile = async url => {
        const res = await fetch(`${HOST}${url}`, {
            credentials: "include",
        }).then(response => {
            console.log(response);
            response.blob().then(blob => {
                let aurl = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = aurl;
                a.download = 'report.pdf';
                return a;
            });
        });
        return await res;
    }*/

    static delete = async url => {
        const res = await fetch(`${HOST}${url}`, {
            method: "DELETE"
        })
        return await res.json()
    }
}