import moment from "moment";

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
    if (!x) return 0;

    if (typeof (x) == "number") {
        x = x.toFixed(2)
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const randomFixedInteger = (length) =>{
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

export const passwordMixGen = (length) =>{
    // get random 5 for start
    // get random 7 for middle
    // get random 9 for end

    // divide password into two

}


export const naiveReverse = (string) =>{
    return string.split('').reverse().join('');
}
export const compareDateInfo = (dateInfo, minutes) =>{
    console.log('this si sjdkjsjod', moment().isAfter(moment(dateInfo).add('minutes', minutes)))
    return moment().isAfter(moment(dateInfo).add('minutes', minutes));
}