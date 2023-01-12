class Http {
    static instance = new Http();
    get = async (url, token) => {
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            setTimeout(() => {
                controller.abort();
            }, 10000);
            let req = await fetch(url, {
                signal,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            let json = await req.json();
            return json;
        } catch (error) {
            console.log("Error en el http get", error);
            if(error.toString().includes("Aborted")){
                return {status: "aborted", error}
            }
        }

    }; // FIN FUNCION DEL GET

    post = async (body, token) => {
        console.log(body);
        try {
            
                let req = await fetch("https://api/api_control/Index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body

            });

            let json = await req.text();
            console.log("JSON",JSON)
            return json;
        } catch (error) {
            console.log("Error en el http post", error);
            return "error";
        }
    }; // FIN FUNCION POST

}

export default Http;