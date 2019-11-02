import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    };
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error.message
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT, 
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password
        };
        let url;
        if(!isSignup){
            url = "https://burgerapp-backend.herokuapp.com/authentication/login";
        }
        else
        {
            url="https://burgerapp-backend.herokuapp.com/authentication/register";
        }
        axios.post(url,authData)
        .then(res => {
            const expirationDate = new Date (new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',res.data.userId);
            dispatch(authSuccess(res.data.token,res.data.userId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch((err) => {
            dispatch(authFail(err.response.data));
        })
    };
};

export const setAuthRedircetPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const authCheckState = () => {
    return dispatch => {
         const token = localStorage.getItem('token');
         if(!token)
         dispatch(logout());
         else
         {
            const expirationDate = new Date (localStorage.getItem('expirationDate'));
             if(expirationDate < new Date())
                dispatch(logout());
             else
             {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
             }
         }
    }
}