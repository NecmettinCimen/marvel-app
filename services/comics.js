import { get } from './baseService'
export const comics = async (page,titleStartsWith) => {
    var url = `/comics?offset=${page*20}&titleStartsWith=${(titleStartsWith||"")}`
    return await get(url)
    // sample output
    // "offset": 0,
    // "limit": 20,
    // "total": 1493,
    // "count": 20,
    // "results": []
}
export const comicsdetailcharacter = async (id) => {
    var url = `/comics/${id}/characters`
    return await get(url)
    // sample output
    // "offset": 0,
    // "limit": 20,
    // "total": 1493,
    // "count": 20,
    // "results": []
}