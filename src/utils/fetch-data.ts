// This is the conversion of the original source code to TS using promises and XMLHttpRequest
// It is marked as legacy code because it uses the XMLHttpRequest object which is deprecated in modern web development

import { XMLHttpRequest } from 'xmlhttprequest'
const XHR = new XMLHttpRequest();

/**
 * Legacy code that fetches data from an API
 */
export const fetchData = (API_URL: string) => new Promise((resolve, reject) => {
  XHR.onreadystatechange = function (e: any) {
    console.log(XHR)
    if (XHR.readyState === 4) {
      if (XHR.status === 200) {
        return resolve(JSON.parse(XHR.responseText));
      } else {
        return reject(API_URL);
      }
    }
    else return reject(API_URL);
  };
  XHR.open('GET', API_URL, false);
  XHR.send();
});
