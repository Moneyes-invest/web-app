import axios from 'axios';
import { auth_url } from '../types';

const GetExchanges = (token: string) => axios.get(`${auth_url}/exchanges`, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const AddExchangeAccount = (publicKey: string, exchange: string, privateKey: string, token: string, user: string) => axios.post(`${auth_url}/accounts`, {
  exchange,
  privateKey,
  publicKey,
  user,
}, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const AddAccount = (token: string, name: string, user: string) => axios.post(`${auth_url}/accounts`, {
  user,
  name,
}, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const SyncAccount = (token: string, id: string) => axios.get(`${auth_url}/accounts/${id}/sync`, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const Dashboard = (token: string) => axios.get(`${auth_url}/user/dashboard`, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const CheckStatus = (token: string, id: string) => axios.get(`${auth_url}/accounts/${id}/sync_status`, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data);

const GetTransactions = (token: string, accountId: string, assetId: string) => axios.get(`${auth_url}/transactions`, {
  headers: {Authorization: `Bearer ${token}`},
  data: {account: accountId, asset: assetId},
}).then(res => res.data);

export const Exchange = {GetExchanges, AddExchangeAccount, SyncAccount, Dashboard, CheckStatus, AddAccount, GetTransactions};
