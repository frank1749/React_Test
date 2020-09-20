import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import { Link } from 'react-router-dom'

export class Character extends Component {

  static propTypes = {
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    gender: PropTypes.string,
    origin: PropTypes.object
  }

  render () {
    const { image, name, status, species, gender, origin } = this.props
   
    return(
      <div className="card">

        <div className="card-image">
        <p className="title is-4">Nombre: { name }</p>
        <p className="subtitle is-5">Estado: { status }</p>
          <figure className="image">
            <img
              src={ image }
              alt={ name }
            />
          </figure>
        </div>

        <div className="card-content">

          <div className="media">
            <div className="media-content">
              <p><strong>Especie:</strong> { species }</p>
              <p><strong>Genero:</strong> { gender }</p>
              <p><strong>Origen:</strong> { origin.name } - { origin.url }</p>
              <hr></hr>
            </div>
          </div>

        </div>

      </div>
    )
  }

}
