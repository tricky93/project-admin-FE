import React, { Component } from 'react';
import { dbgames } from '../firebase';
import { Link } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import Header from './Header';

//TODO: change the map function in render to a reduce. Use filterTerm in state to render the datea conditionally and then use componentDidUpdate()

class Games extends Component {
  state = { games: [], filteredGames: [], filterTerm: null };

  componentDidMount() {
    const { id } = this.props.user;
    dbgames.getAllGames(id).then(games => {
      this.setState({ games });
    });
  }

  //TODO: Maybe try componentDidUpdate here - /account/games not working on refresh

  render() {
    const gameArray = !this.state.filteredGames.length
      ? this.state.games
      : this.state.filteredGames;

    return this.state.games ? (
      <div>
        <Header />
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <button onClick={this.handleClick}>All Game Data</button>
            <select>
              <option value="0">Select year:</option>
              <option value="3" onClick={this.handleClick}>
                3
              </option>
              <option value="4" onClick={this.handleClick}>
                4
              </option>
              <option value="5" onClick={this.handleClick}>
                5
              </option>
              <option value="6" onClick={this.handleClick}>
                6
              </option>
            </select>
            {typeof gameArray[0] === 'string' ? (
              <h1>{gameArray[0]}</h1>
            ) : (
              gameArray.map(game => {
                return (
                  <p>
                    <Link to={`/account/games/${game.gameId}`}>
                      School Year: {game.schoolYear}, Game: {game.gameId}
                    </Link>
                  </p>
                );
              })
            )}
          </div>
        </div>
        <div className="col-4" />
      </div>
    ) : (
      <p>loading...</p>
    );
  }

  handleClick = e => {
    e.target.innerText === 'All Game Data'
      ? this.showAllGameData(e)
      : this.filterGameSessions(e);
  };

  showAllGameData = e => {
    this.setState({ filteredGames: [] });
  };

  filterGameSessions = e => {
    const schoolYear = e.target.value;
    let updatedGames = this.state.games.filter(game => {
      return game.schoolYear === schoolYear;
    });
    if (updatedGames.length === 0)
      updatedGames = ['Whoops, no game data for this year'];
    this.setState({ filteredGames: updatedGames });
  };
}

export default props => {
  return (
    <AuthUserContext.Consumer>
      {user => <Games {...props} user={user} />}
    </AuthUserContext.Consumer>
  );
};
