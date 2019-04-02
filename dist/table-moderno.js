/**
 * Author: Anselm Joseph
 * GitHub: github.com/an23lm
 * Email: anselmjosephs@gmail.com
 * License: GNU GPLv3
 * Version: v1.2.1
*/
/// Table Moderno Class
class TableModerno {

	/**
	 * Init the table.
	 * @param {string} id - id of div with class moderno-table-wrapper to create table on
	 * @param {Object} n_config - User configuration for table, refer `TableModerno.default_config` for default config
	*/
	constructor(id, n_config) {
		this.tableID = id;
		this.config = {...TableModerno.default_config, ...n_config};

		this.setWidthByColumn(this.config.widthByColumn);

		this.initHeaderDefaultEventResponders();
		this.initBodyDefaultEventResponders();
		
		this.setScrollBarType(this.config.scrollBarType);
		
		this.toggleStickyHeader(this.config.stickHeader);
		this.registerStickyColumnsLeft(this.config.stickColumnsLeft);
		this.registerStickyColumnsRight(this.config.stickColumnsRight);
	}

	/**
	 * Register `hover` and `click` events on `moderno-table-header`s `moderno-table-item`s
	*/
	initHeaderDefaultEventResponders() {
		var tableID = this.tableID;
		$(`#${this.tableID} .moderno-table-header .moderno-table-item`).hover(
			function() {
				var n = $(this).index() + 1;
				$(this).addClass('hover');
				$(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).addClass('hover');
			},
			function() {
				var n = $(this).index() + 1;
				$(this).removeClass('hover');
				$(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).removeClass('hover');
			}
		);

		$(`#${this.tableID} .moderno-table-header .moderno-table-item`).click(
			function() {
				var n = $(this).index() + 1;
				$(this).toggleClass('highlight');
				$(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).toggleClass('highlight');
			}
		);
	}

	/**
	 * Register `hover` and `click` events on `moderno-table-body`s `moderno-table-row`s
	*/
	initBodyDefaultEventResponders() {
		$(`#${this.tableID} .moderno-table-body`).on({
			mouseenter: function() {
				$(this).addClass('hover');
			},
			mouseleave: function() {
				$(this).removeClass('hover');
			},
		}, '.moderno-table-row');

		$(`#${this.tableID} .moderno-table-body`).on('click', '.moderno-table-row',
			function() {
				$(this).toggleClass('highlight');
			}
		);
	}

	/**
	 * Set table's scroll bar type
	 * @param {string} type can either be 'always' or 'default'
	*/
	setScrollBarType(type) {
		if (type == 'always') {
			$(`#${this.tableID}.moderno-table-wrapper`).addClass('show-scroll-bar');
		}
	}

	/**
	 * Toggle sticky header
	 * @param {boolean} flag to toggle on or off sticky header
	*/
	toggleStickyHeader(flag) {
		if (flag) {
			$(`#${this.tableID} .moderno-table-header`).addClass('sticky');
		} else {
			$(`#${this.tableID} .moderno-table-header`).removeClass('sticky');
		}
	}

	/**
	 * Register the columns to stick to the left and register scroll responder.
	 * @param {Array(int)} columns to toggle on or off sticky columns
	*/
	registerStickyColumnsLeft(columns) {
		columns.sort();
		var maxLeft = 0;
		var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
		var columnsCounter = 0;

		for (var i = 0; i < items.length; i++) {
			if (columns[columnsCounter] - 1 == i) {
				$(`#${this.tableID}.moderno-table-wrapper`).on('scroll', {left: maxLeft, itemIndex: i + 1, tableID: this.tableID}, this.scrollEventResponderOnLeft);

				$(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('left', maxLeft+'px');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('left', maxLeft+'px');

				maxLeft += $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${i + 1})`).outerWidth() - 1;
				columnsCounter += 1;
			}
		}
	}

	/**
	 * Register the columns to stick to the right and register scroll responder.
	 * @param {Array(number)} columns to toggle on or off sticky columns
	*/
	registerStickyColumnsRight(columns) {
		columns.sort(function(a, b){return b-a});
		var maxRight = 0;
		var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
		var columnsCounter = 0;

		for (var i = items.length - 1; i >= 0; i--) {
			if (columns[columnsCounter] - 1 == i) {
				$(`#${this.tableID}.moderno-table-wrapper`).on("scroll", {right: maxRight, itemIndex: i + 1, tableID: this.tableID}, this.scrollEventResponderOnRight);

				$(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('right', maxRight+'px');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('right', maxRight+'px');

				columnsCounter += 1;
				maxRight += $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${i + 1})`).outerWidth() - columnsCounter;
			}
		}
		$(`#${this.tableID}.moderno-table-wrapper`).scroll();
	}

	/**
	 * Handler for scroll left on table wrapper. Registered left sticky elements will be toggled to `postition: sticky` when appropriate.
	 * @param {Object} event Scroll event
	*/
	scrollEventResponderOnLeft(event) {
		var stickyoffset = event.data.left;
		var index = event.data.itemIndex;
		var tableID = event.data.tableID;

		var header = $(`#${tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${index})`);
		var body = $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${index})`)
		var childPos = header.offset().left;
		var parentPos = $(`#${tableID}.moderno-table-wrapper`).offset().left;
		var offset = childPos - parentPos;

		if (offset <= stickyoffset) {
			header.addClass("sticky");
			body.addClass("sticky");
		} else {
			header.removeClass("sticky");
			body.removeClass("sticky");
		}
	}

	/**
	 * Handler for scroll right on table wrapper. Registered right sticky elements will be toggled to `postition: sticky` when appropriate.
	 * @param {Object} event Scroll event
	*/
	scrollEventResponderOnRight(event) {
		var stickyoffset = event.data.right;
		var index = event.data.itemIndex;
		var tableID = event.data.tableID;

		var header = $(`#${tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${index})`);
		var body = $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${index})`)
		var childPos = header.offset().left + header.outerWidth();
		var parentPos = $(`#${tableID}.moderno-table-wrapper`).offset().left + $(`#${tableID}.moderno-table-wrapper`).width(); 
		var offset = childPos - parentPos;
		var diff = offset + stickyoffset;
		
		if (diff < -2) {
			header.removeClass("sticky");
			body.removeClass("sticky");
		} else {
			header.addClass("sticky");
			body.addClass("sticky");
		}
	}

