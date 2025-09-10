import express from 'express'

const app=express()

const port=3000

// app.get('/',(req,res)=>{
//     res.send("Hello from Dinesh Kumar reddy")
// })
// app.get('/ice-tea',(req,res)=>{
//     res.send("You have ordered ice-tea!")
// })
// app.get('/instagram',(req,res)=>{
//     res.send("Hey there opening instagram")
// })

app.use(express.json())

let teaData = []

let index = 1

//Add to tea data
app.post('/teas',(req,res)=>{
    const{name, price}=req.body
    const newTea = {id:index++,name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})
//List of tea data
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})
//get tea by id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})
//Update tea by id
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found")
    }
    const{name,price}=req.body
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea)
})
//Delete tea by id
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Tea not found")
    }
    teaData.splice(index,1)
    return res.status(204).send("Deleted")
})

app.listen(port,()=>{
    console.log(`Server is running at port:${port}...`)
})