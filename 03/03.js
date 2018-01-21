// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

//Event Listener for the load of the document.

// $(document).ready(function (){
// 	$('#switcher-default').addClass('selected');

// 	$('#switcher button').on('click',function(){
// 		$('#switcher button').removeClass();
// 		$(this).addClass('selected');
// 		$('body').removeClass();
// 	});
// 	$('#switcher-large').on('click',function(){
// 		$('body').addClass('large');
// 	});
// 	$('#switcher-narrow').on('click',function(){
// 		$('body').addClass('narrow');
// 	});
// });


// $(document).ready(function(){
// 	$('#switcher-default').addClass('selected');
// 	$('#switcher button').click(function(ev){
// 		var bodyClass = this.id.split('-')[1];
// 		$('body').removeClass().addClass(bodyClass);
// 		$('#switcher button').removeClass();
// 		$(this).addClass('selected');
// 		ev.stopPropagation();
// 	});
// });

// $(document).ready(function() {
//   $('#switcher').hover(function() {
//     $(this).addClass('hover');
//   }, function() {
//     $(this).removeClass('hover');
//   });
// });

// $(document).ready(function() {
//   $('#switcher').click(function(event) {
//     if (!$(event.target).is('button')) {
//       $('#switcher button').toggleClass('hidden');
//     }
//   });
//   $('#switcher-narrow, #switcher-large').click(function(){
//   	$('#switcher').off('click');
//   });
// });

// $(document).ready(function() {
//   $('#switcher-default').addClass('selected');

//   $('#switcher').click(function(event) {
//     if ($(event.target).is('button')) {
//       var bodyClass = event.target.id.split('-')[1];

//       $('body').removeClass().addClass(bodyClass);

//       $('#switcher button').removeClass('selected');
//       $(event.target).addClass('selected');
//     }
//   });
// });

// $(document).ready(function(){
// 	var toggleSwitcher = function(ev){
// 		if(!$(ev.target).is('button')){
// 			$('#switcher button').toggleClass('hidden');
// 		}
// 	};
// 	$('#switcher').on('click',toggleSwitcher);
// 	$('#switcher button').click(function(){
// 		$('#switcher').off('click',toggleSwitcher);
// 		if(this.id === 'switcher-default'){
// 			$('#switcher').on('click',toggleSwitcher);
// 		}
// 	});
// });

// $(document).ready(function(){
// 	$('#switcher').click(function(ev){
// 		if($(ev.target).is('button')){
// 			var bodyClass = ev.target.id.split('-')[1];
// 			console.log(this)
// 			$('body').removeClass().addClass(bodyClass);
// 			$('#switcher button').removeClass();
// 			$(ev.target).addClass('selected');
// 		}
// 	});
// });

// $(document).ready(function(){
// 	$('#switcher').trigger('click');
// });


// $(document).ready(function(){
// 	var keyMap = {
// 		D: 'default',
// 		N: 'narrow',
// 		L: 'large'
// 	}

// 	$(document).keyup(function(ev){
// 	 var key = String.fromCharCode(ev.which);
// 	 if (key in keyMap) {
// 	 	$('#switcher-' + keyMap[key]).click();
// 	 }
// 	});
// });

$(document).ready(function(){
	//Enable hover effect on the style switcher
	$('#switcher').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});

	//Allow style switcher to expand and collpase
	var toggleSwitcher = function(ev){
		if(!$(ev.target).is('button')){
			$('#switcher button').toggleClass('hidden');
		}
	};
	//bind event and simulate a click to start in a collapsed state
	$('#switcher').on('click',toggleSwitcher).click();

	var setBodyClass = function(className,flag){
		if(flag && $('#switcher button').hasClass('hidden')){
			$('#switcher').click();
		}
		$('body').removeClass().addClass(className);
		$('#switcher button').removeClass('selected');
		$('#switcher-' + className).addClass('selected');
		$('#switcher').off('click',toggleSwitcher);
		if(className === 'default') {
			$('#switcher').on('click',toggleSwitcher);
		}
	};

	//Begin with the default button selected
	$('#switcher-default').addClass('selected');
	//programs the click for the buttons and send the className as parameter
	$('#switcher').on('click',function(ev){
		if($(ev.target).is('button')) {
			var className = ev.target.id.split('-')[1];
			setBodyClass(className);
		}
	})

	var keyMap = {
		D: 'default',
		N: 'narrow',
		L: 'large'
	}

	$(document).keyup(function(ev){
		var key = String.fromCharCode(ev.which);
		if(key in keyMap) {
			setBodyClass(keyMap[key],true);
		}
		if(ev.which === 39) {
			var currentClass = $('body').attr('class');
			$('body').removeClass();
			switch (currentClass) {
				
				case 'narrow':
					setBodyClass('large',true)
				break;

				case 'large':
					setBodyClass('default',true)
				break;

				default:
					setBodyClass('narrow',true)
				break;

			}
		}
	});
});

//Exercises
$(document).ready(function(){
	$('#container').find('* > :contains(Charles Dickens)').on('click',function(){
		$(this).toggleClass('selected');
	});
	
	$('.chapter-title').on('dblclick',function(){
		$(this).nextAll('p').toggleClass('hidden');
	});

	$('p').on('mousemove',function(ev){
		console.log(ev);
		console.log('Mouse Cordinates: '+ 'X: ' + ev.pageX +', Y: '+ ev.pageY );
	});

	var cordinates = {
		x : 0,
		y: 0
	};
	$(document).mousedown(function(ev){
		cordinates = {
			x: ev.pageX,
			y: ev.pageY
		}

	}).mouseup(function(ev){
		if (cordinates.y > ev.pageY) {
			$('p').removeClass('hidden');
		}else if(cordinates.y < ev.pageY){
			$('p').addClass('hidden');
		}
	});

});