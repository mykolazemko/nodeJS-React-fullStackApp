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

//DELETE
app.delete('/api:id', (req, res) => {
    console.log(req.params.id)
    STATE = STATE.filter(user => user.id !== req.params.id)
    res.status(200).json({message: "contact was deleted"})
})

app.listen(PORT, () => console.log('server started on PORT 4000...'))
