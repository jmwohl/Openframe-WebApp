import fetchJSON from './fetchJSON';

const modelPrefix = 'users';
import config from 'config';

const users = {

  /**
   * Create
   * @param  {Object} data
   * @return {Promise}
   */
  create: function(data) {
    return fetchJSON(`${modelPrefix}`, { method: 'POST', data: data });
  },


  /**
   * Login
   * @param  {Object} credentials {username, password}
   * @return {Promise}
   */
  login: function(credentials) {
    return fetchJSON(`${modelPrefix}/login`, { method: 'POST', data: credentials });
  },

  /**
   * Logout
   * @return {Promise}
   */
  logout: function() {
    return fetchJSON(`${modelPrefix}/logout`, { method: 'POST' });
  },

  /**
   * Fetch a list of users.
   * @param  {Boolean}
   * @return {Promise}
   */
  fetch: function(filter = {}) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}`, { data: finalFilter });
  },

  /**
   * Fetch a single user by ID
   * @param  {String}  userId defaults to 'current'
   * @return {Promise}
   */
  fetchById: function(userId = 'current', filter = {}, access_token = null) {
    let defaultFilter = {};
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}`, { data: finalFilter, access_token });
  },

  /**
   * Fetch a single user by username
   * @param  {String} username
   * @return {Promise}
   */
  fetchByUsername: function(username, filter = {}) {
    let defaultFilter = {
      where: {
        username: username
      },
      limit: 1
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return this.fetch(finalFilter);
  },

  searchByUsername: function(input) {
    let filter = {
      where: {
        username: {
          like: input
        }
      },
      limit: 10
    };
    return this.fetch(filter);
  },

  /**
   * Fetch a single user's owned artwork by user id
   *
   * @param  {String} userId
   * @return {Promise}
   */
  fetchUserArtwork: function(userId = 'current', filter = {}) {
    let defaultFilter = {
      limit: config.perPage,
      order: 'created DESC'
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}/created_artwork`, { data: finalFilter });
  },

  /**
   * Fetch a single user's liked artwork by user id
   *
   * @param  {String} userId
   * @return {Promise}
   */
  fetchUserLikedArtwork: function(userId = 'current', filter = {}) {
    let defaultFilter = {
      order: 'created DESC'
    };
    let finalFilter = Object.assign({}, defaultFilter, filter);
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork`, { data: finalFilter });
  },

  /**
   * Fetch a list of all owned and managed frames
   * @param  {String} userId
   * @return {Promise}
   */
  fetchAllFrames: function(userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/all_frames`);
  },

  pairFrame: function(pairingCode, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/pair/${pairingCode}`, { method: 'PUT' });
  },

  /**
   * Fetch a collection
   * @param  {String} collectionId Collection id (optional, defaults to primary collection)
   */
  fetchCollection: function(userId = 'current', collectionId = 'primary') {
    let filter = {
      'filter': {
        'include': [
          'artwork'
        ]
      }
    };
    return fetchJSON(`${modelPrefix}/${userId}/collections/${collectionId}`, { data: filter });
  },

  /**
   * Update a user
   * @param  {String} userId
   * @param  {Object} userData
   * @return {Promise}
   */
  update: function(userId = 'current', userData, access_token = null) {
    return fetchJSON(`${modelPrefix}/${userId}`, { method: 'PATCH', data: userData, access_token });
  },

  /**
   * Delete a userframe
   * @param  {String} userId
   * @return {Promise}
   */
  delete: function(userId) {
    return fetchJSON(`${modelPrefix}/${userId}`, { method: 'DELETE' });
  },

  likeArtwork: function(artworkId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'PUT'});
  },

  unlikeArtwork: function(artworkId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'DELETE'});
  },

  /**
   * Update a artwork
   * @param  {String} artworkId
   * @param  {Object} artworkData
   * @return {Promise}
   */
  updateArtwork: function(artworkId, artworkData) {
    return fetchJSON(`${modelPrefix}/current/created_artwork/${artworkId}`, { method: 'PUT', data: artworkData });
  },

  /**
   * Delete a artwork
   * @param  {String} artworkId
   * @return {Promise}
   */
  deleteArtwork: function(artworkId) {
    return fetchJSON(`${modelPrefix}/current/created_artwork/${artworkId}`, { method: 'DELETE' });
  },

  removeFromFrame: function(frameId, userId = 'current') {
    return fetchJSON(`${modelPrefix}/${userId}/managed_frames/rel/${frameId}`, { method: 'DELETE'});
  },

  passwordReset: function(email) {
    return fetchJSON(`${modelPrefix}/reset`, { method: 'POST', data: { email }});
  },


};

export default users;
