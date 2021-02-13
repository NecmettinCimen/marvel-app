import { get } from './baseService'
export const characters = async (page,nameStartsWith) => {
    var url = `/characters?offset=${page*20}&nameStartsWith=${(nameStartsWith||"")}`
    return await get(url)
    // sample output
    // "offset": 0,
    // "limit": 20,
    // "total": 1493,
    // "count": 20,
    // "results": []
}
export const characterdetailcomics = async (id) => {
    var url = `/characters/${id}/comics`
    return await get(url)
    // sample output
    // "offset": 0,
    // "limit": 20,
    // "total": 1493,
    // "count": 20,
    // "results": []
}