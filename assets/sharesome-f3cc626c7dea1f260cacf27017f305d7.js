"use strict";define("sharesome/app",["exports","ember","sharesome/resolver","ember-load-initializers","sharesome/config/environment"],function(e,t,n,l,o){var s=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,s=t.default.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:n.default}),(0,l.default)(s,o.default.modulePrefix),e.default=s}),define("sharesome/components/file-dropzone",["exports","ember"],function(e,t){e.default=t.default.Component.extend({tagName:"section",classNames:["file-dropzone content upload"],classNameBindings:["hasFileToUpload"],dragEnter:function(){return this.$().addClass("drag-active"),!1},dragOver:function(){return!1},dragLeave:function(){return this.$().removeClass("drag-active"),!1},drop:function(e){e.preventDefault(),this.$().removeClass("drag-active"),e.stopPropagation&&e.stopPropagation(),e.dataTransfer.files&&e.dataTransfer.files[0]&&this.sendAction("readInputFile",e.dataTransfer.files[0])},actions:{readInputFile:function(e){this.sendAction("readInputFile",e)}}})}),define("sharesome/components/file-input",["exports","ember"],function(e,t){e.default=t.default.Component.extend({tagName:"input",attributeBindings:["type","accept","multiple","disabled"],type:"file",accept:"image/*",multiple:!1,attachment:null,filename:null,disabled:null,maxFileSize:null,change:function(e){var n=e.target;t.default.isPresent(n.files)&&this.sendAction("readInputFile",n.files[0])}})}),define("sharesome/components/history-item",["exports","ember","sharesome/helpers/show-url-dialog"],function(e,t,n){var l=t.default.Component,o=t.default.computed.alias;e.default=l.extend({tagName:"li",overlayIsVisible:!1,url:o("item.url"),name:o("item.name"),isImage:function(){return this.get("url").match(/(jpg|jpeg|png|gif|webp)$/i)}.property("url"),thumbnailUrl:function(){return remoteStorage.shares.getThumbnailURL(this.get("name"))}.property("name"),itemStyle:function(){if(this.get("isImage"))return t.default.String.htmlSafe("background-image:url("+this.get("thumbnailUrl")+");background-color:#ccc")}.property("url"),nameWithoutTimestamp:function(){return this.get("name").substr(12)}.property("name"),click:function(){window.innerWidth<=640&&this.toggleProperty("overlayIsVisible")},actions:{share:function(){(0,n.showUrlDialog)(this.get("url"))},zoom:function(){var e=void 0;e=this.get("isImage")?"<img src='"+this.get("url")+"' class='zoomed'>":"No preview available.",window.vex.dialog.alert(e)},remove:function(){var e=this;this.set("item.isDeleting",!0),remoteStorage.shares.remove(this.get("name")).then(function(){e.sendAction("removeItem",e.get("item"))},function(t){e.set("item.isDeleting",!1),window.alert("Couldn't remove item. Please try again. Sorry!"),console.log(t)})}}})}),define("sharesome/components/loading-spinner",["exports","ember"],function(e,t){e.default=t.default.Component.extend({startSpinner:function(){var e=this.$(".spinner-wrapper");e.css("height",this.get("height")+"px");var t={lines:this.get("lines")||13,length:this.get("length")||20,width:this.get("width")||10,radius:this.get("radius")||30,corners:this.get("corners")||1,rotate:this.get("rotate")||0,direction:this.get("direction")||1,color:this.get("color")||"#000",speed:this.get("speed")||1,trail:this.get("trail")||60,shadow:this.get("shadow")||!1,hwaccel:this.get("hwaccel")||!0,className:"spinner",zIndex:this.get("zIndex")||2e9,top:this.get("top")||"0",left:this.get("left")||"0"};e.spin(t)}.on("didInsertElement")})}),define("sharesome/controllers/application",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({})}),define("sharesome/controllers/history",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({sortProperties:["name:desc"],sortedModel:t.default.computed.sort("model","sortProperties"),itemCount:function(){return this.get("model").length}.property("model.[]"),actions:{removeItem:function(e){this.get("model").removeObject(e)}}})}),define("sharesome/controllers/upload",["exports","ember","sharesome/helpers/show-url-dialog"],function(e,t,n){e.default=t.default.Controller.extend({file:null,isUploading:!1,hasFileToUpload:function(){return null!==this.get("file")}.property("file"),fileIsImage:function(){return this.get("file.type").match("image.*")}.property("file"),simpleFileType:function(){var e=this.get("file.type");return e&&void 0!==e&&""!==e?e.replace("/","-"):"unkown"}.property("file"),actions:{readInputFile:function(e){var n=this,l=t.default.Object.create({name:e.name,type:e.type,size:e.size,binary:null,base64:null});if(this.set("file",l),e.type.match("image.*")){var o=new FileReader;o.onload=function(){return function(){n.get("file").set("base64",this.result)}}(),o.readAsDataURL(e)}var s=new FileReader;s.onload=function(){return function(){n.get("file").set("binary",this.result)}}(),s.readAsArrayBuffer(e)},cancelFileUpload:function(){this.set("file",null)},submitFileUpload:function(){var e=this,l=this.get("file");this.set("isUploading",!0),remoteStorage.shares.storeFile(l.get("type"),l.get("name"),l.get("binary")).then(function(t){e.setProperties({file:null,isUploading:!1}),(0,n.showUrlDialog)(t)},function(n){e.set("isUploading",!1),window.vex.dialog.alert("Something bad happened during upload.<br />Please try again."),t.default.Logger.error(n)})}}})}),define("sharesome/helpers/app-version",["exports","ember","sharesome/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n,l){function o(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return t.hideSha?s.match(l.versionRegExp)[0]:t.hideVersion?s.match(l.shaRegExp)[0]:s}e.appVersion=o;var s=n.default.APP.version;e.default=t.default.Helper.helper(o)}),define("sharesome/helpers/copy-to-clipboard",["exports","ember"],function(e,t){function n(e){var n=t.default.$("<div>");n.css({position:"absolute",left:"-1000px",top:"-1000px"}),n.text(e),t.default.$("body").append(n);var l=document.createRange(),o=window.getSelection();o.removeAllRanges(),l.selectNodeContents(n.get(0)),o.addRange(l);var s=document.execCommand("copy");return o.removeAllRanges(),n.remove(),s}e.copyToClipboard=n,e.default=t.default.Helper.helper(n)}),define("sharesome/helpers/human-file-size",["exports","ember"],function(e,t){e.default=t.default.Helper.helper(function(e){var t=-1,n=[" KB"," MB"," GB"," TB","PB","EB","ZB","YB"];do{e/=1024,t++}while(e>1024);return String(Math.max(e,.1).toFixed(1)+n[t])})}),define("sharesome/helpers/moment-calendar",["exports","ember","sharesome/config/environment","ember-moment/helpers/moment-calendar"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("sharesome/helpers/moment-duration",["exports","ember-moment/helpers/moment-duration"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("sharesome/helpers/moment-format",["exports","ember","sharesome/config/environment","ember-moment/helpers/moment-format"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("sharesome/helpers/moment-from-now",["exports","ember","sharesome/config/environment","ember-moment/helpers/moment-from-now"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("sharesome/helpers/moment-to-now",["exports","ember","sharesome/config/environment","ember-moment/helpers/moment-to-now"],function(e,t,n,l){e.default=l.default.extend({globalAllowEmpty:!!t.default.get(n.default,"moment.allowEmpty")})}),define("sharesome/helpers/now",["exports","ember-moment/helpers/now"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("sharesome/helpers/show-url-dialog",["exports","ember","sharesome/helpers/copy-to-clipboard"],function(e,t,n){function l(e){window.vex.dialog.alert('Direct URL:\n     <p><input type="text" value="'+e+'"></p>\n     <p class="actions"><button class="icon copy-url" title="copy to clipboard"><img src="/assets/images/copy.svg" alt="copy"></button></p>'),t.default.$(".vex-content input").first().select(),t.default.$(".vex-content button.copy-url").on("click",function(e){e.preventDefault(),(0,n.copyToClipboard)(t.default.$(".vex-content input").val()),t.default.$(".vex-content button.copy-url img").attr("src","/assets/images/checkmark.svg"),setTimeout(function(){window.vex.closeAll()},1e3)})}e.showUrlDialog=l,e.default=t.default.Helper.helper(l)}),define("sharesome/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","sharesome/config/environment"],function(e,t,n){var l=n.default.APP,o=l.name,s=l.version;e.default={name:"App Version",initialize:(0,t.default)(o,s)}}),define("sharesome/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("sharesome/initializers/export-application-global",["exports","ember","sharesome/config/environment"],function(e,t,n){function l(){var e=arguments[1]||arguments[0];if(!1!==n.default.exportApplicationGlobal){var l;if("undefined"!=typeof window)l=window;else if("undefined"!=typeof global)l=global;else{if("undefined"==typeof self)return;l=self}var o,s=n.default.exportApplicationGlobal;o="string"==typeof s?s:t.default.String.classify(n.default.modulePrefix),l[o]||(l[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete l[o]}}))}}e.initialize=l,e.default={name:"export-application-global",initialize:l}}),define("sharesome/initializers/remote-storage",["exports","sharesome/services/remote-storage"],function(e,t){function n(e){e.register("service:rs",t.default),e.inject("controller","rs","service:rs"),e.inject("route","rs","service:rs"),e.inject("model","rs","service:rs"),e.inject("component","rs","service:rs")}e.initialize=n,e.default={name:"remote-storage",initialize:n}}),define("sharesome/initializers/vex",["exports"],function(e){function t(){window.vex.defaultOptions.className="vex-theme-flat-attack"}e.initialize=t,e.default={name:"vex",initialize:t}}),define("sharesome/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("sharesome/router",["exports","ember","sharesome/config/environment"],function(e,t,n){var l=t.default.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL});l.map(function(){this.route("history",{path:"/history"})}),e.default=l}),define("sharesome/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({})}),define("sharesome/routes/history",["exports","ember"],function(e,t){e.default=t.default.Route.extend({beforeModel:function(){this.rs.connected||this.transitionTo("index")},model:function(){return remoteStorage.shares.list().then(function(e){var n=Object.keys(e),l=[];return n.forEach(function(e){var n=t.default.Object.create({name:e,url:remoteStorage.shares.getFileURL(e),isDeleting:!1});l.pushObject(n)}),l})}})}),define("sharesome/routes/index",["exports","ember"],function(e,t){e.default=t.default.Route.extend({renderTemplate:function(){this.render("upload",{controller:"upload"})}})}),define("sharesome/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("sharesome/services/moment",["exports","ember","sharesome/config/environment","ember-moment/services/moment"],function(e,t,n,l){e.default=l.default.extend({defaultFormat:t.default.get(n.default,"moment.outputFormat")})}),define("sharesome/services/remote-storage",["exports","ember"],function(e,t){e.default=t.default.Service.extend({connected:!1,connecting:!1,setup:function(){var e=this;RemoteStorage.WireClient.REQUEST_TIMEOUT=9e4,remoteStorage.access.claim("shares","rw"),remoteStorage.displayWidget({redirectUri:window.location.href}),remoteStorage.on("ready",function(){console.log("RS ready"),e.setProperties({connecting:!1,connected:!0})}),remoteStorage.on("not-connected",function(){console.log("RS not-connected"),e.setProperties({connecting:!1,connected:!1})}),remoteStorage.on("connected",function(){console.log("RS connected"),e.setProperties({connecting:!1,connected:!0})}),remoteStorage.on("disconnected",function(){console.log("RS disconnected"),e.setProperties({connecting:!1,connected:!1})}),remoteStorage.on("connecting",function(){console.log("RS connecting"),e.setProperties({connecting:!0,connected:!1})}),remoteStorage.on("authing",function(){console.log("RS authing"),e.setProperties({connecting:!0,connected:!1})})}.on("init")})}),define("sharesome/templates/_welcome",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"1MmYrOtX",block:'{"statements":[["open-element","section",[]],["static-attr","class","content welcome"],["flush-element"],["text","\\n  "],["open-element","h2",[]],["flush-element"],["text","Welcome!"],["close-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","\\n    With "],["open-element","em",[]],["flush-element"],["text","Sharesome"],["close-element"],["text",", you can share files on the Web from your own\\n    remote storage.\\n  "],["close-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","\\n    Connect your storage using the remoteStorage widget in the upper right\\n    corner, or "],["open-element","a",[]],["static-attr","target","_blank"],["static-attr","href","http://remotestorage.io/get"],["flush-element"],["text","visit the\\n      remoteStorage website"],["close-element"],["text"," to register for an account or learn how to set\\n    up your own storage server.\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"sharesome/templates/_welcome.hbs"}})}),define("sharesome/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"9UKmDUCR",block:'{"statements":[["open-element","nav",[]],["flush-element"],["text","\\n  "],["open-element","ul",[]],["flush-element"],["text","\\n    "],["open-element","li",[]],["static-attr","id","logo"],["flush-element"],["block",["link-to"],["index"],null,5],["close-element"],["text","\\n    "],["open-element","li",[]],["static-attr","id","history"],["flush-element"],["block",["link-to"],["history"],null,4],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","main",[]],["flush-element"],["text","\\n"],["block",["if"],[["get",["rs","connected"]]],null,3,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["partial","welcome"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","section",[]],["static-attr","class","content remotestorage-connecting"],["flush-element"],["text","\\n        "],["append",["helper",["loading-spinner"],null,[["height","width","radius","color","top","left"],[300,5,30,"#222","auto","auto"]]],false],["text","\\n        "],["open-element","p",[]],["flush-element"],["text","Connecting"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["rs","connecting"]]],null,1,0]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","i",[]],["static-attr","class","icon-history"],["flush-element"],["close-element"]],"locals":[]},{"statements":[["text","S"]],"locals":[]}],"hasPartials":true}',meta:{moduleName:"sharesome/templates/application.hbs"}})}),define("sharesome/templates/components/file-dropzone",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"txKp4w16",block:'{"statements":[["open-element","div",[]],["static-attr","class","hint"],["flush-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","draghere"],["flush-element"],["text","Drag file here or tap anywhere"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","taptoupload"],["flush-element"],["text","Tap anywhere and select a file"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","label",[]],["static-attr","class","file-picker"],["flush-element"],["text","\\n  "],["append",["helper",["file-input"],null,[["readInputFile"],["readInputFile"]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"sharesome/templates/components/file-dropzone.hbs"}})}),define("sharesome/templates/components/history-item",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"AjdaTrCG",block:'{"statements":[["block",["if"],[["get",["isImage"]]],null,4,3],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["overlay ",["helper",["if"],[["get",["overlayIsVisible"]],"visible"],null]]]],["flush-element"],["text","\\n  "],["open-element","a",[]],["static-attr","class","share"],["modifier",["action"],[["get",[null]],"share"]],["flush-element"],["open-element","i",[]],["static-attr","class","icon-export"],["flush-element"],["close-element"],["close-element"],["text","\\n  "],["open-element","a",[]],["static-attr","class","zoom"],["modifier",["action"],[["get",[null]],"zoom"]],["flush-element"],["open-element","i",[]],["static-attr","class","icon-eye"],["flush-element"],["close-element"],["close-element"],["text","\\n  "],["open-element","a",[]],["static-attr","class","go-to-url"],["dynamic-attr","href",["unknown",["url"]],null],["static-attr","target","_blank"],["flush-element"],["open-element","i",[]],["static-attr","class","icon-download"],["flush-element"],["close-element"],["close-element"],["text","\\n  "],["open-element","a",[]],["static-attr","class","delete"],["modifier",["action"],[["get",[null]],"remove"]],["flush-element"],["open-element","i",[]],["static-attr","class","icon-trash"],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["item","isDeleting"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["loading-spinner"],null,[["height","width","radius","color","top","left"],[200,4,20,"#eee","auto","auto"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["loading-spinner"],null,[["height","width","radius","color","top","left"],[120,3,20,"#eee","auto","auto"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","overlay-deleting"],["flush-element"],["text","\\n"],["block",["if"],[["get",["App","isSmallScreen"]]],null,1,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","image generic-file"],["flush-element"],["text","\\n    "],["open-element","p",[]],["static-attr","class","meta"],["flush-element"],["append",["unknown",["nameWithoutTimestamp"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","image"],["dynamic-attr","style",["unknown",["itemStyle"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"sharesome/templates/components/history-item.hbs"}})}),define("sharesome/templates/components/loading-spinner",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"eU9Tr5kP",block:'{"statements":[["open-element","div",[]],["static-attr","class","spinner-wrapper"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"sharesome/templates/components/loading-spinner.hbs"}})}),define("sharesome/templates/history",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"9RymJAV5",block:'{"statements":[["open-element","section",[]],["static-attr","class","content history"],["flush-element"],["text","\\n  "],["open-element","ul",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["sortedModel"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["history-item"],null,[["item","removeItem"],[["get",["item"]],"removeItem"]]],false],["text","\\n"]],"locals":["item"]}],"hasPartials":false}',meta:{moduleName:"sharesome/templates/history.hbs"}})}),define("sharesome/templates/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"PaAy5uf5",block:'{"statements":[["open-element","section",[]],["static-attr","id","loading"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","bounce1"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","bounce2"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","bounce3"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"sharesome/templates/loading.hbs"}})}),define("sharesome/templates/upload",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"hgj2Kv8S",block:'{"statements":[["append",["helper",["file-dropzone"],null,[["hasFileToUpload","readInputFile"],[["get",["hasFileToUpload"]],"readInputFile"]]],false],["text","\\n\\n"],["block",["if"],[["get",["hasFileToUpload"]]],null,6]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","id","file-preview"],["dynamic-attr","class","simpleFileType",null],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["text","icon for CSS class"],["open-element","br",[]],["flush-element"],["close-element"],["open-element","code",[]],["flush-element"],["text","#filepreview."],["append",["unknown",["simpleFileType"]],false],["close-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","id","file-preview"],["static-attr","class","image"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","id","preview-image"],["dynamic-attr","src",["unknown",["file","base64"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","section",[]],["static-attr","class","content upload-preview"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","upload-preview"],["flush-element"],["text","\\n"],["block",["if"],[["get",["fileIsImage"]]],null,1,0],["text","        "],["open-element","p",[]],["static-attr","class","meta-data"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","name"],["flush-element"],["append",["unknown",["file","name"]],false],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","size"],["flush-element"],["append",["helper",["human-file-size"],[["get",["file","size"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","actions"],["flush-element"],["text","\\n          "],["open-element","button",[]],["static-attr","class","upload"],["modifier",["action"],[["get",[null]],"submitFileUpload"]],["flush-element"],["text","Upload"],["close-element"],["text","\\n          "],["open-element","button",[]],["static-attr","class","cancel"],["modifier",["action"],[["get",[null]],"cancelFileUpload"]],["flush-element"],["text","Cancel"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["loading-spinner"],null,[["height","width","radius","color","top","left"],[300,5,30,"#222","auto","auto"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["loading-spinner"],null,[["height","width","radius","color","top","left"],[200,4,20,"#222","auto","auto"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","section",[]],["static-attr","class","content upload-in-progress"],["flush-element"],["text","\\n"],["block",["if"],[["get",["App","isSmallScreen"]]],null,4,3],["text","      "],["open-element","p",[]],["flush-element"],["text","Uploading"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isUploading"]]],null,5,2]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"sharesome/templates/upload.hbs"}})}),define("sharesome/config/environment",["ember"],function(e){try{var t="sharesome/config/environment",n=document.querySelector('meta[name="'+t+'"]').getAttribute("content"),l=JSON.parse(unescape(n)),o={default:l};return Object.defineProperty(o,"__esModule",{value:!0}),o}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("sharesome/app").default.create({name:"sharesome",version:"1.1.2"});