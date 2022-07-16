import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000

const addresses = [{id: 1, value: 'Nometnu iela 13'}, {id: 2, value: 'Varsavas iela 10'}]
const products = [{id: 1 , title: 'apple'}, {id: 2, title: 'lemon'}]
const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
const stena = [
    {id: 1, color: 'orange'},
    {id: 2, color: 'white'},
    {id: 3, color: 'blue'},
    {id: 4, color: 'red'},
    {id: 5, color: 'pink'},
]
const pc = [
    {id: 1, value: 'ram'},
    {id: 2, value: 'hd'},
    {id: 3, value: 'cd'},
    {id: 4, value: 'processor'},
    {id: 5, value: 'videocard'},
]

const monitor = [
    {id: 1, title: 'philips'},
    {id: 2, title: 'samsung'},
    {id: 3, title: 'lg'},
    {id: 4, title: 'xiaomi'},
    {id: 5, title: 'benq'},
]
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(cors())



app.get('/', (req:Request,res:Response) => {
    let helloMessage = 'Hello IT-INCUBATOR.USA.LV!!!!!!'
    res.send(helloMessage)
})

app.get('/videos',(req:Request,res:Response) => {
    if(req.query.title) {
        let searchString = req.query.title.toString();
        res.send(videos.filter(v=>v.title.indexOf(searchString) > -1));
    }else{
        res.send(videos)
    }
})
app.get('/videos',(req:Request,res:Response) => {
    if(req.query.author) {
        let searchString = req.query.author.toString();
        res.send(videos.filter(v=>v.author.indexOf(searchString) > -1));
    }else{
        res.send(videos)
    }
})

app.get('/videos/:id',(req:Request,res:Response) => {
    let video = videos.find(v=>v.id === Number(req.params.id));
    if(video) {
        res.send(video);
    }else{
        res.send(404);
    }
})

app.get('/videos/:author',(req:Request,res:Response) => {
    let video = videos.find(v => v.author === req.params.author)
    if(video) {
        res.send(video)
    }else{
        res.send(404)
    }
})

app.get('/')

app.delete('/videos/:id',(req:Request,res:Response) => {
    for(let i=0; i<videos.length;i++) {
        if(videos[i].id === Number(req.params.id)) {
            videos.splice(i,1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

app.post('/videos',(req:Request,res:Response) => {
    const newVideo = {
        id: Number((new Date())),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})


app.put('videos/:id',(req:Request,res:Response) => {
    let video2 = videos.find(v=>v.id === Number(req.params.id));
    if(video2) {
        res.status(204).send(video2)
        video2.title === req.body.title;
        author:'it-incubator.eu'
    }else{
        res.send(404)
    }
})



app.get('/monitor',(req:Request,res:Response) => {
    if(req.query.title) {
        let searchString = req.query.title.toString()
        res.send(monitor.filter(m=>m.title.indexOf(searchString) > -1))
    }else{
        res.send(monitor)
    }
})


app.post('/monitor',(req:Request,res:Response) => {
    const newMonitor = {
        id: Number((new Date())),
        title: req.body.title

    }
    monitor.push(newMonitor)
    res.status(201).send(newMonitor)
})

app.get('/monitor/:id',(req:Request,res:Response) => {
    let monik = monitor.find(m=>m.id === Number(req.params.id))
    if(monik) {
        res.send(monik)
    }else{
        res.send(404)
    }
})


app.delete('/monitor/:id',(req:Request,res:Response) => {
    for(let i = 0;i<monitor.length;i++) {
        if(monitor[i].id === Number(req.params.id)) {
            monitor.splice(i, 1)
            res.status(204).send(monitor)
            return
        }
    }
    res.send(404)
})

app.get('/products', (req:Request,res:Response) => {
    if(req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(p=>p.title.indexOf(searchString) >-1))
    }else{
        res.send(products)
    }
})
app.post('/products', (req:Request,res:Response) => {
    const newProduct = {
        id: Number((new Date())),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

app.get('/products/:productsTitle',(req:Request,res:Response) => {
    let product = products.find(p=>p.title === req.params.productsTitle)
    if(product) {
        res.send(product)
    }else{
        res.send(404)
    }
})
app.get('/products/:id',(req:Request,res:Response) => {
    let product = products.find(p=>p.id === Number(req.params.id))
    if(product){
        res.send(product)
    }else{
        res.send(404)
    }
})

app.get('/addresses',(req:Request,res:Response) => {
    if(req.query.value) {
        let searchString = req.query.value.toString()
        res.send(addresses.filter(a => a.value.indexOf(searchString) > - 1))
    }else{
        res.send(addresses)
    }
})
app.post('/addresses',(req:Request,res:Response) => {
    const newAdress = {
        id: Number((new Date())),
        value: req.body.value
    }
    addresses.push(newAdress)
    res.status(201).send(newAdress)
})

app.get('/addresses/:id',(req:Request,res:Response) => {
    let address = addresses.find(a=>a.id === Number(req.params.id))
    if(address) {
        res.send(address)
    } else{
        res.send(404)
    }
})
app.delete('/addresses/:id',(req:Request,res:Response) => {
    for(let i = 0; i<addresses.length;i++) {
        if(addresses[i].id === Number(req.params.id)) {
            addresses.splice(i,1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.put('/addresses/:id',(req:Request,res:Response) => {
    let address = addresses.find(a=>a.id === Number(req.params.id))
    if(address) {
        address.value = req.body.value
        res.send(address)
    } else{
        res.send(404)
    }
})


app.get('/addresses/:adressesValue',(req:Request,res:Response) => {
    let address = addresses.find(a=>a.value === req.params.adressesValue)
    res.send(address)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})