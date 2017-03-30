import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { tada, flipY } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

/** ------- Imported Components ------- */
import Modal from '../Modal/Modal';
import GameSummary from './GameSummary';

/** ------- Helper functions ------ */
import { whoIsWinner } from '../../utils/winner';

/** ------- Selectors ------ */
import { getPlayerMap, getGameMerchants } from '../../redux/reducers/game-reducer';

/** ------- Component -------- */

const animateStyles = StyleSheet.create({
  tada: {
    animationName: tada,
    animationDuration: '1s'
  },
  flipY: {
    animationName: flipY,
    animationDuration: '2s'
  }
});

class DisplayWinner extends React.Component {
  constructor(props) {
    super(props);

    this.handleEndGame = this.handleEndGame.bind(this);
  }

  handleEndGame() {

  }

  render() {
    const { playerMap, merchants } = this.props;
    const winner = whoIsWinner(merchants);
    return (
      <Modal>
        <div id="winner-container">
          <div className={css(animateStyles.tada)} id="winner-text-box">
            <text id="winner-text">Winner is {winner && playerMap[winner.id]}</text>
          </div>
          <GameSummary merchants={merchants} playerMap={playerMap} />
          <div id="end-game-btn">
            <RaisedButton label="End Game" style={{ margin: 12 }} primary={true} onTouchTap={this.handleEndGame}  />
          </div>
        </div>
      </Modal>
    );
  }
}

/** -------- Higher Order Component -------- */
const mapStateToProps = state => ({
  playerMap: getPlayerMap(state),
  merchants: getGameMerchants(state)
});

export default connect(mapStateToProps)(DisplayWinner);