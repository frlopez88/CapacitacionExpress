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
        console.log("hay un error");
        console.log(error);
    } );

});



app.listen(8080);