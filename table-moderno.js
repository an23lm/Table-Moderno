/*
	Author: Anselm Joseph
	GitHub: github.com/an23lm
	Email: anselmjosephs@gmail.com
	License: GNU GPLv3
	Version: v1.0.0-beta
*/

class TableModerno {

	constructor(id, n_config) {
		this.tableID = id;
		this.config = {...TableModerno.default_config, ...n_config};

		this.setWidthByRow(this.config.widthByRow);

		this.initHeaderDefaultEventResponders();
		this.initBodyDefaultEventResponders();
		
		this.setScrollBarType(this.config.scrollBarType);
		
		this.toggleStickyHeader(this.config.stickHeader);
		this.toggleStickyColumnsLeft(this.config.stickColumnsLeft);
		this.toggleStickyColumnsRight(this.config.stickColumnsRight);
	}

	initHeaderDefaultEventResponders() {
		$(`#${this.tableID} .moderno-table-header .moderno-table-item`).hover(
			function() {
				var n = $(this).index() + 1;
				$(this).addClass('hover');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).addClass('hover');
			},
			function() {
				var n = $(this).index() + 1;
				$(this).removeClass('hover');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).removeClass('hover');
			}
		);

		$(`#${this.tableID} .moderno-table-header .moderno-table-item`).click(
			function() {
				var n = $(this).index() + 1;
				$(this).toggleClass('highlight');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).toggleClass('highlight');
			}
		);
	}

	initBodyDefaultEventResponders() {
		$(`#${this.tableID} .moderno-table-body .moderno-table-row`).hover(
			function() {
				$(this).addClass('hover');
			},
			function() {
				$(this).removeClass('hover');
			}
		);

		$(`#${this.tableID} .moderno-table-body .moderno-table-row`).click(
			function() {
				$(this).toggleClass('highlight');
			}
		);
	}

	setScrollBarType(type) {
		if (type == 'always') {
			$(`#${this.tableID}.moderno-table-wrapper`).addClass('show-scroll-bar');
		} else if (type == 'default') {

		}
	}

	toggleStickyHeader(flag) {
		if (flag) {
			$(`#${this.tableID} .moderno-table-header`).addClass('sticky');
		} else {
			$(`#${this.tableID} .moderno-table-header`).removeClass('sticky');
		}
	}

	toggleStickyColumnsLeft(columns) {
		columns.sort();
		var maxLeft = 0;
		var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
		var columnsCounter = 0;

		for (var i = 0; i < items.length; i++) {
			if (columns[columnsCounter] - 1 == i) {
				$(`#${this.tableID}.moderno-table-wrapper`).on("scroll", {left: maxLeft, itemIndex: i + 1, tableID: this.tableID}, this.scrollEventResponderOnLeft);

				$(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('left', maxLeft+'px');
				$(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css('left', maxLeft+'px');

				maxLeft += $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${i + 1})`).outerWidth() - 1;
				columnsCounter += 1;
			}
		}
	}

	toggleStickyColumnsRight(columns) {
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

	scrollEventResponderOnRight(event) {
		var stickyoffset = event.data.right;
		var index = event.data.itemIndex;
		var tableID = event.data.tableID;

		var header = $(`#${tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${index})`);
		var body = $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${index})`)
		var childPos = header.offset().left + header.outerWidth() - 1;
		var parentPos = $(`#${tableID}.moderno-table-wrapper`).offset().left + $(`#${tableID} .moderno-table`).outerWidth();
		var offset = childPos - parentPos;
		var diff = offset + stickyoffset;

		if (diff <= 2 || diff <= -2 || diff >= 0) {
			header.addClass("sticky");
			body.addClass("sticky");
		} else {
			header.removeClass("sticky");
			body.removeClass("sticky");
		}
	}

	setWidthByRow(widths) {
		var tableExpectedLength = 0;
		var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
		for (var i = 0; i < items.length; i++) {
			if (i < widths.length) {
				$(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
				$(`#${this.tableID} .moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(widths[i]);
			} else {
				$(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).width(this.config.defaultWidth);
				$(`#${this.tableID} .moderno-table .moderno-table-body .moderno-table-item:nth-child(${i + 1})`).width(this.config.defaultWidth);
			}
			tableExpectedLength += $(`#${this.tableID} .moderno-table .moderno-table-header .moderno-table-item:nth-child(${i + 1})`).outerWidth();
		}
		// $(`#${this.tableID} .moderno-table`).width(tableExpectedLength);
	}
}

// Moderno default settings
TableModerno.default_config = {
	defaultWidth: 300,
	widthByRow: [],
	scrollBarType: 'default',
	stickHeader: true,
	stickColumnsLeft: [1],
	stickColumnsRight: [6]
};
