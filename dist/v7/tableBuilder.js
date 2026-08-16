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
//#region buildTable/forBody/v1/buildTableBodyElement.js
function l({ inWrapperClass: e }) {
	let t = document.createElement("tbody");
	return e && (t.className = e), t;
}
//#endregion
//#region buildTable/forBody/v1/cellRenderers/renderButtonControl.js
function u(e, t) {
	let n = document.createElement("button"), r = t.controlOptions || {};
	if (n.textContent = r.label || "Button", n.style.cssText = "padding: 0.375rem 0.75rem; font-size: 0.875rem; font-weight: 500; color: #ffffff; background-color: #3b82f6; border-radius: 0.375rem; border: none; cursor: pointer; transition: background-color 0.2s;", n.onmouseover = () => n.style.backgroundColor = "#2563eb", n.onmouseout = () => n.style.backgroundColor = "#3b82f6", r.onClick) {
		let e;
		if (typeof r.onClick == "string") try {
			e = Function("return (" + r.onClick + ")")();
		} catch (e) {
			console.error("Failed to parse onClick function:", e);
		}
		else typeof r.onClick == "function" && (e = r.onClick);
		e && n.addEventListener("click", e);
	}
	e.appendChild(n);
}
//#endregion
//#region buildTable/forBody/v1/cellRenderers/renderArrayView.js
function d(e, t) {
	let n = document.createElement("button");
	n.textContent = `View (${t.length})`, n.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;", n.onmouseover = () => n.style.backgroundColor = "#e5e7eb", n.onmouseout = () => n.style.backgroundColor = "#f3f4f6", e.appendChild(n);
}
//#endregion
//#region buildTable/forBody/v1/cellRenderers/renderDefault.js
function f(e, t) {
	typeof t == "object" && t && (t = JSON.stringify(t)), t ??= "", e.textContent = t;
}
//#endregion
//#region buildTable/forBody/v1/KsTableCellContent.js
var p = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let e = this._inputs.cellValue, t = this._inputs.options || {};
		this.shadowRoot.innerHTML = "";
		let n = t.table?.tbody?.td;
		if (n && n.controlType === "button") {
			u(this.shadowRoot, n);
			return;
		}
		if (Array.isArray(e)) {
			d(this.shadowRoot, e);
			return;
		}
		f(this.shadowRoot, e);
	}
};
customElements.get("ks-table-cell-content") || customElements.define("ks-table-cell-content", p);
//#endregion
//#region buildTable/forBody/v1/TableCell.js
var m = {
	width: "",
	align: "",
	vAlign: ""
};
function h({ inCellValue: e, inOptions: n = m, inClasses: r = {} }) {
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
//#region buildTable/forBody/v1/TableRow.js
function g({ inItem: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("tr");
	o.row && (c.className = o.row), s.inRowHeight && (c.style.height = s.inRowHeight), a.forEach((e) => {
		let t = i[e.dataKey], n = h({
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
//#region buildTable/forBody/v1/appendTableRows.js
function _({ inBodyWrapperElement: e, inData: t, inColumns: n, inClasses: r, inBodyOptions: i }) {
	t.forEach((t) => {
		let a = g({
			inItem: t,
			inColumns: n,
			inClasses: r,
			inBodyOptions: i
		});
		e.appendChild(a);
	});
}
//#endregion
//#region buildTable/forBody/v1/TableBody.js
function v({ inData: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = l({ inWrapperClass: o?.wrapper });
	return _({
		inBodyWrapperElement: c,
		inData: i,
		inColumns: a,
		inClasses: o,
		inBodyOptions: s
	}), c;
}
//#endregion
//#region buildTable/forBody/index.js
var y = v;
//#endregion
//#region buildTable/buildEmptyState.js
function b({ inClasses: e = {} }) {
	let t = e, n = document.createElement("div");
	return t.emptyState && (n.className = t.emptyState), n.textContent = "No data available", n;
}
//#endregion
//#region buildTable/buildTableElement.js
function x({ inClasses: e = {}, inCommonOptions: t = {} }) {
	let n = e, r = t, i = document.createElement("table");
	return n.table && (i.className = n.table), r.inTableWidth && (i.style.width = r.inTableWidth), r.inTableBorder && (r.inTableBorder.includes(" ") ? i.style.border = r.inTableBorder : i.style.borderWidth = r.inTableBorder), i;
}
//#endregion
//#region buildTable/forSummary/SummaryRow.js
function S({ inData: e, inColumns: n, inClasses: r = {}, inFootOptions: i = {} }) {
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
function C({ inData: e, inColumns: t, inClasses: n = {}, inFootOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("tfoot"), l = S({
		inData: i,
		inColumns: a,
		inClasses: o,
		inFootOptions: s
	});
	return c.appendChild(l), c;
}
//#endregion
//#region buildTable/index.js
function w({ inData: e, inColumns: t, inClasses: n = {}, inTableOptions: r = {}, inSortState: i = [], inOnSort: a = () => {} }) {
	let o = e, s = t, l = n, u = r, d = u.inCommonOptions || {}, f = u.inHeadOptions || {}, p = u.inBodyOptions || {}, m = u.inFootOptions || {}, h = i, g = a;
	if (!o || o.length === 0) return b({ inClasses: l });
	let _ = x({
		inClasses: l,
		inCommonOptions: d
	}), v = s.filter((e) => e.isVisible !== !1), S = c({
		inColumns: v,
		inClasses: l.head || {},
		inHeadOptions: f,
		inSortState: h,
		inOnSort: g
	});
	_.appendChild(S);
	let w = y({
		inData: o,
		inColumns: v,
		inClasses: l.body || {},
		inBodyOptions: p
	});
	if (_.appendChild(w), m.inShowFooter) {
		let e = C({
			inData: o,
			inColumns: v,
			inClasses: l.summary || {},
			inFootOptions: m
		});
		_.appendChild(e);
	}
	return _;
}
//#endregion
//#region buildTable/config/defaults.js
var T = {
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
}, E = {
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
		inShow: !1,
		inLabel: "Default Table",
		inPlaceholder: "Search..."
	}
};
//#endregion
//#region buildTable/utils/data/sortUtils.js
function D(e, t, n) {
	let r = e.sortState.findIndex((e) => e.dataKey === t);
	n ? r === -1 ? e.sortState.push({
		dataKey: t,
		direction: "asc"
	}) : e.sortState[r].direction = e.sortState[r].direction === "asc" ? "desc" : "asc" : r !== -1 && e.sortState.length === 1 ? e.sortState[0].direction = e.sortState[0].direction === "asc" ? "desc" : "asc" : e.sortState = [{
		dataKey: t,
		direction: "asc"
	}], O(e);
}
function O(e) {
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
function k(e, t) {
	let n = (t || "").toLowerCase().trim();
	e.data = n ? e.originalData.filter((t) => e.columns.some((e) => {
		if (e.dataKey === "$serial") return !1;
		let r = t[e.dataKey];
		return r != null && String(r).toLowerCase().includes(n);
	})) : [...e.originalData], O(e);
}
//#endregion
//#region buildTable/utils/data/applySerial.js
function A(e, t, n) {
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
function j(e) {
	return e != null && e !== "" && (typeof e == "number" || /^\d+$/.test(String(e).trim())) ? `${e}px` : e;
}
//#endregion
//#region buildTable/utils/data/prepareDataAndColumns.js
function M({ inData: e, inColumns: t, inShowSerialNo: n }) {
	let { data: r, columns: i } = A(e, t, n);
	return {
		processedData: r,
		processedColumns: i.map((e) => {
			let t = { ...e };
			return t.options && t.options.width && (t.options = {
				...t.options,
				width: j(t.options.width)
			}), t;
		})
	};
}
//#endregion
//#region buildTable/buildTopHeader.js
function N({ inLabel: e = "", inPlaceholder: t = "", inClasses: n = {}, inOnSearch: r = () => {} }) {
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
function P({ inTableOptions: e = {} }) {
	let t = {
		...E.inTableOptions.inCommonOptions,
		...e.inCommonOptions || {}
	}, n = {
		...E.inTableOptions.inHeadOptions,
		...e.inHeadOptions || {}
	}, r = {
		...E.inTableOptions.inBodyOptions,
		...e.inBodyOptions || {}
	}, i = {
		...E.inTableOptions.inFootOptions,
		...e.inFootOptions || {}
	};
	return {
		inCommonOptions: {
			inTableWidth: j(t.inTableWidth),
			inTableBorder: j(t.inTableBorder),
			inShowSerialNo: t.inShowSerialNo
		},
		inHeadOptions: { inHeaderHeight: j(n.inHeaderHeight) },
		inBodyOptions: { inRowHeight: j(r.inRowHeight) },
		inFootOptions: {
			inShowFooter: i.inShowFooter,
			inRowHeight: j(i.inRowHeight)
		}
	};
}
//#endregion
//#region buildTable/utils/config/mapTableOptions.js
function F(e = {}) {
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
function I({ inTopHeader: e }) {
	return e === E.inTopHeader ? E.inTopHeader : {
		inShow: e.show === void 0 || e.show,
		inLabel: e.label === void 0 ? E.inTopHeader.inLabel : e.label,
		inPlaceholder: e.placeholder === void 0 ? E.inTopHeader.inPlaceholder : e.placeholder
	};
}
//#endregion
//#region buildTable/utils/config/mergeClasses.js
function L({ inClasses: e }) {
	let t = e || {};
	return {
		...T,
		...t,
		head: {
			...T.head,
			...t.head || {}
		},
		body: {
			...T.body,
			...t.body || {}
		},
		topHeader: {
			...T.topHeader,
			...t.topHeader || {}
		}
	};
}
//#endregion
//#region buildTable/utils/dom/appendToDom.js
function R(e) {
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
var z = class {
	constructor({ htmlId: e, data: t, columns: n = [], classes: r = {}, tableOptions: i = {}, topHeader: a = E.inTopHeader }) {
		let o = e, s = t, c = n, l = r, u = F(i);
		this.tableOptions = P({ inTableOptions: u }), this.topHeader = I({ inTopHeader: a }), this.htmlId = o;
		let { processedData: d, processedColumns: f } = M({
			inData: s,
			inColumns: c,
			inShowSerialNo: this.tableOptions.inCommonOptions.inShowSerialNo
		});
		this.originalData = d, this.data = [...d], this.columns = f, this.classes = L({ inClasses: l }), this.sortState = [], this.tableElement = null;
	}
	handleSort(e, t = !1) {
		D(this, e, t);
	}
	handleSearch(e) {
		k(this, e);
	}
	appendToDom() {
		R(this);
	}
	buildTableElements() {
		return w({
			inData: this.data,
			inColumns: this.columns,
			inClasses: this.classes,
			inTableOptions: this.tableOptions,
			inSortState: this.sortState,
			inOnSort: this.handleSort.bind(this)
		});
	}
	buildTopHeaderElement() {
		return !this.topHeader || this.topHeader.inShow === !1 ? null : N({
			inLabel: this.topHeader.inLabel,
			inPlaceholder: this.topHeader.inPlaceholder,
			inClasses: this.classes.topHeader,
			inOnSearch: this.handleSearch.bind(this)
		});
	}
	build() {
		return this.appendToDom();
	}
};
window.ks = {}, window.ks.TableBuilder = z, window.ks.TableBuilder.DEFAULT_CLASSES = T, window.ks.TableBuilder.DEFAULT_CONFIG = E, window.ks.TableBuilder.version = "v3.0";
//#endregion
export { T as DEFAULT_CLASSES, E as DEFAULT_CONFIG, z as TableBuilder };
