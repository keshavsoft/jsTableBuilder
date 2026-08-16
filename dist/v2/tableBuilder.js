//#region buildTable/forHead/buildHeaderRowElement.js
function e({ inRowClass: e, inHeaderHeight: t }) {
	let n = document.createElement("tr");
	return e && (n.className = e), t && (n.style.height = t), n;
}
//#endregion
//#region buildTable/utils/style/applyCellOptions.js
function t({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region buildTable/forHead/KsTableHeaderContent.js
var n = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let { header: e, dataKey: t, options: n = {}, sortState: r = [] } = this._inputs, i = e || t || "";
		if (n.sortable) {
			let e = Array.isArray(r) ? r.findIndex((e) => e.dataKey === t) : -1;
			if (e !== -1) {
				let t = r[e].direction === "asc" ? " ↑" : " ↓";
				r.length > 1 && (t += e + 1), i += t;
			}
		}
		this.shadowRoot.textContent = i;
	}
};
customElements.get("ks-table-header-content") || customElements.define("ks-table-header-content", n);
//#endregion
//#region buildTable/forHead/HeaderCell.js
var r = {
	width: "",
	align: "",
	vAlign: ""
};
function i({ inHeader: e = "", inDataKey: n = "", inOptions: i = r, inClasses: a = {}, inSortState: o = [], inOnSort: s = () => {} }) {
	let c = e, l = n, u = i, d = a, f = o, p = s, m = document.createElement("th");
	d.cell && (m.className = d.cell), u.sortable && (m.style.cursor = "pointer", m.style.userSelect = "none", m.onclick = (e) => {
		let t = e.shiftKey || e.ctrlKey || e.metaKey;
		p(l, t);
	});
	let h = document.createElement("ks-table-header-content");
	return h.inputs = {
		header: c,
		dataKey: l,
		options: u,
		sortState: f
	}, m.appendChild(h), t({
		inElement: m,
		inOptions: u
	}), m;
}
//#endregion
//#region buildTable/forHead/appendHeaderCells.js
function a({ inHeaderRowElement: e, inColumns: t, inClasses: n = {}, inSortState: r = [], inOnSort: a = () => {} }) {
	t.forEach((t) => {
		let o = i({
			inHeader: t.header,
			inDataKey: t.dataKey,
			inOptions: t.options || {},
			inClasses: n,
			inSortState: r,
			inOnSort: a
		});
		e.appendChild(o);
	});
}
//#endregion
//#region buildTable/forHead/appendSpacerCell.js
function o({ inHeaderRowElement: e, inCellClass: t }) {
	let n = document.createElement("th");
	t && (n.className = t), e.appendChild(n);
}
//#endregion
//#region buildTable/forHead/HeaderRow.js
function s({ inColumns: t, inClasses: n = {}, inHeadOptions: r = {}, inSortState: i = [], inOnSort: s = () => {} }) {
	let c = t, l = n, u = r, d = i, f = s, p = e({
		inRowClass: l?.row,
		inHeaderHeight: u?.inHeaderHeight
	});
	return a({
		inHeaderRowElement: p,
		inColumns: c,
		inClasses: l,
		inSortState: d,
		inOnSort: f
	}), o({
		inHeaderRowElement: p,
		inCellClass: l?.cell
	}), p;
}
//#endregion
//#region buildTable/forHead/TableHeader.js
function c({ inColumns: e, inClasses: t = {}, inHeadOptions: n = {}, inSortState: r = [], inOnSort: i = () => {} }) {
	let a = e, o = t, c = n, l = r, u = i, d = document.createElement("thead");
	o.wrapper && (d.className = o.wrapper);
	let f = s({
		inColumns: a,
		inClasses: o,
		inHeadOptions: c,
		inSortState: l,
		inOnSort: u
	});
	return d.appendChild(f), d;
}
//#endregion
//#region buildTable/forBody/buildTableBodyElement.js
function l({ inWrapperClass: e }) {
	let t = document.createElement("tbody");
	return e && (t.className = e), t;
}
//#endregion
//#region buildTable/forBody/KsTableCellContent.js
var u = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let e = this._inputs.cellValue;
		if (this.shadowRoot.innerHTML = "", Array.isArray(e)) {
			let t = document.createElement("button");
			t.textContent = `View (${e.length})`, t.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;", t.onmouseover = () => t.style.backgroundColor = "#e5e7eb", t.onmouseout = () => t.style.backgroundColor = "#f3f4f6", this.shadowRoot.appendChild(t);
			return;
		}
		typeof e == "object" && e && (e = JSON.stringify(e)), e ??= "", this.shadowRoot.textContent = e;
	}
};
customElements.get("ks-table-cell-content") || customElements.define("ks-table-cell-content", u);
//#endregion
//#region buildTable/forBody/TableCell.js
var d = {
	width: "",
	align: "",
	vAlign: ""
};
function f({ inCellValue: e, inOptions: n = d, inClasses: r = {} }) {
	let i = e, a = n, o = r, s = document.createElement("td");
	o.cell && (s.className = o.cell), t({
		inElement: s,
		inOptions: a
	}), typeof i == "object" && i && o.cellTruncate && (s.className += (s.className ? " " : "") + o.cellTruncate);
	let c = document.createElement("ks-table-cell-content");
	return c.inputs = {
		cellValue: i,
		options: a,
		classes: o
	}, s.appendChild(c), s;
}
//#endregion
//#region buildTable/forBody/TableRow.js
function p({ inItem: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("tr");
	o.row && (c.className = o.row), s.inRowHeight && (c.style.height = s.inRowHeight), a.forEach((e) => {
		let t = i[e.dataKey], n = f({
			inCellValue: t,
			inOptions: e.options || {},
			inClasses: o
		});
		c.appendChild(n);
	});
	let l = document.createElement("td");
	return o.cell && (l.className = o.cell), c.appendChild(l), c;
}
//#endregion
//#region buildTable/forBody/appendTableRows.js
function m({ inBodyWrapperElement: e, inData: t, inColumns: n, inClasses: r, inBodyOptions: i }) {
	t.forEach((t) => {
		let a = p({
			inItem: t,
			inColumns: n,
			inClasses: r,
			inBodyOptions: i
		});
		e.appendChild(a);
	});
}
//#endregion
//#region buildTable/forBody/TableBody.js
function h({ inData: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = l({ inWrapperClass: o?.wrapper });
	return m({
		inBodyWrapperElement: c,
		inData: i,
		inColumns: a,
		inClasses: o,
		inBodyOptions: s
	}), c;
}
//#endregion
//#region buildTable/buildEmptyState.js
function g({ inClasses: e = {} }) {
	let t = e, n = document.createElement("div");
	return t.emptyState && (n.className = t.emptyState), n.textContent = "No data available", n;
}
//#endregion
//#region buildTable/buildTableElement.js
function _({ inClasses: e = {}, inCommonOptions: t = {} }) {
	let n = e, r = t, i = document.createElement("table");
	return n.table && (i.className = n.table), r.inTableWidth && (i.style.width = r.inTableWidth), r.inTableBorder && (r.inTableBorder.includes(" ") ? i.style.border = r.inTableBorder : i.style.borderWidth = r.inTableBorder), i;
}
//#endregion
//#region buildTable/forSummary/SummaryRow.js
function v({ inData: e, inColumns: n, inClasses: r = {}, inFootOptions: i = {} }) {
	let a = e, o = n, s = r, c = i, l = document.createElement("tr");
	return s.tr && (l.className = s.tr), l.style.backgroundColor = "#f9fafb", l.style.borderTop = "2px solid #e5e7eb", o.forEach((e) => {
		let n = document.createElement("td");
		s.td && (n.className = s.td), e.options && t(n, e.options);
		let r = "";
		if (e.options) {
			if (e.options.summaryLabel) r = e.options.summaryLabel;
			else if (e.options.summary === "sum") {
				let t = a.reduce((t, n) => {
					let r = parseFloat(n[e.dataKey]);
					return t + (isNaN(r) ? 0 : r);
				}, 0);
				r = Number.isInteger(t) ? t.toString() : t.toFixed(2);
			} else e.options.summary === "count" && (r = a.length.toString());
		}
		let i = document.createElement("ks-table-cell-content");
		c.inRowHeight && (i.style.minHeight = c.inRowHeight), i.style.fontWeight = "bold", i.inputs = r === "" ? { cellValue: "" } : { cellValue: r }, n.appendChild(i), l.appendChild(n);
	}), l;
}
//#endregion
//#region buildTable/forSummary/TableSummary.js
function y({ inData: e, inColumns: t, inClasses: n = {}, inFootOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("tfoot"), l = v({
		inData: i,
		inColumns: a,
		inClasses: o,
		inFootOptions: s
	});
	return c.appendChild(l), c;
}
//#endregion
//#region buildTable/index.js
function b({ inData: e, inColumns: t, inClasses: n = {}, inTableOptions: r = {}, inSortState: i = [], inOnSort: a = () => {} }) {
	let o = e, s = t, l = n, u = r, d = u.inCommonOptions || {}, f = u.inHeadOptions || {}, p = u.inBodyOptions || {}, m = u.inFootOptions || {}, v = i, b = a;
	if (!o || o.length === 0) return g({ inClasses: l });
	let x = _({
		inClasses: l,
		inCommonOptions: d
	}), S = s.filter((e) => e.isVisible !== !1), C = c({
		inColumns: S,
		inClasses: l.head || {},
		inHeadOptions: f,
		inSortState: v,
		inOnSort: b
	});
	x.appendChild(C);
	let w = h({
		inData: o,
		inColumns: S,
		inClasses: l.body || {},
		inBodyOptions: p
	});
	if (x.appendChild(w), m.inShowFooter) {
		let e = y({
			inData: o,
			inColumns: S,
			inClasses: l.summary || {},
			inFootOptions: m
		});
		x.appendChild(e);
	}
	return x;
}
//#endregion
//#region buildTable/config/defaults.js
var x = {
	emptyState: "p-4 text-gray-500 italic",
	table: "w-full border border-gray-200 divide-y divide-gray-200 table-fixed",
	head: {
		wrapper: "bg-gray-100 sticky top-0 z-10",
		row: "divide-x divide-gray-200",
		cell: "px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
	},
	body: {
		wrapper: "bg-white divide-y divide-gray-200",
		row: "hover:bg-gray-50 transition-colors divide-x divide-gray-200",
		cell: "px-4 py-3 whitespace-nowrap text-sm text-gray-700",
		cellTruncate: "truncate max-w-xs"
	},
	topHeader: {
		wrapper: "flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg",
		label: "text-lg font-semibold text-gray-800",
		input: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 transition-all"
	}
}, S = {
	inTableOptions: {
		inCommonOptions: {
			inTableWidth: "100%",
			inTableBorder: "1px solid #e5e7eb",
			inShowSerialNo: !1
		},
		inHeadOptions: { inHeaderHeight: "48px" },
		inBodyOptions: { inRowHeight: "48px" },
		inFootOptions: {
			inShowFooter: !1,
			inRowHeight: "48px"
		}
	},
	inTopHeader: {
		show: !1,
		label: "Default Table",
		placeholder: "Search..."
	}
};
//#endregion
//#region buildTable/utils/data/sortUtils.js
function C(e, t, n) {
	let r = e.sortState.findIndex((e) => e.dataKey === t);
	n ? r === -1 ? e.sortState.push({
		dataKey: t,
		direction: "asc"
	}) : e.sortState[r].direction = e.sortState[r].direction === "asc" ? "desc" : "asc" : r !== -1 && e.sortState.length === 1 ? e.sortState[0].direction = e.sortState[0].direction === "asc" ? "desc" : "asc" : e.sortState = [{
		dataKey: t,
		direction: "asc"
	}], w(e);
}
function w(e) {
	if (e.sortState && e.sortState.length > 0 && e.data.sort((t, n) => {
		for (let r of e.sortState) {
			let e = t[r.dataKey], i = n[r.dataKey];
			if (e === i) continue;
			if (e == null) return 1;
			if (i == null) return -1;
			let a = e < i ? -1 : 1;
			return r.direction === "asc" ? a : -a;
		}
		return 0;
	}), e.tableElement) {
		let t = e.buildTableElements();
		e.tableElement.replaceWith(t), e.tableElement = t;
	}
}
//#endregion
//#region buildTable/utils/data/searchUtils.js
function T(e, t) {
	let n = (t || "").toLowerCase().trim();
	e.data = n ? e.originalData.filter((t) => e.columns.some((e) => {
		if (e.dataKey === "$serial") return !1;
		let r = t[e.dataKey];
		return r != null && String(r).toLowerCase().includes(n);
	})) : [...e.originalData], w(e);
}
//#endregion
//#region buildTable/utils/data/applySerial.js
function E(e, t, n) {
	let r = Array.isArray(e) ? e : [e], i = Array.isArray(t) ? t : [];
	return n && (r = r.map((e, t) => ({
		...e,
		$serial: t + 1
	})), i = [{
		header: "#",
		dataKey: "$serial",
		options: {
			width: "60px",
			align: "center",
			sortable: !0
		}
	}, ...i]), {
		data: r,
		columns: i
	};
}
//#endregion
//#region buildTable/utils/style/normalizeSize.js
function D(e) {
	return e != null && e !== "" && (typeof e == "number" || /^\d+$/.test(String(e).trim())) ? `${e}px` : e;
}
//#endregion
//#region buildTable/utils/data/prepareDataAndColumns.js
function O({ inData: e, inColumns: t, inShowSerialNo: n }) {
	let { data: r, columns: i } = E(e, t, n);
	return {
		processedData: r,
		processedColumns: i.map((e) => {
			let t = { ...e };
			return t.options && t.options.width && (t.options = {
				...t.options,
				width: D(t.options.width)
			}), t;
		})
	};
}
//#endregion
//#region buildTable/buildTopHeader.js
function k({ inLabel: e = "", inPlaceholder: t = "", inClasses: n = {}, inOnSearch: r = () => {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("div");
	o.wrapper && (c.className = o.wrapper);
	let l = document.createElement("div");
	o.label && (l.className = o.label), l.textContent = i;
	let u = document.createElement("div"), d = document.createElement("input");
	return d.type = "text", d.placeholder = a, o.input && (d.className = o.input), d.addEventListener("input", (e) => {
		s(e.target.value);
	}), u.appendChild(d), c.appendChild(l), c.appendChild(u), c;
}
//#endregion
//#region buildTable/utils/config/extractTableOptions.js
function A({ inTableOptions: e = {} }) {
	let t = {
		...S.inTableOptions.inCommonOptions,
		...e.inCommonOptions || {}
	}, n = {
		...S.inTableOptions.inHeadOptions,
		...e.inHeadOptions || {}
	}, r = {
		...S.inTableOptions.inBodyOptions,
		...e.inBodyOptions || {}
	}, i = {
		...S.inTableOptions.inFootOptions,
		...e.inFootOptions || {}
	};
	return {
		inCommonOptions: {
			inTableWidth: D(t.inTableWidth),
			inTableBorder: D(t.inTableBorder),
			inShowSerialNo: t.inShowSerialNo
		},
		inHeadOptions: { inHeaderHeight: D(n.inHeaderHeight) },
		inBodyOptions: { inRowHeight: D(r.inRowHeight) },
		inFootOptions: {
			inShowFooter: i.inShowFooter,
			inRowHeight: D(i.inRowHeight)
		}
	};
}
//#endregion
//#region buildTable/utils/config/mapTableOptions.js
function j(e = {}) {
	let t = {
		inCommonOptions: {},
		inHeadOptions: {},
		inBodyOptions: {},
		inFootOptions: {}
	};
	return e?.commonOptions?.tableWidth !== void 0 && (t.inCommonOptions.inTableWidth = e.commonOptions.tableWidth), e?.commonOptions?.tableBorder !== void 0 && (t.inCommonOptions.inTableBorder = e.commonOptions.tableBorder), e?.commonOptions?.showSerialNo !== void 0 && (t.inCommonOptions.inShowSerialNo = e.commonOptions.showSerialNo), e?.headOptions?.headerHeight !== void 0 && (t.inHeadOptions.inHeaderHeight = e.headOptions.headerHeight), e?.bodyOptions?.rowHeight !== void 0 && (t.inBodyOptions.inRowHeight = e.bodyOptions.rowHeight), e?.footOptions?.showFooter !== void 0 && (t.inFootOptions.inShowFooter = e.footOptions.showFooter), e?.footOptions?.rowHeight !== void 0 && (t.inFootOptions.inRowHeight = e.footOptions.rowHeight), t;
}
//#endregion
//#region buildTable/utils/config/extractTopHeader.js
function M({ inTopHeader: e }) {
	return e === S.inTopHeader ? S.inTopHeader : {
		show: e.show === void 0 || e.show,
		label: e.label === void 0 ? S.inTopHeader.label : e.label,
		placeholder: e.placeholder === void 0 ? S.inTopHeader.placeholder : e.placeholder
	};
}
//#endregion
//#region buildTable/utils/config/mergeClasses.js
function N({ inClasses: e }) {
	let t = e || {};
	return {
		...x,
		...t,
		head: {
			...x.head,
			...t.head || {}
		},
		body: {
			...x.body,
			...t.body || {}
		},
		topHeader: {
			...x.topHeader,
			...t.topHeader || {}
		}
	};
}
//#endregion
//#region buildTable/utils/dom/appendToDom.js
function P(e) {
	if (!e.htmlId) {
		console.error("inHtmlId was not provided to TableBuilder.");
		return;
	}
	let t = document.getElementById(e.htmlId);
	if (!t) {
		console.error(`Element with id '${e.htmlId}' not found.`);
		return;
	}
	t.innerHTML = "";
	let n = e.buildTopHeaderElement();
	n && (n.style.marginBottom = "1rem", t.appendChild(n)), e.tableElement = e.buildTableElements(), t.appendChild(e.tableElement);
}
//#endregion
//#region TableBuilder.js
var F = class {
	constructor({ htmlId: e, data: t, columns: n = [], classes: r = {}, tableOptions: i = {}, topHeader: a = S.inTopHeader }) {
		let o = e, s = t, c = n, l = r, u = j(i);
		this.tableOptions = A({ inTableOptions: u }), this.topHeader = M({ inTopHeader: a }), this.htmlId = o;
		let { processedData: d, processedColumns: f } = O({
			inData: s,
			inColumns: c,
			inShowSerialNo: this.tableOptions.inCommonOptions.inShowSerialNo
		});
		this.originalData = d, this.data = [...d], this.columns = f, this.classes = N({ inClasses: l }), this.sortState = [], this.tableElement = null;
	}
	handleSort(e, t = !1) {
		C(this, e, t);
	}
	handleSearch(e) {
		T(this, e);
	}
	appendToDom() {
		P(this);
	}
	buildTableElements() {
		return b({
			inData: this.data,
			inColumns: this.columns,
			inClasses: this.classes,
			inTableOptions: this.tableOptions,
			inSortState: this.sortState,
			inOnSort: this.handleSort.bind(this)
		});
	}
	buildTopHeaderElement() {
		return !this.topHeader || this.topHeader.show === !1 ? null : k({
			inLabel: this.topHeader.label,
			inPlaceholder: this.topHeader.placeholder,
			inClasses: this.classes.topHeader,
			inOnSearch: this.handleSearch.bind(this)
		});
	}
	build() {
		return this.appendToDom();
	}
};
window.ks = {}, window.ks.TableBuilder = F, window.ks.DEFAULT_CLASSES = x, window.ks.DEFAULT_CONFIG = S;
//#endregion
export { x as DEFAULT_CLASSES, S as DEFAULT_CONFIG, F as TableBuilder };
