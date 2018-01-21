// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function (){
	$('#selected-plays > li').addClass('horizontal');
	//$('#selected-plays li:not(.horizontal)').addClass('sub-level');
	$('#selected-plays li').not('.horizontal').addClass('sub-level');
	$('a[href^="mailto"]').addClass('mailto');
	$('a[href$="pdf"]').addClass('pdflink');
	$('a[href^="http"][href*="henry"]').addClass('henrylink');
	$('tr:nth-child(odd)').addClass('alt');
	$('td:contains(Henry)').parent().children().addClass('highlight');
	$('a').filter(function (){
		return this.hostname && this.hostname != location.hostname;
	}).addClass('external');

	//Add a class of special to all the <li> elements at the second level of the nested list.
	$('.mailto').next('ul').children().addClass('special');

	//Add a class of year to all the table cells in the third column of a table.
	$('table').eq(0).find('tr td:last-of-type').addClass('year');

	//Add a class special to the first table row that has the word Tragedy in it.
	$('td:contains(Tragedy):first').parent().addClass('special');

	//Select all the list items cotaining a link. Add the class afterlink to the sibling list items that follow the ones selected.
	$('li > a:not([href^="mailto"])').parent().nextAll('li').addClass('afterlink');

	//Add the class tragedy to the closest ancestor <ul> of any .pdf link
	$('a[href$="pdf"]').closest('ul').addClass('tragedy');

});