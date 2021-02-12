import { get } from './baseService'
export const characters = async (page,name) => {
    debugger
    return await get(`/characters?offset=${page*20}&name=${name}`)
    // sample output
    // "offset": 0,
    // "limit": 20,
    // "total": 1493,
    // "count": 20,
    // "results": []
}