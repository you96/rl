<?php

namespace Radiolineco\WebappBundle\Service;
 
use Httpful\Request;

/**
 * Interface with Pillow.
 *
 * @author Zoubeir Nadri
 */
class RadiolinecoPillow
{
	public $pillow_path = 'http://web.api.radioline.fr/Pillow/';
	private $_lastRequest;
	private $_vip_countries = array ('fr', 'gb', 'it', 'es', 'de', 'be', 'nl');
	
	
	public function getCountrySelection($country = 'gb', $language = 'en')
	{
		$bestofcountry = array (
			'fr' 		=> 'categories/radioline_selection',
			'default' 	=> 'categories/radioline_selection'
		);
		
		return (isset($bestofcountry[$country])) ? $bestofcountry[$country] : $bestofcountry['default'];
		
	}
	
	public function getSelection($country = 'gb', $language = 'en', $locale = 'en_GB')
	{
		$url = $this->pillow_path . $this->getCountrySelection($country, $language).'?pageSize=8&live=true';

		if ($locale == 'en_UK') $locale = 'en_XX';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response->body)->body->content;	
		$aStations = array();
		
		foreach ($data as $station)
		{
			$tempRadio = array();
			$tempRadio['permalink'] = str_replace('_', '-', $station->permalink);
			$tempRadio['name'] = $station->name;
			$tempRadio['baseline'] = $station->baseline;
			$tempRadio['description'] = $station->description;
			$tempRadio['logo'] = $station->logo;
			$tempRadio['smallLogo'] = $station->smallLogo;
			
			if (!empty($station->onAir))
			{
				$tempRadio['onAir'] = $station->onAir;
			}else $tempRadio['onAir'] = '';
			
			if (!empty($station->live->show->type))
			{
				$tempRadio['showType'] = $station->live->show->type;
			}
			if (!empty($station->live->show->permalink))
			{
				$tempRadio['showPermalink'] = $station->live->show->permalink;
			}
			
			if (!empty($station->live->show->logo))
			{
				$tempRadio['showImage'] = $station->live->show->logo;
			}
			elseif (!empty($station->live->show->animators[0]->picture))
			{
				$tempRadio['showImage'] = $station->live->show->animators[0]->picture;
			}else{
				$tempRadio['showImage'] = $station->logo;
			}
			if (!empty($station->live->show->animators[0]->name))
			{
				$tempRadio['peopleName'] = $station->live->show->animators[0]->name;
			}else{
				$tempRadio['peopleName'] = '';
			}
			
			$aStations[] = $tempRadio;
		} 
		
		if (is_array($aStations)) return $aStations;
		
