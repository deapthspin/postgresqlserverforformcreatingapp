const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("./db")

app.use(cors())
app.use(express.json())




app.post('/forms', async (req,res) => {
    try {
        const {title} = req.body
        const newProduct = await pool.query("INSERT INTO program (title) VALUES($1) RETURNING *", [title])
        console.log(title)
        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err)
    }
})

app.get('/forms', async(req,res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM program")
        res.json(allProducts.rows)
    } catch (err) {
        console.error(err)
    }
})

app.get("/forms/:id", async(req,res) => {
    try {
       const { id } = req.params
       const product = await pool.query("SELECT * FROM program WHERE form_id = $1", [id])
       res.json(product.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.put('/forms/:id', async(req,res) => {
    try {
        const {id} = req.params
        const {title} = req.body
        const updateProduct = await pool.query("UPDATE program SET title = $1 WHERE form_id = $2", [title, id])
        res.json('form was updated')
    } catch (err) {
        console.error(err.message)
    }
    
})

app.delete('/forms/:id', async(req,res) => {
    try {
        const {id} = req.params
        const updateProduct = await pool.query("DELETE FROM program WHERE form_id = $1", [id])
        res.json('form was deleted')
    } catch (err) {
        console.error(err.message)
    }
    
})

app.delete('/everything', async(req,res) => {
    try {
        
        const cleared = await pool.query("TRUNCATE program, question, response")
        res.json('cleared')
        
    } catch (err) {
        console.error(err.message)
    }
    
})


app.post('/forms/:id/questions', async (req,res) => {
    try {
        const {question, questionId} = req.body
        console.log(req.body)
        const {id} = req.params
        console.log(id, ' id here ??')
        const newProduct = await pool.query("INSERT INTO question (question, formId, question_id) VALUES($1, $2, $3) RETURNING *", [question, id, questionId])

        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err)
    }
})

app.get('/questions', async(req,res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM question")
        res.json(allProducts.rows)
    } catch (err) {
        console.error(err)
    }
})


app.put('/questions/:formid/:qid', async(req,res) => {
    try {
        const {qid, formid} = req.params
        const {question} = req.body
        const updateProduct = await pool.query("UPDATE question SET question = $1 WHERE formid = $3 AND question_id = $2", [question, qid, formid])
        res.json(question)
    } catch (err) {
        console.error(err.message)
    }
    
})

app.get('/questions/:formid/:qid', async(req,res) => {
    try {
        const {qid, formid} = req.params
        const question = await pool.query("SELECT * FROM question WHERE formid = $1 AND question_id = $2", [formid, qid])
        res.json(question.rows)
    } catch (err) {
        console.error(err.message)
    }
    
})

app.get('/questions/:formid', async(req,res) => {
    try {
        const {formid} = req.params
        const question = await pool.query("SELECT * FROM question WHERE formid = $1 ORDER BY question_id ASC", [formid])
        res.json(question.rows)
    } catch (err) {
        console.error(err.message)
    }
    
})

app.get('/responses/:formid/:qid', async(req,res) => {
    try {
        const {formid, qid} = req.params
       
        const allProducts = await pool.query("SELECT * FROM response WHERE formid = $1 AND questionnum = $2", [formid, qid])
        res.json(allProducts.rows)
    } catch (err) {
        console.error(err.message)
    }
    
})

app.get('/responses/:formid', async(req,res) => {
    try {
        const {formid} = req.params
       
        const allProducts = await pool.query("SELECT * FROM response WHERE formid = $1", [formid])
        res.json(allProducts.rows)
    } catch (err) {
        console.error(err.message)
    }
    
})

app.post('/forms/:id/responses', async (req,res) => {
    try {
        const {response, questionnum} = req.body
        console.log(req.body)
        const {id} = req.params
        const newProduct = await pool.query("INSERT INTO response (formId, response, questionNum) VALUES($1, $2, $3) RETURNING *", [ id, response, questionnum])

        res.json(newProduct.rows[0])
    } catch (err) {
        console.error(err)
    }
})

app.get('/responses', async(req,res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM response")
        res.json(allProducts.rows)
    } catch (err) {
        console.error(err)
    }
})


app.listen(6969)