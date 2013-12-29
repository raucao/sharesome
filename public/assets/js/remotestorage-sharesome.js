/**
 * File: Shares
 *
 * Maintainer: - Sebastian Kippe <sebastian@kip.pe>
 * Version: -    0.3.0
 *
 * Manages sharing of files. All shares are stored with a timestamp prefix.
 * For images, thumbnails are created and stored in a subdirectory.
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

      if (this._isImage(mimeType)) {
        this._storeThumbnail(mimeType, name, data);
      }

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
      publicClient.remove('thumbnails/'+name+'.png');
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
      var self = this;
      return publicClient.getListing('')
        .then(function(listing) {
          if (listing) {
            // TODO removing dir keys should be an option for getListing itself
            listing = self._removeDirectoryKeysFromListing(listing);
            return listing;
          } else {
            return {};
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

    getThumbnailURL: function(name) {
      return this.getFileURL('thumbnails/'+name+'.png');
    },

    /**
     * Method: _formattedDate
     *
     * Helper method for formatting dates for filenames
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
    },

    _arrayBufferToBase64: function(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
    },

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
    _base64DecToArr: function(sBase64, nBlocksSize) {
      var b64ToUint6 = function(nChr) {
        return nChr > 64 && nChr < 91 ?
            nChr - 65
          : nChr > 96 && nChr < 123 ?
            nChr - 71
          : nChr > 47 && nChr < 58 ?
            nChr + 4
          : nChr === 43 ?
            62
          : nChr === 47 ?
            63
          :
            0;
      };
      var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
          nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);
      for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
          for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
            taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
          }
          nUint24 = 0;
        }
      }
      return taBytes;
    },

    _isImage: function(type) {
      return type.match(/(jpg|jpeg|png|gif|webp)$/i);
    },

    _createThumbnailFromBase64Image: function(base64, size) {
      var img = new Image();
      img.src = base64;

      var sWidth  = img.width;
      var sHeight = img.height;
      var sFrame  = {sX: 0, sY: 0, sW: sWidth, sH: sHeight};
      var difference;

      if (sWidth > sHeight) {
        difference = sWidth - sHeight;
        sFrame.sX = difference / 2;
        sFrame.sW = sWidth - difference;
      }
      else if (sWidth < sHeight) {
        difference = sHeight - sWidth;
        sFrame.sY = difference / 2;
        sFrame.sH = sHeight - difference;
      }

      // Cut to square

      var oc = document.createElement('canvas'),
          octx = oc.getContext('2d');

      if (sFrame.sW >= 360) {
        oc.width = sFrame.sW * 0.5;
        oc.height = sFrame.sH * 0.5;
      } else {
        oc.width = sFrame.sW;
        oc.height = sFrame.sH;
      }

      octx.drawImage(img,
                     sFrame.sX, sFrame.sY, sFrame.sW, sFrame.sH,
                     0, 0, oc.width, oc.height);

      // Step 2

      var iWidth = oc.width,
          iHeight = oc.height;

      if (iWidth >= 360) {
        iWidth = iWidth * 0.5;
        iHeight = iHeight * 0.5;
        octx.drawImage(oc, 0, 0, iWidth, iHeight);
      }

      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

      canvas.width  = size;
      canvas.height = size;

      ctx.drawImage(oc, 0, 0, iWidth, iHeight,
                        0, 0, canvas.width, canvas.height);

      var thumbBase64 = canvas.toDataURL("image/png");

      return thumbBase64;
    },

    _storeThumbnail: function(mimeType, name, data) {
      var base64 = this._arrayBufferToBase64(data);
      base64 = 'data:'+mimeType+';base64,'+base64;

      var thumbBase64 = this._createThumbnailFromBase64Image(base64, 200);
      thumbBase64 = thumbBase64.split(',')[1]; // remove type prefix
      var thumbData = this._base64DecToArr(thumbBase64);

      publicClient.storeFile('image/png', 'thumbnails/'+name+'.png', thumbData);
    },

    _removeDirectoryKeysFromListing: function(listing) {
      Object.keys(listing).forEach(function(key){
        console.log(key);
        if (key.match(/\/$/)) {
          delete listing[key];
        }
      });
      return listing;
    }

  };

  return {
    exports: exports
  };

});
