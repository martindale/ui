import React from 'react';
import { connect } from 'react-redux';
import { createTable, TableContainer } from '../../Table';
import {
  getPlayerPeers,
  setPlayerPeersSort,
} from '../../../actions';
import { playerPeersColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerPeers,
  transformPlayerPeersById,
} from '../../../selectors';
import { playerPeers } from '../../../reducers';

const PeersTable = createTable(
  playerPeers.getPlayerPeersById,
  (state, sortState, playerId) => (sortState ? sortPlayerPeers(playerId)(state) : transformPlayerPeersById(playerId)(state)),
  setPlayerPeersSort
);

const Peers = ({ playerId }) => (
  <TableContainer title="peers">
    <PeersTable columns={playerPeersColumns} id={playerId} />
  </TableContainer>
);

const mapStateToProps = (state, { playerId }) => ({ playerId });

const mapDispatchToProps = (dispatch) => ({
  getPlayerPeers: (playerId) => dispatch(getPlayerPeers(playerId)),
});

const getData = props => {
  props.getPlayerPeers(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return <Peers {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);