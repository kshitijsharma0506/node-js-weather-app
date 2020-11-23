const request=require('request');

// mapbox api
const geocode=(location,callback)=>{
    setTimeout(()=>{
        const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoia3NoaXRpamt1bWFyIiwiYSI6ImNraGx5OGZhODJoZ3gyc2w2cW52YWN3cmcifQ.1fEXRU9OUIkiEyLh2n0E9g&limit=1`;

        request({url,json:true},(err,{body})=>{
                if(err){
                    callback("ERROR: Unable to connect to Connect to services!",undefined);
                }
                else if(body.features.length===0){
                    callback(`Location is ${body.message}`,undefined);
                }
            
                else{
                    callback(undefined,{
                        latitude:body.features[0].center[1],
                        longitude:body.features[0].center[0],
                        placename:body.features[0].place_name
                    });
                }
        });

    },2000);
};


module.exports=geocode;