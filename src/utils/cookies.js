import Cookies from 'js-cookie'

export default function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, val, option) {
  Cookies.set(key, val, option)
}

export function removeCookie (key, option) {
  Cookies.remove(key, option)
}

export function getAllCookies () {
  return Cookies.get()
}
