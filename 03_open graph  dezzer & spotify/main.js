infos_station = '';
typeaheadtext = '';
canaudioad = true;
trackbuyurl = '';
lastitunessearch = '';
canupdateonair = true;
shoutcastattempt = 0;
var t;
var trackList;
$(document).ready(function() {
    //facebook open graph
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '597312443700897',
            xfbml      : true,
            version    : 'v2.0'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  // Handler for .ready() called.
  $('.help').popover();
  $('input.ckrds').prettyCheckable();

	//player handle			
	$("#rplayer").jPlayer({
			ready: function (event) {
					$(this).jPlayer("setMedia", {
						mp3:"http://vipicecast.yacast.net/europe1.mp3",
						m4a:"http://wma08.fluidstream.net:3614/"
					});
				},
			error: function (event) {
				if (event.jPlayer.error.type != $.jPlayer.error.URL_NOT_SET) {
					if (shoutcastattempt == 0) {
						shoutcastattempt = 1;
					    playShoutCast(';stream');
					}else{
						if (shoutcastattempt == 1) {
							shoutcastattempt = 2;
						    playShoutCast('/;stream.nsv');
						}else{
							shoutcastattempt = 0;
							//if (sitelang == 'fr'){ alert('La lecture du flux a échoué'); }
					    	//else { alert('Stream playing failed'); }
						}
					}
				}
			},
			//swfPath: "js",
			swfPath: "http://www.jplayer.org/latest/js/Jplayer.swf",
			supplied: "mp3,m4a",
			preload: 'metadata',
			solution: "html,flash",
			volume: 0.8,
			muted: false,
			cssSelectorAncestor: '.channel-player',
			cssSelector: {			
				play: '.rl-play',
				pause: '.rl-pause',
				mute: '.rl-mute',
				unmute: '.rl-unmute',				
				seekBar: '.rl-seek-bar',
				playBar: '.rl-play-bar',
				volumeBar: '.rl-volume-bar',
				volumeBarValue: '.rl-volume-bar-value',
				volumeMax: '.rl-volume-max',
				currentTime: '.rl-current-time',
				duration: '.rl-duration'
				},
			errorAlerts: false,
			warningAlerts: false
			
		});

	$("a").onclick = goUrl;
	
	/*carousel */
	// Default first carousel in home
	//if($(".rcarousel").length){	 	$('.rcarousel').carouFredSel({ auto: false,prev: ' .prev1',next: '.next1',items   : 4});
	//}	
	
	//if($(".rcarousel2").length){	 	$('.rcarousel2').carouFredSel({ auto: false,prev: ' .prev2',next: '.next2',items   : 4});
	//}
	
	$(".tabs-right li a").click(function(){		
		//set tile for tab after change tab		
		if( $('.section-dynamic-header').length ){
			$(this).parents(".section").find(".section-dynamic-header h2").html($(this).children("span").html());		
		}
	});	
		
	$("#mcarousel1" ).carouFredSel({auto:false});
	//$("#mcarousel2" ).carouFredSel({auto:false});
	$("#mcarousel3" ).carouFredSel({auto:false});
	$("#mcarousel0" ).carouFredSel({ 	auto:false, prev: ' .prev3', next: '.next3', items   : 4,		synchronise	: [ ["#mcarousel1", true, true, 0], ["#mcarousel2", true, true, 0],	["#mcarousel3", true, true, 0]] });
	
	
	
	
	alc_carousel();

	$(".i-albtrack").click(function(){
		setTimeout("alc_carousel()", 100);		
	});		
	$(".i-tsing").click(function(){
		setTimeout("sig_carousel()", 100);		
	});		
	$(".i-fsing").click(function(){
		setTimeout("fsig_carousel()", 100);		
	});		
	$(".i-albmood").click(function(){
		setTimeout("msig_carousel()", 100);		
	});		


	
		
	$('#home-rcarousel .loadmore a.i-load').click(function(){
			
		var classname = "rcarousel";
	
		var arrRcarouselItem = new Array();
		arrRcarouselItem.push(new RcarouselItem("img/album/album1.jpg", "img/channel/channel1.png", "Fun Radio", "Get Lucky", "Daft Punk"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album2.jpg", "img/channel/channel2.png", "Europe1", "Nicolas Canteloup", "Revue de presque"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album3.jpg", "img/channel/channel3.png", "France Info", "Human Qualities", "Explosion In The Sky"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album4.jpg", "img/channel/channel4.png", "France Culture", "FrÃ©dÃ©ric TaddeÃ¯", "Le Point Culture"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album1.jpg", "img/channel/channel1.png", "Fun Radio", "Get Lucky", "Daft Punk"));
		str = generate_rcarousel(classname, arrRcarouselItem);
		
		$("#selection .list_carousel").append(str);
		
		$('.'+classname).carouFredSel({  
			auto: false,
			duration : 5000,
			items: 4,
			prev: '.prev1',			
			next: '.next1',
			synchronise: [ ".rcarousel", true, true, 0]
		});
		
		$('.'+classname).carouFredSel({  
			auto: false,
			duration : 5000,
			items: 4,
			prev: '.prev2',			
			next: '.next2',
			synchronise: [ ".rcarousel2", true, true, 0]
		});
		
		
	});
	
	$('#moods-carousel .loadmore a.i-load').click(function(){
			
		var classname = "mcarousel",
				i = 5;
	
		var arrRcarouselItem = new Array();
		arrRcarouselItem.push(new RcarouselItem("img/album/album1.jpg", "img/channel/channel1.png", "Fun Radio", "Get Lucky", "Daft Punk"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album2.jpg", "img/channel/channel2.png", "Europe1", "Nicolas Canteloup", "Revue de presque"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album3.jpg", "img/channel/channel3.png", "France Info", "Human Qualities", "Explosion In The Sky"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album4.jpg", "img/channel/channel4.png", "France Culture", "FrÃ©dÃ©ric TaddeÃ¯", "Le Point Culture"));
		arrRcarouselItem.push(new RcarouselItem("img/album/album1.jpg", "img/channel/channel1.png", "Fun Radio", "Get Lucky", "Daft Punk"));
		str = generate_rcarousel(classname, arrRcarouselItem);
		
		$("#moods .list_carousel").append(str);
		
		$('.'+classname).carouFredSel({  
			auto: false,
			duration : 5000,
			items: 4,
			prev: '.prev3',			
			next: '.next3',
			synchronise: ".mcarousel"
		});
	});
	
	
	$('#asignin').click(function(){
		$('#modalcontent').html('');
		$.ajax({
			type : 'GET',
			url : '/signin/1',
			timeout: 3000,
            success: function(data) {
            	$('#modalcontent').html(data); 
            },
            error: function() {
            	$('#modalcontent').html('Failed Request. Please retry later!');
            }
		});
	});		
	
	playerdisplayed = false;
	currentRadiolink = '';
    document.cookie = 'PillowLocale=fr_FR; ' + document.cookie;
	$.ajaxSetup({
		headers: {
			Cookie3: 'PillowLocale=fr_FR'
		}
	});
	
	$('#myCarouselAutoPromo').carousel();
	
	$('#typeahead').typeahead({

	    source: function (query, process) {
	    	canmodal = false;
	        $.getJSON(
	            '/Pillow/suggest/all/'+query,
	            { query: query },
	            function (data) {
	                return process(data.body.content);
	            });
	        canmodal = true;
	        return true;
	    },
	    minLength : 3,
	    items : 8
	});
	
	$('#typeahead').on('change', function(event){
		
		$('#li1').removeClass('active'); 
		$('#li2').removeClass('active'); 
		$('#li3').removeClass('active');
		if (event.target.value != ''){
			keyword = event.target.value;
		}else {
			keyword = typeaheadtext;
			$('#typeahead').val(keyword);
		}
		canmodal = false;
		goUrl('/s-' + keyword);
		canmodal = true;
		$('#pleaseWaitDialog').modal('hide');

	});
	
	initAOnClick();
	
	cnilalertaccepted = readCookie('cnilalertaccepted');
	if (cnilalertaccepted == null) $('#cnildisplay').show('slow');
	if (autoconnect == 'true'){
		$('#myConnection').modal('show');
	}
	
 });	 //end  handler

canmodal = true;

function initAOnClick(){
	$('a').not( ".nogoUrl" ).on("click", function(){
		  goUrl($(this ).attr("href"));
		  return false;
	});
}
// album item object	

function RcarouselItem(url_image_album,url_image_channel,alt,title,author) {
	this.url_image_album = url_image_album;
	this.url_image_channel = url_image_channel;
	this.alt = alt;
	this.title = title;
	this.author = author;
	
	this.generate_item = function()
	{
		var str = '';
		
		str+='<li class="item">';
		
			str+='<img src="'+url_image_album+'" alt="" />';
			str+='<div class="mask text-right">';
				str+='<img class="schannel" src="'+this.url_image_channel+'" alt="'+alt+'"/>';
				str+='<h3>'+alt+'</h3>';
				str+='<span class="title">'+this.title+'</span>';
				str+='<span class="author">'+this.author+'</span>';  												
			str+='</div>';
			
			str+='<div class="action-mask">';
					str+='<a href="#" class="s2 action favourite"></a>';
					str+='<a href="#" class="s2 action play"></a>';
					str+='<a href="#" class="s2 action overview"></a>';
			str+='</div>';
			
		str+='</li>';
		
		return str;
	}
}







// handle to generate carousel 
function generate_rcarousel(classname, arrRcarouselItem) {
	var str='<ul class="'+classname+'">';
	
	arrRcarouselItem.forEach(function(rcarouselItem) {
		str+=rcarouselItem.generate_item();
	});
	
	str+='</ul>';
	
	return str;
}

function tabCarousel(carouselName, prev, next) {
	$(carouselName).carouFredSel({
		auto: false,
		prev: prev,
		next: next,
		items   : 4,
		synchronise: [ carouselName, true, true, 0]
	});
}

function alc_carousel(){
	$("#alc-carousel1" ).carouFredSel({auto:false});
	$("#alc-carousel2" ).carouFredSel({auto:false});	
	$("#alc-carousel0" ).carouFredSel({ auto:false, prev: ' .prev3',	next: '.next3', items   : 4,	synchronise	: [	["#alc-carousel1", true, true, 0],	["#alc-carousel2", true, true, 0]]	});
}

function sig_carousel(){
	$("#sig-carousel1" ).carouFredSel({auto:false});
	$("#sig-carousel2" ).carouFredSel({auto:false});	
	$("#sig-carousel0" ).carouFredSel({ auto:false, prev: ' .prev3',	next: '.next3', items   : 4,	synchronise	: [	["#sig-carousel1", true, true, 0],	["#sig-carousel2", true, true, 0]]		});
}
function fsig_carousel(){
	$("#fsig-carousel1" ).carouFredSel({auto:false});
	$("#fsig-carousel2" ).carouFredSel({auto:false});
	
	$("#fsig-carousel0" ).carouFredSel({ auto:false, prev: ' .prev3',	next: '.next3', items   : 4,	synchronise	: [	["#fsig-carousel1", true, true, 0],	["#fsig-carousel2", true, true, 0]]	});
}
function msig_carousel(){
	$("#msig-carousel1" ).carouFredSel({auto:false});
	$("#msig-carousel2" ).carouFredSel({auto:false});
	
	$("#msig-carousel0" ).carouFredSel({ auto:false, prev: ' .prev3',	next: '.next3', items   : 4,	synchronise	: [	["#msig-carousel1", true, true, 0],	["#msig-carousel2", true, true, 0] ]	});
}

function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
    	var ua = navigator.userAgent;
    	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    	if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
	}
	return rv;
}

