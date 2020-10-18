process.env.PORT = process.env.PORT || 3333

/* Dependencias necesarias */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const morgan = require('morgan')

const app = express()

/* Middlewares */
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* Objeto para Conectar MYSQL */
const dataDB = {
    host: '34.123.220.71',
    user: 'pruebas-dev',
    password: 'pruebas-dev2020',
    database: 'fima_dev'
}

/* Creamos conexion a la DB */
const connection = mysql.createConnection(dataDB);

connection.connect((err) => {
    if (err) console.log("Error al conectar a la DB", err)

    console.log("Conectado a db", connection.threadId);

})


app.get('/', (request, response) => {
    return response.status(200).json({
        status: true,
        msg: "Bienvenido al api rest"
    })
})

app.get('/participantes', (request, response) => {


    connection.query(`CALL ListarParticipantes();`, function(err, res) {
        if (err) {
            return response.status(400).json({
                status: false,
                msg: `Error al consultar la información ${err}`
            })
        }

        const data = res[0]

        if (data.length == 0) {
            return response.status(400).json({
                status: true,
                data,
                msg: `No se encontraron resultados para el término: ${termino}`
            })
        }

        return response.status(200).json({
            status: true,
            data
        })
    })

})

app.post('/participantes', (request, response) => {

    const {
        nombre,
        paterno,
        materno,
        email,
        telefono,
        tipo,
        grado,
        institucion,
        tipo_institucion
    } = request.body;

    connection.query(`CALL GuardarParticipante('${nombre}','${paterno}','${materno}','${email}','${telefono}','${tipo}','${grado}','${institucion}','${tipo_institucion}');`,
        function(err, res) {
            if (err) {
                return response.status(400).json({
                    status: false,
                    msg: `Error al registrar participantes: ${err}`
                })
            }

            return response.status(200).json({
                status: true,
                data
            })
        })

})

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});