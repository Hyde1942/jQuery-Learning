// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function(){
	var $speech = $('div.speech');
	var defaultSize = $speech.css('fontSize');
	$('#switcher button').click(function(){
		var num = parseFloat($speech.css('fontSize'));
		switch(this.id){
			case 'switcher-large':
			num *= 1.4
			break;

			case 'switcher-small':
			num /= 1.4
			break;

			default:
			num = parseFloat(defaultSize)
			break;
		}
		$speech.animate({fontSize: num + 'px'},'slow');
	});
});

$(document).ready(function(){
	var $firstPara = $('p').eq(1);
	$firstPara.hide();
	$('a.more').click(function(ev){
		ev.preventDefault();
		$firstPara.animate({opacity: 'toggle',height: 'toggle'},'slow');
		var $link = $(this);
		if($link.text() === 'read more'){
			$link.text('read less')
		}else {
			$link.text('read more');
		}
	});
});

$(document).ready(function(){
	$('div.label').click(function(){
		var pWidth = $('div.speech p').outerWidth();
		var $switcher = $('#switcher');
		var switcherWidth = $switcher.outerWidth();
		$switcher.css({position: 'relative'})
		.fadeTo('fast', 0.1)
		.animate({left: pWidth - switcherWidth}, {
			duration: 'slow',
			queue: false
		})
		.fadeTo('fast', 1)
		.slideUp('slow',function(){
			$switcher.css('background-color', 'red');
		})
		.slideDown('slow');
		
	});
});

$(document).ready(function() {
	$('p').eq(2).css('border', '1px solid #333');
	$('p').eq(3).css('background-color', '#ccc').hide();
});

$(document).ready(function() {
	$('p').eq(2).click(function(){
		var $clicked = $(this);
		$(this).next().slideDown('slow',function(){
			$clicked.slideUp('slow');
		});
	});
});


//Challenges

$(document).ready(function() {
	//1. hide the page contents and slowly fade them in when page is loaded.
	$('#container').fadeIn('slow');

	//2.  Give each paragraph a yellow background only when the mouse is over it.
	$('p').hover(function(){
		$(this).css('background-color', 'yellow');
	},function(){
		$(this).css('background-color', 'white');
	});

	//3.
	$('#container h2').click(function(event) {
		/* Act on the event */
		$(this).fadeTo('slow', 0.25)
		.animate({marginLeft: '20px'}, {
			duration: 'fast',
			queue: false,
			complete: function() {
				$(this).fadeTo('slow',0.5);
			}
		});
	});

	//4. Move 20px in each directions using arrows key direction.

	$(document).keydown(function(event) {
		/* Act on the event */
		var $switcher = $('#switcher');
		var value = '+=20px';
		var keyMap = {
			37: {'left': value},
			38: {'top': value},
			39: {'right': value},
			40: {'bottom': value}
		}

		var switcherCordinates = {
			top: window.getComputedStyle(switcher).top,
			left: window.getComputedStyle(switcher).left,
			bottom: window.getComputedStyle(switcher).bottom,
			right: window.getComputedStyle(switcher).right
		}
		var key = event.which;

		if(key in keyMap) {

			switch (key) {
				case 37:
				$switcher.removeAttr('style').css({'left': switcherCordinates.left,'top': switcherCordinates.top})
				break;

				case 38:
				$switcher.removeAttr('style').css({'left': switcherCordinates.left,'top': switcherCordinates.top})
				break;

				case 39:
				$switcher.removeAttr('style').css({'right': switcherCordinates.right,'top': switcherCordinates.top})
				break;

				case 40:
				$switcher.removeAttr('style').css({'bottom': switcherCordinates.bottom,'left': switcherCordinates.left})
				break;
			}

			$switcher.css('position','relative').animate(keyMap[key],'fast');
		}

	});
});