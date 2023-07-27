import { localStorageKey, logInType, logUpType } from "../types"

export const getLocalUser = () => {
    const user = localStorage.getItem(localStorageKey);
    if (user)
        return JSON.parse(user);

    return false;


}

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validLogUp = (logup:logUpType,newError:logUpType) => {
    let valid: boolean = true;
    
    let newUserError=newError;
    if (logup.email && isValidEmail(logup.email)) {
      newUserError = { ...newUserError, email: "" };
    } else {
      newUserError = { ...newUserError, email: "error" };
    }
    if (logup.plainPassword) {
      newUserError = { ...newUserError, plainPassword: "" };
    } else {
      newUserError = { ...newUserError, plainPassword: "error" };
    }
    if (logup.name) {
      newUserError = { ...newUserError, name: "" };
    } else {
      newUserError = { ...newUserError, name: "error" };
    }
    if (logup.lastname) {
      newUserError = { ...newUserError, lastname: "" };
    } else {
      newUserError = { ...newUserError, lastname: "error" };
    }
    if (logup.birthdate) {
      newUserError = { ...newUserError, birthdate: "" };
    } else {
      newUserError = { ...newUserError, birthdate: "error" };
    }
    return {data:newUserError,valid};
};

export const validLogIn = (logup:logInType,newError:logInType) => {
    let valid: boolean = true;
    
    let newUserError=newError;
    if (logup.username) {
      newUserError = { ...newUserError, username: "" };
    } else {
      newUserError = { ...newUserError, username: "error" };
    }
    if (logup.password) {
      newUserError = { ...newUserError, password: "" };
    } else {
      newUserError = { ...newUserError, password: "error" };
    }
    
    return {data:newUserError,valid};
};

export const sortByName=(data:any[],order:'asc'|'desc'="asc")=>data.sort((a, b) => {
  const nameA = a.asset.toUpperCase();
  const nameB = b.asset.toUpperCase();
  if (order==='desc') {
    if (nameA < nameB) {
    return -1; // If nameA comes before nameB, return a negative value
    }
    if (nameA > nameB) {
      return 1; // If nameA comes after nameB, return a positive value
    }
  } else {
    if (nameA < nameB) {
      return -1; // If nameA comes before nameB, return a negative value
    }
    if (nameA > nameB) {
      return 1; // If nameA comes after nameB, return a positive value
    }
  }
  
  return 0; // If both names are the same, return 0
});