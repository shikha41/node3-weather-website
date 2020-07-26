const request=require('postman-request')

// const request = require('postman-request')
//  const geocode=require('./geocode')

// const url ="http://api.weatherstack.com/current?access_key=5ba41b8520abc609f84be6446c8a9b9f&query=37.8267,-122.4233&units=f"

// request({url:url,json:true},(error,response)=>{
//  if(error){
//      console.log("error")
//  }
//  else if(response.body.error){
//      console.log("unable to find the location");
//  }
//  else{
//  console.log("it is currently "+response.body.current.temperature+" degree out.It feels like "+response.body.current.feelslike+" degree out.")}
// })

const forecast=(latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=5ba41b8520abc609f84be6446c8a9b9f&query="+latitude+','+longitude
    request({url:url,json:true},(error,{body})=>{
         if(error){
             callback('unable to find the weather services',undefined)
         }
         else if(body.error){
             callback('unable to find the weather for this location',undefined)
         }
         else{
        callback(undefined,'It is '+body.current.temperature+" degree out.It feels like "+body.current.feelslike+" degree out.")}
        })
        
}

module.exports=forecast