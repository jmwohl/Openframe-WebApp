import fetchJSON from './fetchJSON';

const modelPrefix = 'frames';

const frames = {

  /**
   * Fetch a list of frames.
   * @param  {Object}
   * @return {Promise}
   */
  fetch: function(filter = {}) {
    let defaultFilter = {
      include: 'current_artwork'
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single frame by ID
   * @param  {String}  frameId defaults to 'current'
   * @param  {Object} filter
   * @return {Promise}
   */
  fetchById: function(frameId, filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${frameId}`, { data: finalFilter });
  },

  /**
   * Update a frame
   * @param  {String} frameId
   * @param  {Object} frameData
   * @return {Promise}
   */
  update: function(frameId, frameData) {

    // this is a bit of a hack, but if we're being strict on the back end
    // we can't include these relation properties in the request
    // Loopback used to have an 'ignore' option, but no longer does...
    if (frameData && frameData.managers) {
        delete frameData.managers;
    }
    if (frameData && frameData.owner) {
        delete frameData.owner;
    }

    return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'PATCH', data: frameData });
  },

  /**
   * Update the current artwork on a frame; effectively, push an artwork to a frame.
   * @param  {String} frameId
   * @param  {Object} artworkData An artwork description object
   * @return {Promise}
   */
  updateCurrentArtwork: function(frameId, artworkId) {
    return fetchJSON(`${modelPrefix}/${frameId}/current_artwork/${artworkId}`, { method: 'PUT' });
  },

  /**
   * Update list of managers by username
   * @param  {String} frameId
   * @param  {String} managersData
   * @return {Promise}
   */
  updateFrameManagers: function (frameId, managersData) {
    return fetchJSON(`${modelPrefix}/${frameId}/managers/by_username`, { method: 'PUT', data: managersData });
  },

  /**
   * Delete a frame
   * @param  {String} frameId
   * @return {Promise}
   */
  delete: function(frameId) {
    return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'DELETE' });
  }


};

export default frames;
