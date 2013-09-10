/**
 * File: Shares
 *
 * Maintainer: - Sebastian Kippe <sebastian@kip.pe>
 * Version: -    0.0.1
 *
 * Manages sharing of files
 */

RemoteStorage.defineModule('shares', function(privateClient, publicClient) {

  var exports = {
    /**
     * Method: storeFile
     *
     * Stores a shared file
     *
     * Parameters:
     *   mimeType - the picture MIME type.
     *   name     - the picture name.
     *   data     - the picture (expected as an `ArrayBuffer`).
     *
     * Returns:
     *   A promise, which will be fulfilled with the absolute URL of the newly
     *    uploaded file (see <getFileURL>).
     */
    storeFile: function(mimeType, name, data) {
      return publicClient.storeFile(mimeType, name, data)
        .then(function() {
          return this.getPictureURL(name);
        }.bind(this));
    },

    /**
     * Method: remove
     *
     * Remove a file
     *
     * Parameters:
     *   name - the filename.
     */
    remove: function(name) {
      return publicClient.remove(name);
    },

    /**
     * Method: listFiles
     *
     * List all shared files
     *
     * Returns:
     *   An array containing the filenames.
     */
    list: function() {
      return publicClient.getListing('')
        .then(function(listing) {
          if (listing) {
            return listing.map(decodeURIComponent);
          } else {
            return [];
          }
        });
    },

    /**
     * Method: getFileURL
     *
     * Get the absolute URL of a file.
     *
     * Parameters:
     *   name - the filename.
     *
     * Returns:
     *   The absolute URL of the file.
     */
    getFileURL: function(name) {
      return publicClient.getItemURL(name);
    }
  };

  return {
    exports: exports
  };

});
