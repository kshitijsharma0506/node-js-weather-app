const express=require('express');
const path=require('path');
const hbs=require('hbs');
const alert=require('alert');
//const staticfile=require('../public/index.html');

const app=express();
const port=3000;
const publicdirPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

//For dynamic page
//view engine
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);



///For static file use
//homepage, about & help
app.use(express.static(publicdirPath));


//For dynamic page using HBS
app.get('',(req,res)=>{
    res.render('index',{
        title:'Home Page of Weather App',
        name:"Kshitij"
    });
});



app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        imgURL:"/img/person.png",
        name:"Kshitij"
    });
});


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"This is a help page",
        helpline:"+91-917884414",
        email:"weatherapp@edu.com",
        name:"Kshitij"
    });
})


//weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send('Please enter a valid location');
    }

    geocode(req.query.address,(err,{latitude,longitude,placename}={})=>{
        if(err){
            return res.send(err);
        }
        
            forecast({latitude,longitude,placename},(err,result)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send([
                        {
                        forecast:result.forecast,
                        location:result.location,
                        temperature:result.temperature,
                        feelsLikeTemp:result.feelsLikeTemp
                        }
                    ]);
                }
            });

        
    });



});



//need to come last
app.get('*',(req,res)=>{
    res.send("Error : 404");
})

app.listen(port,()=>{
    console.log('It is running on port 3000');
})




