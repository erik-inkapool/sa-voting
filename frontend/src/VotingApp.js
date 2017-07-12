import { connect } from 'react-redux'

import Voting from './Voting';

const mapStateToProps = state => ({
    route: state.route
});

const mapDispatchToProps = dispatch => ({});

const VotingApp = connect(mapStateToProps, mapDispatchToProps)(Voting);

export default VotingApp;