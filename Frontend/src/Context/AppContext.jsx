import {createContext,useState} from "react"

const AppContext = createContext()

function AppContextProvider({children}) {

    let token=JSON.parse(localStorage.getItem("Token")) || "";
    let isAuth=token?true:false;
    console.log(isAuth)
    const [authState,setState] = useState({isAuth,token:null});
    

    const logIn = (token) => {
        setState({isAuth:true,token:token})
    }

    const logOut = ()=> {
        setState({isAuth:false,token:null})
    }

    return <AppContext.Provider value={{authState,logIn,logOut}}>
      {children}   
    </AppContext.Provider>


}
export {AppContext}
export default AppContextProvider;