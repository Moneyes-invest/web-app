
import axios from 'axios';
import { logInType,logUpType,auth_url } from '../types';

const Login = (data: logInType) => axios.post(`${auth_url}/login`, data).then((res:any) => res.data);

const LogUp = (data:logUpType)=>axios.post(`${auth_url}/register`, data).then((res:any) => res.data);

const LogOut = (token:string,refresh_token:string) => axios.post(`${auth_url}/token/invalidate`,{refresh_token}, {headers:{Authorization:`Bearer ${token}`}}).then((res:any) => res.data);

const RefreshUser = (refresh_token:string) => axios.post(`${auth_url}/login/refresh`,{refresh_token}).then((res:any) => res.data);

const User = (token:string)=>axios.get(`${auth_url}/profile`,{headers:{Authorization:`Bearer ${token}`}}).then((res:any) => res.data);

export const Auth= { Login, LogUp, LogOut, RefreshUser, User };

