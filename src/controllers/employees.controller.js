import { pool } from "../db.js";

export const getEmployees = async (req, res)=>{
    try{
        // throw new Error('error')
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: "something goes wrong"
        }) 
    }

};

// obtener empleado por id
export const getEmployee = async(req, res)=>{
    // console.log(req.params)
    try{
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

        // si no existe id retornar error 404
        if(rows.length <= 0) return res.status(404).json({message: "Employee not found"})
    
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message:"something goes wrong"
        })
    }

};

export const createEmployees = async (req, res)=> {
    const {names, salary} = req.body
    try{
    
        const [rows] = await pool.query('INSERT INTO employee (names, salary) VALUES (?, ?)', [names, salary])
        // console.log(req.body);
        // se coloca rows entre llaves para que devuelva un objeto JSON
        res.send({
            id: rows.insertId,
            names,
            salary
        });
    }catch(error){
        return res.status(500).json({
            message:"something goes wrong"
        })
    }

};

export const updateEmployees = async (req, res)=> {
    
    // extraer id
    const {id} = req.params
    const{names, salary} = req.body
    try{

        const [result] = await pool.query('UPDATE employee SET names = IFNULL(?, names), salary = IFNULL(?, salary) WHERE id = ?', [names, salary,id])
        
        if(result.affectedRows === 0) return res.status(404).json({message: "Employee not found"})

        // consulta con los datos actualizados
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])

    }catch(error){
        return res.status(500).json({
            message: "something goes wrong"
        })
    }

};


export const deleteEmployees = async (req, res)=>{
    try{
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

        if(result.affectedRows <=0) return res.status(404).json({message: "Employee not found"})
        
        // console.log(result)
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message:"somthing goes wrong"
        })
    }

};