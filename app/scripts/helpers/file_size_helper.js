Ember.Handlebars.helper('humanFileSize', function(fileSizeInBytes, options) {
    var i = -1;
    var byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    var fileSize =  Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];

    return new Handlebars.SafeString(fileSize);
});