function playStation(permalink){
	
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ver = getInternetExplorerVersion();
		if (ver <= 9.0){
			document.location = 'http://www.liveradio.fr/#live/' + permalink;
			return false;
		}
	}
	
	//if (canaudioad == true) return checkAudioAd(permalink);
	
	$("#divbr").show();
	$("#player_cover_div").empty();
	$("#player_onair_div").empty();
	$("#player_station_name_div").empty();
	
	$("#divplayer").fadeIn("slow");

	
	infos_station = [];
    counter(permalink);

//	$.getJSON('/Pillow/' + permalink.replace('/', '__') + '/play', function(data)
	$.getJSON('/Pillow/' + permalink + '/play', function(data)
	{
		var infos = {};
		infos['name'] = data.path[0].name;
		
		if (typeof data.path[0].onAir != 'undefined') infos['onAir'] = data.path[0].onAir;
		else infos['onAir'] = data.path[0].baseline;
		
		infos['img'] = data.path[0].smallLogo;
		
		var c = data.body.content.streams.length;
		if (typeof data.body.content.streams[0].url != 'undefined' && typeof data.body.content.streams[0].format != 'undefined') {
			infos['url'] = data.body.content.streams[0].url;
			infos['format'] = data.body.content.streams[0].format;
		}
		for(var i = 0; i < c; i++)
		{
			if(data.body.content.streams[i].format == 'mp3' || c == 1)
			{
				infos['url'] = data.body.content.streams[i].url;
				infos['format'] = data.body.content.streams[i].format;
				infos['isShoutcast'] = data.body.content.streams[i].isShoutcast;
				break;
			}
		}
		
		infos_station = infos;
		
		if (infos['onAir'].length > 42) infos['onAir'] = '<div width="340px;"><marquee width="340px;" scrollamount="2">' + infos['onAir'] + '</marquee></div>';
		
		if (infos['name'].length > 45) infos['name'] = infos['name'].slice(0,44) + '...';
		
		$("#player_cover_div").empty();
		$("#player_onair_div").empty();
		$("#player_station_name_div").empty();
		
		$("#player_cover_div").append('<img src="'+infos['img']+'" alt="" width="66" height="66" />');
		$("#player_onair_div").append(infos['onAir']);
		$("#player_station_name_div").append(infos['name']);
		
		//if (infos['isShoutcast'] == true) infos['url'] = infos['url'] + ';stream';
		if (typeof infos['url'] != 'undefined'){
			if (infos['format'] == 'mp3') $("#rplayer").jPlayer("setMedia", {
				mp3 : infos['url']
			});
			else $("#rplayer").jPlayer("setMedia", {
					m4a : infos['url']
				});
			$("#rplayer").jPlayer("play");
		}
		
		
		//$('#playerflash').html('<div id="playerflash"><object id="audioplayer_1" name="audioplayer_1" data="/~znadri/radioline.co/web/js/player.swf" type="application/x-shockwave-flash" height="1" width="1"><param value="1" name="width"><param value="#FFFFFF" name="bgcolor"><param value="transparent" name="wmode"><param value="false" name="menu"><param value="animation=yes&amp;encode=yes&amp;initialvolume=60&amp;remaining=no&amp;noinfo=no&amp;buffer=5&amp;checkpolicy=no&amp;rtl=no&amp;bg=E5E5E5&amp;text=333333&amp;leftbg=CCCCCC&amp;lefticon=333333&amp;volslider=666666&amp;voltrack=FFFFFF&amp;rightbg=B4B4B4&amp;rightbghover=999999&amp;righticon=333333&amp;righticonhover=FFFFFF&amp;track=FFFFFF&amp;loader=009900&amp;border=CCCCCC&amp;tracker=DDDDDD&amp;skip=666666&amp;soundFile='+infos['url']+'&playerID=audioplayer_1" name="flashvars"></object></div>');
		//AudioPlayer.embed("audioplayer_1", {soundFile:infos['url']});

		if (data.path[0].type == 'chapter') {
			//$("#pauseButton").css("margin-top",'-13px');
			$("#pauseButton").removeClass("rl-stop");
			$("#pauseButton").addClass("rl-pause");
			currentRadiolink = 'podcast/podcast-p-' + data.path[0].podcastPermalink.replace('podcasts/', '') + '.html';
			$('#duration').show();
			
		}
		else  {
			$("#pauseButton").removeClass("rl-pause");
			$("#pauseButton").addClass("rl-stop");
			//$("#pauseButton").css("margin-top",'13px');
			currentRadiolink = 'radio/radio-r-' + data.path[0].permalink.replace('radios/', '') + '.html';
			$('#duration').hide();
			
		}
		
		if (typeof permalinkCurrent == 'undefined' || permalinkCurrent != permalink) playStation(permalink);
			
		permalinkCurrent = permalink;
		updateOnAir();
		setInterval('updateOnAir()', 30000);
	});
}
function counter(permalink){
    //counting time in order to publish open graph on facebook
    FB.getLoginStatus(function(response) {
	if (response.status === 'connected') {
		var timer=5000;
    		clearTimeout(t);
    		t = setTimeout(function(){publishOg(permalink);},timer);
	}else if (response.status === 'not_authorized') {
    	console.log("the user is logged  to Facebook, but has not authenticated your app");
  	} else {
    	console.log("the user isn't logged in to Facebook.");
  	}
});
}
function publishOg(permalink){
    //console.log(permalink);
    if(permalink.indexOf('radios') != -1){

         FB.api(
         'me/music.listens',
         'post',
         {
         song: 'http://fr-fr.radioline.co/radio/radio-r-'+permalink.replace('radios/','')+'.html'
         },
         function (response) {
            if (response && !response.error) {

                if (!response) {
                    console.log('Error occurred.');
                } else if (response.error) {
                    console.log(response.error);
                    alert(response.error.message);
                } else {
                    console.log('Post ID: ' + response.id);
                }
            }
         }
         );

    }else if(permalink.indexOf('chapters') != -1){

        $.getJSON('/Pillow/' + permalink , function(data){
            var p = data.body.content.podcastPermalink;
            FB.api(
             'me/music.listens',
             'post',
             {
             song: 'http://fr-fr.radioline.co/podcast-p-'+ p.replace('podcasts','')+'.html'
             },
            function (response) {
                if (response && !response.error) {

                    if (!response) {
                        console.log('Error occurred.');
                    } else if (response.error) {
                        console.log(response.error);
                        alert(response.error.message);
                    } else {
                        console.log('Post ID: ' + response.id);
                    }
                }
            }
             );

        });


    }else{
        console.log('error');
    }
}

