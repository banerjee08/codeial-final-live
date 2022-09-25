export function getFormBody(params) {
    let formBody = [];

    for (let property in params) {
      // to convert 'user name' => 'user%20name'
      let encodedKey = encodeURIComponent(property);
      // to convert sumanto 123 => sumanto&2020123
        let encodedValue = encodeURIComponent(params[property]);
        
        formBody.push(encodedKey + '=' + encodedValue)
    }
    // to return something like 'username=sumanto&password=123123'
    return formBody.join('&');
}