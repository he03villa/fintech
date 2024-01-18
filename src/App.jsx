import { useEffect, useState } from 'react';
import { deleteMarke, getAll, saveMarke, updateMarke } from './service/marke';
import $ from 'jquery';
import './App.css';
import { Alert, validarCorreo, validarText } from './service/service';

function App() {
  const [arrayMarke, SetArrayMarke] = useState([]);
  const [optionEditar, SetOptionEditar] = useState(false);
  const [marke, SetMarke] = useState('');

  const cargarMarkes = async () => {
    const res = await getAll();
    const array = res._embedded.students;
    SetArrayMarke(array);
  }

  const limpiarCampos = () => {
    $("#firtname").val('');
    $("#lastname").val('');
    $("#email").val('');
  }

  const save = async (e) => {
    e.preventDefault();
    if (validar()) {
      const firtname = $("#firtname").val();
      const lastname = $("#lastname").val();
      const email = $("#email").val();
      const data = {
        firtname,
        lastname,
        email
      }
      const res = await saveMarke(data);
      console.log(res);
      limpiarCampos();
      cargarMarkes();
    }
  }

  const editar = (e, data) => {
    e.preventDefault();
    $("#firtname").val(data.firtname);
    $("#lastname").val(data.lastname);
    $("#email").val(data.email);
    console.log(data._links.student.href);
    SetMarke(data._links.student.href);
    SetOptionEditar(true);
  }

  const update = async (e) => {
    e.preventDefault();
    if (validar()) {
      const firtname = $("#firtname").val();
      const lastname = $("#lastname").val();
      const email = $("#email").val();
      const data = {
        firtname,
        lastname,
        email
      }
      console.log(data, marke);
      const res = await updateMarke(data, marke);
      console.log(res);
      SetMarke('');
      SetOptionEditar(false);
      limpiarCampos();
      cargarMarkes();
    }
  }

  const eliminar = async (e, data) => {
    e.preventDefault();
    console.log(data);
    await deleteMarke(data._links.student.href);
    cargarMarkes();
  }

  const validar = () => {
    if (!validarText($("#firtname").val())) {
      Alert('warning', '', 'El primer nombre es obligatorio', 'Aceptar');
      return false;
    }
    if (!validarText($("#lastname").val())) {
      Alert('warning', '', 'El primer segundo es obligatorio', 'Aceptar');
      return false;
    }
    if (!validarText($("#email").val())) {
      Alert('warning', '', 'El email es obligatorio', 'Aceptar');
      return false;
    }
    if (!validarCorreo($("#email").val())) {
      Alert('warning', '', 'El email no tien el formato de email', 'Aceptar');
      return false;
    }
    return true;
  }

  useEffect(() => {
    cargarMarkes();
  }, []);
  return (
    <div className="App container">
      <div className="card">
        <div className="card-header">
          <label htmlFor="">Crear una Marker</label>
        </div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-auto">
              <label htmlFor="firtname" className="visually-hidden">Primer nombre</label>
              <input type="text" className="form-control" id="firtname" placeholder="Primer nombre"/>
            </div>
            <div className="col-auto">
              <label htmlFor="lastname" className="visually-hidden">Segundo nombre</label>
              <input type="text" className="form-control" id="lastname" placeholder="Segundo nombre"/>
            </div>
            <div className="col-auto">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Email"/>
            </div>
            <div className="col-auto">
              <button className="btn btn-success mb-3" onClick={(e) => !optionEditar ? save(e) : update(e)}>{ !optionEditar ? 'Guardar' : 'Actualizar' }</button>
            </div>
          </form>
        </div>
      </div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Primer nombre</th>
            <th>Segundo nombre</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            arrayMarke.map((marke, indice) => {
              return <tr key={indice}>
                <td>{marke.firtname}</td>
                <td>{marke.lastname}</td>
                <td>{marke.email}</td>
                <td>
                  <button className='btn btn-primary' onClick={(e) => editar(e, marke)}>Editar</button>
                  <button className='btn btn-danger' onClick={(e) => eliminar(e, marke)}>Borrar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
