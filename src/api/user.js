import request from '@/utils/request'
import qs from 'qs'
import { getToken } from '@/utils/auth' // get token from cookie
export function register(data) {
  return request.post('/base/api/zlcp/user/register', data)
}

export function login(data) {
  return request({
    url: '/auth/login/token',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/auth/current/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/logout/token',
    data: qs.stringify({ token: getToken() }),
    method: 'post',
    purpose: 'logout'
  })
}

export function getSms(phone) {
  return request({
    url: '/auth/user/registerSms',
    method: 'post',
    data: qs.stringify(phone)
  })
}

export function resetPassword(data) {
  return request.post('/base/api/zlcp/user/resetPassword', data)
}
