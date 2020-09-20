import React, { Component } from 'react'

export class SearchForm extends Component {

  constructor() {
    super();
    this.state = {select: 'name', param: '', search: false};

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value })

  }
  handleClick(event) {
    this.setState({ search : true });
  }
  _handleSubmit = (e) => {
    e.preventDefault()
    var url = '';

    var select = this.state.select;
    var param = this.state.param;

    if(this.state.search){
      url = 'https://rickandmortyapi.com/api/character/?'+select+'='+param;
    }else{
      url = 'https://rickandmortyapi.com/api/character/?page=20';
    }

    fetch(url)
    .then(res => res.json())
    .then(resu => {
      console.log('Array fk', resu)
      const { results = [] } = resu
      console.log({ results })
      this.props.onResults(results)
      
    })
  }

  render() {
    window.addEventListener('load', this._handleSubmit);
    return(
      <form onSubmit={this._handleSubmit}>
        <div className="field has-addons">

          <div className="field">            
            <div className="control">

              <div className="select">
                <select onChange={this._handleChange} name="select">
                  <option value="name">Nombre</option>
                  <option value="status">Estado</option>
                  <option value="species">Especie</option>
                  <option value="gender">Género</option>
                </select>
              </div>

            </div>
          </div>

            <div className="field">
              <div className="control">
                <input
                  name="param"
                  className="input"
                  onChange={this._handleChange}
                  type="text"
                  placeholder="Data to search.."/>
              </div>
            </div>

          <div className="field">
            <div className="control">
              <button onClick={this.handleClick} className="button is-info">
                Search
              </button>
            </div>
          </div>

        </div>
      </form>
    )
  }
}
