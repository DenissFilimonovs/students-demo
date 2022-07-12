import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT || 5000

const adresses = [{id: 1, value: 'Nometnu iela 13'}, {id: 2, value: 'Varsavas iela 10'}]
const products = [{id: 1, title: 'makaroni'}, {id:2, title: 'ketcup'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello INCUBATOR.EU.USA.LATVIA!!!!!'
    res.send(helloMessage)
})

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(p=>p.title.indexOf(searchString) > -1))
    }else {
        res.send(products)
    }

})
app.post('/products', (req: Request, res: Response) => {
        const newProduct = {
            id: +(new Date()),
            title: req.body.title
        }
        products.push(newProduct);
        res.status(201).send(newProduct)

})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if(product){
        res.send(product)
    }else{
        res.send(404)
    }
})
app.put('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if(product){
        product.title = req.body.title
        res.send(product)
    }else{
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for(let i = 0;i<products.length;i++){
        if(products[i].id === +req.params.id) {
            products.splice(i,1);
            res.send(204);
            return;
        }
    }
    res.send(404);
})
app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})