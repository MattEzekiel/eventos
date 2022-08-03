export function validateEmail(email) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function fecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString();
}

export function dateTime(data) {
    const date = new Date(data);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

export function dateTimeLocal(data) {
    return data.toString().replace(' ','T');
}

export function previewImage(imagen) {
    return  URL.createObjectURL(imagen);
}

export function imageWorking(imagen) {
    return /\.(jpeg|jpg|png|gif)\b/i.test(imagen);
}

export function imgENV(imagen) {
    const env = process.env.NODE_ENV;
    if(env === "development") {
        // console.log("development")
        return imagen
    }
    else if (env === "production") {
        // console.log("production")
        return imagen?.replace('public/','')
    }
}