	/**
	 * Set the widths of existing `.moderno-table-items` elements
	 * @param {Array(number)} widths Array of widths of columns from left to right, if not sepecified, default width will be applied
	*/
	setWidthByColumn(widths) {
		var tableExpectedLength = -1;
		var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
		for (var i = 0; i < items.length; i++) {
			if (i < widths.length) {
				$(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
				$(`#${this.tableID} .moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
			} else {
				$(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(this.config.defaultWidth);
				$(`#${this.tableID} .moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(this.config.defaultWidth);
			}
			tableExpectedLength += $(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).outerWidth() - 1; // -1 because of the `margin-right: -1px` on table item
		}
		$(`#${this.tableID} .moderno-table`).width(tableExpectedLength);
	}

	/**
	 * Reload table with new data and re-set widths for new items
	 * @param {Object} data New data to load the table with
	*/
	reloadTableWithData(data) {
		var colKeys = this.getHeaderColumnDataKeys();
		var dataString = "";
		for (var i = 0; i < data.length; i++) {
			var rowArr = [];
			for (var  j = 0; j < colKeys.length; j++) {
				var item = data[i][colKeys[j]];
				if (item == undefined) {
					console.warn(`Error finding key '${colKeys[j]}' in data at row with index ${i}`);
					rowArr.push('N/A');
				} else {
					rowArr.push(item);
				}
			}
			dataString += this.getRowString(rowArr, i);
		}
		$(`#${this.tableID} .moderno-table-body`).html(dataString);

		this.setWidthByColumn(this.config.widthByColumn);
		this.registerStickyColumnsLeft(this.config.stickColumnsLeft);
		this.registerStickyColumnsRight(this.config.stickColumnsRight);
		$(`#${this.tableID}.moderno-table-wrapper`).scroll();
	}

	/**
	 * Create a HTML string for new row to be inserted 
	 * @param {Object} row Object containing the information of row data
	 * @returns {string} HTML string 
	*/
	getRowString(row, rowindex) {
		var string = `<div class="moderno-table-row">`;
		for(var i = 0; i < row.length; i++) {
			string += `<div class="moderno-table-item" id='moderno-table-${rowindex}-${i}'>${row[i]}</div>`;
		}
		string += `</div>`;
		return string;
	}

	/**
	 * Get the `data-key` attribute specified in header columns. This attribute holds the key name for the respective column in the JS Object of row data.
	 * @returns {Array(string)} an array of keys for the respective columns will be returned in order from left to right
	*/
	getHeaderColumnDataKeys() {
		var keys = [];
		$(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`)
			.each(function() {
				var key = $(this).attr('data-key');
				if (key == undefined) {
					console.warn(`data-key attribute is not set in header item at position ${$(this).index()}`);
					keys.push('');
				} else {
					keys.push(key);
				}
			}
		);
		return keys;
	}

	setValueAtRowWithHeaderKey(value, row, headerkey) {
		var keys = this.getHeaderColumnDataKeys();
		for (var i = 0; i < keys.length; i++) {
			if (headerkey == keys[i]) {
				$(`#${this.tableID} #moderno-table-${row}-${i}`).html(value);
			}
		}
	}

	setTextColorAtRowWithHeaderKey(value, row, headerkey) {
		var keys = this.getHeaderColumnDataKeys();
		for (var i = 0; i < keys.length; i++) {
			if (headerkey == keys[i]) {
				$(`#${this.tableID} #moderno-table-${row}-${i}`).css("color",value);
			}
		}
	}
}

/// Moderno Table's default configuration
TableModerno.default_config = {
	defaultWidth: 300,
	widthByColumn: [],
	scrollBarType: 'default',
	stickHeader: true,
	stickColumnsLeft: [1],
	stickColumnsRight: [6]
};
