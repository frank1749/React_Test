import React, { Component } from 'react'

import { ButtonBackToHome } from '../components/ButtonBackToHome'


export class Detail extends Component {

  constructor() {
    super();
    this.state = {nom: '', tel: '', correo: '', result_arr: [], favorito: 1};

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  _goBack () {
    window.history.back()
  }

  _handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value })

  }
  handleDelete(event) {
    event.preventDefault()

    var id_item = localStorage.getItem('id_item');

    if(this.state.result_arr.length === 1 && id_item === null){
      alert('No hay contactos para eliminar.')
    }else{
      var conf = window.confirm("Desea eliminar contactos");
      if(conf){
        window.localStorage.clear();
        alert("Contactos eliminados");
        window.location.reload(false);
      }
    }
  }
  handleClick(event) {

    event.preventDefault()

      var id_item = localStorage.getItem('id_item');

      if(this.state.result_arr.length === 1 && id_item === null){
        alert('No hay contactos.')
      }else{
        var arr = this.state.result_arr;
        var nom= localStorage.getItem('nom'+id_item);
        var tel= localStorage.getItem('tel'+id_item);
        var co= localStorage.getItem('correo'+id_item);
        var fav= localStorage.getItem('favorito'+id_item);

        this.setState({nom, tel, co, arr, fav});
      }
    
  }
  _handleSubmit = (e) => {

    //e.preventDefault()
    var nom = this.state.nom;
    var tel = this.state.tel;
    var correo = this.state.correo;
    var favorito = this.state.favorito;

    if(nom === '' || tel === '' || correo === ''){
      alert('Complete los campos!!');
      return false;
    }

    var id_item = localStorage.getItem('id_item');

    if(id_item === null || id_item === ''){
      id_item = 0;
    }else{
      id_item++;
    }

    localStorage.setItem('id_item', id_item);

    localStorage.setItem('id_item'+id_item, id_item);
    localStorage.setItem('nom'+id_item, nom);
    localStorage.setItem('tel'+id_item, tel);
    localStorage.setItem('correo'+id_item, correo);
    localStorage.setItem('favorito'+id_item, favorito);

  }

  componentDidMount () {

    //localStorage.clear();

    var id_item = localStorage.getItem('id_item');

    for(var i=0; i<=id_item; i++) {

      Promise.all([localStorage.getItem('id_item'+i), 
      localStorage.getItem('nom'+i), 
      localStorage.getItem('tel'+i), 
      localStorage.getItem('correo'+i), 
      localStorage.getItem('favorito'+i)]).then(values => {

        this.state.result_arr.push({ id_item: values[0], 
            nom: values[1],
            tel: values[2],
            correo: values[3],
            favorito: values[4]
        });

      });

    }

    console.log('mmm ',this.state.result_arr);

    this.setState({ id_item });

    //localStorage.setItem('id_item', 2);
    // remove
    //localStorage.removeItem('fk');    
    // remove all
    
  }

  render() {

    return(
      <form onSubmit={this._handleSubmit} style={{textAlign: "left"}}>
        <div className="container">    
        <ButtonBackToHome />    

        <hr></hr>
        
        <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input 
                className="input" 
                onChange={this._handleChange} 
                name="nom" type="text" 
                placeholder="Nombre"
                required=""
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control">
              <input 
                className="input" 
                onChange={this._handleChange} 
                name="tel" 
                type="number" 
                placeholder="Teléfono"
                required=""
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Correo</label>
            <div className="control">
              <input 
                className="input" 
                onChange={this._handleChange}
                name="correo" 
                type="email" 
                placeholder="Correo"
                required=""
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Favorito</label>
            <div className="select">
                <select onChange={this._handleChange} name="favorito">
                  <option value="1">Si</option>
                  <option value="2">No</option>
                </select>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-info">
                Almacenar
              </button>
            </div>
            <div className="control">
              <hr></hr>
              <button onClick={this.handleClick} className="button is-info">
                Mostrar Contactos
              </button>
              <button onClick={this.handleDelete} className="button is-danger">
                Eliminar Contactos
              </button>
            </div>
          </div>

          <h3>Listado de contactos</h3>

          <div>
            <div className="table-container">
              <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Favorito</th>
                </tr>
              </thead>
              <tbody>
              {
              this.state.result_arr.map(res => {
                return (
                    <tr key={res.id_item}>

                      <td>{res.nom}</td>
                  
                      <td>{res.tel}</td>
                  
                      <td>{res.correo}</td>

                      <td> {res.favorito === '1' ? 'Si' : 'No'} </td>
                  
                    </tr>
                  )
                })
              }
              </tbody>
              </table>
            </div>
          </div>

      </div>

      </form>
    )
  }
}
