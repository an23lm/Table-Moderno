/**
 * Author: Anselm Joseph
 * GitHub: github.com/an23lm
 * Email: anselmjosephs@gmail.com
 * License: GNU GPLv3
 * Version: v1.6.4
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
    this.config = {
      ...TableModerno.default_config,
      ...n_config
    };
    this.columnConditionalFormatting = {};
    this.customCells = {};
    this.widthByColumn = [];
    this.tableExpectedWidth = 0;

    //TODO: Inital header width
    this.calculateWidthForColumns();
    this.setColumnWidths();

    this.initLoadingIndicator();
    this.initSortingView();
    if (this.config.highlightHeaderColor == true) {
      this.initHeaderDefaultEventResponders();
    }
    if (this.config.highlightBodyColor == true) {
      this.initBodyDefaultEventResponders();
    }

    this.setScrollBarType(this.config.scrollBarType);

    this.toggleStickyHeader(this.config.stickHeader);
    this.registerStickyColumnsLeft(this.config.stickColumnsLeft);
    this.registerStickyColumnsRight(this.config.stickColumnsRight);
    if (this.config.tooltip == true) {
      this.initTooltip();
      this.showTooltip();
    }

    if (this.config.lazyLoad) {
      this.registerLazyLoad();
    }
  }

  /**
   * Register `hover` and `click` events on `moderno-table-header`s `moderno-table-item`s
   */
  initHeaderDefaultEventResponders() {
    var tableID = this.tableID;
    $(`#${this.tableID} .moderno-table-header .moderno-table-item`).hover(
      function () {
        var n = $(this).index() + 1;
        $(this).addClass("hover");
        $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).addClass("hover");
      },
      function () {
        var n = $(this).index() + 1;
        $(this).removeClass("hover");
        $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).removeClass("hover");
      }
    );

    $(`#${this.tableID} .moderno-table-header .moderno-table-item`).click(
      function () {
        var n = $(this).index() + 1;
        $(this).toggleClass("highlight");
        $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${n})`).toggleClass("highlight");
      }
    );
  }

  /**
   * Init loading indicator
   */
  initLoadingIndicator() {
    $(`#${this.tableID} .moderno-table`).append(`<div class="moderno-loading-indicator"></div>`);
  }

  /**
   * Init sorting view
   */
  initSortingView() {
    this.sortHeaderList = [];
    this.sortHeaderDirection = {};

    this.prevSortHeaderList = [];
    this.prevSortHeaderDirection = {};

    var items = $(
      `#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`
    );
    var itemshtml = "";
    for (var i = 0; i < items.length; i++) {
      itemshtml += `
						  <div class="moderno-sorting-item" data-key="${$(items[i]).attr("data-key")}">
							  <div class="moderno-sorting-order-number"></div>
							  <label class="pure-material-checkbox moderno-sorting-item-checkbox">
								  <input type="checkbox" data-key="${$(items[i]).attr("data-key")}">
                  <span>
                    ${$(items[i])
                      .html()
                      .replace(/<(?:.|\n)*?>/gm, "")}
                  </span>
							  </label>
							  <button class="sort-button-wrapper sort-up" data-direction="up" onclick="event.stopPropagation();"><img class="ass-img"/></button>
							  <button class="sort-button-wrapper sort-down" data-direction="down" onclick="event.stopPropagation();"><img class="dec-img"/></button>
						  </div>`;
    }

    $(`#${this.tableID} .moderno-table`).append(`
			  <div class="moderno-sorting-background-view">
				  <div class="moderno-sorting-view">
					  <div class="moderno-sorting-view-title"><span>Sort by</span></div>
					  <div class="moderno-sorting-items">${itemshtml}</div>
					  <div class="moderno-sorting-footer"><input class="cancel-button" type='button' value='Cancel'><input class="apply-button" type='button' value='Apply'></div></div>
				  </div>
			  </div>`);

    $(`#${this.tableID} .moderno-table .moderno-sorting-view .moderno-sorting-item input`).on("change", event => {
      this.addToSortList(event.currentTarget);
    });

    $(`#${this.tableID} .moderno-table .moderno-sorting-view .moderno-sorting-item .sort-button-wrapper`).on("click", event => {
      this.setSortDirection(event.currentTarget);
    });

    $(`#${this.tableID} .moderno-table .moderno-sorting-view .cancel-button`).on("click", () => {
      this.closeSortView.call(this, false);
    });

    $(`#${this.tableID} .moderno-table .moderno-sorting-view .apply-button`).on("click", () => {
      this.closeSortView.call(this, true);
    });
  }

  /**
   * Register `hover` and `click` events on `moderno-table-body`s `moderno-table-row`s
   */
  initBodyDefaultEventResponders() {
    $(`#${this.tableID} .moderno-table-body`).on({
        mouseenter: function () {
          $(this).addClass("hover");
        },
        mouseleave: function () {
          $(this).removeClass("hover");
        }
      },
      ".moderno-table-row"
    );

    $(`#${this.tableID} .moderno-table-body`).on("click", ".moderno-table-row",
      function () {
        $(this).toggleClass("highlight");
      }
    );
  }

  /**
   * Set table's scroll bar type
   * @param {string} type can either be 'always' or 'default'
   */
  setScrollBarType(type) {
    if (type == "always") {
      $(`#${this.tableID}.moderno-table-wrapper`).addClass("show-scroll-bar");
    }
  }

  /**
   * Toggle sticky header
   * @param {boolean} flag to toggle on or off sticky header
   */
  toggleStickyHeader(flag) {
    if (flag) {
      $(`#${this.tableID} .moderno-table-header`).addClass("sticky");
    } else {
      $(`#${this.tableID} .moderno-table-header`).removeClass("sticky");
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
        $(`#${this.tableID}.moderno-table-wrapper`).on(
          "scroll", {
            left: maxLeft,
            itemIndex: i + 1,
            tableID: this.tableID
          },
          this.scrollEventResponderOnLeft
        );

        $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css("left", maxLeft + "px");
        $(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css("left", maxLeft + "px");

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
    columns.sort(function (a, b) {
      return b - a;
    });
    var maxRight = 0;
    var items = $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`);
    var columnsCounter = 0;

    for (var i = items.length - 1; i >= 0; i--) {
      if (columns[columnsCounter] - 1 == i) {
        $(`#${this.tableID}.moderno-table-wrapper`).on(
          "scroll", {
            right: maxRight,
            itemIndex: i + 1,
            tableID: this.tableID
          },
          this.scrollEventResponderOnRight
        );

        $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css("right", maxRight + "px");
        $(`#${this.tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${columns[columnsCounter]})`).css("right", maxRight + "px");

        columnsCounter += 1;
        maxRight += $(`#${this.tableID} .moderno-table-header .moderno-table-row .moderno-table-item:nth-child(${i + 1})`).outerWidth() - columnsCounter;
      }
    }
    $(`#${this.tableID}.moderno-table-wrapper`).scroll();
  }

  resetSortList() {
    this.prevSortHeaderList = [];
    this.prevSortHeaderDirection = {};
    this.sortHeaderList = [];
    this.sortHeaderDirection = {};
  }

  /**
   * Open sorting view
   */
  openSortView() {
    this.prevSortHeaderList = [...this.sortHeaderList];
    this.prevSortHeaderDirection = Object.assign({}, this.sortHeaderDirection);

    var items = $(`#${this.tableID} .moderno-table .moderno-sorting-view .moderno-sorting-item`);
    for (var i = 0; i < items.length; i++) {
      var headerKey = $(items[i]).attr("data-key");
      var index = this.sortHeaderList.indexOf(headerKey);
      if (index > -1) {
        $($(items[i]).children(".moderno-sorting-order-number")[0]).html(index + 1);
        $($(items[i]).children(".moderno-sorting-item-checkbox").children("input")[0]).prop("checked", true);
        var sortUp = this.sortHeaderDirection[headerKey];
        if (!sortUp) {
          $($(items[i]).children("sort-down")).click();
        } else {
          $($(items[i]).children("sort-up")).click();
        }
      } else {
        $($(items[i]).children(".moderno-sorting-order-number")[0]).html("");
        $($(items[i]).children(".moderno-sorting-item-checkbox").children("input")[0]).prop("checked", false);
        $(items[i]).children(".sort-button-wrapper").removeClass("active");
      }
    }
    $(`#${this.tableID} .moderno-sorting-background-view`)
      .css("opacity", 0)
      .css("display", "flex");
    $(`#${this.tableID} .moderno-sorting-background-view`).animate(
      { opacity: 1 },
      200
    );
  }

  /**
   * Close sorting view and save or cancel
   */
  closeSortView(apply) {
    this.showLoadingIndicator();
    $(`#${this.tableID} .moderno-sorting-background-view`).animate(
      { opacity: 0 },
      200,
      () => {
        $(`#${this.tableID} .moderno-sorting-background-view`).css("display", "none");
      }
    );
    if (apply === true) {
      this.prevSortHeaderList = [...this.sortHeaderList];
      this.prevSortHeaderDirection = Object.assign({}, this.sortHeaderDirection);
      if (this.sortHeaderList.length == 0) {
        this.reloadTableWithData(this.prevTableData);
      } else {
        this.applySortList();
      }
    } else if (apply === false) {
      this.sortHeaderList = [...this.prevSortHeaderList];
      this.sortHeaderDirection = Object.assign({}, this.prevSortHeaderDirection);
    }
    this.hideLoadingIndicator();
    return;
  }

  /**
   * Add a header to the sort list
   */
  addToSortList(target) {
    var selected = $(target).is(":checked");
    var headerKey = $(target).attr("data-key");
    if (selected) {
      this.sortHeaderList.push(headerKey);
      var upButton = $(target)
        .parent()
        .parent()
        .children()[2];
      var orderNumber = $(target)
        .parent()
        .parent()
        .children(".moderno-sorting-order-number")[0];
      $(orderNumber).html(this.sortHeaderList.length);
      this.setSortDirection(upButton);
    } else {
      var index = this.sortHeaderList.indexOf(headerKey);
      if (index > -1) {
        this.sortHeaderList.splice(index, 1);
      }
      var orderNumber = $(target)
        .parent()
        .parent()
        .children(".moderno-sorting-order-number")[0];
      $(orderNumber).html("");
      $(target)
        .parent()
        .parent()
        .children(".active")
        .removeClass("active");
    }
  }

  /**
   * Select sort type for header
   */
  setSortDirection(target) {
    var inputItem = $(target)
      .parent()
      .children(".moderno-sorting-item-checkbox")
      .children("input")[0];
    var selected = $(inputItem).is(":checked");
    if (selected) {
      var sortUp = $(target).attr("data-direction") === "up";
      var headerKey = $(target)
        .parent()
        .attr("data-key");
      this.sortHeaderDirection[headerKey] = sortUp;
      $(target)
        .parent()
        .children(".active")
        .removeClass("active");
      $(target).addClass("active");
    }
  }

  /**
   * Apply the sort list
   */
  applySortList() {
    var sortPromises = [];
    for (var i = 0; i < this.sortHeaderList.length; i++) {
      sortPromises.push(this.sort(this.sortHeaderList[i]));
    }

    Promise.all(sortPromises).then(() => {
      this.reloadTableWithData(this.tableData, true);
      this.hideLoadingIndicator();
    });
  }

  /**
   * Sort by header
   */
  sort(key) {
    return new Promise((resolve) => {
      var sortUp = this.sortHeaderDirection[key];
      if (!sortUp) {
        this.tableData.sort(function (a, b) {
          var x = a[key];
          var y = b[key];
          return x < y ? -1 : x > y ? 1 : 0;
        });
      } else {
        this.tableData.sort(function (a, b) {
          var x = a[key];
          var y = b[key];
          return x > y ? -1 : x < y ? 1 : 0;
        });
      }
      resolve();
    });
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
    var body = $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${index})`);
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
    var body = $(`#${tableID} .moderno-table-body .moderno-table-row .moderno-table-item:nth-child(${index})`);
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
  calculateWidthForColumns() {
    this.widthByColumn = [];
    this.tableExpectedWidth = -1;

    let widths = this.config.widthByColumn;
    
    if (this.config.columnFit === 'fixed') {
      var items = this.getHeaderColumnDataKeys();
      for (var i = 0; i < items.length; i++) {
        if (i < widths.length) {
          this.widthByColumn.push(widths[i]);
          this.tableExpectedWidth += widths[i];
        } else {
          this.widthByColumn.push(this.config.defaultWidth);
          this.tableExpectedWidth += this.config.defaultWidth;
        }
      }
    } else if (this.config.columnFit === 'auto') {
      let randomRows = this.tableData
      let colKeysLen = this.getHeaderColumnDataKeys().length;
      let headerLengths = []
      this.getHeaderColumnDataKeys().forEach(headerItem => {
        headerLengths.push($(`[data-key=${headerItem}]`).width())
      });
      let colWidths = new Array(colKeysLen).fill(0);
      let colMaxWidth = new Array(colKeysLen).fill(0);
      let colMinWidth = new Array(colKeysLen).fill(9999);
      let colHeaderWidth = new Array(colKeysLen);

      randomRows.forEach((row, rowindex) => {
        for (let colindex = 0; colindex < colKeysLen; colindex++) {
          let width = $(`#${this.tableID} #moderno-table-${rowindex}-${colindex}`).outerWidth();
          colWidths[colindex] += width
          if (colMaxWidth[colindex] < width) colMaxWidth[colindex] = width
          if (colMinWidth[colindex] > width) colMinWidth[colindex] = width
        }
      });

      for (let i = 0; i < colKeysLen; i++) {
        colWidths[i] = colWidths[i] / randomRows.length
        colHeaderWidth[i] = Math.max(colWidths[i], headerLengths[i])
        this.tableExpectedWidth += colHeaderWidth[i]
      }
      if (this.tableExpectedWidth < $(`#${this.tableID}`).width() - 31) {
        let neededSpaceToFill = $(`#${this.tableID}`).width() - 31 - this.tableExpectedWidth;
        let diffIndexes = [];
        let maxWidths = [];
        let diffItemCount = 0;
        let diffMaxWidth = 0;
        colHeaderWidth.forEach((width, colindex) => {
          if (colMaxWidth[colindex] > width) {
            diffIndexes.push(colindex);
            maxWidths.push(colMaxWidth[colindex])
            diffItemCount++;
            diffMaxWidth += colMaxWidth[colindex] - width;
          }
        });
        if (diffMaxWidth > neededSpaceToFill) {
          let spreadSpace = neededSpaceToFill / diffItemCount;
          diffIndexes.forEach(cindex => {
            colHeaderWidth[cindex] += spreadSpace;
          });
        } else {
          let spreadSpace = (neededSpaceToFill - diffMaxWidth) / diffItemCount
          colHeaderWidth.forEach((width, cindex) => {
            if (diffIndexes.includes(cindex)) {
              let difI = diffIndexes.indexOf(cindex)
              colHeaderWidth[cindex] = maxWidths[difI]
            }
            colHeaderWidth[cindex] += spreadSpace;
          });
        }
      }
      this.tableExpectedWidth = 0;
      for (let i = 0; i < colKeysLen; i++) {
        this.tableExpectedWidth += colHeaderWidth[i]
        this.widthByColumn.push(colHeaderWidth[i]);
      }
    }
  }

  setColumnWidths() {
    this.widthByColumn.forEach((width, index) => {
      $(`#${this.tableID} [moderno-column="${index}"]`).css('width', width);
    });
    $(`#${this.tableID} .moderno-table`).css('width', this.tableExpectedWidth);
  }

  /**
   * Reload table with new data and re-set widths for new items
   * @param {Object} data New data to load the table with
   */
  reloadTableWithData(data, keepSort = false) {
    this.prevTableData = [...data];
    this.tableData = [...data];

    if (this.showNoDataAvailable()) return;
    this.hideNoDataAvailable();
    if (!keepSort) this.resetSortList();

    var colKeys = this.getHeaderColumnDataKeys();
    var clipClass = this.config.singleLineRows ? "clip" : "no-clip";

    var dataString = "";
    for (var i = 0; i < data.length; i++) {
      dataString += this.getRowString(i, colKeys, clipClass);
    }
    $(`#${this.tableID} .moderno-table-body`).html(dataString);

    this.calculateWidthForColumns();
    this.setColumnWidths();
    this.registerStickyColumnsLeft(this.config.stickColumnsLeft);
    this.registerStickyColumnsRight(this.config.stickColumnsRight);
    this.showTooltip();
    $(`#${this.tableID}.moderno-table-wrapper`).scroll();
  }

  /**
   * Load more data into table and re-set widths for new items
   * @param {Object} data New data to load the table with
   */
  appendData(data, keepSort = false) {
    this.prevTableData = [...this.prevTableData, ...data];
    this.tableData = [...this.tableData, ...data];

    if (!keepSort) {
      this.resetSortList();
    }

    var colKeys = this.getHeaderColumnDataKeys();
    var clipClass = this.config.singleLineRows ? "clip" : "no-clip";

    var dataString = "";
    for (var i = 0; i < data.length; i++) {
      dataString += this.getRowString(i, colKeys, clipClass);
    }
    $(`#${this.tableID} .moderno-table-body`).append(dataString);

    this.setColumnWidths();
    this.registerStickyColumnsLeft(this.config.stickColumnsLeft);
    this.registerStickyColumnsRight(this.config.stickColumnsRight);
    this.showTooltip();
    $(`#${this.tableID}.moderno-table-wrapper`).scroll();
  }


  /**
   * Create a HTML string for new row to be inserted
   * @param {Object} row Object containing the information of row data
   * @returns {string} HTML string
   */
  getRowString(rowindex, colKeys, clipClass) {
    var cellskeletions = {};
    var conditions = {};
    for (var i = 0; i < colKeys.length; i++) {
      var value = this.tableData[rowindex][colKeys[i]];
      var conditioncolor = "";
      var condition = this.executeCondition(rowindex, colKeys[i]);
      if (condition) {
        var conditioncolor = `color: ${condition.highlightcolor};`;
        conditions[condition.id] = condition.result;
      }

      if (this.config.convertToLocaleString) {
        value = !isNaN(value) ? (+value).toLocaleString(this.config.locale, {
          maximumFractionDigits: this.config.maximumFractionDigits
        }) : value;
      }

      var skel = {
        classes: `moderno-table-item ${clipClass}`,
        ids: `moderno-table-${rowindex}-${i}`,
        styles: conditioncolor,
        rawvalue: value,
        cellgenerator: undefined
      };
      cellskeletions[colKeys[i]] = skel;
    }

    if (typeof this.consequence !== "undefined") {
      cellskeletions = this.consequence(rowindex, colKeys, conditions, cellskeletions);
    }

    var string = `<div class="moderno-table-row" id="moderno-table-row-${rowindex}">`;
    for (var i = 0; i < colKeys.length; i++) {
      var cellcontent = "";
      var value = cellskeletions[colKeys[i]]["rawvalue"];

      if (cellskeletions[colKeys[i]].cellgenerator !== undefined) {
        cellcontent = cellskeletions[colKeys[i]].cellgenerator(value);
      } else if (value == undefined) {
        console.warn(`Error finding key '${colKeys[i]}' in data at row with index ${rowindex}`);
        cellcontent = this.customCells[colKeys[i]] == undefined ? "-" : this.customCells[colKeys[i]].generate(value);
      } else {
        cellcontent = this.customCells[colKeys[i]] == undefined ? value : this.customCells[colKeys[i]].generate(value);
      }

      string += `<div class='${cellskeletions[colKeys[i]].classes}' id='${cellskeletions[colKeys[i]].ids}' moderno-column='${i}' moderno-row='${rowindex}' style='${cellskeletions[colKeys[i]].styles}'>${cellcontent}</div>`;
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
    $(`#${this.tableID} .moderno-table-header .moderno-table-row:first-child .moderno-table-item`).each(function () {
      var key = $(this).attr("data-key");
      if (key == undefined) {
        console.warn(`data-key attribute is not set in header item at position ${$(this).index()}`);
        keys.push("");
      } else {
        keys.push(key);
      }
    });
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
    this.setCssAtRowWithHeaderKey("color", value, row, headerkey);
  }

  setCssAtRowWithHeaderKey(type, value, row, headerkey) {
    var keys = this.getHeaderColumnDataKeys();
    for (var i = 0; i < keys.length; i++) {
      if (headerkey == keys[i]) {
        $(`#${this.tableID} #moderno-table-${row}-${i}`).attr("style", function (i, s) {
          return s + `${type}: ${value} !important;`;
        });
      }
    }
  }

  showLoadingIndicator() {
    var width = $(`#${this.tableID} .moderno-table`).outerWidth();
    var headerHeight = $(`#${this.tableID} .moderno-table-header`).outerHeight();
    var height = $(`#${this.tableID}.moderno-table-wrapper`).outerHeight() - headerHeight;

    $(`#${this.tableID} .moderno-loading-indicator`)
      .width(width)
      .height(height)
      .css("top", headerHeight);
    $(`#${this.tableID}.moderno-table-wrapper`).css("overflow-y", "hidden");
    $(`#${this.tableID}.moderno-table-wrapper`).css("overflow-x", "scroll");
    $(`#${this.tableID} .moderno-loading-indicator`)
      .css("opacity", 0)
      .css("display", "block");
    $(`#${this.tableID} .moderno-loading-indicator`).animate(
      { opacity: 1 },
      200
    );
  }

  hideLoadingIndicator() {
    $(`#${this.tableID} .moderno-loading-indicator`).animate(
      { opacity: 0 },
      200,
      () => {
        $(`#${this.tableID} .moderno-loading-indicator`).css("display", "none");
        $(`#${this.tableID}.moderno-table-wrapper`).css("overflow-y", "scroll");
      }
    );
  }

  initTooltip() {
    $(`#${this.tableID} .moderno-table`).append(`<div class="moderno-tooltip"></div>`);
  }

  showTooltip() {
    $(`#${this.tableID} .moderno-table-item`).on({
      mouseenter: event => {
        var didOverflow =
          $(event.currentTarget)[0].scrollWidth >
          $(event.currentTarget).outerWidth();
        if (didOverflow) {
          var itemPos = $(event.currentTarget).position();
          var headerHeight = $(
            `#${this.tableID} .moderno-table-header`
          ).outerHeight();
          itemPos.top += headerHeight;
          let itemWidth = $(event.currentTarget)[0].scrollWidth - ($(event.currentTarget).outerWidth() - $(event.currentTarget).width())
          if (itemWidth < $(`#${this.tableID}`).width() && (itemPos.left + itemWidth) > $(`#${this.tableID}`).width()) {
            itemPos.left = itemPos.left - ((itemPos.left + itemWidth) - $(`#${this.tableID}`).width())
          } else if (itemWidth >= $(`#${this.tableID}`).width()) {
            itemPos.left = 0
          }
          var text = $(event.currentTarget).html();
          $(`#${this.tableID} .moderno-tooltip`)
            .html(text)
            .css({
              top: itemPos.top,
              left: itemPos.left,
              'min-width': itemWidth > $(`#${this.tableID}`).width() - 20 ? $(`#${this.tableID}`).width() - 20 : itemWidth
            })
            .addClass("active");
        }
      },
      mouseleave: event => {
        $(`#${this.tableID} .moderno-tooltip`).removeClass("active");
      }
    });
  }

  registerConditionOnColumn(id, condition, highlightColor, headerKey, callback = () => {}) {
    this.columnConditionalFormatting[headerKey] = {
      id: id,
      condition: condition,
      highlightColor: highlightColor,
      callback: callback
    };
  }

  executeCondition(rowindex, headerKey) {
    if (this.columnConditionalFormatting[headerKey] === undefined) {
      return null;
    }
    if (
      this.columnConditionalFormatting[headerKey].condition(this.tableData[rowindex])
    ) {
      this.columnConditionalFormatting[headerKey].callback(true, rowindex, headerKey);
      return {
        id: this.columnConditionalFormatting[headerKey].id,
        result: true,
        highlightcolor: this.columnConditionalFormatting[headerKey]["highlightColor"]
      };
    } else {
      this.columnConditionalFormatting[headerKey].callback(false, rowindex, headerKey);
      return {
        id: this.columnConditionalFormatting[headerKey].id,
        result: false,
        highlightcolor: ""
      };
    }
  }

  registerConsequence(callback = () => {}) {
    this.consequence = callback;
  }

  registerCustomCellGenerator(generatecell, headerkey) {
    this.customCells[headerkey] = { generate: generatecell };
  }

  scrollWaitForLoad() {
    this.isScrollLoading = true;
  }

  scrollDoneLoad() {
    this.isScrollLoading = false;
  }

  registerLazyLoad() {
    let prevScrollPos = -100;
    let elementSelector = `#${this.tableID}.moderno-table-wrapper`;
    this.scrollDoneLoad();
    this.lazyLoadCallback = () => {};

    $(elementSelector).on('scroll', () => {
        let scrollPos = $(elementSelector)[0].scrollTop;
        if (prevScrollPos > scrollPos) return;
        prevScrollPos = scrollPos;

        let height = $(elementSelector)[0].scrollHeight,
            clipHeight = $(elementSelector).height(),
            perc = (height - clipHeight) * (this.config.lazyLoadTrigger / 100);

        if (scrollPos >= perc || height <= clipHeight) {
            if (this.isScrollLoading) return;
            this.scrollWaitForLoad();
            this.lazyLoadCallback(this.scrollDoneLoad.bind(this));
        }
    });
  }

  registerLazyLoadTriggerCallback(callback) {
    this.lazyLoadCallback = callback;
  }

  showNoDataAvailable() {
    if (this.tableData.length > 0) return false;
    if ($('.moderno-table-no-data').length > 0) return true;
    $(`#${this.tableID}`).append(this.config.noDataTemplate);
    $(`#${this.tableID} .moderno-table-no-data`).css({ 'width':  $(`#${this.tableID}`).width() - 10 })
    return true;
  }

  hideNoDataAvailable() {
    $(`#${this.tableID} .moderno-table-no-data`).remove();
  }
}

let __NoDataDefaultTemplate = ("<div class='moderno-table-no-data'><div class='moderno-table-no-data-item'>No Data Available</div></div>");

/// Moderno Table's default configuration
TableModerno.default_config = {
  defaultWidth: 300,
  widthByColumn: [],
  scrollBarType: "default",
  stickHeader: true,
  stickColumnsLeft: [1],
  stickColumnsRight: [6],
  singleLineRows: false,
  highlightHeaderColor: true,
  highlightBodyColor: true,
  tooltip: true,
  convertToLocaleString: false,
  locale: 'en-US',
  maximumFractionDigits: 2,
  lazyLoad: false,
  lazyLoadTrigger: 75,
  columnFit: "auto",
  noDataTemplate: __NoDataDefaultTemplate
};