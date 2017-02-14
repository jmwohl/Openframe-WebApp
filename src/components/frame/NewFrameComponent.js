'use strict';

import React from 'react';

require('styles/frame/NewFrame.scss');

class NewFrameComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  showAddFrameInput() {
    const updatePairUiState = this.props.actions.updatePairUiState;
    updatePairUiState(true);
  }

  pairFrame() {
    const pairFrameRequest = this.props.actions.pairFrameRequest;
    const pairingCode = this.pairingInput.value;
    pairFrameRequest(pairingCode);
  }

  render() {
    return (
      <li className='sidebar-frame-item sidebar__row sidebar__row--frame' onClick={::this.showAddFrameInput} >
        <div className="frame-item frame-item--add" >
          <div className="frame-item__thumb frame-item__thumb--add">
              <span className="frame-item__thumb-icon">+</span>
          </div>

            { this.props.showAddFrameInput
              ? <div>
                  <input ref={(input) => { this.pairingInput = input; }} autoFocus className="pairing-input" type="text" placeholder="Pairing code" />
                  <button className="pairing-submit btn" onClick={::this.pairFrame}>Pair</button>
                </div>
              : <div className="frame-item__info">
                  <div className="frame-item__name">
                    Add frame
                  </div>
                </div>
            }

        </div>
      </li>
    );
  }
}

NewFrameComponent.displayName = 'FrameNewFrameComponent';

// Uncomment properties you need
// NewFrameComponent.propTypes = {};
// NewFrameComponent.defaultProps = {};

export default NewFrameComponent;
