import axios from 'axios';

const API_URL = "http://localhost:3200/api/auth";


const register = async (userData) =>
{
    const response = await axios.post(`${API_URL}/register/`,userData,{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    });

    console.log(response)

    if(response.data && response.status === 200){
        localStorage.setItem('user',JSON.stringify(response.data));
        return await response.data;
    }

    return await Error(response.data.message);

}

const login = async (userData) =>{
    const response = await axios.post(`${API_URL}/login/`,userData,{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    });

    console.log(response);

    if(response.data && response.status === 200){
        localStorage.setItem('user',JSON.stringify(response.data));
        return await response.data;
    }
    
     return await Error(response.data.message);
    
}

const userDetails = async (userData) =>{
    const response = await axios.post(`${API_URL}/user-details/`,userData,{
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    });

    console.log("user details",userDetails);

    if(response.data && response.status === 200){
        localStorage.setItem('user',JSON.stringify(response.data));
        return await response.data;
    }

    return await Error(response.data.message);
}


const logout = () =>{
    localStorage.removeItem('user');
}

const AuthServices = {
    register,
    login,
    logout
}

export default AuthServices;