function publishOgTrack(stationpermalink, singerpermalink){
    FB.api(
        'me/music.listens',
        'post',
        {
            song: stationpermalink,
            musician: singerpermalink
        },
        function (response) {
            if (response && !response.error) {

                if (!response) {
                    console.log('Error occurred.');
                } else if (response.error) {
                    console.log(response.error);
                    alert(response.error.message);
                } else {
                    console.log('Post ID: ' + response.id);
                }
            }
        }
    );
}


function playShoutCast(supp_string){
	//if (infos_station['isShoutcast'] != true) return false;
	if (typeof infos_station['url'] == 'undefined') return false;
	if (infos_station['format'] == 'mp3') $("#rplayer").jPlayer("setMedia", {
		mp3 : infos_station['url'] + supp_string
	});
	else $("#rplayer").jPlayer("setMedia", {
			m4a : infos_station['url'] + supp_string
		});
	$("#rplayer").jPlayer("play");
}

function playPodcast(permalink, url){
	$.getJSON('/Pillow/' + permalink + '/chapters', function(data)
	{
		if (typeof data.body.content[0].permalink != 'undefined') playStation(data.body.content[0].permalink);
	});
	goUrl(url);
	return false;
}

function updateOnAir()
{
	if (canupdateonair == false) return false;
	canupdateonair = false;
	setTimeout(function(){canupdateonair = true;}, 20000);
	
	if(permalinkCurrent != undefined)
	{
//		$.getJSON('/Pillow/' + permalinkCurrent.replace('/', '__') + '/live', function(data)
		$.getJSON('/Pillow/' + permalinkCurrent + '/live', function(data)
		{
			var infos = {};
			infos['onAir'] = data.path[0].baseline;
			if (typeof data.path[0].onAir != 'undefined') infos['onAir'] = data.path[0].onAir;
			else{
				if (typeof data.body.content.show != 'undefined'){
				    if (typeof data.body.content.show.name != 'undefined') infos['onAir'] = data.body.content.show.name;
				}else{
					if (typeof data.body.content.track != 'undefined'){
						if (typeof data.body.content.track.name != 'undefined' && typeof data.body.content.track.artist.name != 'undefined') infos['onAir'] = data.body.content.track.name + ' - ' + data.body.content.track.artist.name;
						else infos['onAir'] = data.path[0].baseline;
					}
				}
				
			}
			
			if (infos['onAir'].length > 42) infos['onAir'] = '<div width="340px;"><marquee width="340px;" scrollamount="2">' + infos['onAir'] + '</marquee></div>';
			checkAffItunes(data);
			$("#player_onair_div").empty();
			$("#player_onair_div").append(infos['onAir']);
		});
	}
}

