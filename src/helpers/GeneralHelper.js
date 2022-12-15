export const multipartFormBuilder = (object) =>{
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export const delay = ms => new Promise(res => setTimeout(res, ms));
