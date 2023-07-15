import { NavigateFunction } from "react-router-dom";

export type logInType = {
    username: string;
    password: string;
}
export type logUpType = {
    email: string;
    roles: ['ROLE_USER' | 'ROLE_ADMIN'];
    username: string;
    birthdate: string;
    name: string;
    lastname: string;
    plainPassword: string;
}

export type dataType = {
    publicKey: string;
    exchange: string;
    privateKey: string;
};

export type LoginComponentProps ={
    onLogin?: () => void;
    onChange?: (user: logInType) => void;
    user: logInType;
    userError: logInType;
}
export type RegisterComponentProps ={
    onChange?: (user: logUpType) => void;
    user: logUpType;
    userError: logUpType;
    condError?: string;
    setCondition:(cond:boolean)=>void ;
}

export type InputComponentProps=React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & {
    maxYear?: number;
    onDateChange?: (date: string) => void;
    error?: string;
}

export type ButtonComponentProps={
    active?: boolean;
    onClick?: () => void;
    activeColor?: string;
    activeBg?: string
    inactiveColor?: string;
    inactiveBg?: string;
    value: string;
}
export const localStorageKey="moneyes-user"