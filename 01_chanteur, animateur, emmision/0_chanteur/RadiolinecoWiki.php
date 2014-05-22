<?php
namespace Radiolineco\WebappBundle\Service;


class RadiolinecoWiki
{	
	function getContent($name,$lang){
		$name = $this->nameFormat($name,$lang);
		$url = 'http://'.$lang.'.wikipedia.org/w/api.php?action=parse&page='.str_replace(" ", "%20", $name).'&format=json&prop=text';
		$ch = curl_init($url);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		//curl_setopt ($ch, CURLOPT_USERAGENT, "TestScript"); // required by wikipedia.org server; use YOUR user agent with YOUR contact information. (otherwise your IP might get blocked)
		$c = curl_exec($ch);
		$json = json_decode($c);
		if(property_exists($this, 'error')){
			$parag = null;
		}elseif(isset($json->{'parse'}->{'text'}->{'*'})){
			$content = $json->{'parse'}->{'text'}->{'*'};
			$pattern = '#<p>(.*)</p>#Us';
			if(preg_match($pattern, $content, $matches))
			{
				$parag = strip_tags($matches[1]);
				preg_match_all('/\[(.*)\]/Us',$parag, $m2[0]);
				for($j=0;$j<count($m2);$j++){
					$parag = str_replace($m2[0][$j], '', $parag);
				}
				$parag = str_replace('&#160;', ' ', $parag);
				//may refer to:
				if($lang == 'fr'){
					$needle = 'est un acronyme qui';
					if(strpos($parag, $needle)>0){
						$parag = null;
					}
				}else{
					$needle = 'may refer to';
					if(strpos($parag, $needle)>0){
						$parag = null;
					}
				}
			}
		}else {
			$parag = null;				
		}
		
		return $parag;	
		
	}
	
	function getImg($name,$lang){
		$name = $this->nameFormat($name,$lang);
		$imgurl = 'http://en.wikipedia.org/w/api.php?action=query&titles='.str_replace(" ", "%20", $name).'&prop=pageimages&format=json&pithumbsize=300';
		$ch1 = Curl_init($imgurl);
		curl_setopt($ch1, CURLOPT_RETURNTRANSFER, 1);
		$c1  = curl_exec($ch1);
		$json1 = (array)json_decode($c1)->{'query'}->{'pages'};
		$i=0;
		foreach ($json1 as $key => $value) {
			$id[$i] = $key;
			$i++;
		}
		if(property_exists(json_decode($c1)->{'query'}->{'pages'}->{$id[0]}, 'thumbnail')){
			$json2 = json_decode($c1)->{'query'}->{'pages'}->{$id[0]}->{'thumbnail'}->{'source'};
			$img = $json2;
		}else{
			$imgurl2 = 'http://fr.wikipedia.org/w/api.php?action=query&titles='.str_replace(" ", "%20", $name).'&prop=pageimages&format=json&pithumbsize=300';
			$ch2 = Curl_init($imgurl2);
			curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
			$c2  = curl_exec($ch2);
			$json3 = (array)json_decode($c2)->{'query'}->{'pages'};
			$i=0;
			foreach ($json3 as $key => $value) {
				$id1[$i] = $key;
				$i++;
			}
			if(property_exists(json_decode($c2)->{'query'}->{'pages'}->{$id1[0]}, 'thumbnail')){
				$json4 = json_decode($c2)->{'query'}->{'pages'}->{$id1[0]}->{'thumbnail'}->{'source'};
				$img = $json4;
			}else{
				$img = null;
			}
		}
		return $img;
	}

	function nameFormat($name,$lang){
		$name = urldecode($name);
		$nameNoSpace = str_replace(' ', '', $name);
		$unwantedArray = array(    'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
				'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
				'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
				'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
				'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
		$nameNoSpace = strtr( $nameNoSpace, $unwantedArray );
		if(ctype_lower($nameNoSpace)){
			$name = strtolower($name);
			$name = ucwords($name);
		}
		return $name;
	}
		
}