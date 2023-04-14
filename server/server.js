const express = require("express")
const PORT = process.env.PORT || 4000
const app = express()
const {v4} = require("uuid")

let STATE = [
    {
        id: v4(),
        name: "Mykola"
    },
    {
        id: v4(),
        name: "Oksana"
    },
    {
        id: v4(),
        name: "Diana"
    }
]

app.use(express.json())

//GET
app.get('/api', (req, res) => {
    res.status(200).json(STATE)
})

//POST
app.post('/api', (req, res) => {
    const user = { id: v4(), name: req.body.user}
    STATE.push(user)
    res.status(201).json(user)
})

//UPDATE
app.put('/api/:id', (req, res) => {
    console.log(req.body)
    STATE.map(user => user.id === req.body.id ? user.name = req.body.name : user.name)
    res.status(200).json(req.body)
})

//DELETE
app.delete('/api/:id', (req, res) => {
    STATE.filter(user => user.id !== req.params.id)
    res.status(200).json(req.params.id)
})

app.listen(PORT, () => console.log('server started on PORT 4000...'))
