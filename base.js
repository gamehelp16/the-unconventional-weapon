
$(document).ready(function() {

	intro=1; //1
	missiontoggle=false;
	achievementtoggle=false;
	missionnumber=1; //1
	pet="x0"; //c=cat, d=dog, 1=low quality, 2=medium quality, 3=high quality, x0
	money=0; //0
	gadget="none"; //"none"
	isworking=false;
	sessionearnings=0;
	worktime=1000;
	lettertotype=countdown="";
	difficulty=1;
	throwcoin=0; //0
	
	missions=[];
	missions.push({"title":"Secret Message", "desc":"Just play the game lol."});
	missions.push({"title":"Finish the intro", "desc":"Because we are going to play the game!"});
	missions.push({"title":"The kitten itself", "desc":"We can just search for images of kittens, but wouldn't it be better if we took the picture by ourselves? So, let's buy a kitten!"});
	missions.push({"title":"A Camera", "desc":"Now we have got the kitten, we need a camera to take a picture of it."});
	missions.push({"title":"Cheese!", "desc":"We are almost finished! You just need to take a picture of the kitten and get the developed image and we are ready to kill the person!"});
	missions.push({"title":"Kill!", "desc":"Great! Now we have everything we needed. It's time to kill the person! To do so, simply click the bucket on the wishing well."});
	missions.push({"title":"Congrats!", "desc":"Well, congratulations for completing this little game! I hope you enjoy! :D Also I decided to give you an extra $5000!"});
	
	achievements=[];
	achievements.push({"title":"Woof!", "desc":"Because puppies (maybe) are cuter than kittens!", "achieved":false});
	achievements.push({"title":"The Humble", "desc":"<i style=\"color:gray;\">(no description, or is this one?)</i>", "achieved":false});
	achievements.push({"title":"Nouveau Riche", "desc":"$$$", "achieved":false});
	achievements.push({"title":"Hard Worker", "desc":"Type: 'gamehelp16 rules'", "achieved":false});
	achievements.push({"title":"This is not candy box", "desc":"Clicking the guy's hat will only give you this achievement and nothing else.", "achieved":false});
	achievements.push({"title":"#materiyolo", "desc":"MATIAS DUARTE!!!!1", "achieved":false});
	achievements.push({"title":"Recursion", "desc":"Another achievement thanks to an achievement!", "achieved":false});
	
	$(document).keyup(function(e) {
		if(e.keyCode==13 && intro!=5 && intro<12)intro++,$(".intro-"+intro).fadeIn(1000);
		if(intro==10)missionnumber=1,mission('new'),$("#mission").animate({"top": "-"+($("#mission").height()+32)+"px"},2000),$("#achievements").animate({"bottom": "-"+($("#achievements").height()+32)+"px"},2000);
	});
	
	$(document).mousemove(function(e) {
		$("#photo").css({"top":(e.pageY-13)+"px","left":(e.pageX+2)+"px"});
	});
	
	$(".intro-5 input").click(function() {
		if(intro==5)$(".button-number").html($(this).val());
		intro=6;
		$(".intro-"+intro).fadeIn(1000);
	});
	
	$(".mission-button").click(function() {
		if(missiontoggle) {
			$("#mission").animate({"top": "-"+($("#mission").height()+32)+"px"},500);
			missiontoggle=false;
		}
		else {
			$("#mission").animate({"top": "-1px"},500);
			missiontoggle=true;
		}
	});
	$(".achievement-button").click(function() {
		if(achievementtoggle) {
			$("#achievements").animate({"bottom": "-"+($("#achievements").height()+32)+"px"},500);
			achievementtoggle=false;
		}
		else {
			$("#achievements").animate({"bottom": "-1px"},500);
			achievementtoggle=true;
		}
	});
	
	$(".finish-intro").click(function() {
		mission('complete',1);
		intro++;
		$("#intro").fadeOut(1000);
		setTimeout(update,1000);
	});
	
	$(".head").click(function() {
		mission('complete',5);
		map('map');
		$('*').css('cursor','inherit');
		$('#photo').hide();
		money+=5000;
		update();
	});
	
	$(".building").mousemove(function(e) {
		$("#tooltip").html($(this).attr("title")).css({"top":(e.pageY-30)+"px","left":(e.pageX+15)+"px"});
	});
	
	$(".building").mouseout(function(e) {
		$("#tooltip").html("").css("top","-1000px");
	});
	
	$(".protection").mouseover(function(e) {
		$("#person").css({"top":getRandomInt(150,innerHeight-200)+"px","left":getRandomInt(150,innerWidth-200)+"px"});
	});
	
	$(".work-text").keyup(function(e) {
		kc=e.keyCode;
		if(isworking) {
			if(kc==27) {
				money+=sessionearnings;
				isworking=false;
				$(".work-paid").html("You got $"+sessionearnings+", type anything in the textbox to start again.");
				sessionearnings=0;
				$(".work-text").val("");
				$(".work-type").html("(start working first)");
				clearInterval(countdown);
				update();
			}
			else {
				if($(".work-text").val()==lettertotype) {
					difficulty++;
					$(".work-text").val("");
					lettertotype=randomletter(Math.ceil(difficulty/10));
					$(".work-type").html(lettertotype);
					worktime=1000-difficulty*10;
					$(".work-time").html(worktime);
					sessionearnings+=Math.ceil(difficulty/10);
					if(difficulty>=30)achievement(3);
				}
				else if($(".work-text").val()=="gamehelp16 rules") {
					if(achievements[3].achieved) {
						achievement(6);
						worktime=5000;
						$(".work-text").val("");
					}
				}
			}
		}
		else {
			difficulty=1;
			isworking=true;
			$(".work-text").val("");
			lettertotype=randomletter(1);
			$(".work-type").html(lettertotype);
			worktime=1000;
			$(".work-time").html(worktime);
			countdown=setInterval(function() {
				worktime--;
				$(".work-time").html(worktime);
				if(worktime<=0) {
					isworking=false;
					sessionearnings=0;
					$(".work-paid").html("You got $"+sessionearnings+", type anything in the textbox to start again.");
					$(".work-text").val("");
					clearInterval(countdown);
					update();
				}
			},1);
		}
	});
	
	for(i=0;i<30;i++) {
		for(j=0;j<112;j++) {
			if(Math.random()<0.05){$("#map").append("~");}else{$("#map").append(" ");}
		}
		$("#map").append("<br>");
	}
	map('map');
	mission('new');
	update();
	
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomletter(a) {
	output="";
	for (i=0;i<a;i++) {
        output=output+String.fromCharCode(97 + Math.floor(Math.random() * 26));
	}
	return output;
}

function update() {
	if(intro==13)$("#intro").hide(),$("#game, #stats").show(),$("#mission").css("top","-"+($("#mission").height()+32)+"px"),$("#achievements").css("bottom","-"+($("#achievements").height()+32)+"px");
	$("#stats").html("Money: $"+money+" | Pet: "+pettype()+" | Gadget: "+gadget);
	$("#achievement-list").html("");
	append="";
	for(m=0;m<achievements.length;m++) {
		title=achievements[m].title;
		desc=achievements[m].desc;
		append="";
		if(!achievements[m].achieved)append=" style=\"opacity:.4;\"", desc="???";
		if(m>4 && !achievements[m].achieved)title="???";
		$("#achievement-list").append("<div class=\"the-achievement\""+append+"><b>"+title+"</b><br>"+desc+"</div>");
	}
}

function map(a) {
	$("#map, #petshop, pre.building, #welldialog, #home, #battle").hide().css("opacity",1);
	$("#tooltip").css("opacity",1);
	$(".well").css({"bottom":"50px", "left":"300px", "cursor":"pointer"});
	if(a=="map") {
		$("#map, pre.building").show();
	}
	else if(a=="petshop") {
		$("#petshop").show();
		$("#petshopdialog").css("top","45px").html('Welcome to the pet shop!<br>What do you want to do?<br><input type="button" value="Buy or sell a pet" onclick="map(\'buysellpet\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
	}
	else if(a=="buysellpet") {
		$("#petshop").show();
		if(pet=="x0") {
			$("#petshopdialog").css("top","20px").html('You don\'t seem to have a pet yet, would you like to buy one?<br><input type="button" value="Low quality kitten" onclick="buypet(\'c1\')">($100) <input type="button" value="Medium quality kitten" onclick="buypet(\'c2\')">($200) <input type="button" value="High quality kitten" onclick="buypet(\'c3\')">($300)<br><input type="button" value="Low quality puppy" onclick="buypet(\'d1\')">($100) <input type="button" value="Medium quality puppy" onclick="buypet(\'d2\')">($200) <input type="button" value="High quality puppy" onclick="buypet(\'d3\')">($300)<br><input type="button" value="Golden kitten" onclick="buypet(\'c4\')">($500)<br>Lower quality animals are more likely to disobey its master, but it is cheaper.<br><input type="button" value="Go back" onclick="map(\'map\')">');
		}
		else {
			$("#petshopdialog").css("top","50px").html('You have a '+pettype()+', would you like to sell it for 3/4 of the price?<br><input type="button" value="Sell the pet" onclick="sellpet()">or <input type="button" value="Go back" onclick="map(\'map\')">');
		}
	}
	else if(a=="well") {
		$("#map, .well, #welldialog").show();
		$("#map, #tooltip").css("opacity",0);
		$(".well").css({"bottom":"275px", "left":"20px", "cursor":"default"});
		if(gadget=="none") {
			if(pet.split("")[0]!="x") {
				if(throwcoin<1) {
					$("#welldialog").css({"top":"40px", "left":"275px"}).html('It seems that you need to throw some money inside the well to make the wishing well work.<br><input type="button" value="Throw $1" onclick="money--;throwcoin++;map(\'well\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
				}
				else if(throwcoin<10) {
					$("#welldialog").css({"top":"40px", "left":"275px"}).html('Hmmm... apparently you need to throw more than $1 to make it work.<br><input type="button" value="Throw $1" onclick="money--;throwcoin++;map(\'well\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
				}
				else if(throwcoin>=1000 && throwcoin<=9000) {
					$("#welldialog").css({"top":"40px", "left":"275px"}).html('Hi there, young wanderer! To get a wish, you need to solve this really simple cipher: \'ariretbaantvirlbhhc\'<br><br><input type="text" class="cipher-answer"> <input type="button" value="Check" onclick="checkriddle()"><br><input type="button" value="Go back" onclick="map(\'map\')">');
				}
				else if(throwcoin>9000) {
					$("#welldialog").css({"top":"40px", "left":"275px"}).html('Right! Now, what is your wish?<br>(You can only wish once!)<br><input type="button" value="A DSLR Camera" onclick="wish(1)"> <input type="button" value="An Instant Camera" onclick="wish(2)"><br><input type="button" value="A Nexus 6" onclick="wish(3)"> <input type="button" value="An iPhone 6" onclick="wish(4)"> <input type="button" value="An Oculus Rift" onclick="wish(5)"><br><input type="button" value="Nothing" onclick="wish(6)"> <input type="button" value="Go back" onclick="map(\'map\')">');
				}
				else {
					$("#welldialog").css({"top":"40px", "left":"275px"}).html('Hmmm... apparently you need to throw more than $1 to make it work.<br><input type="button" value="Throw $1" onclick="money--;throwcoin++;map(\'well\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
					if(Math.random()<0.2)throwcoin=1000;
				}
				update();
			}
			else {
				$("#welldialog").css({"top":"40px", "left":"275px"}).html('To make a wish you need to have a pet! (Weird, right?)<br><input type="button" value="Go back" onclick="map(\'map\')">');
			}
		}
		else {
			$("#welldialog").css({"top":"40px", "left":"275px"}).html('You have gotten what you wish for, don\'t be greedy!<br><input type="button" value="Go back" onclick="map(\'map\')">');
		}
	}
	else if(a=="home") {
		$("#home").show();
		if((gadget=="none" || gadget=="Nothing") && pet=="x0") {
			$("#homedialog").html('It definitely feels nice to come back home, but what can you do?<br><input type="button" value="Work" onclick="work(\'start\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
		}
		else if((gadget=="none" || gadget=="Nothing") && pet!="x0") {
			$("#homedialog").html('<div class="a">It definitely feels nice to come back home, but what can you do?<br><input type="button" value="Play with pet" onclick="$(\'.a\').html(\'Haha! Playing with pet is fun!\')"></div><input type="button" value="Work" onclick="work(\'start\')"><br><input type="button" value="Go back" onclick="map(\'map\')">');
		}
		else if((gadget=="An Instant Camera" || gadget=="A DSLR Camera" || gadget=="A Nexus 6" || gadget=="An iPhone 6") && pet!="x0") {
			$("#homedialog").html('<div class="a">It definitely feels nice to come back home, but what can you do?<br><input type="button" value="Play with pet" onclick="$(\'.a\').html(\'Haha! Playing with pet is fun!\')"></div><input type="button" value="Take a picture of the pet" onclick="takepicture()" class="takepetpicture"><br><input type="button" value="Work" onclick="work(\'start\')"><br><input type="button" value="Go back" onclick="map(\'map\')">');
		}
		else if(!(gadget=="none" || gadget=="Nothing") && pet!="x0") {
			$("#homedialog").html('<div class="a">It definitely feels nice to come back home, but what can you do?<br><input type="button" value="Play with pet" onclick="$(\'.a\').html(\'Haha! Playing with pet is fun!\')"><br><input type="button" value="Play with gadget" onclick="$(\'.a\').html(\'Dang, it\\\'s no fun! :/\')"></div><input type="button" value="Work" onclick="work(\'start\')"><br><input type="button" value="Go back" onclick="map(\'map\')">');
		}
		else {
			$("#homedialog").html('It definitely feels nice to come back home, but what can you do?<br><input type="button" value="Work" onclick="work(\'start\')"> <input type="button" value="Go back" onclick="map(\'map\')">');
		}
	}
	else if(a=="battle") {
		$("*").css("cursor","none");
		$("#photo").show();
		$("#battle").show();
		$("#person").css({"top":"200px","left":"200px"});
	}
}

function mission(a,b) {
	if(a=="complete") {
		if(missionnumber==b) {
			$("#mission-complete").html("Mission Complete: <b>"+missions[missionnumber].title+"</b>").animate({"top": "-1px"},200);
			missionnumber++;
			mission('new');
			setTimeout(function(){$("#mission-complete").animate({"top": "-42px"},200);},3000);
			update();
		}
	}
	else if(a=="new") {
		if(missionnumber!=6)$(".mission-title").html("Mission #"+missionnumber+": "+missions[missionnumber].title);
		if(missionnumber==6)$(".mission-title").html(missions[missionnumber].title);
		$(".mission-desc").html(missions[missionnumber].desc);
		update();
	}
}

function achievement(a) {
	if(!achievements[a].achieved) {
		$("#mission-complete").html("Achivement Get: <b>"+achievements[a].title+"</b>").animate({"top": "-1px"},200);
		achievements[a].achieved=true;
		setTimeout(function(){$("#mission-complete").animate({"top": "-42px"},200);},3000);
	}
	update();
}

function pettype() {
	pet2=pet.split("");
	output="";
	if(pet2[0]=="x")return "none";
	if(pet2[1]==1)output="Low quality";
	if(pet2[1]==2)output="Medium quality";
	if(pet2[1]==3)output="High quality";
	if(pet2[1]==4)output="Golden";
	if(pet2[0]=="c")output=output+" kitten";
	if(pet2[0]=="d")output=output+" puppy";
	return output;
}

function buypet(a) {
	b=a;
	a=a.split("");
	output="";
	if(a[1]==1)price=100;
	if(a[1]==2)price=200;
	if(a[1]==3)price=300;
	if(a[1]==4)price=500;
	if(a[1]==1)output="low quality";
	if(a[1]==2)output="medium quality";
	if(a[1]==3)output="high quality";
	if(a[1]==4)output="golden";
	if(a[0]=="c")output=output+" kitten";
	if(a[0]=="d")output=output+" puppy";
	if(money>=price) {
		if(confirm("Buy a "+output+" for $"+price+"?")) {
			pet=b;
			money-=price;
			map('buysellpet');
			update();
			if(a[0]=="c")mission('complete',2);
			if(a[0]=="d")achievement(0);
			if(a[1]==4)achievement(2);
		}
	}
	else {
		alert('Not enough money!');
	}
}

function sellpet() {
	b=pet;
	a=pet.split("");
	output="";
	if(a[1]==1)price=100;
	if(a[1]==2)price=200;
	if(a[1]==3)price=300;
	if(a[1]==4)price=500;
	if(a[1]==1)output="low quality";
	if(a[1]==2)output="medium quality";
	if(a[1]==3)output="high quality";
	if(a[1]==4)output="golden";
	if(a[0]=="c")output=output+" kitten";
	if(a[0]=="d")output=output+" puppy";
	if(confirm("Sell your "+output+" for $"+(3/4*price)+"?"))pet="x0",money+=(3/4*price),map('buysellpet'),update();
}

function wish(a) {
	item="";
	if(a==1)item="A DSLR Camera";
	if(a==2)item="An Instant Camera";
	if(a==3)item="A Nexus 6";
	if(a==4)item="An iPhone 6";
	if(a==5)item="An Oculus Rift";
	if(a==6)item="Nothing";
	if(confirm("Are you sure you want to wish for "+item+"?\n(Remember, you can only wish once!)")) {
		gadget=item;
		map('well');
		update();
		if(a==1 || a==2)mission('complete',3);
		if(a==6)achievement(1);
		if(a==3)achievement(5);
	}
}

function takepicture() {
	b=pet;
	a=pet.split("");
	chance=0;
	if(a[1]==1)chance=0.01;
	if(a[1]==2)chance=0.1;
	if(a[1]==3)chance=0.3;
	if(a[1]==4)chance=0.3;
	if(Math.random()<chance) {
	
		if(a[0]=="c" && (a[1]==3 || a[1]==4))$(".a").html("The kitten looks fabulous!<br><br> /\\     /\\<br>{  `---'  }<br>{  O   O  }<br>~~>  V  <~~<br> \\  \\|/  /<br>  `-----'____<br>  /     \\    \\_<br> {       }\\  )_\\_   _<br> |  \\_/  |/ /  \\_\\_/ )<br>  \\__/  /(_/     \\__/<br>    (__/");
		if(a[0]=="c" && a[1]==2)$(".a").html("That's a bad pose! But I guess it will work fine...<br><br>         __..--''``---....___   _..._    __<br>     _.-'    .-/\";  `        ``<._  ``.''_ `.<br> _.-' _..--.'_    \                    `( ) )<br>(_..-'    (< _     ;_..__               ; `'<br>           `-._,_)'      ``--...____..-'");
		if(a[1]==1)$(".a").html("Just the tail?! All this hardwork is just for a picture of a tail?! Come on.<br>I hope it will work. :(<br><br>...___..--';)<br>,--...--'''");
		/* Kittens ASCII Art from: http://www.asciiworld.com/-Cats-.html */
		
		if(a[0]=="d" && a[1]==3)$(".a").html("Woof! Clever puppy!<br><br>         __<br>        /  \\<br>       / ..|\\<br>      (_\\  |_)<br>      /  \\@'<br>     /     \\<br>_   /  `   |<br>\\\\/  \\  | _\\<br> \\   /_ || \\\\_<br>  \\____)|_) \\_)<br>");
		if(a[0]=="d" && a[1]==2)$(".a").html("Hey! No need to be angry!<br><br> ____|\\<br>`-/    \\<br> (\\_/)  \\<br> /_  _   |<br> \\/_/||) /<br>    '---'");
		/* Puppies ASCII Art from: http://www.asciiworld.com/-Cats-.html */
		
		if(gadget!="An Instant Camera")$(".a").append("<br><br>Unfortunately I can't develop the image :(");
		if(gadget=="An Instant Camera" && a[0]=="c")mission('complete',4);
		$(".well").addClass("clickable");
		$(".takepetpicture").hide();
	}
	else {
		c=Math.random();
		if(c<0.3) {
			$(".a").html("The pet doesn't seem to like being photographed.");
		}
		else if(c<0.5) {
			$(".a").html("The pet runs so fast!");
		}
		else if(c<0.7) {
			$(".a").html("The pet is so hard to find!");
		}
		else {
			$(".a").html("The pet hides under the chair!");
		}
		$(".takepetpicture").val("Try Again");
	}
}

function themomentoftruth() {
	if(missionnumber==5) {
		map('battle');
	}
}

function work(a) {
	if(a=="start") {
		$("#homedialog").hide();
		$("#workdialog").show();
	}
	else if(a=="stop") {
		$('#workdialog').hide();
		$('#homedialog').show();
		map('home');
		isworking=false;
		clearInterval(countdown);
	}
}

function checkriddle() {
	if($(".cipher-answer").val()=="nevergonnagiveyouup") {
		throwcoin=9100;
		map('well');
	}
	else {
		alert('Wrong answer!');
	}
}
