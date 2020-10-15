function xhrRequest(options) {
  return new Promise((resolve, reject) => {
    try {
      const {
        url,
        method,
        body,
        headers,
        eventHandlers,
        uploadEventHandlers,
        responseType = '',
      } = options;
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType;
      if (eventHandlers) {
        Object.entries(eventHandlers).forEach(([event, handler]) => {
          xhr.addEventListener(event, handler);
        });
      }
      if (uploadEventHandlers) {
        Object.entries(uploadEventHandlers).forEach(([event, handler]) => {
          xhr.upload.addEventListener(event, handler);
        });
      }
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      });
      xhr.open(method, url);
      // set headers
      if (headers) {
        Object.entries(headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      }
      xhr.send(body);
    } catch (error) {
      reject(error);
    }
  });
}
