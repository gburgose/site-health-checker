// src/index.js

export function checkSiteHealth () {
  return detectAdBlock().then((adBlockDetected) => {
    const result = {
      hasError: false,
      errorDetails: []
    }

    if (adBlockDetected) {
      result.hasError = true
      result.errorDetails.push({
        type: 'adblock',
        message: 'Se detectó AdBlock.'
      })
    }

    const cookiesEnabled = areCookiesEnabled()
    if (!cookiesEnabled) {
      result.hasError = true
      result.errorDetails.push({
        type: 'cookies',
        message: 'Las cookies están desactivadas.'
      })
    }

    const localStorageAvailable = isLocalStorageAvailable()
    if (!localStorageAvailable) {
      result.hasError = true
      result.errorDetails.push({
        type: 'localstorage',
        message: 'LocalStorage no está disponible.'
      })
    }

    return result
  })
}

function detectAdBlock () {
  return new Promise((resolve) => {
    const adBanner = document.createElement('div')
    adBanner.className = 'ad-banner'
    adBanner.style.width = '1px'
    adBanner.style.height = '1px'
    adBanner.style.position = 'absolute'
    adBanner.style.left = '-9999px'
    document.body.appendChild(adBanner)

    if (adBanner.offsetParent === null) {
      resolve(true)
      document.body.removeChild(adBanner)
      return
    }

    const adScript = document.createElement('script')
    adScript.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    adScript.onerror = () => resolve(true)
    adScript.onload = () => resolve(false)
    document.body.appendChild(adScript)
  })
}

function areCookiesEnabled () {
  document.cookie = 'testCookieEnabled=1'
  const cookieEnabled = document.cookie.indexOf('testCookieEnabled') !== -1
  document.cookie =
    'testCookieEnabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  return cookieEnabled
}

function isLocalStorageAvailable () {
  try {
    const testKey = 'testKey'
    const storage = window.localStorage
    storage.setItem(testKey, 'testValue')
    const isAvailable = storage.getItem(testKey) === 'testValue'
    storage.removeItem(testKey)
    return isAvailable
  } catch (e) {
    return false
  }
}
