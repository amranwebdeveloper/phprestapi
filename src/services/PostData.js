export function PostData(type, userData, dataType = 'json_string') {
  let BaseURL = 'http://localhost:8080/phprestapi/api/';
  //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';

  let formData = '';
  if (dataType == 'formData') {
    formData = userData;
  } else if (dataType == 'json_string') {
    formData = JSON.stringify(userData);
  }
  return new Promise((resolve, reject) => {


    fetch(BaseURL + type, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}