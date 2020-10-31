const tokenKey = "auth-tokens";
const userKey = "userName";
export function saveTokens(key) {
  removeTokens();
  localStorage.setItem(tokenKey, JSON.stringify(key));
}
export function getTokens() {
  return JSON.parse(localStorage.getItem(tokenKey));
}

export function removeTokens() {
  localStorage.removeItem(tokenKey);
}

export function saveUserToken(key) {
  removeUserToken();
  localStorage.setItem(userKey, JSON.stringify(key));
}

export function getUserToken() {
  return JSON.parse(localStorage.getItem(userKey));
}

export function removeUserToken() {
  localStorage.removeItem(userKey);
}
