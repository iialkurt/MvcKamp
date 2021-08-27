/*
 * sw-ui-bootstrap
 * AngularJS directives for Bootstrap

 * Created By: Michelle Darlea <mdarlea@gmail.com> (https://github.com/mdarlea)
 * https://github.com/mdarlea/sw-ui-bootstrap

 * Version: 1.0.34 - 2015-12-01
 * License: ISC
 */
angular.module('sw.ui.bootstrap', ['sw.ui.bootstrap.form','sw.ui.bootstrap.image','sw.ui.bootstrap.route']);
(function () {
    'use strict';
    
    /**
    * @ngdoc overview
    * @name sw.ui.bootstrap.form
 
    * @description 
	#### Dependencies
	- {@link http://angular-ui.github.io/bootstrap/ ui.bootstrap}
	
	#### Description
	This module contains form controls
    * - {@link sw.ui.bootstrap.form.directive:swFormField swFormField} directive
    */
    angular.module('sw.ui.bootstrap.form', ['ui.bootstrap']);
    
    /**
    * @ngdoc directive
    * @name sw.ui.bootstrap.form.directive:swFormField
    * @element ANY
    * @restrict EA
    * @require ngModel
    * @scope    
    * @function 
    *
    * @description
    * Renders a form field. The following field types are supported: text, date
    *
    * @param {string} label The form field label
    * @param {string} [type='text'] The field type. Acceptable values: 'text', 'password', 'date', 'time'
    * @param {string} [name=null] The field name
    * @param {string} [placeholder=''] The field watermark
    * @param {boolean} [group=true] 
    *   If true then the 'form-group' css bootstrap class is used         
    * @param {boolean} [inline=false] 
    *   If true then the 'form-inline' css bootstrap class is used    
    * @param {boolean} [control=false] 
    *   If true then the 'control-group' css bootstrap class is used    
    * @param {ngModel} ngModel The {@link https://docs.angularjs.org/api/ng/directive/ngModel ngModel} directive attached to the associated input field
    * @param {boolean} [ngRequired=false] Sets required attribute if set to true    
    * @param {string} [ngPattern=null] Sets pattern validation error key if the ngModel value does not match a RegExp found by evaluating the Angular expression given in the attribute value. If the expression evaluates to a RegExp object, then this is used directly. If the expression evaluates to a string, then it will be converted to a RegExp after wrapping it in ^ and $ characters. For instance, "abc" will be converted to new RegExp('^abc$').
                                       Note: Avoid using the g flag on the RegExp, as it will cause each successive search to start at the index of the last search's match, thus not taking the whole input value into account.
    * @param {ngChange} [ngChange] The {@link https://docs.angularjs.org/api/ng/directive/ngChange ngChange} directive attached to the associated input field
    * @param {Object} options Additional field options 
    * @param {string} [options.formatYear='yy'] Available for date field type.
    * @param {Number} [options.startingDay=1] Available for date field type. 
    * @param {datetime} [options.minDate] The minimum date allowed in the date-time picker
    * @param {boolean} [options.required=false] True if the field is required, False otherwise
    * 
    * @example
    <doc:example module="app">      
      <doc:source>        
        <script>
            (function () {
            'use strict';
            angular.module('app',['sw.ui.bootstrap'])
             .controller('PersonController', ['$scope', function ($scope) {
                $scope.person = {
                    name: "Michelle Darlea",
                    dob: new Date(1976,4,23),
                    email: 'mdarlea@gmail.com',
                    appTime: null
                };
                $scope.numbersExpr = /[0-9]/;
              }]);
            })();     
        </script>        
        <style>
          .btn-calendar {
              margin-bottom: 10px;
          }
          .small-field {
               width: 50px;
          }
        </style> 
        <div data-ng-controller="PersonController" class="container">
            <form role="form">
                <sw-form-field label="Name:" 
                        placeholder="Name" 
                        type="text" 
                        data-ng-model="person.name">
                </sw-form-field>     
                <sw-form-field label="Age:" 
                        placeholder="Age" 
                        ng-pattern="numbersExpr"
                        css="'small-field'"
                        ng-required=true
                        data-ng-model="person.age">
                </sw-form-field>          
                <sw-form-field label="Birth Date:" 
                        placeholder="Birth Date" 
                        ng-required=true
                        type="date" 
                        data-ng-model="person.dob">
                </sw-form-field>
                <sw-form-field label="Appointment Time:"                        
                        type="time" 
                        ng-required=true
                        data-ng-model="person.appTime">
                </sw-form-field>     
                <sw-form-field label="E-mail:" name="email"
                        placeholder="Email"                
                        ng-required="true"         
                        data-ng-model="person.email" control="true">
                    <p class="help-block">Please provide your E-mail</p>
                </sw-form-field>                
                <sw-form-field label="Password:" 
                        placeholder="Password"                        
                        type="password"                         
                        data-ng-model="person.password"                         
                        inline="true">
                    <span class="field-validation-valid text-danger" 
                          data-valmsg-for="Password" 
                          data-valmsg-replace="true">
                    </span>
                </sw-form-field>              
            </form>     
     
            <div class="row">
                <div class="col-md-4">
                    <b>{{person.name}}</b> was born on <b>{{person.dob  | date:'shortDate'}}</b>
                    <p>Age is: <b>{{person.age}}</b></p>
                    <p>Email is: <b>{{person.email}}</b></p>
                    <p>Password is: <b>{{person.password}}</b></p>                    
                    <p>Appointment time is: {{person.appTime | date:'shortTime' }}</p>
                    <p></p>
                </div>               
            </div>            
        </div>
      </doc:source>
    </doc:example>
    */
    angular.module('sw.ui.bootstrap.form')
        .controller("FormController", ["$scope", function ($scope) {
            function getTemplate(type) {
                var name;
                if (type) {
                    name = type;
                } else {
                    name = "text";
                }
                if ($scope.ngPattern) {
                    name += ("-pattern");
                }
                return ("template/form/field-" + name + ".html");
            }
            
            function isDate(type) {
                return type === "date";
            }
            
            function isTime(type) {
                return type === "time";
            }
            
            function updateFieldOptions(type, options) {
                if (isDate(type)) {
                    var defaultDateOptions = {
                        formatYear: 'yy', 
                        startingDay: 1,
                        minDate: new Date()
                    };
                    $scope.dateOptions = angular.extend({}, defaultDateOptions, options);
                } else {
                    if (isTime(type)) {
                        var defaultTimeOptions = {
                            hstep:1,
                            mstep: 15,
                            ismeridian: true
                        };
                        $scope.timeOptions = angular.extend({}, defaultTimeOptions, options);
                    }
                    $scope.dateOptions = null;
                }
                angular.extend($scope.fieldOptions, options);
            }
            
            if (!$scope.inline && !$scope.control && !$scope.group) {
                $scope.group = "true";
            }

            $scope.fieldOptions = {};
            
            $scope.$watch('type', function (type) {
                $scope.template = getTemplate(type);
                updateFieldOptions(type, $scope.options);
            });
            $scope.$watch('ngPattern', function() {
                $scope.template = getTemplate($scope.type);
            });

            $scope.$watch('options', function (newVal, oldVal) {
                updateFieldOptions($scope.type, newVal);
            }, true);
            
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                
                $scope.opened = true;
            };
        }])
        .directive('swFormField', [function () {
            return {
                restrict: 'EA',
                replace:true,
                require: ['?ngModel','?ngChange'],
                transclude: true,
                scope: {
                    label: '@',
                    type: '@',
                    placeholder: '@',
                    title: '@',
                    group: '@',
                    inline: '@',
                    control: '@',
                    name:'@',
                    css: '=',
                    options: '=',
                    ngModel: '=',
                    ngChange: '=',
                    ngRequired: '=',
                    ngPattern: '=',
                    ngTrim: '='
                },
                controller: 'FormController',
                templateUrl: 'template/form/form-field.html',
                compile: function ($elm, $attrs) {
                    var isTrue = function(value) {
                        return $attrs[value] === 'true';
                    };

                    //default values
                    if (!$attrs.group) {
                        $attrs.group = !isTrue('inline') && !isTrue('control');
                    }
                    return {
                        pre: function (scope, elm, attrs) {
                        },
                        post : function(scope, elm, attrs, controllers, $transcludeFn) {
                        }
                    }
                }
            };
        }]);
})();
(function () {
    'use strict';
    
    /**
    * @ngdoc overview
    * @name sw.ui.bootstrap.image
 
    * @description 		
	This module contains image processing directives and components
    * - {@link sw.ui.bootstrap.image.directive:swImagesSlider swImagesSlider} directive
    */
    angular.module('sw.ui.bootstrap.image', []);

    /**
    * @ngdoc service
    * @name sw.ui.bootstrap.image.ImageLoader
    * @requires sw.ui.bootstrap.image.PreLoader
    * @description preloads a set of images
    */
    angular.module('sw.ui.bootstrap.image').factory("ImageLoader", ['PreLoader',function(PreLoader){
        var ImageLoader = function () {
            /**
            * @ngdoc property
            * @name sw.ui.bootstrap.image.ImageLoader#loading
            * @propertyOf sw.ui.bootstrap.image.ImageLoader
            * @returns {boolean} True if images are currently loading, False if all images were loaded
            */
            this.loading = true;
                
            /**
            * @ngdoc property
            * @name sw.ui.bootstrap.image.ImageLoader#backgroundImages
            * @propertyOf sw.ui.bootstrap.image.ImageLoader
            * @returns {Array} An array that contains the names of the loaded images
            */            
            this.backgroundImages = [];

            this._unloadedImages = [];

            this.idx = 0;
        };
            
        ImageLoader.prototype = (function () {
            function getImageName(imgPath, imgFilter) {
                if (!imgFilter) return imgPath;

                var token = "{0}";
                var left = imgFilter.indexOf(token);
                if (left < 0) return imgPath;

                var right = imgFilter.substring(left + token.length);
                var imgName = imgPath.substring(left, imgPath.lastIndexOf(right));

                return imgName;
            };
            
            function loadImages(images, imgFilter, callback) {
                var imgs = [];
                for (var i=0; i < images.length; i++) {
                    var name = images[i];
                    var imgPath = imgFilter.replace("{0}", name);
                    imgs.push(imgPath);
                };

                var that = this;
                var loader = new PreLoader(imgs, {
                   onComplete: function() {
                        for (var ii = 0; ii < this.completed.length; ii++) {
                            that.backgroundImages.push(that._(getImageName)(this.completed[ii],imgFilter));
                        }
                        for (var j = 0; j < this.errors.length; j++) {
                             that._unloadedImages.push(that._(getImageName)(this.errors[j], imgFilter));
                        }
                        callback();
                        that.loading = false;
                   }
                });
            };
                
            return {
                constructor: ImageLoader,
                    
                getFirst: function () {
                    return this.backgroundImages.length > 0 && this.backgroundImages[0];
                },
                getCurrent: function () {
                    var len = this.backgroundImages.length;
                    return this.idx <= (len - 1) && this.backgroundImages[this.idx];
                },
                getNext: function () {
                    if (this.idx === (this.backgroundImages.length - 1)) {
                        this.idx = 0;
                    } else {
                        this.idx++;
                    }                        ;
                    return this.getCurrent();
                },
                    
                /**
                * @ngdoc method
                * @name sw.ui.bootstrap.image.ImageLoader#load
                * @methodOf sw.ui.bootstrap.image.ImageLoader
                * @description Preoads a list of images
                * @param {Array} images The names of the images that must be preloaded
                * @param {string} imgFilter Defines the full image path. Use the {0} placeholder for the image name
                    Example: 
                    <pre>
                    var images=['image1.png','image2.png'];
                    var loader = new ImageLoader();
                    loader.load(images, '/Content/images/{0}.jpg', function() {
                        console.log("Images successfully preloaded");
                    });
                    </pre>
                * @param {function} callback A function that is called after all images were successfully loaded
                */
            load: function (images, imgFilter, callback) {
                    this.loading = true;
                    this.idx = 0;
                    this.backgroundImages = [];
                    this._unloadedImages = [];
                    this._(loadImages)(images, imgFilter, callback);
                },
                    
                _: function (callback) {
                    var self = this;
                    return function () { return callback.apply(self, arguments); };
                }
            }
        })();

        return ImageLoader;
    }]);
})();
(function () {
    'use strict';
    
    /**
    * @ngdoc service
    * @name sw.ui.bootstrap.image.PreLoader    
    * @description Preloads a set of images. Inspired by {@link http://fragged.org/preloading-images-using-javascript-the-right-way-and-without-frameworks_744.html Preloading images using javascript, the right way and without frameworks}
    */
    angular.module('sw.ui.bootstrap.image').factory("PreLoader", [function() {
        var PreLoader = function (images, options) {
            //properties initialization 
            this.options = {
                pipeline: false,
                auto: true,
                /* onProgress: function(){}, */
                /* onError: function(){}, */
                onComplete: function () { }
            };
                
            options && typeof options == 'object' && this.setOptions(options);
                
            this.addQueue(images);
            this.queue.length && this.options.auto && this.processQueue();
        };
            
        PreLoader.prototype = (function () {
            function checkProgress(src, image) {
                // intermediate checker for queue remaining. not exported.
                // called on preLoader instance as scope
                var args = [],
                    o = this.options;
                    
                // call onProgress
                o.onProgress && src && o.onProgress.call(this, src, image, this.completed.length);
                    
                if (this.completed.length + this.errors.length === this.queue.length) {
                    args.push(this.completed);
                    this.errors.length && args.push(this.errors);
                    o.onComplete.apply(this, args);
                }
            };

            return {
                constructor: PreLoader,
                    
                setOptions: function (options) {
                    // shallow copy
                    var o = this.options,
                        key;
                
                    for (key in options) options.hasOwnProperty(key) && (o[key] = options[key]);
                
                    return this;
                },
                    
                addQueue: function (images) {
                    // stores a local array, dereferenced from original
                    this.queue = images.slice();
                
                    return this;
                },
                    
                reset: function () {
                    // reset the arrays
                    this.completed = [];
                    this.errors = [];
                
                    return this;
                },                    

                load: function (src, index) {
                    var image = new Image(),
                        self = this,
                        o = this.options;
                
                    // set some event handlers
                    image.onerror = image.onabort = function () {
                        this.onerror = this.onabort = this.onload = null;
                    
                        self.errors.push(src);
                        o.onError && o.onError.call(self, src);
                        self._(checkProgress)(src);
                        o.pipeline && self.loadNext(index);
                    };
                
                    image.onload = function () {
                        this.onerror = this.onabort = this.onload = null;
                    
                        // store progress. this === image
                        self.completed.push(src); // this.src may differ
                        self._(checkProgress)(src, this);
                        o.pipeline && self.loadNext(index);
                    };
                
                    // actually load
                    image.src = src;
                
                    return this;
                },
                    
                loadNext: function (index) {
                    // when pipeline loading is enabled, calls next item
                    index++;
                    this.queue[index] && this.load(this.queue[index], index);
                
                    return this;
                },
                    
                processQueue: function () {
                    // runs through all queued items.
                    var i = 0,
                        queue = this.queue,
                        len = queue.length;
                
                    // process all queue items
                    this.reset();
                
                    if (!this.options.pipeline) for (; i < len; ++i) this.load(queue[i], i);
                    else this.load(queue[0], 0);
                
                    return this;
                },
                                            
                _: function (callback) {
                    var self = this;
                    return function () { return callback.apply(self, arguments); };
                }
            }
        })();

        return PreLoader;
    }]);
})();
(function () {
    'use strict';
    
    /**
    * @ngdoc directive
    * @name sw.ui.bootstrap.image.directive:swImagesSlider
    * @requires sw.ui.bootstrap.image.ImageLoader
    * @element div
    * @restrict EA    
    * @scope    
    * @function 
    *
    * @description
    * Changes a background image every 3 seconds
    *
    * @param {Array} source An array that contains the names of the images that must be pre-loaded
    * @param {string} filter Defines the full image path. Use the {0} placeholder for the image name. Example: '/Content/images/{0}.jpg'
    * @param {string} [bgClass='slider__background'] The background CSS class
    * 
    * @example
    <doc:example module="app">      
      <doc:source>        
        <script>
            (function () {
            'use strict';
            angular.module('app',['sw.ui.bootstrap'])
             .controller('HomeController', ['$scope', function ($scope) {
                $scope.images = ['nature1', 'nature3', 'beach', 'green', 'mountain'];
              }]);
            })();     
        </script>        
        <style>
            .beach,
            .green,
            .mountain,
            .nature1,            
            .nature3 {
                -webkit-transition: background-image 2s, -webkit-transform 2s;
                -moz-transition: background-image 2s, -moz-transform 2s;
                -ms-transition: background-image 2s, -ms-transform 2s;
                -o-transition:background-image 2s, transform 2s;
                transition:background-image 2s, transform 2s;
            }
              
             .background {
                position: relative; 
                top: 0;
                left: 0;
                width: 300px; 
                height: 280px;
                background-position:center; 
                background-repeat:no-repeat;       
                -ms-background-size:300px 280px;
                background-size:300px 280px;
            }

            .background.beach {
                background-image: url('/Content/images/beach.jpg');
            }

            .background.green {
                background-image: url('/Content/images/green.jpg');
            }

            .background.mountain {
                background-image: url('/Content/images/mountain.jpg');
            }

            .background.nature1 {
                background-image: url('/Content/images/nature1.jpg');
            }

            .background.nature3 {
                background-image: url('/Content/images/nature3.jpg');
            }          
        </style> 
        <div data-ng-controller="HomeController" class="container">     
            <div class="row">
                <div class="col-md-4">                   
                   <sw-images-slider class="nature1" 
                                     source="images" 
                                     filter="/Content/images/{0}.jpg" 
                                     bg-class="background">
                   </sw-images-slider>
                </div>               
            </div>            
        </div>
      </doc:source>
    </doc:example>
    */
    angular.module('sw.ui.bootstrap.image')
        .controller("ImagesSliderCtrl",["$scope",'ImageLoader',function($scope, ImageLoader) {
            $scope.loader = new ImageLoader();
            $scope.loader.loading = true;
        }])
        .directive('swImagesSlider', [function () {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    filter: '@',
                    source: '=',
                    bgClass: "@"
                },
                controller: 'ImagesSliderCtrl',
                template: '<div></div>',
                link: function (scope, elm, attr) {
                    var css = scope.bgClass || "slider__background";
                    
                    if (!elm.hasClass(css)) {
                        elm.addClass(css);
                    }

                    var loader = scope.loader;
                    var loadImages = function () {
                        if (!scope.source || scope.source.length === 0) return;

                        //preload images
                        loader.load(scope.source, scope.filter, function () {
                            var first = loader.getFirst();
                            for (var i = 0; i < loader.backgroundImages; i++) {
                                var img = loader.backgroundImages[i];
                                if (img !== first) {
                                    elm.removeClass(img);
                                }
                            }
                            
                            if (first && !elm.hasClass(first)) {
                                elm.addClass(first);
                            }
                        });
                        scope.loadedFilter = scope.filter;
                        scope.loadedImages = scope.images;
                    };
                    
                    scope.$watch("source", function (newVal, oldVal) {
                        loadImages();
                    }, true);
                    
                    scope.$watch('filter', function (newVal, oldVal) {
                        loadImages();
                    });

                    var slider = setInterval(function () {
                        if (!loader.loading) {
                            elm.removeClass(loader.getCurrent()).addClass(loader.getNext());
                        }
                    }, 3000);
                    
                    scope.$on('$destroy', function (e) {
                        if (slider) {
                            clearInterval(slider);
                        }
                    });            
                }
            };
        }]);
})();
(function () {
    'use strict';
    
    /**
    * @ngdoc overview
    * @name sw.ui.bootstrap.route
 
    * @description 
	    This module contains directives that listen to the AngularJS $route events such as the $routeChangeStart event
        - {@link sw.ui.bootstrap.route.directive:head head} directive
    */
    angular.module('sw.ui.bootstrap.route', []);
    
    
    /**
    * @ngdoc directive
    * @name sw.ui.bootstrap.route.directive:head
    * @requires $rootScope
    * @requires $compile
    * @element head
    * @restrict E    
    * @function 
    *
    * @description
    Directive inspired by {@link https://github.com/tennisgent/angular-route-styles angular-route-styles}. It supports media formats as well.
    * 
    * @example
    <pre>
     * var app = angular.module('app', ['ngRoute','sw.ui.bootstrap']);
     * app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/tweets', {
            templateUrl: 'app/views/streamed-tweets.html',
            controller: 'StreamedTweetsController',
            css: [
                {
                    href: "/app/css/streamed-tweets.css"
                },
                {
                    href: "/app/css/streamed-tweets-701.css",
                    media: "screen and (min-width: 701px)"
                },
                {
                    href: "/app/css/streamed-tweets-iphone.css",
                    media: "screen and (max-device-width: 480px)"
                }
            ]
        });
     * });
    </pre>
    */        
    angular.module('sw.ui.bootstrap.route').directive('head', ['$rootScope', '$compile',
        function ($rootScope, $compile) {
            return {
                restrict: 'E',
                link: function (scope, elem) {
                    var html = '<link rel="stylesheet" ng-repeat="(href, sheet) in routeStyles" media="{{sheet.media}}" ng-href="{{href}}" />';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    scope.getMedia = function (sheet) {
                        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                        return (sheet.media) ? sheet.media : "";
                    };
                    $rootScope.$on('$routeChangeStart', function (e, next, current) {
                        if (current && current.$$route && current.$$route.css) {
                            if (!angular.isArray(current.$$route.css)) {
                                current.$$route.css = [current.$$route.css];
                            }
                            angular.forEach(current.$$route.css, function (sheet) {
                                delete scope.routeStyles[sheet.href];
                            });
                        }
                        if (next && next.$$route && next.$$route.css) {
                            if (!angular.isArray(next.$$route.css)) {
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function (sheet) {
                                scope.routeStyles[sheet.href] = sheet;
                            });
                        }
                    });
                }
            };
        }
    ]);

})();