const path = require('path')
const express= require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__filename)
console.log(__dirname)
console.log(path.join(__dirname,'../public'))


//define path for express configure
const publicDirPath = path.join(__dirname,'../public')

const viewsPath=path.join(__dirname,'../templates/views')

const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
// it takes a path to the directory where ur partials live
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirPath))//configure the express application
 


// app.get('',(req,res)=>{
//     res.send('hello express')
// })//what the server should do when someone try to access the resource at the url 

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Shikha'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Shikha'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'Shikha'
    })
})
// app.com
//app.com/help
//app.com/about
// app.get('/help',(req,res)=>{
//     res.send('<h1>help page</h1>')
// })
// app.get('/about',(req,res)=>{
//     res.send([{
//         name: 'shikha',
//         age:22
//     },{
//         name:'harry',
//         age:22
//     }])
// })
// app.get('/weather',(req,res)=>{
//     res.send([{
//        latitude:0,
//        longitude:0
//     },{
//         weather:'cloudy',
//     }])
// })
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shikha',
        errorMessage:'help article not found'
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req)
    res.send({
        product:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you musr provide the address"
        })
    } 
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdat)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdat,
                location,
                address:req.query.address
            })
        })
    })
    // console.log(req)
    // res.send({
    //     forecast:'it is raining',
    //     location:'gwalior',
    //     address:req.query.address
    // })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shikha',
        errorMessage:'page not found'
    })
})
app.listen(3000,()=>{
    console.log('server started')
})


