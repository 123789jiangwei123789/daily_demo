const jsonp = ({ url, params, callbackName }) => {
    //生成url
    console.log(url, callbackName);
    const generateUrl = () => {
        let dataSrc = "";
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`

    }
    //返回promise
    return new Promise((resolve, reject) => {
        let scriptEle = document.createElement('script');
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = (data) => {
            resolve(data);
            document.body.removeChild(scriptEle)
        }
    })
}