function playNewLive()
{
	if($("#duration").css("display")=="none"){
		if(permalinkCurrent != undefined)
		{
			//$.getJSON('/Pillow/' + permalinkCurrent.replace('/', '__') + '/live', function(data)
			$.getJSON('/Pillow/' + permalinkCurrent + '/play', function(data)
			{
				
				var infos = {};
				infos['name'] = data.path[0].name;
				if (typeof data.body.content.streams[0].url != 'undefined' && typeof data.body.content.streams[0].format != 'undefined') {
					infos['url'] = data.body.content.streams[0].url;
					infos['format'] = data.body.content.streams[0].format;
				}
				if (infos['format'] == 'mp3') $("#rplayer").jPlayer("setMedia", {
					mp3 : infos['url']
				});
				else $("#rplayer").jPlayer("setMedia", {
						m4a : infos['url']
					});
				$("#rplayer").jPlayer("play");
				
			});
		}
	}	
}

function checkAffItunes(data){
	//affiliation
	if (typeof data.body.content.track != 'undefined'){
		track = 'null';
		singer = 'null';
		if (typeof data.body.content.track.name != 'undefined') track = data.body.content.track.name;
		if (typeof data.body.content.track.artist.name != 'undefined') singer = data.body.content.track.artist.name;
        if (typeof data.body.content.track.artist.permalink != 'undefined') singerPermalink = data.body.content.track.artist.permalink;

        if (lastitunessearch == track + ' ' + singer) return false;
		
		lastitunessearch = track + ' ' + singer;
        var isLogin = false;
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                isLogin = true;
            }else if (response.status === 'not_authorized') {
                console.log("the user is logged in to Facebook, but has not authenticated your app");
            } else {
                console.log("the user isn't logged in to Facebook.");
            }
        });

		if (track != 'null'){
            if(isLogin){
                //Open Graph + track
                var inList = false ;
                for(var i=0;i<trackList.length;i++){
                    if(trackList[i] == track){
                        inList = true;
                    }
                }
                if(!inList){
                    trackList.push(track);
                    publishOgTrack('http://fr-fr.radioline.co/radio/'+track+'from'+singerPermalink.replace('people/','')+'-r-'+data.path[0].permalink.replace('radios/','')+'.html','http://fr-fr.radioline.co/people/1-people-'+track.artist.permalink.replace('people/','')+'.html');
                }
            }
			var xhr = $.ajax({
				url: $('#website_root').text()+'itunessearch/'+singer+'/'+track
			}).success(function(data) {
				if (data == 'NOK') $("#buytrackdiv").hide();
				else{
					trackbuyurl = data;
					$("#buytrackdiv").show();
				}
				
			});
		}else{
			$("#buytrackdiv").hide();
		}
	}else{
		$("#buytrackdiv").hide();
	}
}
function affitunesopen(){
	if (trackbuyurl != '') window.open(trackbuyurl);
	return false;
}
function goUrl(e)
{
	if (canmodal == true) $('#pleaseWaitDialog').modal('show');
	
	
	var xhr = $.ajax({
		url: e
	}).success(function(data) {
		$("#main_container").empty();
		$("#main_container").append(data);
		$('#pleaseWaitDialog').modal('hide');
		
	}).error(function(jqXHR, textStatus) {
		$('#pleaseWaitDialog').modal('hide');
		
		return false;
	});

}

