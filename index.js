const express = require('express');
const app = express();
const db = require ('./db');

app.use(express.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.get('/api/tbl_hola_mundo/',   (req, res)=>{
    db.any('select * from bicc.tbl_hola_mundo_frlopez')
    .then ( (rows) =>{

        res.json(rows);
    } )
    .catch((error) =>{
        console.log(error);
    } );

});

app.post('/api/tbl_hola_mundo/',  async (req, res)=>{
    
    const valoresQuery = [
            req.body.descripcion, 
            req.body.fecha_creacion, 
            req.body.isactive]; 

    let sqltmp = " insert into bicc.tbl_hola_mundo_frlopez "+
                 " (id, descripcion, fecha_creacion, isactive) " +
                 " values "+
                 " ( public.uuid_generate_v1() , $1, $2, $3 ) RETURNING id ";

    db.one(sqltmp, valoresQuery, event => event.id)
    .then ( data =>{
        const objInserted = { id : data, 
                              descripcion :  req.body.descripcion,  
                              fecha_creacion :  req.body.fecha_creacion, 
                              isactive: req.body.isactive };
        res.json(objInserted);
    } )
    .catch((error) =>{
        res.json(error);
    } );

});


app.put('/api/tbl_hola_mundo/:id',  async (req, res)=>{
    
    const valoresQuery = [
            req.body.descripcion, 
            req.body.fecha_creacion, 
            req.body.isactive, 
            req.params.id
        ]; 

    console.log(valoresQuery);

    let sqltmp = " update bicc.tbl_hola_mundo_frlopez "+
                 " set descripcion = $1, fecha_creacion = $2, isactive = $3 "+
                 " where id = $4 ";

    db.result(sqltmp, valoresQuery, r=> r.rowCount)
    .then ( data =>{
        const objectModified = { id : req.params.id, 
                              affectedRows: data };
        res.json(objectModified
            );
    } )
    .catch((error) =>{
        
        res.json(error);
    } );

});

app.delete('/api/tbl_hola_mundo/:id',  async (req, res)=>{
    
    const valoresQuery = [
            req.params.id
        ]; 

    console.log(valoresQuery);

    let sqltmp = " delete from bicc.tbl_hola_mundo_frlopez "+
                 " where id = $1 ";

    db.result(sqltmp, valoresQuery, r=> r.rowCount)
    .then ( data =>{
        const objectModified = { id : req.params.id, 
                              affectedRows: data };
        res.json(objectModified);
    } )
    .catch((error) =>{
        
        res.json(error);
    } );

});


app.listen(8080);