		return false;
	}
	
	public function getTracksOnAir($country = 'gb', $language = 'en', $locale = 'en_GB')
	{
		$url = $this->pillow_path . 'categories/tracks_on_air?pageSize=8&live=true';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response->body)->body->content;	
		$aStations = array();
		
		foreach ($data as $station)
		{
			$tempRadio = array();
			$tempRadio['permalink'] = $station->permalink;
			$tempRadio['name'] = $station->name;
			$tempRadio['baseline'] = $station->baseline;
			$tempRadio['description'] = $station->description;
			$tempRadio['logo'] = $station->logo;
			$tempRadio['smallLogo'] = $station->smallLogo;
			
			if (!empty($station->onAir))
			{
				$tempRadio['onAir'] = $station->onAir;
			}else $tempRadio['onAir'] = '';
			
			if (!empty($station->live->show->type))
			{
				$tempRadio['showType'] = $station->live->show->type;
			}
			if (!empty($station->live->show->permalink))
			{
				$tempRadio['showPermalink'] = $station->live->show->permalink;
			}
			
			if (!empty($station->live->show->logo))
			{
				$tempRadio['showImage'] = $station->live->show->logo;
			}
			elseif (!empty($station->live->show->animators[0]->picture))
			{
				$tempRadio['showImage'] = $station->live->show->animators[0]->picture;
			}else{
				$tempRadio['showImage'] = $station->logo;
			}
			if (!empty($station->live->show->animators[0]->name))
			{
				$tempRadio['peopleName'] = $station->live->show->animators[0]->name;
			}else{
				$tempRadio['peopleName'] = '';
			}
			
			$aStations[] = $tempRadio;
		} 
		
		if (is_array($aStations)) return $aStations;
		
		return false;
	}
	
	public function getShowsOnAir($country = 'gb', $language = 'en', $locale = 'en_GB')
	{
		if ($locale == 'en_UK') return array();
		
		$url = $this->pillow_path . 'categories/shows_on_air?pageSize=16&live=true';
			
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response->body)->body->content;	
		$aStations = array();
		
		foreach ($data as $station)
		{
			$tempRadio = array();
			$tempRadio['permalink'] = str_replace('_', '-', $station->permalink);
			$tempRadio['name'] = $station->name;
			$tempRadio['baseline'] = $station->baseline;
			$tempRadio['description'] = $station->description;
			$tempRadio['logo'] = $station->logo;
			$tempRadio['smallLogo'] = $station->smallLogo;
			
			if (!empty($station->onAir))
			{
				$tempRadio['onAir'] = $station->onAir;
			}elseif (!empty($station->live->show->animators[0]->name))
			{
				$tempRadio['onAir'] = $station->live->show->animators[0]->name;
			} else{
				$tempRadio['onAir'] = '';
			}
			
			if (strlen($tempRadio['onAir']) > 19) $tempRadio['onAir'] = substr($tempRadio['onAir'], 0, 18) . '...';
			
			if (!empty($station->live->show->type))
			{
				$tempRadio['showType'] = $station->live->show->type;
			}
			if (!empty($station->live->show->permalink))
			{
				$tempRadio['showPermalink'] = $station->live->show->permalink;
			}
			
			if (!empty($station->live->show->animators[0]->picture))
			{
				$tempRadio['showImage'] = $station->live->show->animators[0]->picture;
			} else {
				$tempRadio['showImage'] = "";
			}
			
			if ($tempRadio['showImage']) $aStations[] = $tempRadio;
		} 
		
		$nb = count($aStations);
		if ($nb > 4){
			$truenb = ceil( ($nb / 4) - 1) * 4;
			
			for ($i = $nb - 1; $i >= $truenb; $i--){
				unset($aStations[$i]);
			}
			
			
		}
		if (is_array($aStations)) return $aStations;
		return false;
	}
	
	public function getStationInfo($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'radios/'.$permalink.'/live';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		                
		$data = json_decode($response);
			
		return $data;
	}
	
	public function getSimilarStations($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'radios/'.$permalink.'/similar?pageSize=5';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		                
		$data = json_decode($response);
			
		return $data;
	}
	
	public function getSimilarPodcasts($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'podcasts/'.$permalink.'/similar?pageSize=5';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		                
		$data = json_decode($response);
			
		return $data;
	}
	
	public function getStationPodcasts($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'radios/'.$permalink.'/podcasts?pageSize=100';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response->body)->body->content;
			
		return $data;
	}
	
	public function getPodcastInfo($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'podcasts/'.$permalink;
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response)->body->content;			
		return $data;
	}
	
	public function getPodcastChapters($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink)
	{
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path . 'podcasts/'.$permalink.'/chapters?pageSize=100';
		
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		$data = json_decode($response->body)->body->content;
			
		return $data;
	}
	
	public function getCatalog($country = 'gb', $language = 'en', $locale = 'fr_FR', $permalink)
	{
		
		$permalink = str_replace('-', '_', $permalink);
		$url = $this->pillow_path .$permalink.'?pageSize=100';
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data = json_decode($response->body);
	
		if ($data->path[0]->name == 'root.radioline_selection.name') $data->path[0]->name = 'Radios stars';
		
		return $data;
	}
	
	public function getSearch($country = 'gb', $language = 'en', $locale = 'fr_FR', $query)
	{
		$url = $this->pillow_path .'search/radio/'.urlencode($query).'?pageSize=100';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data['radio'] = json_decode($response->body)->body->content;

		$url = $this->pillow_path .'search/podcast/'.urlencode($query).'?pageSize=100';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data['podcast'] = json_decode($response->body)->body->content;
		
		return $data;
	}
	
	public function getMoods($country = 'gb', $language = 'en', $locale = 'fr_FR')
	{
		$url = $this->pillow_path .'tags?type=mood';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		
		return json_decode($response->body)->body->content;
	}
	
	public function getMoodStations($country = 'gb', $language = 'en', $locale = 'fr_FR', $permalink)
    {
    	
    	$url = $this->pillow_path .'search/radio/?tags='. $permalink .'&pageSize=100';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data['radios'] = json_decode($response->body)->body->content;

		$url = $this->pillow_path .'tags/'. $permalink;
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();
		                
		$data['tag_info'] = json_decode($response->body);
		
		return $data;
    }
	public function getSuggest($country = 'gb', $language = 'en', $locale = 'fr_FR', $query)
	{
		$url = $this->pillow_path .'suggest/radio/'.$query;
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data = $response->raw_body;	
		return $data;
	}
	
	public function getPlay($country = 'gb', $language = 'en', $locale = 'fr_FR', $permalink)
	{
		
		$url = $this->pillow_path .$permalink. '/play';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data = $response->raw_body;	
		return $data;
	}
	
	public function getLive($country = 'gb', $language = 'en', $locale = 'fr_FR', $permalink)
	{
		
		$url = $this->pillow_path .$permalink. '/live';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
		                ->send();

		$data = $response->raw_body;	
		return $data;
	}
	
	public function getCategoryRadios($locale = 'en_GB', $cat_name)
    {
    	
    	$uri = $this->pillow_path . 'search';

    	$this->_lastRequest = $uri;

		$response = Request::post($uri)
                        ->addHeader('Cookie','PillowLocale=' . $language)
                        ->body('{
							  "productTypes": ["radio"],
							  "criteria": [
							    { "type": "tag",
							      "criterion": "genre",
							      "value": "'.$cat_name.'"
							    }
							  ]
							}')
		                ->send();
 
		$data = json_decode($response->body)->body->content;

		if (is_array($data)) return $data;

		return false; 
    }
    
    public function subscribeUser($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	$url = $this->pillow_path .'users';
	
    	$body = '{
									"email": "'.$user['email'].'",
									"firstName": "",
									"passwordDigest": "'.md5($user['email'].':users@pillow:'.$user['password']).'",
									"lastName": "",
									"userAuthType": "normal",
									
									"birthDate": "'.$user['year'].'-'.$user['month'].'-'.$user['date'].'",
									"zipcode": "",
									"newsletter": false,
									"acceptsAds": false,';
    	if (!empty($user['gender'])) $body .= '"gender": "'.$user['gender'].'",';
		if (!empty($user['profession'])) $body .= '"job": "'.$user['profession'].'",';		
		if (!empty($user['country'])) $body .= '"country": "'.$user['country'].'",';			
									$body .= '
									"preferredRadioGenre": ""
									}';
    	
		$response = Request::post($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('X-Pillow-Application-Id', '0-0')
                        ->body($body)
		                ->send();
		
		return $response->body;
    }
    
	public function updateUser($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	
    	$url = $this->pillow_path .'users/me';
	
		$response = Request::put($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('X-Pillow-Application-Id', '0-0')
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->body('{
									"email": "'.$user['email'].'",
									"firstName": "",
									"lastName": "",
									"userAuthType": "normal",
									"country": "'.$user['country'].'",
									"birthDate": "'.$user['year'].'-'.$user['month'].'-'.$user['date'].'",
									"zipcode": "",
									"newsletter": false,
									"acceptsAds": false,
									"gender": "'.$user['gender'].'",
									"job": "'.$user['profession'].'",
									"preferredRadioGenre": ""
									}')
		                ->send();
		 
	$return = json_decode($response->body);
	$return->body->content->message = 'none';
     if (!empty($user['newpassword']) && $user['newpassword'] == $user['confirmationpassword']){
    		
	    		$url = $this->pillow_path .'session/login';
	    		$response = Request::post($url)
    		 			->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('X-Pillow-Application-Id', '0-0')
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->addHeader('Authorization', 'Digest username="'.$user['email'].'", realm="users@pillow", nonce="3bc71637887f099b6e40959fc889b0097b52e797e56ba05a", uri="/Pillow/session/login", response="'.md5(md5($user['email'].':users@pillow:' . $user['password']).':3bc71637887f099b6e40959fc889b0097b52e797e56ba05a:'.md5('POST:/Pillow/session/login')).'", opaque=""')
                        ->body('{
                        			"userAuthType":"normal", 
                        			"passwordDigest": "'. md5($user['email'] .':users@pillow:'. $user['newpassword']) .'"
    								}')
                        ->send();
                        
                 
                 if (!empty(json_decode($response->body)->body->content->message) && json_decode($response->body)->body->content->message == 'bad password') $return->body->content->message = ($language == 'fr') ? 'Le mot de passe actuel est mauvais' : 'Wrong current password';
    }
		
		return json_encode($return);
    }
    
	public function subscribeFacebookUser($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	$country = '';
    	if (!empty($user['location'])){
    		$aTemp = explode(', ', $user['location']);
    		$response = Request::get('http://restcountries.eu/rest/v1/name/' . $aTemp[1])
		                ->send();
		    
		    if (!empty($response->body[0]->alpha2Code)) $country = strtolower($response->body[0]->alpha2Code);
		   
    	}
    	
    	$url = $this->pillow_path .'users';
	
    	$date = explode('/', $user['birthday']);
		$response = Request::post($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('X-Pillow-Application-Id', '0-0')
                        ->body('{
                        			"userAuthType": "facebook",
                        			"facebookId" : "'.$user['id'].'",
									"email": "'.$user['email'].'",
									"firstName": "'.$user['first_name'].'",
									"lastName": "'.$user['last_name'].'",
									"country": "'.$country.'",
									"birthDate": "'.$date[2].'-'.$date[0].'-'.$date[1].'",
									"zipcode": "",
									"newsletter": false,
									"acceptsAds": false,
									"gender": "'.$user['gender'].'",
									"job": "",
									"preferredRadioGenre": ""
									}')
		                ->send();
		
		return $response->body;
    }
    
	public function signinUser($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	$url = $this->pillow_path .'session/login';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('Authorization', 'Digest username="'.$user['inputEmail'].'", realm="users@pillow", nonce="3bc71637887f099b6e40959fc889b0097b52e797e56ba05a", uri="/Pillow/session/login", response="'.md5(md5($user['inputEmail'].':users@pillow:'.$user['inputPassword']).':3bc71637887f099b6e40959fc889b0097b52e797e56ba05a:'.md5('GET:/Pillow/session/login')).'", opaque=""')
                        ->send();
        
		if (strpos($response->raw_headers, '200 OK') !== false && !empty($response->headers['set-cookie']) ){
			// creating session parameters
			if (strpos($response->headers['set-cookie'], 'Session-pillow') !== false){
				
				$session_pillow = str_replace(substr($response->headers['set-cookie'], 0, strpos($response->headers['set-cookie'], ';')), 'Session-pillow=', '');
				
				$subpillowsession = substr($response->headers['set-cookie'], 0, strpos($response->headers['set-cookie'], ';'));
				$session_pillow = str_replace('Session-pillow=', '', $subpillowsession);
				
				setcookie("Session-pillow", $session_pillow, time()+2592000, "/");
			}
		}
		
		return $response->body;
    }
    
    
	public function signinFacebookUser($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	$url = $this->pillow_path .'session/login';
	
		$response = Request::post($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('X-Pillow-Application-Id', '0-0')
                        ->body('{ "userAuthType": "facebook",
								"facebookId": "'.$user['id'].'" }')
                        ->send();
        
		if (strpos($response->raw_headers, '200 OK') !== false && !empty($response->headers['set-cookie']) ){
			// creating session parameters
			if (strpos($response->headers['set-cookie'], 'Session-pillow') !== false){
				
				$session_pillow = str_replace(substr($response->headers['set-cookie'], 0, strpos($response->headers['set-cookie'], ';')), 'Session-pillow=', '');
				
				$subpillowsession = substr($response->headers['set-cookie'], 0, strpos($response->headers['set-cookie'], ';'));
				$session_pillow = str_replace('Session-pillow=', '', $subpillowsession);
				
				setcookie("Session-pillow", $session_pillow, time()+2592000, "/");
			}
		}
		
		return $response->body;
    }
    
	public function getUserInfo($country = 'gb', $language = 'en', $locale = 'en_GB')
    {
    	$url = $this->pillow_path .'users/me';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->send();
		
		return json_decode($response->body);
    }
    
	public function logout($country = 'gb', $language = 'en', $locale = 'en_GB')
    {
    	$url = $this->pillow_path .'session/logout';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->send();
        setcookie("Session-pillow", "", time()+3600, "/");
		return $response->body;
    }
    
	public function resetpassword($country = 'gb', $language = 'en', $locale = 'en_GB', $user)
    {
    	$url = $this->pillow_path .'session/reset_password/' . $user['fpinputEmail'];
	
		$response = Request::post($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->body('')
                        ->send();
     
        setcookie("Session-pillow", "", time()+2592000, "/");
		return $response->body;
    }
    
    public function getPresets($country = 'gb', $language = 'en', $locale = 'en_GB')
    {
    	$url = $this->pillow_path .'users/me/presets';
	
		$response = Request::get($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->send();
        

		return json_decode($response->body)->body->content;
    }
    
    public function addPreset($country = 'gb', $language = 'en', $locale = 'en_GB',$permalink){
    	$url = $this->pillow_path .'users/me/presets';
		
    	$body = array();
    	
    	foreach ($permalink as $perm){
    		$body[] = array('permalink' => str_replace('-', '_', $perm));
    	}
    	$permalink = json_encode($body);
    	
		$response = Request::put($url)
                        ->addHeader('Cookie','PillowLocale=' . $locale)
                        ->addHeader('Cookie','Session-pillow=' . $_COOKIE['Session-pillow'])
                        ->body($permalink)
                        ->send();
       
       if (json_decode($response->body)->body->type == "error") return 'NOT CONNECTED';
	   return $response->body;
    }
    
    public function getAllcountries($language = 'en'){
    	/*$response = Request::get('http://restcountries.eu/rest/v1')
		                ->send();

	
		$aTemp = array();
		foreach ($response->body as $country){
			$aTemp[] = array('name' => $country->name, 'code' => strtolower($country->alpha2Code));
		}*/
		
		return $this->_getArrayCountries();
	
    }
    
    public function getProfessions()
    {
    	return array("Manager", "Craftsman", "Shopekeeper", "Business owner", "Worker", "Employee", "Student", "Unemployed", "Retired", "Professional", "Other");
    }
    
    private function _getArrayCountries()
    {
  		return array(array("name"=>"Afghanistan","code"=>"af"), array("name"=>"land Islands","code"=>"ax"), array("name"=>"Albania","code"=>"al"), array("name"=>"Algeria","code"=>"dz"), array("name"=>"American Samoa","code"=>"as"), array("name"=>"Andorra","code"=>"ad"), array("name"=>"Angola","code"=>"ao"), array("name"=>"Anguilla","code"=>"ai"), array("name"=>"Antarctica","code"=>"aq"), array("name"=>"Antigua and Barbuda","code"=>"ag"), array("name"=>"Argentina","code"=>"ar"), array("name"=>"Armenia","code"=>"am"), array("name"=>"Aruba","code"=>"aw"), array("name"=>"Australia","code"=>"au"), array("name"=>"Austria","code"=>"at"), array("name"=>"Azerbaijan","code"=>"az"), array("name"=>"The Bahamas","code"=>"bs"), array("name"=>"Bahrain","code"=>"bh"), array("name"=>"Bangladesh","code"=>"bd"), array("name"=>"Barbados","code"=>"bb"), array("name"=>"Belarus","code"=>"by"), array("name"=>"Belgium","code"=>"be"), array("name"=>"Belize","code"=>"bz"), array("name"=>"Benin","code"=>"bj"), array("name"=>"Bermuda","code"=>"bm"), array("name"=>"Bhutan","code"=>"bt"), array("name"=>"Bolivia","code"=>"bo"), array("name"=>"Bonaire","code"=>"bq"), array("name"=>"Bosnia and Herzegovina","code"=>"ba"), array("name"=>"Botswana","code"=>"bw"), array("name"=>"Bouvet Island","code"=>"bv"), array("name"=>"Brazil","code"=>"br"), array("name"=>"British Indian Ocean Territory","code"=>"io"), array("name"=>"British Virgin Islands","code"=>"vg"), array("name"=>"Brunei","code"=>"bn"), array("name"=>"Bulgaria","code"=>"bg"), array("name"=>"Burkina Faso","code"=>"bf"), array("name"=>"Burundi","code"=>"bi"), array("name"=>"Cambodia","code"=>"kh"), array("name"=>"Cameroon","code"=>"cm"), array("name"=>"Canada","code"=>"ca"), array("name"=>"Cape Verde","code"=>"cv"), array("name"=>"Cayman Islands","code"=>"ky"), array("name"=>"Central African Republic","code"=>"cf"), array("name"=>"Chad","code"=>"td"), array("name"=>"Chile","code"=>"cl"), array("name"=>"China","code"=>"cn"), array("name"=>"Christmas Island","code"=>"cx"), array("name"=>"Cocos (Keeling) Islands","code"=>"cc"), array("name"=>"Colombia","code"=>"co"), array("name"=>"Comoros","code"=>"km"), array("name"=>"Republic of the Congo","code"=>"cg"), array("name"=>"Democratic Republic of the Congo","code"=>"cd"), array("name"=>"Cook Islands","code"=>"ck"), array("name"=>"Costa Rica","code"=>"cr"), array("name"=>"Côte d\'Ivoire","code"=>"ci"), array("name"=>"Croatia","code"=>"hr"), array("name"=>"Cuba","code"=>"cu"), array("name"=>"Curaçao","code"=>"cw"), array("name"=>"Cyprus","code"=>"cy"), array("name"=>"Czech Republic","code"=>"cz"), array("name"=>"Denmark","code"=>"dk"), array("name"=>"Djibouti","code"=>"dj"), array("name"=>"Dominica","code"=>"dm"), array("name"=>"Dominican Republic","code"=>"do"), array("name"=>"Ecuador","code"=>"ec"), array("name"=>"Egypt","code"=>"eg"), array("name"=>"El Salvador","code"=>"sv"), array("name"=>"Equatorial Guinea","code"=>"gq"), array("name"=>"Eritrea","code"=>"er"), array("name"=>"Estonia","code"=>"ee"), array("name"=>"Ethiopia","code"=>"et"), array("name"=>"Falkland Islands","code"=>"fk"), array("name"=>"Faroe Islands","code"=>"fo"), array("name"=>"Fiji","code"=>"fj"), array("name"=>"Finland","code"=>"fi"), array("name"=>"France","code"=>"fr"), array("name"=>"French Guiana","code"=>"gf"), array("name"=>"French Polynesia","code"=>"pf"), array("name"=>"French Southern and Antarctic Lands","code"=>"tf"), array("name"=>"Gabon","code"=>"ga"), array("name"=>"Gambia","code"=>"gm"), array("name"=>"Georgia","code"=>"ge"), array("name"=>"Germany","code"=>"de"), array("name"=>"Ghana","code"=>"gh"), array("name"=>"Gibraltar","code"=>"gi"), array("name"=>"Greece","code"=>"gr"), array("name"=>"Greenland","code"=>"gl"), array("name"=>"Grenada","code"=>"gd"), array("name"=>"Guadeloupe","code"=>"gp"), array("name"=>"Guam","code"=>"gu"), array("name"=>"Guatemala","code"=>"gt"), array("name"=>"Guernsey","code"=>"gg"), array("name"=>"Guinea","code"=>"gn"), array("name"=>"Guinea-Bissau","code"=>"gw"), array("name"=>"Guyana","code"=>"gy"), array("name"=>"Haiti","code"=>"ht"), array("name"=>"Heard Island and McDonald Islands","code"=>"hm"), array("name"=>"Vatican City","code"=>"va"), array("name"=>"Honduras","code"=>"hn"), array("name"=>"Hong Kong","code"=>"hk"), array("name"=>"Hungary","code"=>"hu"), array("name"=>"Iceland","code"=>"is"), array("name"=>"India","code"=>"in"), array("name"=>"Indonesia","code"=>"id"), array("name"=>"Iran","code"=>"ir"), array("name"=>"Iraq","code"=>"iq"), array("name"=>"Republic of Ireland","code"=>"ie"), array("name"=>"Isle of Man","code"=>"im"), array("name"=>"Israel","code"=>"il"), array("name"=>"Italy","code"=>"it"), array("name"=>"Jamaica","code"=>"jm"), array("name"=>"Japan","code"=>"jp"), array("name"=>"Jersey","code"=>"je"), array("name"=>"Jordan","code"=>"jo"), array("name"=>"Kazakhstan","code"=>"kz"), array("name"=>"Kenya","code"=>"ke"), array("name"=>"Kiribati","code"=>"ki"), array("name"=>"Kuwait","code"=>"kw"), array("name"=>"Kyrgyzstan","code"=>"kg"), array("name"=>"Laos","code"=>"la"), array("name"=>"Latvia","code"=>"lv"), array("name"=>"Lebanon","code"=>"lb"), array("name"=>"Lesotho","code"=>"ls"), array("name"=>"Liberia","code"=>"lr"), array("name"=>"Libya","code"=>"ly"), array("name"=>"Liechtenstein","code"=>"li"), array("name"=>"Lithuania","code"=>"lt"), array("name"=>"Luxembourg","code"=>"lu"), array("name"=>"Macau","code"=>"mo"), array("name"=>"Republic of Macedonia","code"=>"mk"), array("name"=>"Madagascar","code"=>"mg"), array("name"=>"Malawi","code"=>"mw"), array("name"=>"Malaysia","code"=>"my"), array("name"=>"Maldives","code"=>"mv"), array("name"=>"Mali","code"=>"ml"), array("name"=>"Malta","code"=>"mt"), array("name"=>"Marshall Islands","code"=>"mh"), array("name"=>"Martinique","code"=>"mq"), array("name"=>"Mauritania","code"=>"mr"), array("name"=>"Mauritius","code"=>"mu"), array("name"=>"Mayotte","code"=>"yt"), array("name"=>"Mexico","code"=>"mx"), array("name"=>"Federated States of Micronesia","code"=>"fm"), array("name"=>"Moldova","code"=>"md"), array("name"=>"Monaco","code"=>"mc"), array("name"=>"Mongolia","code"=>"mn"), array("name"=>"Montenegro","code"=>"me"), array("name"=>"Montserrat","code"=>"ms"), array("name"=>"Morocco","code"=>"ma"), array("name"=>"Mozambique","code"=>"mz"), array("name"=>"Myanmar","code"=>"mm"), array("name"=>"Namibia","code"=>"na"), array("name"=>"Nauru","code"=>"nr"), array("name"=>"Nepal","code"=>"np"), array("name"=>"Netherlands","code"=>"nl"), array("name"=>"New Caledonia","code"=>"nc"), array("name"=>"New Zealand","code"=>"nz"), array("name"=>"Nicaragua","code"=>"ni"), array("name"=>"Niger","code"=>"ne"), array("name"=>"Nigeria","code"=>"ng"), array("name"=>"Niue","code"=>"nu"), array("name"=>"Norfolk Island","code"=>"nf"), array("name"=>"North Korea","code"=>"kp"), array("name"=>"Northern Mariana Islands","code"=>"mp"), array("name"=>"Norway","code"=>"no"), array("name"=>"Oman","code"=>"om"), array("name"=>"Pakistan","code"=>"pk"), array("name"=>"Palau","code"=>"pw"), array("name"=>"Palestine","code"=>"ps"), array("name"=>"Panama","code"=>"pa"), array("name"=>"Papua New Guinea","code"=>"pg"), array("name"=>"Paraguay","code"=>"py"), array("name"=>"Peru","code"=>"pe"), array("name"=>"Philippines","code"=>"ph"), array("name"=>"Pitcairn Islands","code"=>"pn"), array("name"=>"Poland","code"=>"pl"), array("name"=>"Portugal","code"=>"pt"), array("name"=>"Puerto Rico","code"=>"pr"), array("name"=>"Qatar","code"=>"qa"), array("name"=>"Republic of Kosovo","code"=>"xk"), array("name"=>"Réunion","code"=>"re"), array("name"=>"Romania","code"=>"ro"), array("name"=>"Russia","code"=>"ru"), array("name"=>"Rwanda","code"=>"rw"), array("name"=>"Saint Barthélemy","code"=>"bl"), array("name"=>"Saint Helena","code"=>"sh"), array("name"=>"Saint Kitts and Nevis","code"=>"kn"), array("name"=>"Saint Lucia","code"=>"lc"), array("name"=>"Saint Martin","code"=>"mf"), array("name"=>"Saint Pierre and Miquelon","code"=>"pm"), array("name"=>"Saint Vincent and the Grenadines","code"=>"vc"), array("name"=>"Samoa","code"=>"ws"), array("name"=>"San Marino","code"=>"sm"), array("name"=>"Saudi Arabia","code"=>"sa"), array("name"=>"Senegal","code"=>"sn"), array("name"=>"Serbia","code"=>"rs"), array("name"=>"Seychelles","code"=>"sc"), array("name"=>"Sierra Leone","code"=>"sl"), array("name"=>"Singapore","code"=>"sg"), array("name"=>"Sint Maarten","code"=>"sx"), array("name"=>"Slovakia","code"=>"sk"), array("name"=>"Slovenia","code"=>"si"), array("name"=>"Solomon Islands","code"=>"sb"), array("name"=>"Somalia","code"=>"so"), array("name"=>"South Africa","code"=>"za"), array("name"=>"South Georgia","code"=>"gs"), array("name"=>"South Korea","code"=>"kr"), array("name"=>"South Sudan","code"=>"ss"), array("name"=>"Spain","code"=>"es"), array("name"=>"Sri Lanka","code"=>"lk"), array("name"=>"Sudan","code"=>"sd"), array("name"=>"Suriname","code"=>"sr"), array("name"=>"Svalbard and Jan Mayen","code"=>"sj"), array("name"=>"Swaziland","code"=>"sz"), array("name"=>"Sweden","code"=>"se"), array("name"=>"Switzerland","code"=>"ch"), array("name"=>"Syria","code"=>"sy"), array("name"=>"Taiwan","code"=>"tw"), array("name"=>"Tajikistan","code"=>"tj"), array("name"=>"Tanzania","code"=>"tz"), array("name"=>"Thailand","code"=>"th"), array("name"=>"East Timor","code"=>"tl"), array("name"=>"Togo","code"=>"tg"), array("name"=>"Tokelau","code"=>"tk"), array("name"=>"Tonga","code"=>"to"), array("name"=>"Trinidad and Tobago","code"=>"tt"), array("name"=>"Tunisia","code"=>"tn"), array("name"=>"Turkey","code"=>"tr"), array("name"=>"Turkmenistan","code"=>"tm"), array("name"=>"Turks and Caicos Islands","code"=>"tc"), array("name"=>"Tuvalu","code"=>"tv"), array("name"=>"Uganda","code"=>"ug"), array("name"=>"Ukraine","code"=>"ua"), array("name"=>"United Arab Emirates","code"=>"ae"), array("name"=>"United Kingdom","code"=>"gb"), array("name"=>"United States","code"=>"us"), array("name"=>"United States Minor Outlying Islands","code"=>"um"), array("name"=>"United States Virgin Islands","code"=>"vi"), array("name"=>"Uruguay","code"=>"uy"), array("name"=>"Uzbekistan","code"=>"uz"), array("name"=>"Vanuatu","code"=>"vu"), array("name"=>"Venezuela","code"=>"ve"), array("name"=>"Vietnam","code"=>"vn"), array("name"=>"Wallis and Futuna","code"=>"wf"), array("name"=>"Western Sahara","code"=>"eh"), array("name"=>"Yemen","code"=>"ye"), array("name"=>"Zambia","code"=>"zm"), array("name"=>"Zimbabwe","code"=>"zw"));
    }
    
    public function getImg($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink){
   		$url = $this->pillow_path.'people/'.$permalink;
   		$response = Request::get($url)
   		->addHeader('Cookie','PillowLocale=' . $locale)
   		->send();
   		$data = json_decode($response->body)->body->content->picture;
   			
   		return $data;
    }
    
    public function checkBio($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink){
    	$url = $this->pillow_path.'people/'.$permalink;
    	$response = Request::get($url)
    	->addHeader('Cookie','PillowLocale=' . $locale)
    	->send();
    	$data = json_decode($response->body)->body->content->relations[0]->key;
    	if($data=='bio'){
    		return true;
    	}else{
    		return false;
    	}
    }
    
    public function getBio($country = 'gb', $language = 'en', $locale = 'en_GB', $permalink){
    	$url = $this->pillow_path.'people/'.$permalink.'/bio';
    	$response = Request::get($url)
    	->addHeader('Cookie','PillowLocale=' . $locale)
    	->send();
    	$dataName = json_decode($response->body)->body->content->name;
    	$dataType = json_decode($response->body)->body->content->article[0]->type;
    	$dataTitle = json_decode($response->body)->body->content->article[0]->$dataType;
    	if(strtolower($dataTitle) == strtolower($dataName)){
    		$dataType1 = json_decode($response->body)->body->content->article[2]->type;
    		$data = json_decode($response->body)->body->content->article[2]->$dataType1;
    	}else{
    		$data = $dataTitle;
    	}
    	return $data;
    }
    
	public function getPeopleStations($country = 'gb', $language = 'en', $locale = 'fr_FR', $permalink)
	    {
	    	
	    	$url = $this->pillow_path .'people/'. $permalink .'/playing_radios';
		
			$response = Request::get($url)
	                        ->addHeader('Cookie','PillowLocale=' . $locale)
			                ->send();
	
			$data['radios'] = json_decode($response->body)->body->content;
			
			return $data;
	    }
	public function getFormatName($country = 'gb', $language = 'en', $locale = 'fr_FR',$permalink){
		$url = $this->pillow_path.'people/'.$permalink;
		$response = Request::get($url)
	    ->addHeader('Cookie','PillowLocale=' . $locale)
		->send();
		$data = json_decode($response->body)->body->content->name;
		
		return $data;
	}	   
}