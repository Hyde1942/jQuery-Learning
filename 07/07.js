// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

//Plugins jQuery.

$(document).ready(function() {

	console.log($.fn.cycle.defaults);
	$.fn.cycle.defaults.timeout = 10000;
	//$.fn.cycle.defaults.random = true;
	var $books = $('#books');
	var $controls = $('<div id="books-controls"></div>');
	$controls.insertAfter($books);
	$('<button>Pause</button>').click(function(event) {
		/* Act on the event */
		event.preventDefault();
		$(books).cycle('pause');
		$.cookie('cyclePaused','y',{expires:30})

	}).button({
		icons: {primary:'ui-icon-pause'}
	}).appendTo($controls);
	$('<button>Resume</button>').click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var $paused = $('ul:paused');

		if ($paused.length){
			$paused.cycle('resume');
			$.cookie('cyclePaused', null);
		}else {
			$(this).effect('shake',{
				distance: 10
			});
		}
	}).button({
		icons: {primary: 'ui-icon-play'}
	}).appendTo($controls);

	$books.cycle({
		speed: 200,
		pause: true,
		timeout: 500,
		fx: 'fade',
		autostop: true,
		before: function(){
			$('#slider').slider('value',$('#books li').index(this));
		}
	});

	if($.cookie('cyclePaused')){
		$books.cycle('pause');
	}

	//jquery UI

	$books.hover(function() {
		/* Stuff to do when the mouse enters the element */
		$books.find('.title').animate({
          backgroundColor: "#eee",
          color: "#000"
		}, 1000);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		$books.find('.title').animate({
			backgroundColor: '#000',
			color: '#fff'
		}, 1000);
	});

	$('h1').click(function(event) {
		/* Act on the event */
		$(this).toggleClass('highlighted','slow','easeInExpo');
	});

	$books.find('.title').resizable({
		handles: 's'
	});

	//Widgets

	$('<div id="slider"></div>').slider({
		min: 0,
		max: $('#books li').length - 1,
		animate:'fast',
		slide: function(event, ui){
			$books.cycle(ui.value);
		}

	}).appendTo($controls);

	//Challenges.

	//1.

});