function loadMyConnectionBloc(e){
	var xhr = $.ajax({
		url: e
	}).success(function(data) {
		$("#signup2").empty();
		$("#signup2").append(data);
		$("#signup1").css('display', 'none');
		$("#signup2").css('display', 'block');
	});
}

function submitContactForm(url){
	if(checkContactForm()){
		$.post( "contact", $( "#formContact" ).serialize(), function(result){
			$("#contact1").show();
			$("#contact2").hide();
		  });
	}	
}

function checkContactForm(){
	name = $('#inputfirstname').val();
	if ( name == ''){
    	$('#alertdiv11').empty();
    	if (sitelang == 'fr'){ $('#alertdiv11').append('Veuillez entrer un nom'); }
    	else { $('#alertdiv11').append('Please enter a nom'); }
    	$('#alertdiv11').show();
    	return false;
    }
	
	email = $('#inputemail').val();
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
   
	if (pattern.test(email) == false){
    	$('#alertdiv11').empty();
    	if (sitelang == 'fr'){ $('#alertdiv11').append('Veuillez entrer un email valide'); }
    	else { $('#alertdiv11').append('Please enter a valid email'); }
    	$('#alertdiv11').show();
    	return false;
    }
	
	platformType = $('#platformType').val();
	if( platformType == null){
		$('#alertdiv11').empty();
    	if (sitelang == 'fr'){ $('#alertdiv11').append("Veuillez choisir un type d'application"); }
    	else { $('#alertdiv11').append('Please select a apllication type'); }
    	$('#alertdiv11').show();
    	return false;
	}
	
	messageType = $('#messageType').val();
	if( messageType == null){
		$('#alertdiv11').empty();
    	if (sitelang == 'fr'){ $('#alertdiv11').append('Veuillez choisir un type de demande'); }
    	else { $('#alertdiv11').append('Please select a demande type'); }
    	$('#alertdiv11').show();
    	return false;
	}
	
	message = $('#message').val();
	if ( message == ''){
    	$('#alertdiv11').empty();
    	if (sitelang == 'fr'){ $('#alertdiv11').append('Veuillez entrer un message'); }
    	else { $('#alertdiv11').append('Please enter a message'); }
    	$('#alertdiv11').show();
    	return false;
    }
	return true;
}

function share (url, network, text){
	if (network == 'facebook') {
		link = 'https://www.facebook.com/sharer/sharer.php?u='+url;
		window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=380,width=600');
	}
	if (network == 'twitter') {
		//link = 'http://www.twitter.com/share?url='+url+'&text=Radioline, Ã©couter en ligne 35,000 web radios et podcasts&via=Radioline_app';
		link = 'https://twitter.com/intent/tweet?hashtags=radioline&resources%2Fbuttons&text='+text+'&tw_p=tweetbutton&url='+url+'&via=Radioline_app';
		window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=260,width=600');
	}
	if (network == 'google') {
		link = 'https://plus.google.com/share?url='+url;
		window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	}
	return false;
}

