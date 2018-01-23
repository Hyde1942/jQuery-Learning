// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function() {
	//Ajax using .load()
	$('#letter-a a').click(function(event) {
		event.preventDefault();
		$('#dictionary').hide().load('a.html',function(){
			$(this).fadeIn('slow');
		});
		
	});

	//Ajax using the $.getJSON()

	$('#letter-b a').click(function(event){
		event.preventDefault();
		$.getJSON('b.json', function(data, status) {
			if (status === 'success') {
				var html = '';
				$.each(data, function(entryIndex, entry) {
					html += '<div class="entry">';
					html += '<h3 class="term">' + entry.term  + '</h3>';
					html += '<div class="part">' + entry.part + '</div>';
					html += '<div class="definition">' + entry.definition ;
					html += '<div class="quote">';
					if (entry.quote) {
						$.each(entry.quote, function(quoteIndex, quote) {
							html += '<div class="quote-line">' + quote + '</div>'
						});
					}
					if(entry.author) {
						html += '<div class="quote-author">' + entry.author + '</div>';
					}

					html += '</div>'


					html += '</div></div>'
				});
				$('#dictionary').html(html);
			}
		});
	});


	//Ajax using $.getScript()
	$('#letter-c a').click(function(event) {
		event.preventDefault();
		$.getScript('c.js');
	});

	//Ajax loading an XML document.

	$('#letter-d a').click(function(event) {
		event.preventDefault();
		$.get('d.xml', function(data) {
			console.log(data);
			$('#dictionary').empty();
			var html = ''; 
			$(data).find('entry').each(function(index, el) {
				var $entry = $(this);
			    html += '<div class="entry">';
				html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
				html += '<div class="part">' + $entry.attr('part') + '</div>';
				html += '<div class="definition">' + $entry.find('definition').text();
				var $quote = $entry.find('quote');
				if ($quote.length) {
					html += '<div class="quote">';
					$quote.each(function(index, el) {
						html += '<div class="quote-line">';
						html += $(this).text() + '</div>'
					});

					if ($quote.attr('author')) {
						html += '<div class="author">'+ $quote.attr('author') + '</div>'
					}

					html += '</div>';
				}
				html += '</div>';
				html += '</div>';
			});

			$('#dictionary').html(html);
		});
	});

	// Get Request!

	$('#letter-e a').click(function(event) {
		event.preventDefault();
		$.get('e.php', {term : $(this).text()}, function(data) {
			/*optional stuff to do after success */
			$('#dictionary').html(data);
		}).fail(function(xhr){
			console.log(xhr);
			$('#dictionary').html('An error occurred '+ xhr.status).append(xhr.responseText);
		});
	});

	//Post request

	$('#letter-f form').submit(function(event) {
		/* Act on the event */
		event.preventDefault();
		console.log(event);
		var request = $(this).serialize();
		$.get('f.php', request,  function(data) {
			/*optional stuff to do after success */
			$('#dictionary').html(data);
		});
		
	});

	//Ajax event.

	var $loading = $('<div id="loading">Loading...</div>').insertBefore('#dictionary');

	$(document).ajaxStart(function(e) {
		$loading.show();
	}).ajaxStop(function() {
		$loading.hide();		
	});


	//Adding events on ajax calls results. we need to use event delegation.

	$(document).on('click','h3.term',function(){
		$(this).siblings('.definition').slideToggle('slow');
	})

	//JSONP
	$('#letter-g a').click(function(event){
		event.preventDefault();
		var url = 'http://examples.learningjquery.com/jsonp/g.php';
		  $.getJSON(url + '?callback=?', function(data, status) {
		  	console.log(data);
			if (status === 'success') {
				var html = '';
				$.each(data, function(entryIndex, entry) {
					html += '<div class="entry">';
					html += '<h3 class="term">' + entry.term  + '</h3>';
					html += '<div class="part">' + entry.part + '</div>';
					html += '<div class="definition">' + entry.definition ;
					html += '<div class="quote">';
					if (entry.quote) {
						$.each(entry.quote, function(quoteIndex, quote) {
							html += '<div class="quote-line">' + quote + '</div>'
						});
					}
					if(entry.author) {
						html += '<div class="quote-author">' + entry.author + '</div>';
					}

					html += '</div>'


					html += '</div></div>'
				});
				$('#dictionary').html(html);
			}
		});
	});


	//Ajax Lower method Swiss army knife of ajax comunications.

	$.ajax({
		url: 'a.html',
		success: function (data) {
			$('#dictionary').html(data);
		}
	});


	//customizing Ajax request ajaxSetup();

	$.ajaxSetup({
		url: 'a.html',
		type: 'POST',
		dataType: 'html'
	});

	$.ajax({
		type: 'GET',
		success: function (data){
			//console.log(data);
			$('#dictionary').html(data);
		}
	});


	//Loading parts of HTML.

	$('#letter-h a').click(function(event) {
		event.preventDefault();
		$('#dictionary').hide().load('h.html .entry',function(){
			$(this).fadeIn('slow');
		});
		
	});


	//Ajax challenges.

	//1
	
	$.ajax({
		url: 'exercises-content.html',
		type: 'GET',
		dataType : 'html',
		success : function (data){
			$('#dictionary').html(data);
		}
	});

	//2 create tooltips for the letters and error handling

	$('.letters a').hover(function (){
		var id = $(this).parents('div.letter[id^="letter"]').attr('id');
		console.log(id);
		$.ajax({
			url: 'exercises-content.html',
			type: 'GET',
			dataType : 'html',
			context: this,
			success: function (data) {
				var f = $(data).filter('#'+id).text();
				$(this).attr('title', f);
			},
			error : function(error) {
				$('#dictionary').html('An error occurred '+ error.status).append(error.responseText);
			}
		});


	},function(){
		$(this).attr('title', '');
	});

	//4 JSONP Challenge!.
	$.getJSON('https://api.github.com/users/jquery/repos?callback=?', function(json, textStatus) {
		var  html = '';
		console.log(json);
		$.each(json.data, function(index, repo) {
			html += '<div class="entry"><h3 class="term">'+ repo.name + '</h3>';
			html += '<div class="part">'+ repo.url + '</div></div>';
		});

		$('#dictionary').html(html);

	});

	
	
});