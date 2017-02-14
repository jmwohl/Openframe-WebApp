import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewFrameComponent from '../../components/frame/NewFrameComponent';

class NewFrameContainer extends Component {
  render() {
    return <NewFrameComponent {...this.props} />;
  }
}

NewFrameContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    showAddFrameInput: state.ui.showAddFrameInput
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updatePairUiState: require('../../actions/ui/updatePairUiState.js'),
    pairFrameRequest: require('../../actions/user/pairFrameRequest.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFrameContainer);
