export const multipartFormBuilder = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
export const delay = ms => new Promise(res => setTimeout(res, ms));


export const downloadFile = (data, downloadName = 'raw_data.csv') => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', downloadName);
    document.body.appendChild(link);

    return link.click()
}


// Formats Numbers which are greater than three digits with necessary commas
export const numberFormatter = (x) => {
    if (!x) return;

    if (typeof (x) == "number") {
        x = x.toFixed(2)
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
