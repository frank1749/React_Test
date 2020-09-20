import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Character } from './Character'

export class CharactersList extends Component {
  static propTypes = {
    characters: PropTypes.array
  }

  render () {
    const { characters } = this.props
    return (
        <div className="MoviesList">
        {
           characters.map(cha => {
            return (
              <div key={cha.id} className="MoviesList-item">
                <Character
                  id={cha.id}
                  image={cha.image}
                  name={cha.name}
                  status={cha.status}
                  species={cha.species}
                  gender={cha.gender}
                  origin={cha.origin}
                />
              </div>
              )
            })
          }
        </div>
    )
   }
 }
