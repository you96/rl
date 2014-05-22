<?php

namespace Radiolineco\WebappBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Radiolineco\WebappBundle\Service\RadiolinecoPillow;


class GenericController extends Controller
{
	private $_locale;
	private $_language;
	private $_country;
	private $_http_host;
	private $_countries_list;
	private $_connected = false;
    
    private function initVars($page)
    {
    	$this->_detectUserAgent();
    	$this->_initHost();
  		if ($page == 'index' && !$this->get('request')->isXmlHttpRequest()) $this->_checkRedirect();
  		$this->_initLanguageCountry();
    	$this->_locale =  strtolower($this->_language) . '_' . strtoupper($this->_country);
    	$this->get('request')->setLocale($this->_locale);
    	
    	$this->_isConnected();
    	//$this->get('request')->setLocale("fr_FR");
    	if (!strpos($this->getRequest()->headers->get('Cookie'), 'PillowLocale')) $this->getRequest()->headers->set('Cookie', $this->getRequest()->headers->get('Cookie') . '; PillowLocale='.$this->_locale);
    }
    
	public function indexAction()
    {
    	
    	$this->initVars('index');
    	$selection = $this->get('radiolineco_webapp.pillow')->getSelection($this->_country, $this->_language, $this->_locale);
    	//$tracksonair = $this->get('radiolineco_webapp.pillow')->getTracksOnAir($this->_country, $this->_language, $this->_locale);
   	 	$showsonair = $this->get('radiolineco_webapp.pillow')->getShowsOnAir($this->_country, $this->_language, $this->_locale);
    	
   	 	if ($this->_connected){
   	 		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 		$presets_array = $this->_getArrayFromPresets($presets);
   	 	}else{
   	 		$presets = array();
   	 		$presets_array = array();
   	 	}
   	 	
   	 	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:index.ajax.twig' : 'RadiolinecoWebappBundle:Generic:index.html.twig' ;
  	 	
   	 	if ($this->_connected){
	   	 	header("Cache-Control: max-age=30");
	   	 	header("max-age: 30");
  	 	}else {
  	 		header("Cache-Control: max-age=300");
	   	 	header("max-age: 300");
  	 	}
   	 	
  	 	$autoconnect = (!empty($_GET['autoconnect'])) ? "true" : "false";
  	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'selection'        	=> $selection,
    	'showsonair'		=> $showsonair,
    	'cfile'				=> $file,
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected,
    	'presets'		=> $presets,
    	'presets_array' => $presets_array,
    	'autoconnect'	=> $autoconnect
        ));
    }
    
	public function aboutUsAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	
    	$file = ($this->_language == 'fr') ? 'RadiolinecoWebappBundle:Generic:about_us.ajax.twig' : 'RadiolinecoWebappBundle:Generic:about_us_en.ajax.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function faqAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = ($this->_language == 'fr') ? 'RadiolinecoWebappBundle:Generic:faq.ajax.twig' : 'RadiolinecoWebappBundle:Generic:faq_en.ajax.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function pressAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = ($this->_language == 'fr') ? 'RadiolinecoWebappBundle:Generic:press.ajax.twig' : 'RadiolinecoWebappBundle:Generic:press_en.ajax.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function becomePartnerAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = ($this->_language == 'fr') ? 'RadiolinecoWebappBundle:Generic:become_partner.ajax.twig' : 'RadiolinecoWebappBundle:Generic:become_partner_en.ajax.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
	
    public function addRadioReferenceAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = ($this->_language == 'fr') ? 'RadiolinecoWebappBundle:Generic:add_radio_reference.ajax.twig' : 'RadiolinecoWebappBundle:Generic:add_radio_reference_en.ajax.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function cookieinfoAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = 'RadiolinecoWebappBundle:Generic:cookieinfo.html.twig';
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('site_title'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function contactAction()
    {
    	
    	$this->initVars('fr');
    	
   	 	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:contact.ajax.twig' : 'RadiolinecoWebappBundle:Generic:contact.html.twig' ;
  	 	
   	 	header("Cache-Control: max-age=30000");
   	 	header("max-age: 1");
   	 	
   	 	if (!empty($_POST)){
   	 		
   	 		$contentMail = "Nom: ".$_POST['inputfirstname']."\n"
		."Mail: ".$_POST['inputemail']."\n"
		."Type d'Application: ".$_POST['platformType']."\n"
		."Type de demande: ".$_POST['messageType']."\n"
		."Message: ". $_POST['message']."\n";
		
		$headers = 'Reply-To: "'.$_POST['inputfirstname'].'" <'. $_POST['inputemail'].">\r\n".
		'From: "'.$_POST['inputfirstname'].'" <'.$_POST['inputemail'].'>';
   	 		mail('contact@radioline.fr', 'Formulaire de contact : ' . $_POST['messageType'], $contentMail, $headers);
   	 		die($headers);
   	 	}
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('contact'),
        'page_description' 	=> $this->get('translator')->trans('site_description'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'state'				=> 'no',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected
        ));
    }
    
	public function redirectAction()
    {
    	
    	$ua = $_SERVER['HTTP_USER_AGENT'];

		if (preg_match('/iphone/i',$ua))
		{
		
		    header("Location: https://itunes.apple.com/fr/app/liveradio/id287955524?mt=8");
		
		    exit();
		
		}
		
		if (preg_match('/ipad/i',$ua))
		{
		    header("Location: https://itunes.apple.com/fr/app/liveradio-pour-ipad/id398457207?mt=8");
		    exit();
		}
		
		if (preg_match('/android/i',$ua))
		{
		    header("Location: https://play.google.com/store/apps/details?id=com.radioline.android.radioline");
		
		    exit();
		}
		
		
		header("Location: http://www.radioline.co");
		exit();
    }
    public function stationAction($name, $permalink)
    {
    	$this->initVars('fr');
    	if ($this->_connected){
   	 		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 		$presets_array = $this->_getArrayFromPresets($presets);
   	 		if (!empty($presets_array)){
   	 			$aTemp = array();
   	 			foreach ($presets_array as $preseta){
   	 				$aTemp[] = str_replace('-', '_',$preseta);
   	 			}
   	 			$presets_array = $aTemp;
   	 		}
   	 	}else{
   	 		$presets = array();
   	 		$presets_array = array();
   	 	}
    	$station  	= $this->get('radiolineco_webapp.pillow')->getStationInfo($this->_country, $this->_language, $this->_locale, $permalink);
    	$podcasts 	= $this->get('radiolineco_webapp.pillow')->getStationPodcasts($this->_country, $this->_language, $this->_locale, $permalink);  	
    	
    	$similar_stations  	= $this->get('radiolineco_webapp.pillow')->getSimilarStations($this->_country, $this->_language, $this->_locale, $permalink);
    	
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:station.ajax.twig' : 'RadiolinecoWebappBundle:Generic:station.html.twig' ;

    	$image = (!empty($station->body->content->show->animators[0]->picture)) ? $station->body->content->show->animators[0]->picture : $station->path[0]->logo ;
    	
    	if(isset($station->body->content->show->animators)){
    		for($i=0;$i<count($station->body->content->show->animators);$i++){
    			$animatorName[$i] = $station->body->content->show->animators[$i]->name;
    			$animatorName[$i] = $this->get('radiolineco_webapp.pillow')->getPermalink($animatorName[$i]);
    			$animatorShow[$i] = $this->get('radiolineco_webapp.pillow')->checkBio($this->_country, $this->_language, $this->_locale,$animatorName[$i]);
    		}
    	}else{
    		$animatorShow = null;
    	}
    	
    	
    	
    	if ($this->_connected){
	    	header("Cache-Control: max-age=30");
	   	 	header("max-age: 30");
    	}else {
    		header("Cache-Control: max-age=300");
   	 		header("max-age: 300");
    	}
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('Listen to') . ' '.$station->path[0]->name.' ' . $this->get('translator')->trans('radios live') .' - Radio ' . $station->path[0]->name . ' ' . $this->get('translator')->trans('online'),
        'page_description' 	=> $this->get('translator')->trans('Listen to') . ' '.$station->path[0]->name.' '.$this->get('translator')->trans('radios live').' : ' . $station->path[0]->description,
    	'station'			=> $station,
    	'podcasts'			=> $podcasts,
    	'page_image' 		=> $image ,
    	'sitelang' 			=> $this->_language,
    	'countries_list' 	=> $this->_countries_list,
    	'similar_stations' 	=> $similar_stations,
    	'connected'			=> $this->_connected,
    	'presets'			=> $presets,
    	'presets_array'		=> $presets_array,
    	'animatorShow'		=> $animatorShow,
        ));
    }
    
    public function stationredirectAction($name, $permalink)
    {
    	header("Location: $name-r-".str_replace('_', '-', $permalink).'.html',true,301);
    	exit;
    }
    
	public function podcastAction($name, $permalink)
    {
    	$this->initVars('fr');
    	if ($this->_connected){
   	 		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 		$presets_array = $this->_getArrayFromPresets($presets);
   	 		if (!empty($presets_array)){
   	 			$aTemp = array();
   	 			foreach ($presets_array as $preseta){
   	 				$aTemp[] = str_replace('-', '_',$preseta);
   	 			}
   	 			$presets_array = $aTemp;
   	 		}
   	 	}else{
   	 		$presets = array();
   	 		$presets_array = array();
   	 	}
   	 	
    	$podcast  	= $this->get('radiolineco_webapp.pillow')->getPodcastInfo($this->_country, $this->_language, $this->_locale, $permalink);
    	$chapters 	= $this->get('radiolineco_webapp.pillow')->getPodcastChapters($this->_country, $this->_language, $this->_locale, $permalink);  	

    	$similar_podcasts  	= $this->get('radiolineco_webapp.pillow')->getSimilarPodcasts($this->_country, $this->_language, $this->_locale, $permalink);
 
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:podcast.ajax.twig' : 'RadiolinecoWebappBundle:Generic:podcast.html.twig' ;
    	
    	if (!isset($podcast->description)) $podcast->description = $podcast->name;
    	
    	if ($this->_connected){
	    	header("Cache-Control: max-age=300");
	   	 	header("max-age: 300");
    	}else {
    		header("Cache-Control: max-age=30000");
   	 		header("max-age: 30000");
    	}

    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('Listen to') . ' - '.$podcast->name.' ' . $this->get('translator')->trans('online'),
        'page_description' 	=> (!empty($podcast->description)) ? $this->get('translator')->trans('Listen to') . ' '.$podcast->name.' '.$this->get('translator')->trans('online').' : ' . $podcast->description : $this->get('translator')->trans('Listen to') . ' '.$podcast->name.' ' . $this->get('translator')->trans('online'),
    	'podcast'			=> $podcast,
    	'chapters'			=> $chapters,
    	'page_image'		=> $podcast->logo,
    	'sitelang' 			=> $this->_language,
    	'countries_list' 	=> $this->_countries_list,
    	'similar_podcasts' 	=> $similar_podcasts,
    	'connected'		=> $this->_connected,
    	'presets'		=> $presets,
    	'presets_array'	=> $presets_array
        ));
    }
    
	public function podcastredirectAction($name, $permalink)
    {
    	header("Location: $name-p-".str_replace('_', '-', $permalink).'.html',true,301);
    	exit;
    }
	public function catalogAction($permalink)
    {
    	$this->initVars('fr');
    	
    	if ($this->_connected){
   	 		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 		$presets_array = $this->_getArrayFromPresets($presets);
   	 	}else{
   	 		$presets = array();
   	 		$presets_array = array();
   	 	}
    	
    	$permalink = str_replace('--', '/', $permalink);
    	
    	$catalog_header = '';
    	//if ($permalink == 'categories/catalog/selection_de_noel') $catalog_header = '../img/noel/bann_noel.png';
    	
    	$catalog  	= $this->get('radiolineco_webapp.pillow')->getCatalog($this->_country, $this->_language, $this->_locale, $permalink);
    	   	
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:catalog.ajax.twig' : 'RadiolinecoWebappBundle:Generic:catalog.html.twig' ;
    	
    	if ($this->_connected){
	    	header("Cache-Control: max-age=30");
	   	 	header("max-age: 30");
    	}else{
    		header("Cache-Control: max-age=7200");
	   	 	header("max-age: 7200");
    	}
   	 	
   	 	$divheight = ceil(count($catalog->body->content) / 4) * 150;
   	 	
    
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('Listen to') . ' ' . $this->get('translator')->trans('Radiosh1') . ' ' . $this->get('translator')->trans($catalog->path[count($catalog->path) - 1]->name) . ' ' . $this->get('translator')->trans('radios live'),
        'page_description' 	=> $this->get('translator')->trans('Listen to') . ' radios'. $this->get('translator')->trans('online'),
    	'catalog'			=> $catalog,
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'divheight'			=> $divheight,
    	'sitelang' 			=> $this->_language,
    	'catalog_header'	=> $catalog_header,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected,
    	'presets'		=> $presets,
    	'presets_array'	=> $presets_array
        ));
    }
    
    public function moodsAction()
    {
    	$this->initVars('fr');
    
    	if ($this->_connected){
    		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    		$presets_array = $this->_getArrayFromPresets($presets);
    	}else{
    		$presets = array();
    		$presets_array = array();
    	}
    
    	$moods = $this->get('radiolineco_webapp.pillow')->getMoods($this->_country, $this->_language, $this->_locale);
    	
    
    	//$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    	//$presets_array = $this->_getArrayFromPresets($presets);
    
    
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:moods.ajax.twig' : 'RadiolinecoWebappBundle:Generic:moods.html.twig' ;
    
    	if ($this->_connected){
    		header("Cache-Control: max-age=30");
    		header("max-age: 30");
    	}else{
    		header("Cache-Control: max-age=7200");
    		header("max-age: 7200");
    	}
    	$divheight = ceil(count($moods) / 4) * 150;
    
    
    	return $this->render($file, array(
    			'page_title' 		=> $this->get('translator')->trans('Listen to') . ' ' . $this->get('translator')->trans('Radiosh1') . ' ' . $this->get('translator')->trans('Moods') . ' ' . $this->get('translator')->trans('radios live'),
        		'page_description' 	=> $this->get('translator')->trans('Listen to') . ' radios'. $this->get('translator')->trans('online'),
    			'page_image'    => 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    			'divheight'     => $divheight,
    			'sitelang'      => $this->_language,
    			'countries_list' => $this->_countries_list,
    			'connected'   => $this->_connected,
    			'presets'   => $presets,
    			'presets_array' => $presets_array,
    			'moods'     => $moods
    	));
    }
    
    public function moodStationsAction($permalink)
    {
    	$this->initVars('fr');
    
    	if ($this->_connected){
    		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    		$presets_array = $this->_getArrayFromPresets($presets);
    	}else{
    		$presets = array();
    		$presets_array = array();
    	}
    
    	//$permalink = str_replace('--', '/', $permalink);
    	$moodStations = $this->get('radiolineco_webapp.pillow')->getMoodStations($this->_country, $this->_language, $this->_locale, $permalink);
    	 
    
    	//$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    	//$presets_array = $this->_getArrayFromPresets($presets);
    	
    
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:moods.ajax.twig' : 'RadiolinecoWebappBundle:Generic:moods.html.twig' ;
    
    	if ($this->_connected){
    		header("Cache-Control: max-age=30");
    		header("max-age: 30");
    	}else{
    		header("Cache-Control: max-age=7200");
    		header("max-age: 7200");
    	}
    	$divheight = ceil(count($moodStations['radios']) / 4) * 150;
    
    
    	return $this->render($file, array(
    			'page_title' 		=> $this->get('translator')->trans('Listen to') . ' ' . $this->get('translator')->trans('Radiosh1') . ' ' . $this->get('translator')->trans($moodStations['tag_info']->body->content->name) . ' ' . $this->get('translator')->trans('radios live'),
        		'page_description' 	=> $this->get('translator')->trans('Listen to') . ' radios'. $this->get('translator')->trans('online'),
    			'page_image'    => 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    			'divheight'     => $divheight,
    			'sitelang'      => $this->_language,
    			'countries_list' => $this->_countries_list,
    			'connected'   => $this->_connected,
    			'presets'   => $presets,
    			'presets_array' => $presets_array,
    			'moodStations'     => $moodStations
    	));
    }
    
	public function presetsAction()
    {
    	$this->initVars('fr');
    	
    	if ($this->_connected == false){
    		header("HTTP/1.0 404 Not Found");
    		exit();
    	}
    	
    	
   	 	$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 	$presets_array = $this->_getArrayFromPresets($presets);
   	 	
    	  	
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:presets.ajax.twig' : 'RadiolinecoWebappBundle:Generic:presets.html.twig' ;
   	 	
   	 	$divheight = ceil(count($presets) / 4) * 150;
   	 	
    
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('Presets'),
        'page_description' 	=> $this->get('translator')->trans('Presets'),
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'divheight'			=> $divheight,
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected,
    	'presets'		=> $presets,
    	'presets_array'	=> $presets_array
        ));
    }
    
    
	public function searchAction($query)
    {
    	$this->initVars('fr');
    	
    	if ($this->_connected){
   	 		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 		$presets_array = $this->_getArrayFromPresets($presets);
   	 	}else{
   	 		$presets = array();
   	 		$presets_array = array();
   	 	}
    	$query = urldecode($query);
    	
    	$stations  	= $this->get('radiolineco_webapp.pillow')->getSearch($this->_country, $this->_language, $this->_locale, $query);
    	   	
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:search.ajax.twig' : 'RadiolinecoWebappBundle:Generic:search.html.twig' ;
    	if ($this->_connected){
	    	header("Cache-Control: max-age=30");
	   	 	header("max-age: 30");
    	} else {
    		header("Cache-Control: max-age=30000");
   	 		header("max-age: 30000");
    	}
   	 	
    	return $this->render($file, array(
        'page_title' 		=> $this->get('translator')->trans('Listen to') . ' radios - '. $query .' '. $this->get('translator')->trans('online'),
        'page_description' 	=> $this->get('translator')->trans('Listen to') .' radios ' . $query,
    	'stations'			=> $stations,
    	'query' 			=> $query,
    	'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    	'sitelang' 			=> $this->_language,
    	'countries_list' => $this->_countries_list,
    	'connected'		=> $this->_connected,
    	'presets'		=> $presets,
    	'presets_array'	=> $presets_array
        ));
    }
    public function peopleAction($name)
    {
    	$this->initVars('fr');
    	if (!empty($_GET['l'])){
    		$this->_language = $_GET['l'];
    	}
    	$permalink = $this->get('radiolineco_webapp.pillow')->getPermalink($name);
    	$img = $this->get('radiolineco_webapp.pillow')->getImg($this->_country, $this->_language, $this->_locale, $permalink);
    	if($this->get('radiolineco_webapp.pillow')->checkBio($this->_country, $this->_language, $this->_locale, $permalink)){
    		$bio = $this->get('radiolineco_webapp.pillow')->getBio($this->_country, $this->_language, $this->_locale, $permalink);
    	}else{
			$bio = $this->get('radiolineco_webapp.wiki')->getContent($permalink,$this->_language);
    	}
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:people.ajax.twig' : 'RadiolinecoWebappBundle:Generic:people.html.twig' ;
    	if ($this->_connected){
    		header("Cache-Control: max-age=30");
    		header("max-age: 30");
    	} else {
    		header("Cache-Control: max-age=30000");
    		header("max-age: 30000");
    	}
    
    	return $this->render($file, array(
    			'page_title' 		=> $this->get('translator')->trans('Listen to') . ' radios - '. $name .' '. $this->get('translator')->trans('online'),
    			'page_description' 	=> $this->get('translator')->trans('Listen to') .' radios ' . $name,
    			'page_image' 		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    			'sitelang' 			=> $this->_language,
    			'connected'			=> $this->_connected,
    			'name' 				=> $name,
    			'bio'				=> $bio,
    			'img'				=> $img,
    			'permalink'			=> $permalink
    	));
    }
    
    public function peoplePlayAction($name)
    {
    	$this->initVars('fr');
    
    	if ($this->_connected){
    		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    		$presets_array = $this->_getArrayFromPresets($presets);
    	}else{
    		$presets = array();
    		$presets_array = array();
    	}
    	$permalink = $this->get('radiolineco_webapp.pillow')->getPermalink($name);
    	$stations = $this->get('radiolineco_webapp.pillow')->getPeopleStations($this->_country, $this->_language, $this->_locale, $permalink);
       
    	$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:peoplePlay.ajax.twig' : 'RadiolinecoWebappBundle:Generic:peoplePlay.html.twig' ;
    
    	if ($this->_connected){
    		header("Cache-Control: max-age=30");
    		header("max-age: 30");
    	}else{
    		header("Cache-Control: max-age=7200");
    		header("max-age: 7200");
    	}
    	$divheight = ceil(count($stations['radios']) / 4) * 150;
    	if($divheight==0){
    		$divheight=80;
    	}
    
    
    	return $this->render($file, array(
    			'page_title' 			=> $this->get('translator')->trans('Listen to') . ' ' . $this->get('translator')->trans('Radiosh1') . ' ' .$name. ' ' . $this->get('translator')->trans('radios live'),
    			'page_description' 		=> $this->get('translator')->trans('Listen to') . ' radios'. $this->get('translator')->trans('online'),
    			'page_image'    		=> 'http://'.$_SERVER['HTTP_HOST'].'/img/152x152.png',
    			'divheight'     		=> $divheight,
    			'sitelang'      		=> $this->_language,
    			'countries_list'	 	=> $this->_countries_list,
    			'connected'   			=> $this->_connected,
    			'presets'   			=> $presets,
    			'presets_array' 		=> $presets_array,
    			'stations'     			=> $stations,
    			'name'					=>$name,
    			'permalink'				=>$permalink
    	));
    }
    
    public function emissionAction($permalink)
    {
    	$this->initVars('fr');
    	if ($this->_connected){
    		$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
    		$presets_array = $this->_getArrayFromPresets($presets);
    		if (!empty($presets_array)){
    			$aTemp = array();
    			foreach ($presets_array as $preseta){
    				$aTemp[] = str_replace('-', '_',$preseta);
    			}
    			$presets_array = $aTemp;
    		}
    	}else{
    		$presets = array();
    		$presets_array = array();
    	}
    	$station  	= $this->get('radiolineco_webapp.pillow')->getStationInfo($this->_country, $this->_language, $this->_locale, $permalink);
    	$podcasts 	= $this->get('radiolineco_webapp.pillow')->getStationPodcasts($this->_country, $this->_language, $this->_locale, $permalink);
    	 
    	$similar_stations  	= $this->get('radiolineco_webapp.pillow')->getSimilarStations($this->_country, $this->_language, $this->_locale, $permalink);
    	$image = $station->body->content->show->logo;
		$description = $station->body->content->show->description;
		
		$file = ($this->get('request')->isXmlHttpRequest()) ? 'RadiolinecoWebappBundle:Generic:emission.ajax.twig' : 'RadiolinecoWebappBundle:Generic:emission.html.twig' ;
		
    	if(isset($station->body->content->show->animators)){
    		for($i=0;$i<count($station->body->content->show->animators);$i++){
    			$animatorName[$i] = $station->body->content->show->animators[$i]->name;
    			$animatorName[$i] = $this->get('radiolineco_webapp.pillow')->getPermalink($animatorName[$i]);
    			$animatorShow[$i] = $this->get('radiolineco_webapp.pillow')->checkBio($this->_country, $this->_language, $this->_locale,$animatorName[$i]);
    		}
    	}else{
    		$animatorShow = null;
    	}
    	 
    	 
    	 
    	if ($this->_connected){
    		header("Cache-Control: max-age=30");
    		header("max-age: 30");
    	}else {
    		header("Cache-Control: max-age=300");
    		header("max-age: 300");
    	}
    
    	return $this->render($file, array(
    			'page_title' 		=> $this->get('translator')->trans('Listen to') . ' '.$station->path[0]->name.' ' . $this->get('translator')->trans('radios live') .' - Radio ' . $station->path[0]->name . ' ' . $this->get('translator')->trans('online'),
    			'page_description' 	=> $this->get('translator')->trans('Listen to') . ' '.$station->path[0]->name.' '.$this->get('translator')->trans('radios live').' : ' . $station->path[0]->description,
    			'station'			=> $station,
    			'podcasts'			=> $podcasts,
    			'page_image' 		=> $image ,
    			'description'		=> $description,
    			'sitelang' 			=> $this->_language,
    			'countries_list' 	=> $this->_countries_list,
    			'similar_stations' 	=> $similar_stations,
    			'connected'			=> $this->_connected,
    			'presets'			=> $presets,
    			'presets_array'		=> $presets_array,
    			'animatorShow'		=> $animatorShow,
    	));
    }
    
    public function horizontalmenuAction()
    {
    	$this->initVars('fr');
    	  	
    	$file = 'RadiolinecoWebappBundle:Blocs:horizontal_menu.bloc.twig';
   		
    	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language,
    	'connected'		=> $this->_connected
        ));
    }
    
 	public function headersigninAction()
    {
    	$this->initVars('fr');
    	  	
    	$file = 'RadiolinecoWebappBundle:Blocs:header_signin.bloc.twig';
   		
    	header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language,
    	'connected'		=> $this->_connected
        ));
    }
	public function suggestAction($query)
    {
    	$this->initVars('fr');
    	
    	$query = urldecode($query);
    	  	   	
   		header("Cache-Control: max-age=30000");
   	 	header("max-age: 30000");
   	 	
    	$response = new Response($this->get('radiolineco_webapp.pillow')->getSuggest($this->_country, $this->_language, $this->_locale, $query));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function playAction($permalink)
    {
    	$this->initVars('fr');    	   	
   
    	$permalink = str_replace('__', '/', $permalink);
    	
    	$response = new Response($this->get('radiolineco_webapp.pillow')->getplay($this->_country, $this->_language, $this->_locale, $permalink));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function liveAction($permalink)
    {
    	$this->initVars('fr');    	   	
   
    	$permalink = str_replace('__', '/', $permalink);
    	
    	$response = new Response($this->get('radiolineco_webapp.pillow')->getLive($this->_country, $this->_language, $this->_locale, $permalink));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function ajaxsignupsubmitAction()
    {
    	$this->initVars('fr');
    	$response = new Response($this->get('radiolineco_webapp.pillow')->subscribeUser($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function updateuserAction()
    {
    	$this->initVars('fr');
    	$response = new Response($this->get('radiolineco_webapp.pillow')->updateUser($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function ajaxsignupfacebooksubmitAction()
    {
    	$this->initVars('fr');
    	
    	$response = new Response($this->get('radiolineco_webapp.pillow')->subscribeFacebookUser($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
	public function ajaxsigninsubmitAction()
    {
    	$this->initVars('fr');    	   	
   
    	$response = new Response($this->get('radiolineco_webapp.pillow')->signinUser($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function logfbAction()
    {
    	$this->initVars('fr');    	   	
   
    	$response = new Response($this->get('radiolineco_webapp.pillow')->signinFacebookUser($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function logoutAction()
    {
    	$this->initVars('fr');    	   	
   
    	$response = new Response($this->get('radiolineco_webapp.pillow')->logout($this->_country, $this->_language, $this->_locale));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
	public function resetpasswordAction()
    {
    	$this->initVars('fr');
   
    	$response = new Response($this->get('radiolineco_webapp.pillow')->resetpassword($this->_country, $this->_language, $this->_locale, $_POST));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function addpresetAction()
    {
    	$this->initVars('fr');    	   	
   
    	if (!$this->_connected) return new Response('NOT CONNECTED');
    	
    	$permalink = $_GET['permalink'];
    	
    	$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 	$presets_array = $this->_getArrayFromPresets($presets);
   	 	if (!in_array($permalink, $presets_array) && !in_array(str_replace('_', '-', $permalink), $presets_array)) $presets_array[] = $permalink;
   	 	$permalink = $presets_array;
    	
    	$response = new Response($this->get('radiolineco_webapp.pillow')->addPreset($this->_country, $this->_language, $this->_locale, $permalink));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function removepresetAction()
    {
    	$this->initVars('fr');    	   	
   
    	if (!$this->_connected) return new Response('NOT CONNECTED');
    	
    	$permalink = $_GET['permalink'];
    	
    	$presets = $this->get('radiolineco_webapp.pillow')->getPresets($this->_country, $this->_language, $this->_locale);
   	 	$presets_array = $this->_getArrayFromPresets($presets);
   	 	
   	 	if (!in_array($permalink, $presets_array) && !in_array(str_replace('_', '-', $permalink), $presets_array)) $presets_array[] = $permalink;
   	 	
   	 	$temp = array();
   	 	
   	 	foreach ($presets_array as $perm)
   	 	{
   	 		if ($perm != str_replace('_', '-', $permalink)) $temp[] = $perm;
   	 	}
   	 	
   	 	$permalink = $temp;
    	$response = new Response($this->get('radiolineco_webapp.pillow')->addPreset($this->_country, $this->_language, $this->_locale, $permalink));
		$response->headers->set('Content-Type', 'application/json');
    	return $response;
    }
    
	public function signinblocAction()
    {
    	$this->initVars('fr');    	   	
    	
		$file = 'RadiolinecoWebappBundle:Signin:signin_bloc.ajax.twig';
   		
    	header("Cache-Control: max-age=3600");
   	 	header("max-age: 3600");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language
        ));
    }
    
	public function signupbloc1Action()
    {
    	$this->initVars('fr');    	   	
    	
		$file = 'RadiolinecoWebappBundle:Signin:signup_bloc1.ajax.twig';
   		
    	header("Cache-Control: max-age=3600");
   	 	header("max-age: 3600");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language
        ));
    }
    
	public function signupbloc2Action()
    {
    	$this->initVars('fr');    	   	
    	
    	$countries =   $this->get('radiolineco_webapp.pillow')->getAllcountries($this->_language);
    	$professions =   $this->get('radiolineco_webapp.pillow')->getProfessions();
    	
		$file = 'RadiolinecoWebappBundle:Signin:signup_bloc2.ajax.twig';
   		
    	header("Cache-Control: max-age=3600");
   	 	header("max-age: 3600");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language,
    	'countries' 		=> $countries,
    	'professions'		=> $professions
        ));
    }
    
	public function accountAction()
    {
    	$this->initVars('fr');  

    	if ($this->_connected == false) { header("HTTP/1.0 404 Not Found"); exit();}
    	$user =   $this->get('radiolineco_webapp.pillow')->getUserInfo($this->_country, $this->_language, $this->_locale);
    	
    	if ($user->body->type != 'single') { header("HTTP/1.0 404 Not Found"); exit();}
   	
    	$countries =   $this->get('radiolineco_webapp.pillow')->getAllcountries($this->_language);
    	$professions =   $this->get('radiolineco_webapp.pillow')->getProfessions();
    	
    	$user = $user->body->content;
    	if (!isset($user->job)) $user->job = '';
    	if (!isset($user->gender)) $user->gender = '';
    	if (!isset($user->facebookId)) $user->facebookId = '';
    	
    	$aTemp = explode('-', $user->birthDate);
    	$user->date = (!empty($aTemp[2])) ? $aTemp[2] : '';
    	$user->year = (!empty($aTemp[0])) ? $aTemp[0] : '';
    	$user->month = (!empty($aTemp[1])) ? $aTemp[1] : '';
 		 	
		$file = 'RadiolinecoWebappBundle:Generic:account.ajax.twig';
   		
    	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language,
    	'countries' 		=> $countries,
    	'professions'		=> $professions,
    	'user'				=> $user
        ));
    }
    
	public function signupbloc3Action()
    {
    	$this->initVars('fr');    	   	
    	
		$file = 'RadiolinecoWebappBundle:Signin:signup_bloc3.ajax.twig';
   		
    	header("Cache-Control: max-age=3600");
   	 	header("max-age: 3600");
   	 	
    	return $this->render($file, array(
    	'sitelang' 			=> $this->_language
        ));
    }
    
    private function _getLanguageCodeISO6391()
    {
    	
    	$hi_code = "";
    	$hi_quof = 0;
    	$langs = (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) ? explode(",",$_SERVER['HTTP_ACCEPT_LANGUAGE']) : array('fr');
    	foreach($langs as $lang)
    	{
    		if (count(explode(";",$lang)) == 1) $lang .= ';q=0.2';
    		list($codelang,$quoficient) = explode(";",$lang);
    		$quoficient = str_replace('q=', '', $quoficient);
    		if($quoficient > $hi_quof)
    		{
    			$hi_code = substr($codelang,0,2);
    			$hi_quof = $quoficient;
    		}
    	}
    	
    	return $hi_code;
    	
    }
    
    private function _initHost()
    {
   		 if (!empty($_GET['host'])){
    		$this->_http_host = $_GET['host'];
    		
    		return false;
    	}
    	$http_host = str_replace('.radioline.co', '', $_SERVER['HTTP_HOST']);
    	
   		if (strpos($http_host, 'beta') === 0 && $http_host != 'beta'){
   			
    			$http_host = str_replace('beta.', '', $http_host);
    			
    			header("Location: http://".$http_host.'.radioline.co'.$_SERVER['REQUEST_URI'],true,301);
    			exit;
    	}
    	
    	$http_host = str_replace('beta', '', str_replace('.beta', '', $http_host));
    	
    	$http_host = str_replace('localhost', '', $http_host);
    	
    	if ($http_host == '') $http_host = 'www';
    	
    	$this->_http_host = $http_host;
    }

    public function getHost()
    {
    	return $this->_http_host;
    }
    
    private function _initLanguageCountry()
    {
    	
    	
    	$country_list = array();
    	$countries = array(
    		//'be-fr' => array('Belgique', 'be', 'fr'),
    		//'be-en' => array('Belgium', 'be', 'en'),
    		//'de-en' => array('Germany', 'de', 'en'),
    		'www' => array('English', 'uk', 'en'),
    		'fr-fr' => array('Français', 'fr', 'fr')
    		//'it-en' => array('Italy', 'it', 'en'),
    		//'es-en' => array('Spain', 'es', 'en'),
    		//'ch-fr' => array('Suisse', 'ch', 'fr'),
    		//'ch-en' => array('Suitzerland', 'ch', 'en'),
    		//'us-en' => array('USA', 'us', 'en')
    	);
    	
    	if ($this->_http_host == 'www' || $this->_http_host == 'local' || $_SERVER['HTTP_HOST'] == 'beta.radioline.com'){
    		$this->_country = 'uk';
    		$this->_language = 'en';
    		$country_list['selected'] = $countries['www'];
    		//$selected = '<a href="#" class="dropdown-toggle nogoUrl" data-toggle="dropdown"><span>'.$this->get('translator')->trans('Country').'</span><b class="caret"></b></a>';
    	}else{
    		$aLocale = explode('-', $this->_http_host);
    		$this->_country = $aLocale[0];
    		$this->_language = (empty($aLocale[1])) ? 'en' : $aLocale[1];
    		$country_list['selected'] = (empty($countries[$this->_http_host])) ? $countries['www'] : $countries[$this->_http_host];
    		//$selected = '<a href="#" class="dropdown-toggle nogoUrl" data-toggle="dropdown"><span><img src="../img/flag_'.$this->_country.'.png" /></span><b class="caret"></b></a>';
	    	if ($this->_language == 'fr' && $this->_country != 'fr') {
	    		header("Location: http://fr-fr.radioline.co".$_SERVER['REQUEST_URI'],true,301);
	    		exit;
	    	}
	    	
	    	if ($this->_language == 'en' && $this->_http_host != 'www') {
	    		header("Location: http://www.radioline.co".$_SERVER['REQUEST_URI'],true,301);
	    		exit;
	    	}
    	}
    	
    	foreach ($countries as $key => $country){
    		if ($key != $this->_http_host) {
    			$country_list['list'][] = $country;
    		}
    	}
    	
    	
    	$this->_countries_list = $country_list;
    }
    
    private function _checkRedirect()
    {
    	
    	$http_language = $this->_getLanguageCodeISO6391();
    	$http_host = $this->getHost();
    	
    	if ($http_host != 'www' || $_SERVER['HTTP_HOST'] == 'beta.radioline.com' || !empty($_GET['c']) || !empty($_GET['autoconnect']) ) return false;
    	
    	if ($http_language == 'fr'){
    		header ("Location: http://fr-fr.radioline.co/");
    		exit;
    	}
    	/*
    	if ($http_language == 'de'){
    		header ("Location: http://de-en.radioline.co/");
    		exit;
    	}
    	if ($http_language == 'es'){
    		header ("Location: http://es-en.radioline.co/");
    		exit;
    	}
    	if ($http_language == 'it'){
    		header ("Location: http://it-en.radioline.co/");
    		exit;
    	}*/
    }
    
    private function _detectUserAgent(){
    	if (!empty($_GET['autoconnect'])) return false;
    	
    	$ua = $_SERVER['HTTP_USER_AGENT'];
if (isset($_GET['showserver'])) var_dump($_SERVER);
		if (preg_match('/iphone/i',$ua))
		{
		
		    header("Location: https://itunes.apple.com/fr/app/liveradio/id287955524?mt=8");
		
		    exit();
		
		}
		
		if (preg_match('/ipad/i',$ua))
		{
		    header("Location: https://itunes.apple.com/fr/app/liveradio-pour-ipad/id398457207?mt=8");
		    exit();
		}
		
		if (preg_match('/android/i',$ua))
		{
		    header("Location: https://play.google.com/store/apps/details?id=com.radioline.android.radioline");
		
		    exit();
		}
    }
    
    
    private function _isConnected()
    {
    	if (empty($_COOKIE['Session-pillow'])) return false;
    	
    	$this->_connected = true;
    	
    	setcookie("Session-pillow", $_COOKIE['Session-pillow'], time()+2592000, "/");
    }
    
    private function _getArrayFromPresets($presets){
    	if (empty($presets)) return array();
    	
    	$presets_array = array();
    	foreach ($presets as $station)
    	{
    		$presets_array[] = str_replace('_', '-', $station->permalink);
    	}
    	return $presets_array;
    }
}