import { createContext, ReactNode, useEffect, useState } from "react";

// Define the user details type
interface UserDetails {
  username: string;
  active: boolean;
}

// Create the context with a default value
const userContext = createContext<UserDetails>({ username: "", active: false });

interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps):JSX.Element {
  // Example state for user details
  const [user, setUser] = useState<UserDetails>({ username: "Rony", active: false });
  useEffect(()=>{
    async function dataFetch(){
   let userdata = localStorage.getItem("token");
    if(userdata){
      let response = await fetch("http://localhost:5000/user",{method:"GET",headers:{token: userdata, session: "true"}});
      let data = await response.json();
      console.log(data);
      setUser(data);
    }
    else{
      return;
    }
  }
  dataFetch();
  },[])
  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
export {userContext}
