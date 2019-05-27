var movieAdsPlayer = function (key) {
    this.key = key;
    this.visibility = 100;
    this.imps = 0;
    this.hovered = false;
    this.playing = false;
    this.player = null;
    this.playerContainer = null;
    this.initiated = false;
    this.initTime = new Date();
    this.ref = document.referrer;
    this.plays = 0;
    this.ga = null;
    this.isPaused = false;
    this.pausedTime = null;
    this.queue = 1;
    this.muteOutgoing = [
       '0152deeeb4971dab5b5581d052428910'
    ];
    this.noSoundKeys = [
        'bcc6cf03bdf2cdd82c4f43a158591552'
    ];

    this.vpaidframe = null;
    this.vpaidframeloaded = null;

    this.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    this.postParentMessage = function (message) {
        if ((parent != window && this.muteOutgoing.indexOf(this.key) == -1) || message == 'no_more_ads') {
            window.parent.postMessage(this.config.prefix + message, '*');
        }
    };

    this.debug = function () {
        if (this.config.debug) {
            console.log.apply(console, arguments);
        }
    };

    this.session = this.guid();
    this.imp_uuid = this.guid();
    this.subs = this.guid();

    this.dynamicParams = {
        '[vt]': '100',
        '[gguid]': this.imp_uuid,
        '[subs]': this.subs,
        '[session]': this.session,
        '[it]': this.queue
    };

    // this.demoAds = 'https://tester.advertserve.com/servlet/vast3/zone?zid=33&pid=0&contextual=true';
    this.demoAds = 'https://code.moviead55.ru/inst_test.php';
    // this.demoAds = 'https://rtr.innovid.com/r1.5554946ab01d97.36996823;cb=[cb]';
    // this.demoAds = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinearvpaid2js&correlator=[cb]';

    this.config = {
        autoplay: true,
        adVolume: 0,
        volume: 0,
        adVolumeTime: 1500,
        proto: 'https',
        playerContainer: 'playercontainer',
        testAdRequired: false,
        muteWhenAutoplay: true,
        muted: true,
        trailers: 10,
        playlist: [],
        prefix: 'movieads_',
        debug: false,
        contentWithSound: false,
        adWithSound: false,
        vast_unmutehover: 0,
        override_volume_config: false
    };
    this.config.adVolumeStep = this.config.adVolume / this.config.adVolumeTime * 100;

    this.getPlayerConfig = function () {

        return {
            'autoplay': this.config.autoplay,
            "muted": this.config.muted,
            "mute": this.config.muted,
            "volume": this.config.volume,
            "vast_volume": this.config.adVolume,
            "preroll": this.prepareLink('pre',1)+' or '+this.prepareLink('pre',2)+' or '+this.prepareLink('pre',3),
            "postroll": this.prepareLink('post'),
            "file": this.shuffle(this.config.playlist),
            "id": this.config.id,
            "vast_replace": {'[gguid]': this.imp_uuid, '[subs]': this.subs, '[session]': this.session, '[vt]': this.visibility.toString()},
            "vast_unmutehover": this.config.vast_unmutehover
        };
    };

    this.checkBrowser = function() {
        var M, tem, ua;
        ua = navigator.userAgent;
        M = ua.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {
                name: 'ie',
                version: tem[1] || ''
            };
        }
        if (M[1] === 'Chrome') {
            if ((tem = ua.match(/\bOPR\/(\d+)/)) != null) {
                return {
                    name: 'opera',
                    version: tem[1]
                };
            }
            if ((tem = ua.match(/\bYaBrowser\/(\d+)/)) != null) {
                return {
                    name: 'yabrowser',
                    version: tem[1]
                };
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        return {
            name: M[0].toLowerCase(),
            version: M[1]
        };
    };

    this.logger = function(t,a,m, callback){
        var o = typeof window.location.ancestorOrigins != 'undefined' ? JSON.stringify(window.location.ancestorOrigins) : '';
        var packet = {
            t: t,
            c: this.session,
            a: a,
            m: m,
            v: this.key,
            o: o
        };

        var ret = [];
        for (var d in packet) {
            ret.push(d + '=' + encodeURIComponent(packet[d]));
        }

        var uri = ret.join('&');
        var logFrame = new Image();

        logFrame.onerror = function () {
            if (typeof callback == 'function') {
                callback();
            }
        };

        logFrame.onload = function () {
            if (typeof callback == 'function') {
                callback();
            }
        };

        logFrame.src = '//code.moviead55.ru/logger.php?'+uri;
    };

    this.firstVisibilityLogged = false;

    this.logFirstVisibility = function (visibility) {
        if (this.firstVisibilityLogged) {
            return;
        }

        this.firstVisibilityLogged = true;

        var logData = this.parseVisibility(visibility);

        // this.logger('first_visibility','',JSON.stringify(logData));
    };

    this.replaceVastParams = function (link) {
        var that = this;
        if (Object.keys(this.dynamicParams).length > 0) {
            Object.keys(this.dynamicParams).forEach(function (key) {
                link = link.replace(key, that.dynamicParams[key]);
            });
        }

        return link;
    };

    this.overrideXHROpen = function () {
        var proxied = window.XMLHttpRequest.prototype.open;
        var that = this;
        window.XMLHttpRequest.prototype.open = function() {
            arguments[1] = that.replaceVastParams(arguments[1]);
            return proxied.apply(this, [].slice.call(arguments));
        };
    };

    this.setDynamicParam = function (key, value) {
        this.dynamicParams[key] = value;
        this.player.api("update:vast_replace",this.dynamicParams);
    };

    this.parseVisibility = function (entry) {
        var obj = {};
        for (var x in entry) {
            if ( entry[x] instanceof HTMLElement || typeof entry[x] == 'function') {
                continue;
            }

            if ( typeof entry[x] != 'object' ) {
                obj[x] = entry[x];
            } else {
                obj[x] = this.parseVisibility(entry[x]);
            }
        }

        return obj;
    };

    this.initVisibilityTracker = function () {
        if (typeof IntersectionObserver != 'undefined') {
            var io = new IntersectionObserver((function (entries) {
                    for (var eKey in entries) {
                        var entry = entries[eKey];
                        this.visibility = Math.floor(entry.intersectionRatio*100);
                        this.logFirstVisibility(entry);
                        this.debug(this.visibility, entry);
                        this.setDynamicParam('[vt]', this.visibility.toString());
                    }
                }).bind(this),
                {
                    threshold: [0, 0.1,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95,1]
                }
            );

            io.observe(document.body);
        }
    };

    this.prepareLink = function (pos,tq) {
        var url = this.config.testAdRequired ? this.demoAds : this.config.proto+'://code.moviead55.ru/vmap2.php?v='+ this.key +
            '&cp.referer=' + this.ref +
            '&cp.video_id=[videoId]' +
            '&cp.title=[videoTitle]'+
            '&cp.origin='+encodeURIComponent(location.origin)+
            '&vt=[vt]' +
            '&it=[it]' +
            // '&cp.sp=yes' +
            // '&cp.page=' + encodeURIComponent(currentPls.perma_link) +
            '&cp.cb=' + this.guid() +
            '&cp.session='+ this.session +
            '&position='+ pos +
            '&cp.imp=0';

        if (typeof tq != 'undefined') {
            url = url + '&tq=' + tq;
        }

        return url;
    };

    this.onLoaded = function () {
        var loadTime = new Date();
        var time = (loadTime.getTime() - window.movieadsFrameInit.getTime())/1000;
        this.logger('player_loaded',JSON.stringify(this.checkBrowser()),JSON.stringify({loadTime: time}));

        this.debug('MOVIEADS PLAYER LOADED');

        this.setDynamicParam('[session]', this.session);
        this.setDynamicParam('[gguid]', this.imp_uuid);
        this.setDynamicParam('[subs]', this.subs);
        this.setDynamicParam('[it]', this.queue);
    };

    this.onError = function (e) {
        this.debug('Error', e);
        this.logger('player_init_error','',JSON.stringify(e));
    };

    this.initPjsPlayer = function () {
        // this.overrideXHROpen();
        this.player = new Playerjs(this.getPlayerConfig());
    };

    this.adaptConfigToBrowser = function () {
        var browser = this.checkBrowser();

        this.debug('override_volume_config', this.config.override_volume_config);
        if (this.config.override_volume_config) {
            if (browser.name == 'yabrowser') {
                this.config.vast_unmutehover = 1;
                this.config.adWithSound = false;
            }

            if (browser.name == 'yabrowser' || (browser.name == 'chrome' && parseInt(browser.version) >= 66)) {
                this.config.adWithSound = false;
                this.config.muted = true;
                this.config.adVolume = 0;
                this.config.volume = 0;
            }

            if (this.noSoundKeys.indexOf(this.key) != -1) {
                this.config.adWithSound = false;
                this.config.muted = true;
                this.config.adVolume = 0;
                this.config.volume = 0;
                this.config.vast_unmutehover = 10
            }
        }
        // if (browser.name == 'yabrowser') {
        //     this.config.vast_unmutehover = 1;
        // }
    };

    this.initPlayerWatcher = function() {
        setInterval((function () {
            var report = {
                isPlaying: this.player.api('playing'),
                isStarted: this.player.api('started'),
                isMuted: this.player.api('muted'),
                volume: this.player.api('volume'),
                log: typeof this.player.api('log') != 'undefined' ? this.player.api('log') : [],
                browser: this.checkBrowser(),
                isUserPaused: this.isPaused,
                pausedFromStart: this.pausedTime != null ? (this.initTime.getTime() - this.pausedTime.getTime())/1000 : 0,
                contentPlays: this.plays,
                vpaidframe: this.vpaidframe,
                vpaidframeloaded: this.vpaidframeloaded
            };

            // this.logger('playerjs','state',JSON.stringify(report));
        }).bind(this), 60000);
    };

    this.init = function (config) {
        if (this.initiated) {
            return;
        }

        this.initiated = true;

        var cfg = config || {};
        this.config = this.extend(this.config, cfg);

        if ('ga' in this.config) {
            this.ga = this.config.ga;
        }

        this.initVisibilityTracker();
        this.adaptConfigToBrowser();
        this.addPlayerListeners();

        this.initPjsPlayer();
        this.initPlayerWatcher();
    };

    this.addPlayerListeners = function () {
        this.playerContainer = document.getElementById(this.config.id);

        this.playerContainer.addEventListener('vast_finish', (function (e) {
            this.subs = this.guid();
            this.setDynamicParam('[subs]', this.subs);

            if (e.info == 'preroll') {
                this.plays++;

                this.queue++;
                this.setDynamicParam('[it]', this.queue);

                this.debug('Content play');

                this.postParentMessage('main_content_play');

                setTimeout((function(){
                    var isPlaying = this.player.api('playing');

                    if (!isPlaying) {
                        this.player.api('play');
                    }
                }).bind(this), 2000);

                if (this.plays == 1) {
                    setTimeout((function () {
                        var duration = this.player.api('duration');
                        this.player.api('seek', duration);
                    }).bind(this), 20000);
                }
            }

            if (e.info == 'postroll') {
            }

            this.postParentMessage('no_ads');
            this.postParentMessage('no_more_ads');
            this.debug('MovieADS: No more ads!', e);

            if (this.config.adWithSound) {
                this.player.api('unmute');
                this.player.api('mute');
            }

        }).bind(this));

        // this.player.on('adsLoaded', (function (e) {
        //     if (e.podLength > 0 || e.buffetLength > 0) {
        //         this.debug('MovieADS: Ads ready!');
        //         this.logger('adsLoaded','ads_ready',JSON.stringify(e));
        //         this.postParentMessage('ads_ready');
        //
        //         setTimeout((function () {
        //             var contentstate = this.player.getVideoState();
        //             var adsState = this.player.adPaused();
        //
        //             var logData = {
        //                 'contentState': contentstate,
        //                 'adsPaused': adsState,
        //                 'adsState': this.player.adRemainingTime(),
        //                 'playerState': this.player.getState()
        //             };
        //
        //             var browserData = this.checkBrowser();
        //
        //             this.logger('player_state',JSON.stringify(browserData),JSON.stringify(logData));
        //         }).bind(this), 5000);
        //     } else {
        //         this.debug('MovieADS: No ads!');
        //         this.postParentMessage('no_ads');
        //     }
        //
        //     if (!this.playing && this.config.autoplay && this.plays <= 5) {
        //         this.debug('MovieADS: Force play!');
        //         this.player.play();
        //     }
        // }).bind(this));

        this.playerContainer.addEventListener('vast_ready', (function (e) {
            this.debug('MovieADS: Ads ready!', e);
            this.postParentMessage('ads_ready');
        }).bind(this));

        // this.playerContainer.addEventListener('vast_load', (function (e) {
        //     this.debug('VAST LOAD', e);
        //     this.logger('ad_load', '', JSON.stringify(e));
        // }).bind(this));

        this.playerContainer.addEventListener('pause', (function (e) {
            this.isPaused = true;
            this.pausedTime = new Date();
            this.logger('player_pause', '', JSON.stringify(this.checkBrowser()));
            this.ga('send','event','player','pause',JSON.stringify(this.checkBrowser()));
        }).bind(this));

        this.playerContainer.addEventListener('stop', (function (e) {
            // this.logger('player_stop', '', JSON.stringify(this.checkBrowser()));
            this.ga('send','event','player','stop',JSON.stringify(this.checkBrowser()));
        }).bind(this));

        this.playerContainer.addEventListener('vpaidframeloaded', (function (e) {
            this.vpaidframeloaded = true;
        }).bind(this));

        this.playerContainer.addEventListener('vpaidframe', (function (e) {
            this.vpaidframe = true;
        }).bind(this));

        this.playerContainer.addEventListener('vast_Impression', (function (e) {
            this.imps++;

            this.debug(e);
            this.debug('MovieADS: Ad impression ...');

            var vastinfo = e.info;

            var proxy = !(vastinfo.url.indexOf('exchange.buzzoola.com') != -1);
            var inst = (vastinfo.url.indexOf('instreamvideo.ru') != -1);
            console.log(proxy, 'PROXY');

            if (proxy) {
                this.postParentMessage('ad_impression');
            }

            if (inst) {
                this.hideClose();
            } else {
                this.showClose();
            }

            var pushData = {visibility: this.visibility, imp_uuid: this.imp_uuid, rect: document.body.getBoundingClientRect()};

            // if (e.creativeType == 'HTML5_VIDEO') {
            //     pushData.adUrl = e.adUrl;
            //     pushData.adSystem = e.adSystem;
            // }
            //
            this.logger('ad_impression',JSON.stringify(pushData),'MovieADS: Impression!',(function () {
            }).bind(this));
        }).bind(this));

        this.hideClose = function () {
            var skipBtn = document.querySelector('#close_btn');

            if (skipBtn != null) {
                skipBtn.style.display = 'none';
            }
        };

        this.showClose = function () {
            var skipBtn = document.querySelector('#close_btn');

            if (skipBtn != null) {
                skipBtn.style.display = 'block';
            }
        };

        this.playerContainer.addEventListener('vast_complete', (function (e) {
            var vastinfo = e.info;

            var proxy = false;
            var instream = false;

            if ('info' in e && 'url' in e.info) {
                proxy = !(vastinfo.url.indexOf('exchange.buzzoola.com') != -1);
                instream = (vastinfo.url.indexOf('instreamvideo.ru') != -1);
            }

            console.log(proxy, 'PROXY');

            if (proxy) {
                this.postParentMessage('ad_roll_complete');
            }

            this.imp_uuid = this.guid();
            this.setDynamicParam('[gguid]', this.imp_uuid);
        }).bind(this));
        //
        // this.player.on('waitTimeout', (function (e) {
        //     this.debug('Ad timeout error', e);
        //     this.logger('AdError','varrando_wait_timeout', JSON.stringify(e));
        // }).bind(this));
        //
        // this.player.on('playerError', (function (e) {
        //     if (e.error) {
        //         this.player.playNext();
        //         this.plays--;
        //     }
        // }).bind(this));
        //
        // this.player.on('adError', (function (e) {
        //     if (e.isTimeout) {
        //         this.debug('MOVIEADS AD ERROR', e);
        //         e.subsession = this.subs;
        //         e.session = this.session;
        //         this.logger('AdError','varrando_timeout', JSON.stringify(e));
        //     }
        // }).bind(this));

        // this.player.on('playing', (function (e) {
        //     if (!this.player.muted()) {
        //         this.player.muted(true);
        //     }
        //
        //     this.debug('Play: ' + this.plays.toString());
        //
        //     var button = document.querySelector('.vr-ad-controls .vr-icon');
        //     button.style.removeProperty('visibility');
        // }).bind(this));

        this.playerContainer.addEventListener('start', (function () {
            this.onLoaded();
        }).bind(this));
    };

    this.shuffle = function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };

    this.extend = function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    };
};