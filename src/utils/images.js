export const urlToFile = (url, filename, mimeType) => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getImageDimensions = (file) => {
  return new Promise(function (resolved) {
    var i = new Image();
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
};
