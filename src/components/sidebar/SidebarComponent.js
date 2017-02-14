'use strict';

import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

import SidebarFrameItemComponent from './SidebarFrameItemComponent';
import NewFrameContainer from '../../containers/frame/NewFrameContainer';

require('styles//sidebar/Sidebar.scss');

let closeIcon = require('../../images/icon_cross_mobile.svg');

class SidebarComponent extends Component {

	// when clicking outside the sidebar, close it.
	handleClickOutside() {
		if (this.props.isOpen) {
   		this.props.updateSidebarState(false);
		}
  }

  render() {
  	let className = 'sidebar';
  	let {isOpen, frames, selectedFrameId, user, selectFrame, logoutRequest, location, updateSidebarState, updateVisibleModal, editFrameSettings} = this.props;
  	if (isOpen) {
  		className += ' sidebar--open';
  	}

    return (
      <div className={className}>
		    <div className="sidebar-header">
          <img className="btn-menu-close cross" src={closeIcon} onClick={() => updateSidebarState(false)}/>
        </div>
        <div className="sidebar__body">
          <div className="sidebar-header">
            <div className="sidebar__row--title">Frames</div>
  		    </div>
          <div className="sidebar__frames-list-wrap">
    		    <ul className="sidebar__frames-list" id="MenuFrameList">

    		    	{frames.map(frame =>
    		    		<SidebarFrameItemComponent
    		    			key={frame.id}
    		    			frame={frame}
    		    			isSelected={frame.id == selectedFrameId} // TODO: === once we can ensure string ids
    		    			isOwner={frame.ownerId === user.id}
                  editFrameSettings={() => editFrameSettings(frame.id)}
                  updateSidebarState={updateSidebarState}
                  selectFrame={selectFrame}
                  pathname={location.pathname} />
    		    	)}

              <NewFrameContainer />
    		    </ul>
          </div>
          <div className="sidebar-header">
            <div className="sidebar__row--title">Your Profile</div>
          </div>
  		    <div className="sidebar__row sidebar__row--logout">
  		        <span className="anchor" onClick={() => updateVisibleModal('edit-profile')}>Edit profile</span>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <span className="anchor" onClick={logoutRequest}>Log out</span>
  		    </div>
        </div>
		  </div>
    );
  }
}

SidebarComponent.displayName = 'SidebarComponent';

// Uncomment properties you need
SidebarComponent.propTypes = {
	frames: PropTypes.array.isRequired,
	isOpen: PropTypes.bool.isRequired
};
SidebarComponent.defaultProps = {
	frames: [],
	isOpen: false
};

export default onClickOutside(SidebarComponent);
