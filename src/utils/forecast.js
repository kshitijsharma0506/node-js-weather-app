const request=require('request');

const forecast=({latitude,longitude,placename},callback)=>{
    setTimeout(()=>{
        const url=`http://api.weatherstack.com/current?access_key=fe3197bf7e793d1ecae20bba599d6c17&query=${latitude},${longitude}`;

        request({url,json:true},(err,{body})=>{
                if(err){
                    callback('Unable to connect to weather services!',undefined);
                }
                else if(body.error){
                    callback('Unable to find location',undefined);
                }
                else{

                    callback(undefined,{
                        location:placename,
                        temperature:body.current.temperature,
                        feelsLikeTemp:body.current.feelslike,
                        forecast:body.current.weather_descriptions[0]});    
                }
        });
    },2000);
}
        

module.exports=forecast;