function signup(nurl){
	email = $('#email').val();
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
   
	if (pattern.test(email) == false){
    	$('#alertdiv2').empty();
    	if (sitelang == 'fr'){ $('#alertdiv2').append('Veuillez entrer un email valide'); }
    	else { $('#alertdiv2').append('Please enter a valid email'); }
    	$('#alertdiv2').show();
    	return false;
    }
	
	login = email.replace('.', '_');
	login = login.replace('.', '_');
	login = login.replace('@', '_');
	
	$.getJSON('/Pillow/session/test_available/' + login, function(data)
	{
		if (data.body.content == false){
			$('#alertdiv2').empty();
			if (sitelang == 'fr'){ $('#alertdiv2').append('Cette adresse e-mail est déjà liée à un compte'); }
			else {$('#alertdiv2').append('This email address is already connected to an account');}
	    	$('#alertdiv2').show();
	    	return false;
		}
		password = $('#password').val();
	    if (password == ''){
	    	$('#alertdiv2').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv2').append('Veuillez entrer un mot de passe'); }
	    	else { $('#alertdiv2').append('Please enter a password'); }
	    	$('#alertdiv2').show();
	    	return false;
	    }
	    password2 = $('#password2').val();
	    if (password != password2){
	    	$('#alertdiv2').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv2').append('Les deux mots de passe sont différents'); }
	    	else { $('#alertdiv2').append('The two passwords are different'); }
	    	$('#alertdiv2').show();
	    	return false;
	    }
	    /*gender = $('#gender').val();
	    if (gender == ''){
	    	$('#alertdiv').empty();
	    	$('#alertdiv').append('Erreur : Merci d\'indiquer votre genre');
	    	$('#alertdiv').show();
	    	return false;
	    }*/
	    day = $('#day').val();
	    month = $('#month').val();
	    year = $('#year').val();
	    
	    birthDate = year + '-' + month + '-' + day;
	    
	    var dtRegex = new RegExp(/\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/);
	    
	    if (dtRegex.test(birthDate) == false){
	    	$('#alertdiv2').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv2').append('Veuillez entrer une date de naissance valide'); }
	    	else { $('#alertdiv2').append('Please enter a valid date of birth'); }
	    	$('#alertdiv2').show();
	    	return false;
	    }
	    country = $('#country').val();
	    
	    if (country == ''){
	    	$('#alertdiv2').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv2').append('Veuillez sélectionner votre pays'); }
	    	else { $('#alertdiv2').append('Please select your country'); }
	    	$('#alertdiv2').show();
	    	return false;
	    }
	    
	    profession = $('#profession').val();
	    
	    if (profession == ''){
	    	$('#alertdiv2').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv2').append('Veuillez sélectionner votre profession'); }
	    	else { $('#alertdiv2').append('Please select your profession'); }
	    	$('#alertdiv2').show();
	    	return false;
	    }
	    
	    $.post( "ajaxsignupsubmit", $( "#signupform" ).serialize(), function(result){
			if (result.body.type == 'error'){
				$('#alertdiv2').empty();
		    	$('#alertdiv2').append(result.body.content.message);
		    	$('#alertdiv2').show();
		    	return false;
			}
			if (result.body.type == 'single'){
				loadMyConnectionBloc(nurl);
				return true;
			}
			
		});
	});
}

function signin(){
	email = $('#inputEmail').val();
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
   
	if (pattern.test(email) == false){
    	$('#alertdiv').empty();
    	if (sitelang == 'fr'){ $('#alertdiv').append('Entrer un e-mail valide'); }
    	else { $('#alertdiv').append('Please enter a valid email address'); }
    	$('#alertdiv').show();
    	return false;
    }
	
	password = $('#inputPassword').val();
    if (password == ''){
    	$('#alertdiv').empty();
    	if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez entrer votre mot de passe'); }
    	else { $('#alertdiv').append('Please enter your password'); }
    	$('#alertdiv').show();
    	return false;
    }
    
    $.post( "ajaxsigninsubmit", $( "#signinform" ).serialize(), function(result){
    	if (result.body.type == 'single'){
    		website_root = $('#website_root').text();
    		document.location = website_root;
    		return true;
    	}
		
		if (result.body.content['status'] == 'Bad Request' || result.body.content['status'] == 'Not Found'){
			$('#alertdiv').empty();
			if (sitelang == 'fr'){ $('#alertdiv').append('Mauvais e-mail ou mot de passe'); }
			else { $('#alertdiv').append('Wrong email or password'); }
		    $('#alertdiv').show();
		    return false;
		}
		$('#alertdiv').empty();
		if (sitelang == 'fr'){ $('#alertdiv').append('Une erreur est survenue. Merci d\'essayer à nouveau'); }
		else { $('#alertdiv').append('An error has occurred. Please retry again later'); }
	    $('#alertdiv').show();
	    return false;
		
	});
}

function logout(){
	$.getJSON($('#website_root').text() + 'logout', function(data)
	{
		document.location = $('#website_root').text();
	});
}

function addpreset(afav, permalink){

	if (afav.hasClass('active') == true) return false;
	
	$.getJSON($('#website_root').text() + 'addpreset?permalink=' + permalink, function(data)
	{
		if (data == 'NOT CONNECTED') return false;
		afav.addClass('active');
		afav.attr('data-toggle', 'tooltip');
		afav.attr('data-placement', 'right');
		
		if (sitelang == 'fr'){ afav.attr('data-original-title', 'Ajouté aux favoris'); }
		else { afav.attr('data-original-title', 'Added to favourites'); }
		
		afav.tooltip('show');
		setTimeout(function(){afav.tooltip('hide');}, 2000);
		return true;
	});
    publishOg(permalink);
}

