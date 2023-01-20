import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'react-data-table-component'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

function ReporteUsuarios(){

    const [usuarios, setUsuarios] = useState([])
    let usuariosFormato = []

    const usuariosFetch = () => {
        const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
        results
          .then(response => response.json())
          .then(data => {
            console.log('Usuarios fetch: ', data)
            //setUsuarios(data)
            formatoDatos(data)
          })
    }

    const peticionUsuarios = () => {
        axios.get('https://api-www-5c6w.onrender.com/api/users/').then(response => {
            setUsuarios({data: response.data})
            console.log('Usuarios: ', usuarios)
        }).catch(error => {
          console.log(error.message)
        })
    }

    const formatoRol = (rolU) => {
        if (rolU === 'administrator'){
            return 'Administrador'
        }
        if (rolU === 'assistant'){
            return 'Asistente'
        }
        if (rolU === 'client'){
            return 'Cliente'
        }
    }

    const formatoDatos = (arregloU) => {
        arregloU.map(usuario => {
            usuariosFormato.push({
                name: usuario.name,
                email: usuario.email,
                role: formatoRol( usuario.role ),
                is_active: (usuario.is_active ? 'Activo' : 'Inactivo')
            })
        })
        setUsuarios(usuariosFormato)
        console.log('usuariosFormato: ', usuariosFormato)
    }

    const data = [
        {name:"Luisa", email:"luisa@correo.com", role:"client", is_active: true}
    ]

    const columnas =[
        {
            name: "Nombre",
            selector: 'name',
            sortable: true,
            grow: 5
        },
        {
            name: "Correo",
            selector: 'email',
            sortable: true,
            grow: 5
        },
        {
            name: "Rol",
            selector: 'role',
            sortable: true,
            grow: 2
        },
        {
            name: "Estado",
            selector: 'is_active',
            sortable: true,
            grow: 2
        }
    ]

    const paginacion = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }
    useEffect( () => {
        //peticionUsuarios(),
        usuariosFetch()
    }, [])
    
    return(
        <div className='table-responsive'>
            <DataTable 
                columns={columnas}
                data={usuarios}
                title="Listado de usuarios"
                pagination
                paginationComponentOptions={paginacion}
                fixedHeader
            />
        </div>
    )
}

export default ReporteUsuarios