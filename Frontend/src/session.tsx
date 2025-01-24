import axios from "axios";

let session_manager = async ()=>{
    let session_obj = localStorage.getItem('token');
    if(session_obj){
        let session = JSON.parse(session_obj);
        let time = Date.now();
        if(time > session.expiry){
            let localStorageData:string | null = localStorage.getItem("token");
            let session_ob = JSON.parse(localStorageData || "{}");
            let jwt_token = session_ob.jwt_token;
            //console.log(jwt_token);
            let response = await axios.delete("http://localhost:5000/api/logout", {
              headers: {
               token: jwt_token
              }
            });
            console.log(response.data);
            if(response.status === 200 && response.statusText === "OK"){
            localStorage.removeItem("token");
            }
            return {username: "", session: false};
        }
        else{
            try{
            let response = await axios.get('http://localhost:5000/api/session/', {
                headers: {
                    token: session.jwt_token,
                    session: "true"
                }
            });
            if(response.status === 200 && response.statusText === "OK"){
                //console.log(response.data.username);
                return {username: response.data.username, session: true};
            }
            else{
                localStorage.removeItem('token');
                return {username: "", session: false};
            }
        }
        catch(e){
            //console.log(e);
            return {username: "", session: true};
        }
        }
    }
    return {username: "", session: false};
}

export default session_manager;