function removepreset(index, permalink){
	$('#myPresetsConfirm').modal('show');
	$('#btnYes').click(function() {
		$.getJSON($('#website_root').text() + 'removepreset?permalink=' + permalink, function(data)
		{
			if (data == 'NOT CONNECTED') return false;
			$('#lif' + index).hide();
			$('#myPresetsConfirm').modal('hide');
			return true;
		});
	});
}

function signupFacebook()
{
	
    FB.login(function(response) {
       if (response.authResponse)
       {
    	   FB.api('/me', function(response) {
    		 // alert('{ id: "'+response.id+'", birthday: "'+response.birthday+'", email : "'+ response.email +'", first_name : "'+ response.first_name +'", gender : "'+ response.gender +'", last_name : "'+response.last_name+'", locale : "'+response.locale+'", location : "'+response.location.name +'" }');
    		  
    		  a = response.location.name.split(', ');
    		  
    		  $.post( $('#website_root').text() + 'ajaxsignupfacebooksubmit', { id: response.id , birthday: response.birthday, email : response.email, first_name : response.first_name, gender : response.gender, last_name : response.last_name, locale : response.locale, location : response.location.name }, function(result){
    			  if (result.body.type == 'error' && result.body.content.status == 'Conflict'){
    				  loginFacebook(response.id);
    				  return false;
    			  }
    			  if (result.body.type == 'single'){
    				  loginFacebook(response.id);
    				  return false;
    			  }
    			  $('#alertdiv').empty();
	  		      $('#alertdiv').append(result.body.content.message);
	  		      $('#alertdiv').show();
	  		      return false;
    		  });
    		  
    		  
    		   return false;
    		  
    	   });

        } else
        {
        	$('#alertdiv').empty();
        	  if (sitelang == 'fr'){ $('#alertdiv').append('L\'autorisation a échoué'); }
        	  else { $('#alertdiv').append('Authorization failed.'); }
		      $('#alertdiv').show();
		      return false;
       
        }
     },{scope: 'email'});

}

function loginFacebook(id){

	if (id == 0){
		FB.login(function(response) {
		       if (response.authResponse)
		       {
		    	   FB.api('/me', function(response) {
		    		 logFB(response.id);

		    	   });

		        } else
		        {
		        	$('#alertdiv').empty();
		        	if (sitelang == 'fr'){ $('#alertdiv').append('L\'autorisation a échoué'); }
		        	else { $('#alertdiv').append('Authorization failed.'); }
				      $('#alertdiv').show();
				      return false;
		       
		        } 
		     },{scope: 'email'});
	}else {
		logFB(id);
	}
	
}

function logFB(id){
	$.post( $('#website_root').text() +'logfb', { id: id }, function(result){
    	if (result.body.type == 'single'){
    		website_root = $('#website_root').text();
    		document.location = website_root;
    		return true;
    	}
		
	});
}


function updateUser(){
	$('#alertdivyes').hide();
	email = $('#email').val();
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
   
	if (pattern.test(email) == false){
    	$('#alertdiv').empty();
    	if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez entrer un e-mail valide'); }
    	else { $('#alertdiv').append('Please enter a valid email address'); }
    	$('#alertdiv').show();
    	return false;
    }
	
	login = email.replace('.', '_');
	login = login.replace('.', '_');
	login = login.replace('@', '_');
	
	/*$.getJSON('/Pillow/session/test_available/' + login, function(data)
	{
		if (data.body.content == false){
			$('#alertdiv').empty();
			if (sitelang == 'fr'){ $('#alertdiv').append('Cette adresse e-mail est déjà liée à un compte'); }
	    	else { $('#alertdiv').append('This email address is already connected to an account'); }
	    	$('#alertdiv').show();
	    	return false;
		}*/
		
		if ($('#newpassword').val() != ''){
			if ($('#password').val() == ''){
				$('#alertdiv').empty();
				if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez entrer votre mot de passe actuel'); }
		    	else { $('#alertdiv').append('Please enter your current password'); }
		    	$('#alertdiv').show();
		    	return false;
			}
			if ($('#confirmationpassword').val() != $('#newpassword').val()){
				$('#alertdiv').empty();
		    	if (sitelang == 'fr'){ $('#alertdiv').append('Les deux mots de passe sont différents'); }
		    	else { $('#alertdiv').append('The two passwords are different'); }
		    	$('#alertdiv').show();
		    	return false;
			}
		}
	
	    day = $('#day').val();
	    month = $('#month').val();
	    year = $('#year').val();
	    
	    birthDate = year + '-' + month + '-' + day;
	    
	    var dtRegex = new RegExp(/\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/);
	    
	    if (dtRegex.test(birthDate) == false){
	    	$('#alertdiv').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez entrer une date de naissance valide'); }
	    	else { $('#alertdiv').append('Please enter a valid date of birth'); }
	    	$('#alertdiv').show();
	    	return false;
	    }
	    country = $('#country').val();
	    if (country == ''){
	    	$('#alertdiv').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez sélectionner votre pays'); }
	    	else { $('#alertdiv').append('Please select your country'); }
	    	$('#alertdiv').show();
	    	return false;
	    }
	    
	    profession = $('#profession').val();
	    
	    if (profession == ''){
	    	$('#alertdiv').empty();
	    	if (sitelang == 'fr'){ $('#alertdiv').append('Veuillez sélectionner votre profession'); }
	    	else { $('#alertdiv').append('Please select your profession'); }
	    	$('#alertdiv').show();
	    	return false;
	    }
	    
	    $.post( $('#website_root').text() + 'updateuser', $( "#signupform" ).serialize(), function(result){
			if ((result.body.type == 'error') || (result.body.content.message != 'none')){
				$('#alertdiv').empty();
				if (result.body.content.message == 'email changed: no value'){
					if (sitelang == 'fr'){ $('#alertdiv').append('Un email associé à un compte facebook ne peut pas être mis à jour'); }
					else { $('#alertdiv').append('This email adress is associated to a facebook account and can not be updated'); }
				}else {
					$('#alertdiv').append(result.body.content.message);
				}
		    	$('#alertdiv').show();
		    	return false;
			}
			if (result.body.type == 'single'){
				$('#alertdiv').hide();
				$('#alertdivyes').show();
			}
			
		});
	/* }); */
}

