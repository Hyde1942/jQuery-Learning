// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function() {
	$('div.chapter a[href*="wikipedia"]').attr({
		rel: 'external',
		title: function (){
			return 'Learn more about ' + $(this).text() + ' at the Wikipedia';
		},
		id: function(index, oldValue){
			console.log(oldValue)
			return 'wikilink-'+ index;

		}
	});
});


// $(document).ready(function() {
// 	$('<a href="#top">back to top</a>').insertAfter('div.chapter p');
// 	$('<a id="top"></a>').prependTo('body')

// 	var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
// 	$('span.footnote').each(function(index){
// 		$('<sup>' + (index + 1) + '</sup>').insertBefore(this);
// 		$(this).appendTo($notes).wrap('<li></li>');
// 	});
// });

$(document).ready(function() {
	$('<a id="top"></a>').prependTo('body')
	var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');

	$('span.footnote').each(function(index, el) {
		$(this).before(['<a href="#footnote-', index + 1,'" id="context-',index + 1,'" class="context">','<sup>',index + 1,"</sup></a>"].join(''))
		.appendTo($notes).append(['&nbps;(<a href="#context-',index + 1, '">context</a>)'].join(''))
		.wrap('<li id="footnote-' + (index + 1) + '"></li');
	});
});

$(document).ready(function() {
	$('div.chapter p:eq(0)').clone().insertBefore('div.chapter');
	$('span.pull-quote').each(function(index) {
		var $parentParagraph = $(this).parent('p');
		$parentParagraph.css('position', 'relative');
		var $clonedCopy = $(this).clone();
		$clonedCopy.addClass('pulled').find('span.drop').html('&hellip;').end().text($clonedCopy.text()).prependTo($parentParagraph);
	});
});

//challenges
$(document).ready(function() {
	//1
	$('div.chapter p').after(function(index){
		if(index > 3) {
			return '<a href="#top">back to top</a>'
		}
	});

	//2.
	$('a[href="#top"]').on('click',function(){
		if($(this).next().is('p:contains(\'You were here\')')){
			return false;
		}
		else{
		 $(this).after('<p>You were here.</p>');
		}
	});

	//3.
	$('#f-author').on('click',function (){
		if($(this).find('b').length) {
			$(this).text($(this).text());
		}else {
			$(this).wrapInner('<b></b>');
		}
	});
	//4.
	$('div.chapter p').each(function(index, el) {
		this.classList.value += ' inhabitants';
	});
});