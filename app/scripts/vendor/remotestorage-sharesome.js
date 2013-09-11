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
      var date = this._formattedDate(new Date());
      name = date + "-" + name;

      return publicClient.storeFile(mimeType, name, data)
        .then(function() {
          return this.getFileURL(name);
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
    },

    /**
     * Method: _formattedDate
     *
     * Helper method for formatting dates for the filenames
     *
     * Parameters:
     *   date - a Date object
     *
     * Returns:
     *   A formatted date string, like e.g. '131106-1523'
     */

    _formattedDate: function (date) {
      var pad = function(num) {
        num = String(num);
        if (num.length === 1) { num = "0" + num; }
        return num;
      };
      var yrs = pad( date.getUTCFullYear().toString().substr(2) );
      var mon = pad( date.getUTCMonth() + 1 );
      var day = pad( date.getUTCDate() );
      var hrs = pad( date.getUTCHours() );
      var min = pad( date.getUTCMinutes() );

      return yrs + mon + day + "-" + hrs + min;
    }

  };

  return {
    exports: exports
  };

});
