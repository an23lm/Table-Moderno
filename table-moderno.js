/*
	Author: Anselm Joseph
	GitHub: github.com/an23lm
	Email: anselmjosephs@gmail.com
	License: GNU v3.0
*/

var moderno_table_item_default_width = 300;

function initTables(config = {defaultWidth: 300, scrollBarType: 'default'}) {
	moderno_table_item_default_width = config.defaultWidth;

	var items = $('.moderno-table-header .moderno-table-row:first-child .moderno-table-item').length;
	var totalExpectedWidth = moderno_table_item_default_width * items;
	$('.moderno-table-item').width(moderno_table_item_default_width);
	// $('.moderno-table').width(totalExpectedWidth);

	$('.moderno-table-body .moderno-table-row').hover(
		function() {
			$(this).addClass('hover');
		},
		function() {
			$(this).removeClass('hover');
		}
	);

	$('.moderno-table-body .moderno-table-row').click(
		function() {
			$(this).toggleClass('highlight');
		}
	);

	$('.moderno-table-header .moderno-table-item').hover(
		function() {
			var n = $(this).index() + 1;
			$(this).addClass('hover');
			$(`.moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).addClass('hover');
		},
		function() {
			var n = $(this).index() + 1;
			$(this).removeClass('hover');
			$(`.moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).removeClass('hover');
		}
	);

	$('.moderno-table-header .moderno-table-item').click(
		function() {
			var n = $(this).index() + 1;
			$(this).toggleClass('highlight');
			$(`.moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).toggleClass('highlight');
		}
	);

	setScrollBarType(config.scrollBarType);
}

function setScrollBarType(type) {
	if (type == 'always') {
		$('.moderno-table-wrapper').addClass('show-scroll-bar');
	} else if (type == 'default') {

	}
}

function setWidthByRow(widths) {
	var items = $('.moderno-table-header .moderno-table-row:first-child .moderno-table-item');
	for (var i = 0; i < items.length; i++) {
		if (i < widths.length) {
			$(`.moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
			$(`.moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
		} else {
			$(`.moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(moderno_table_item_default_width);
			$(`.moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(moderno_table_item_default_width);
		}
	}
}