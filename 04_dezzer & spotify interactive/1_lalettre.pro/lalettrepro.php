<?php
    $rss = new DOMDocument();
    $rss->load('http://www.lalettre.pro/xml/syndication.rss');
    $feed = array();
    foreach ($rss->getElementsByTagName('item') as $node) {
        $desc = $node->getElementsByTagName('description')->item(0)->nodeValue;
        $text = substr($desc, 0, strpos($desc, '<div'));
        $img  = substr($desc, strpos($desc,'<img'), strpos($desc, '/>'));
        $item = array (
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
            'text' => $text,
            'img'  => $img,
            );
        array_push($feed, $item);
    }
    $limit = 5;
    for($x=0;$x<$limit;$x++) {
        $title = str_replace(' & ', ' &amp; ', $feed[$x]['title']);
        $link = $feed[$x]['link'];
        //$description = $feed[$x]['desc'];
        //$text = substr($description,0,strpos($description, '<div'));
        //$img = substr($description, strpos($description, '<img'),strpos($description, '/>'));
        echo '<p><strong><a href="'.$link.'" title="'.$title.'"  target="_Blank">'.$title.'</a></strong><br />';
        echo '<p>'.$feed[$x]['text'].'</p>';
        echo '<p>'.$feed[$x]['img'].'</p>';
    }
?>

