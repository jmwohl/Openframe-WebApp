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
              ? <div className="pairing">
                  <input
                    ref={(input) => { this.pairingInput = input; }}
                    autoFocus
                    className="pairing__input"
                    type="text"
                    placeholder="Pairing code"
                    onKeyDown={event => { if (event.keyCode === 13) ::this.pairFrame(); }} />
                  <button className="pairing__submit btn" onClick={::this.pairFrame}>Pair</button>
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
