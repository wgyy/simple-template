import Cookies from 'js-cookie'

const TokenKey = 'websiteToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const millisecond = new Date().getTime()
  const expiresTime = new Date(millisecond + 60 * 1000 * 60 * 10)
  return Cookies.set(TokenKey, token, { expires: expiresTime, domain: GetCookieDomain() })
}

export function removeToken() {
  return Cookies.remove(TokenKey, { domain: GetCookieDomain() })
}

function GetCookieDomain() {
  var host = location.hostname
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (ip.test(host) === true || host === 'localhost') return host
  var regex = /([^]*).*/
  var match = host.match(regex)
  if (typeof match !== 'undefined' && match !== null) host = match[1]
  if (typeof host !== 'undefined' && host !== null) {
    var strAry = host.split('.')
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1]
    }
  }
  return '.' + host
}