function resetPassword(){
	
	$('#alertdivrp').hide();
	$('#alertdivsuccessrp').hide();
	
	email = $('#fpinputEmail').val();
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
   
	if (pattern.test(email) == false){
    	$('#alertdivrp').empty();
    	if (sitelang == 'fr'){ $('#alertdivrp').append('Veuillez entrer un e-mail valide'); }
    	else { $('#alertdivrp').append('Please enter a valid email address'); }
    	$('#alertdivrp').show();
    	return false;
    }
	
	$.post( $('#website_root').text() + 'resetpassword', {fpinputEmail : email}, function(result){
		  if (result.body.type == 'error'){
			  if (result.body.content.status == 'Not Found'){
				  $('#alertdivrp').empty();
				  if (sitelang == 'fr'){  $('#alertdivrp').append(email + ' n\est lié à aucun compte'); }
				  else {  $('#alertdivrp').append('No account found for the email' + email); }
			      $('#alertdivrp').show();
			  }else {
				  if (result.body.content.message == 'Actual passwordDigest is empty (not normal user?)'){
					  $('#alertdivrp').empty();
					  if (sitelang == 'fr'){  $('#alertdivrp').append('Ce email est associé à un compte facebook. Connectez-vous via facebook'); }
					  else {  $('#alertdivrp').append('This email is associated to a facebook account. Please connect with facebook'); }
				      $('#alertdivrp').show();
				  }else {
					  $('#alertdivrp').empty();
				      $('#alertdivrp').append(result.body.content.message);
				      $('#alertdivrp').show();
				  }
			  }
		      return false;
		  }
		$('#alertdivsuccessrp').show();
		$('#resetformdivrp').hide();
		$('#resetformdiv').hide();
		return false;
	  });
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function checkAudioAd(permalink){
	
	//audioadurl = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/110253807/RadiolineWebAudio300x250&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url='+$('#website_root').text()+'&correlator=' + new Date().getTime();
	audioadurl = '/~znadri/radioline.co_git/web-radioline/web/dfpsample.xml';
	$.ajax( {
        type: "GET",
        url: audioadurl,
        dataType: "xml",
        success: function(xml) { 
        	if ($(xml).find('Duration').text() == '') {
        		skipAudioAd(2000);
        		playStation(permalink);
        		return false;
        	}
        	AdTitle = $(xml).find('AdTitle').text();
        	Duration = $(xml).find('Duration').text();
        	Impression = $(xml).find('Impression').text();
        	MediaFile = '';
        	$(xml).find('MediaFile').each( function(){ 
        		if (MediaFile == '') MediaFile = $(this).text();
        	});
        	StaticResource = $(xml).find('StaticResource').text();
        	CompanionClickThrough = $(xml).find('CompanionClickThrough').text();
        	
        	if (MediaFile == ''){
        		skipAudioAd(2000);
        		playStation(permalink);
        		return false;
        	}
        	
        	$("#divbr").show();
        	$("#player_cover_div").empty();
        	$("#player_onair_div").empty();
        	$("#player_station_name_div").empty();
        	
        	$("#divplayer").fadeIn("slow");

        	$("#rplayer").jPlayer("setMedia", {
    			mp3 : MediaFile
    		});
        	$("#rplayer").bind($.jPlayer.event.ended + ".jp-end", function(event) {
        		$("#rplayer").unbind($.jPlayer.event.ended + ".jp-end");
        		$('#bancampanion').hide();
        		$('#div-gpt-ad-1384442861876-0').show('slow');
        		skipAudioAd(5000);
        		$("#player_cover_div").show();
        		playStation(permalink);
        	});
        	if (StaticResource != ''){
        		$('#div-gpt-ad-1384442861876-0').hide();
        		$('#bancampanion').empty();
        		$('#bancampanion').append('<a href="'+CompanionClickThrough+'" target="_blank"><img src="'+StaticResource+'"></a>');
        		$('#bancampanion').show('slow');
        	}
        	
        	$("#player_cover_div").hide();
    		$("#player_onair_div").empty();
    		$("#player_station_name_div").empty();
    		$("#player_onair_div").append(AdTitle);
    		$("#player_station_name_div").append('Publicité');
    		$("#rplayer").jPlayer("play");
        }
	});
}
function skipAudioAd(time){
	canaudioad = false;
	setTimeout(function(){canaudioad = true;}, time);
	
}
