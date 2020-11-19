import getCookie, { setCookie, removeCookie } from './cookies'

const TOKEN_KEY = 'shop_web_admin_token'

export default function getToken () {
  return getCookie(TOKEN_KEY)
}

export function setToken (token) {
  return setCookie(TOKEN_KEY, token)
}

export function removeToken () {
  return removeCookie(TOKEN_KEY)
}
