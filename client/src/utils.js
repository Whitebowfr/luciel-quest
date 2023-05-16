import { useEffect } from 'react';

const useScript = (html, id) => {
    useEffect(() => {
        if (document.getElementById(id)) {
            const script = document.createElement('script');

            if (html.split("<script>")[1] && html.split("<script>")[1].split("</script>")[0]) {
                let content = html.split("<script>")[1].split("</script>")[0]

                script.type = "text/javascript"
                script.text = content;
            }

            document.getElementById(id).appendChild(script);
        }
    }, [html, id]);
};

const isDev = false
let URL = window.location.href
URL = URL.split("")
URL.pop()
URL = URL.join("")
if (isDev) {
    URL = "http://localhost:3001"
}



const sendUpdate = async (txt) => {
    if (txt === "") return
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: txt
        })
    }
    fetch(URL + "/api/progressUpdate", requestOptions)
}



export { useScript, sendUpdate, URL};