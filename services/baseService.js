const baseUrl = 'http://10.10.1.10/v1/public'
export const get = async (url) => {
    try {
        var fullUrl = `${baseUrl}${url}`
        console.log(fullUrl)
        var req = await fetch(fullUrl)
        console.log("req.status",req.status)
        var json = await req.json()
        console.log("json.code",json.code)
        return json.data
    } catch (error) {
        console.log(error)
        return { results: [], error: true }
    }
}
    // sample reslt
    // "code": 200,
    // "status": "Ok",
    // "copyright": "© 2021 MARVEL",
    // "attributionText": "Data provided by Marvel. © 2021 MARVEL",
    // "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>",
    // "etag": "286cd21ce2807e744dd9339578ba1f66367d6514",
    // "data": ...