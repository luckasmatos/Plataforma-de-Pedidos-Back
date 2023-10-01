const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())


const order = []

const middlewareCheckuserId = (request, response, next) => {

    const {id} = request.params 

    const index = order.findIndex(order => order.id === id) 
    if (index < 0) { 
        return response.status(404).json({message: "Order not found!"}) 
    }

    request.orderIndex = index 
    request.orderId = id 
    next()
}

app.get('/order', (request, response) => { 

    return response.json(order) 
})

app.post('/order', (request, response) => { 

    const {item, name} = request.body 
    const demand = {id: uuid.v4(), item, name} 
    order.push(demand) 

    return response.status(201).json(demand) 
})

app.delete('/order/:id', middlewareCheckuserId, (request, response) => { 

    const index = request.orderIndex
    order.splice(index,1) 

    return response.status(204).json() 
})

app.listen(port, () => { 
    console.log(`Server started on port ${port}`) 
})