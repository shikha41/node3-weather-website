
const request = require('postman-request')
// const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hpa2hhOTM0MCIsImEiOiJja2NyZDBxemQwem1pMnJ0NjRndmMwZGN1In0.4DLuBJjwTq6acjkXFuUUMA&limit=1'

// request({url:geocodeurl,json:true},(error,response)=>{
//     if(error){
//         console.log("error")
//     }
//     else if(response.body.features.length==0){
//         console.log("unable to find the location")
//     }
//     else{
//     const latitude=response.body.features[0].center[1]
//     const longitude=response.body.features[0].center[0]
//     console.log(latitude)
//     console.log(longitude)}
// })



const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpa2hhOTM0MCIsImEiOiJja2NyZDBxemQwem1pMnJ0NjRndmMwZGN1In0.4DLuBJjwTq6acjkXFuUUMA&limit=1'
    request({url:url,json:true},(error,{body})=>{
            if(error){
               callback('unable to connect to location service',undefined)
            }
            else if(body.features.length==0){
                callback('unable to find location. Try another search',undefined)
            }
            else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
        
}

module.exports=geocode