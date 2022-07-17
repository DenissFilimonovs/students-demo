import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000
/*
const addresses = [{id: 1, value: 'Nometnu iela 13'}, {id: 2, value: 'Varsavas iela 10'}]
const products = [{id: 1 , title: 'apple'}, {id: 2, title: 'lemon'}]*/
let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(cors())



app.get('/', (req:Request,res:Response) => {
    let helloMessage = 'Hello IT-INCUBATOR.USA.LV!!!!!!'
    res.send(helloMessage)
})
/*
app.get('/videos',(req:Request,res:Response) => {
    res.send(videos)
})

app.get('/videos/:videoId',(req:Request,res:Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v=>v.id === id)
    if(video) {
        res.send(video);
    }else{
        res.send(404);
    }
})
/*
app.get('/videos/:author',(req:Request,res:Response) => {
    let video = videos.find(v => v.author === req.params.author)
    if(video) {
        res.send(video)
    }else{
        res.send(404)
    }
})*/
/*app.get('/videos/:title',(req:Request,res:Response) => {

    let video = videos.find(v => v.title === req.params.title)
    if(video) {
        res.send(video)
    }else{
        res.send(404)
    }
})
*/
/*
app.delete('/videos/:videoId',(req:Request,res:Response) => {
    const id = +req.params.videoId;
    const newVideos = videos.filter(v=>v.id !== id)
    if(newVideos.length<videos.length) {
        res.send(204)
    }else{
        res.send(404)
    }
})

app.post('/videos',(req:Request,res:Response) => {
    let title = req.body.title;
    if(!title || typeof title !== 'string' || !title.trim() || title.length>40) {
        res.status(400).send({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }],
            resultCode: 1

        return;
    }
    const newVideo = {
        id: Number(new Date()),
        title: title,
        author:'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})


app.put('videos/:videoId',(req:Request,res:Response) => {
    let title = req.body.title;
    if(!title || typeof title !== 'string' || !title.trim() || title.length>40) {
        res.status(400).send({
            errorsMessages: [{
                'message': "Incorrect title",
                'field': "title"
            }],
            resultCode: 1
        })
        return;
    }
    const id = Number(req.params.videoId)
    const video = videos.find(v=>v.id === id)
    if(video) {
        video.title = title;
        res.status(204).send(video)
    }else{
        res.send(400)
    }
})
*/
app.delete('/videos/:videoId',(req:Request,res:Response) => {
    const id = +req.params.videoId
    const newVideos = videos.filter(v=>v.id !== id)
    if(newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    }else{
        res.send(404)
    }
})

app.get('/videos', (req:Request,res:Response) => {
    res.send(videos)
})
app.post('/videos', (req:Request,res:Response) => {
    let title = req.body.title;
    if(!title || typeof title !== 'string' || !title.trim() || title.length>40) {
        res.status(400).send({
            errorsMessages: [{
                'message': 'Incorrect title',
                'field': 'title'
            }]

        })
        return;
    }
    const newVideo = {
        id: Number(new Date()),
        title: title,
        author:'it-incubator.eu'
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
/*
app.get('/videos/:productsTitle',(req:Request,res:Response) => {
    let video = videos.find(p=>p.title === req.params.productsTitle)
    if(video) {
        res.send(video)
    }else{
        res.send(404)
    }
})*/
app.get('/videos/:videoId',(req:Request,res:Response) => {
    const id = +req.params.videoId
    const video = videos.find(v=>v.id===id)
    if(video){
        res.status(200).send(video)
    }else{
        res.send(404)
    }
})

app.put('/videos/:id',(req:Request,res:Response) => {
    let title = req.body.title
    if(!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(404).send({
            errorsMessages: [{
                message: 'Incorrect title',
                field: 'title'
            }]

        })
        return
    }
    const id = +req.params.videoId;
    const video = videos.find(v=>v.id === id)
    if(video) {
        video.title = title
        res.status(204).send(video)
    }else {
        res.send(404)
    }
})
/*
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
    if(address) {
        res.send(address)
    }else{
        res.send(404)
    }
})
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})