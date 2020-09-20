import React, { Component } from 'react'

import { Title } from '../components/Title'
import { SearchForm } from '../components/SearchForm'
import { CharactersList } from '../components/CharactersList'

import { GoContacts } from '../components/GoContacts'

export class Home extends Component {

  state = {usedSearch:false, results: [] }

  _handleResults = (results) => {
    this.setState({ results, usedSearch:true })
  }

  _renderResults = () => {
    return this.state.results.length === 0
      ? <p>Sorry! Data Not Found.</p>
      : <CharactersList characters = {this.state.results} />
  }

  render() {
    console.log(this.state.results);
    return(
      <div>
        <GoContacts />
        <hr></hr> 
        <Title>Search Characters</Title>
        <div className="SearchForm-wrapper">
          <SearchForm onResults={this._handleResults} />
        </div>
        { this.state.usedSearch
          ? this._renderResults()
          : <small> Use the form to search a movie </small>
        }
      </div>
    )
  }
}
