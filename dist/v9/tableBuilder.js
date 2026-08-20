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
//#region buildTable/forBody/v1/cellRenderers/renderButtonControl.js
function l(e, t) {
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
function u(e, t) {
	let n = document.createElement("button");
	n.textContent = `View (${t.length})`, n.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;", n.onmouseover = () => n.style.backgroundColor = "#e5e7eb", n.onmouseout = () => n.style.backgroundColor = "#f3f4f6", e.appendChild(n);
}
//#endregion
//#region buildTable/forBody/v1/cellRenderers/renderDefault.js
function d(e, t) {
	typeof t == "object" && t && (t = JSON.stringify(t)), t ??= "", e.textContent = t;
}
//#endregion
//#region buildTable/forBody/v1/KsTableCellContent.js
var f = class extends HTMLElement {
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
			l(this.shadowRoot, n);
			return;
		}
		if (Array.isArray(e)) {
			u(this.shadowRoot, e);
			return;
		}
		d(this.shadowRoot, e);
	}
};
customElements.get("ks-table-cell-content") || customElements.define("ks-table-cell-content", f);
//#endregion
//#region buildTable/forBody/v4/buildTableBodyElement.js
function p({ inWrapperClass: e }) {
	let t = document.createElement("tbody");
	return e && (t.className = e), t;
}
//#endregion
//#region buildTable/forBody/v4/TableRow/tableCell/applyCellOptions.js
function m({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region buildTable/forBody/v4/TableRow/tableCell/index.js
var h = {
	width: "",
	align: "",
	vAlign: ""
};
function g({ inCellValue: e, inRowData: t, inOptions: n = h, inClasses: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("td");
	s.cell && (c.className = s.cell), m({
		inElement: c,
		inOptions: o
	}), typeof i == "object" && i && s.cellTruncate && (c.className += (c.className ? " " : "") + s.cellTruncate);
	let l = document.createElement("ks-table-cell-content-common");
	return l.inputs = {
		cellValue: i,
		rowData: a,
		options: o,
		classes: s
	}, c.appendChild(l), c;
}
//#endregion
//#region buildTable/forBody/v4/TableRow/1-createTrElement.js
var _ = ({ inClasses: e = {}, inBodyOptions: t = {} }) => {
	let n = e, r = t, i = document.createElement("tr");
	return n.row && (i.className = n.row), r.inRowHeight && (i.style.height = r.inRowHeight), i;
}, v = ({ inClasses: e = {} }) => {
	let t = e, n = document.createElement("td");
	return t.cell && (n.className = t.cell), n;
}, y = ({ inItem: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) => {
	let i = e, a = t, o = n, s = _({
		inClasses: o,
		inBodyOptions: r
	});
	a.forEach((e) => {
		let t = i[e.dataKey], n = g({
			inCellValue: t,
			inRowData: i,
			inOptions: e.options || {},
			inClasses: o
		});
		s.appendChild(n);
	});
	let c = v({ inClasses: o });
	return s.appendChild(c), s;
};
//#endregion
//#region buildTable/forBody/v4/appendTableRows.js
function b({ inBodyWrapperElement: e, inData: t, inColumns: n, inClasses: r, inBodyOptions: i }) {
	t.forEach((t) => {
		let a = y({
			inItem: t,
			inColumns: n,
			inClasses: r,
			inBodyOptions: i
		});
		e.appendChild(a);
	});
}
//#endregion
//#region buildTable/forBody/v4/TableBody.js
function x({ inData: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = p({ inWrapperClass: o?.wrapper });
	return b({
		inBodyWrapperElement: c,
		inData: i,
		inColumns: a,
		inClasses: o,
		inBodyOptions: s
	}), c;
}
//#endregion
//#region buildTable/forBody/index.js
var S = x;
//#endregion
//#region buildTable/buildEmptyState.js
function C({ inClasses: e = {} }) {
	let t = e, n = document.createElement("div");
	return t.emptyState && (n.className = t.emptyState), n.textContent = "No data available", n;
}
//#endregion
//#region buildTable/buildTableElement.js
function w({ inClasses: e = {}, inCommonOptions: t = {} }) {
	let n = e, r = t, i = document.createElement("table");
	return n.table && (i.className = n.table), r.inTableWidth && (i.style.width = r.inTableWidth), r.inTableBorder && (r.inTableBorder.includes(" ") ? i.style.border = r.inTableBorder : i.style.borderWidth = r.inTableBorder), i;
}
//#endregion
//#region buildTable/forFooter/v6/SummaryRow/1-createTrElement.js
var T = ({ inClasses: e = {} }) => {
	let t = e, n = document.createElement("tr");
	return t.tr && (n.className = t.tr), n.style.backgroundColor = "#f9fafb", n.style.borderTop = "2px solid #e5e7eb", n;
}, E = {
	sum: ({ inData: e, inCol: t }) => {
		let n = e.reduce((e, n) => {
			let r = parseFloat(n[t.dataKey]);
			return e + (isNaN(r) ? 0 : r);
		}, 0);
		return Number.isInteger(n) ? n.toString() : n.toFixed(2);
	},
	count: ({ inData: e, inCol: t }) => e.length.toString(),
	avg: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "0";
		let n = e.reduce((e, n) => {
			let r = parseFloat(n[t.dataKey]);
			return e + (isNaN(r) ? 0 : r);
		}, 0) / e.length;
		return Number.isInteger(n) ? n.toString() : n.toFixed(2);
	},
	min: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "";
		let n = e.map((e) => parseFloat(e[t.dataKey])).filter((e) => !isNaN(e));
		if (n.length === 0) return "";
		let r = Math.min(...n);
		return Number.isInteger(r) ? r.toString() : r.toFixed(2);
	},
	max: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "";
		let n = e.map((e) => parseFloat(e[t.dataKey])).filter((e) => !isNaN(e));
		if (n.length === 0) return "";
		let r = Math.max(...n);
		return Number.isInteger(r) ? r.toString() : r.toFixed(2);
	}
}, D = ({ inData: e, inCol: t }) => {
	let n = e, r = t, i = "";
	if (r.options) {
		if (r?.options?.table?.tfoot?.summary?.summaryLabel) i = r.options.table.tfoot.summary.summaryLabel;
		else if (r.options?.table?.tfoot?.summary?.summary) {
			let e = r.options.table.tfoot.summary.summary.toLowerCase();
			E[e] && (i = E[e]({
				inData: n,
				inCol: r
			}));
		}
	}
	return i;
};
//#endregion
//#region buildTable/forFooter/v6/SummaryRow/applyCellOptions.js
function ee({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region buildTable/forFooter/v6/SummaryRow/3-buildTdElement.js
var te = ({ inClasses: e = {}, inCol: t }) => {
	let n = e, r = t, i = document.createElement("td");
	return n.td && (i.className = n.td), r.options && ee(i, r.options), i;
}, ne = ({ inFootOptions: e = {}, inSummaryValue: t }) => {
	let n = e, r = t, i = document.createElement("ks-table-cell-content-common");
	return n.inRowHeight && (i.style.minHeight = n.inRowHeight), i.style.fontWeight = "bold", i.inputs = r === "" ? { cellValue: "" } : { cellValue: r }, i;
}, re = ({ inData: e, inColumns: t, inClasses: n = {}, inFootOptions: r = {} }) => {
	let i = e, a = t, o = n, s = r, c = T({ inClasses: o }), l = {};
	return a.forEach((e) => {
		let t = te({
			inClasses: o,
			inCol: e
		}), n = D({
			inData: i,
			inCol: e
		});
		l[e.dataKey] = n;
		let r = ne({
			inFootOptions: s,
			inSummaryValue: n
		});
		t.appendChild(r), c.appendChild(t);
	}), {
		builtTrElement: c,
		summaryValues: l
	};
}, ie = ({ inClasses: e = {} }) => {
	let t = e, n = document.createElement("tr");
	return t.tr && (n.className = t.tr), n.style.backgroundColor = "#f9fafb", n.style.borderTop = "2px solid #e5e7eb", n;
};
//#endregion
//#region buildTable/forFooter/v6/BalanceRow/applyCellOptions.js
function ae({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region buildTable/forFooter/v6/BalanceRow/3-buildTdElement.js
var oe = ({ inClasses: e = {}, inCol: t }) => {
	let n = e, r = t, i = document.createElement("td");
	return n.td && (i.className = n.td), r.options && ae(i, r.options), i;
}, se = ({ inFootOptions: e = {}, inSummaryValue: t }) => {
	let n = e, r = t, i = document.createElement("ks-table-cell-content-common");
	return n.inRowHeight && (i.style.minHeight = n.inRowHeight), i.style.fontWeight = "bold", i.inputs = r === "" ? { cellValue: "" } : { cellValue: r }, i;
}, O = ({ inData: e, inColumns: t, inClasses: n = {}, inFootOptions: r = {}, inSummaryValues: i = {} }) => {
	let a = t, o = n, s = r, c = i, l = ie({ inClasses: o }), u = Object.keys(c), d = Object.values(c);
	return a.forEach((e) => {
		let t = oe({
			inClasses: o,
			inCol: e
		}), n = "", r = e?.options?.table?.tfoot?.summary?.balanceString;
		if (r) try {
			n = Function(...u, `return \`${r}\`;`)(...d);
		} catch (e) {
			console.error("Error evaluating balanceString:", e);
		}
		let i = se({
			inFootOptions: s,
			inSummaryValue: n
		});
		t.appendChild(i), l.appendChild(t);
	}), l;
}, k = ({ inClasses: e = {} }) => {
	let t = e, n = document.createElement("tr");
	return t.tr && (n.className = t.tr), n.style.backgroundColor = "#f9fafb", n.style.borderTop = "2px solid #e5e7eb", n;
}, A = {
	sum: ({ inData: e, inCol: t }) => {
		let n = e.reduce((e, n) => {
			let r = parseFloat(n[t.dataKey]);
			return e + (isNaN(r) ? 0 : r);
		}, 0);
		return Number.isInteger(n) ? n.toString() : n.toFixed(2);
	},
	count: ({ inData: e, inCol: t }) => e.length.toString(),
	avg: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "0";
		let n = e.reduce((e, n) => {
			let r = parseFloat(n[t.dataKey]);
			return e + (isNaN(r) ? 0 : r);
		}, 0) / e.length;
		return Number.isInteger(n) ? n.toString() : n.toFixed(2);
	},
	min: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "";
		let n = e.map((e) => parseFloat(e[t.dataKey])).filter((e) => !isNaN(e));
		if (n.length === 0) return "";
		let r = Math.min(...n);
		return Number.isInteger(r) ? r.toString() : r.toFixed(2);
	},
	max: ({ inData: e, inCol: t }) => {
		if (e.length === 0) return "";
		let n = e.map((e) => parseFloat(e[t.dataKey])).filter((e) => !isNaN(e));
		if (n.length === 0) return "";
		let r = Math.max(...n);
		return Number.isInteger(r) ? r.toString() : r.toFixed(2);
	}
}, j = ({ inData: e, inCol: t }) => {
	let n = e, r = t, i = "";
	if (r.options) {
		if (r?.options?.table?.tfoot?.summary?.summaryLabel) i = r.options.table.tfoot.summary.summaryLabel;
		else if (r.options?.table?.tfoot?.summary?.summary) {
			let e = r.options.table.tfoot.summary.summary.toLowerCase();
			A[e] && (i = A[e]({
				inData: n,
				inCol: r
			}));
		}
	}
	return i;
};
//#endregion
//#region buildTable/forFooter/v6/inputsRow/applyCellOptions.js
function M({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region buildTable/forFooter/v6/inputsRow/3-buildTdElement.js
var N = ({ inClasses: e = {}, inCol: t }) => {
	let n = e, r = t, i = document.createElement("td");
	return n.td && (i.className = n.td), r.options && M(i, r.options), i;
}, P = ({ inFootOptions: e = {}, inSummaryValue: t }) => {
	let n = e, r = t, i = document.createElement("ks-table-cell-content-common");
	return i.style.fontWeight = "bold", i.inputs = r === "" ? { cellValue: "" } : {
		cellValue: r,
		options: n
	}, i;
}, F = ({ inData: e, inColumns: t, inClasses: n = {} }) => {
	let r = e, i = t, a = n, o = k({ inClasses: a });
	return i.forEach((e) => {
		let t = N({
			inClasses: a,
			inCol: e
		}), n = j({
			inData: r,
			inCol: e
		}), i = P({
			inFootOptions: e?.options?.table?.tfoot?.inputsRow,
			inSummaryValue: n
		});
		t.appendChild(i), o.appendChild(t);
	}), { builtTrElement: o };
}, I = ({ inData: e, inColumns: t, inClasses: n = {}, inFootOptions: r = {} }) => {
	let i = e, a = t, o = n, s = r, c = document.createElement("tfoot");
	if (s.inShowBalance) {
		let { builtTrElement: e, summaryValues: t } = re({
			inData: i,
			inColumns: a,
			inClasses: o,
			inFootOptions: s
		});
		if (c.appendChild(e), s.inShowBalance) {
			let e = O({
				inData: i,
				inColumns: a,
				inClasses: o,
				inFootOptions: s,
				inSummaryValues: t
			});
			c.appendChild(e);
		}
	}
	if (s.inShowInputsRow) {
		let { builtTrElement: e } = F({
			inData: i,
			inColumns: a,
			inClasses: o,
			inFootOptions: s
		});
		c.appendChild(e);
	}
	return c;
};
//#endregion
//#region buildTable/index.js
function L({ inData: e, inColumns: t, inClasses: n = {}, inTableOptions: r = {}, inSortState: i = [], inOnSort: a = () => {} }) {
	let o = e, s = t, l = n, u = r, d = u.inCommonOptions || {}, f = u.inHeadOptions || {}, p = u.inBodyOptions || {}, m = u.inFootOptions || {}, h = i, g = a;
	if (!o || o.length === 0) return C({ inClasses: l });
	let _ = w({
		inClasses: l,
		inCommonOptions: d
	}), v = s.filter((e) => e.isVisible !== !1), y = c({
		inColumns: v,
		inClasses: l.head || {},
		inHeadOptions: f,
		inSortState: h,
		inOnSort: g
	});
	_.appendChild(y);
	let b = S({
		inData: o,
		inColumns: v,
		inClasses: l.body || {},
		inBodyOptions: p
	});
	if (_.appendChild(b), m.inShowFooter) {
		let e = I({
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
//#region buildTable/config/defaultConfig.js
var R = {
	htmlId: "table-root",
	data: [],
	columns: [],
	theme: "style1",
	tableOptions: {
		commonOptions: {
			tableWidth: "100%",
			tableBorder: "1px solid #e5e7eb",
			showSerialNo: !1
		},
		headOptions: { headerHeight: "48px" },
		bodyOptions: { rowHeight: "48px" },
		footOptions: {
			showFooter: !1,
			rowHeight: "48px",
			showAggregateRows: !1,
			showTotals: !1,
			showBalance: !1,
			showInputsRow: !1
		}
	},
	topHeader: {
		show: !1,
		label: "Default Table",
		placeholder: "Search..."
	},
	endPoints: {
		create: "",
		update: "",
		delete: "",
		read: "",
		read1: "",
		groupBy: "",
		read2: "",
		find: "",
		filter: "",
		dataLists: {},
		dataListEndpoints: {}
	}
}, z = {
	style1: {
		container: "w-full overflow-x-auto",
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
			wrapper: "flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg mb-4",
			label: "text-lg font-semibold text-gray-800",
			input: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 transition-all"
		}
	},
	style2: {
		container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
		emptyState: "p-4 text-gray-500 italic",
		table: "w-full bg-white",
		head: {
			wrapper: "bg-white sticky top-0 z-10",
			row: "border-b border-gray-200",
			cell: "px-4 py-3 text-left text-sm font-bold text-gray-900 border-b"
		},
		body: {
			wrapper: "bg-white",
			row: "hover:bg-blue-50 transition-colors border-b border-gray-100",
			cell: "px-4 py-3 whitespace-nowrap text-sm text-gray-700",
			cellTruncate: "truncate max-w-xs"
		},
		topHeader: {
			wrapper: "flex justify-between items-center px-4 pb-4 pt-2 bg-white",
			label: "text-lg font-bold text-gray-900",
			input: "px-4 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm w-64 transition-all shadow-sm text-gray-700"
		}
	}
}, B = R;
//#endregion
//#region buildTable/utils/dataFuncs/sortUtils.js
function V(e, t, n) {
	let r = e.sortState.findIndex((e) => e.dataKey === t);
	n ? r === -1 ? e.sortState.push({
		dataKey: t,
		direction: "asc"
	}) : e.sortState[r].direction = e.sortState[r].direction === "asc" ? "desc" : "asc" : r !== -1 && e.sortState.length === 1 ? e.sortState[0].direction = e.sortState[0].direction === "asc" ? "desc" : "asc" : e.sortState = [{
		dataKey: t,
		direction: "asc"
	}], H(e);
}
function H(e) {
	if (e.sortState && e.sortState.length > 0 && e.dataStore.data.sort((t, n) => {
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
//#region buildTable/utils/dataFuncs/searchUtils.js
function U(e, t) {
	let n = (t || "").toLowerCase().trim();
	n ? e.dataStore.data = e.dataStore.originalData.filter((t) => e.dataStore.columns.some((e) => {
		if (e.dataKey === "$serial") return !1;
		let r = t[e.dataKey];
		return r != null && String(r).toLowerCase().includes(n);
	})) : e.dataStore.data = [...e.dataStore.originalData], H(e);
}
//#endregion
//#region buildTable/buildTopHeader.js
function W({ inLabel: e = "", inPlaceholder: t = "", inClasses: n = {}, inOnSearch: r = () => {} }) {
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
//#region buildTable/utils/style/normalizeSize.js
function G(e) {
	return e != null && e !== "" && (typeof e == "number" || /^\d+$/.test(String(e).trim())) ? `${e}px` : e;
}
//#endregion
//#region buildTable/utils/config/mapTableOptions.js
var K = (e = {}) => {
	let t = {}, n = R.tableOptions || {};
	for (let r in n) {
		let i = "in" + r.charAt(0).toUpperCase() + r.slice(1);
		t[i] = {};
		let a = e[r];
		if (a) {
			for (let e in n[r]) if (a[e] !== void 0) {
				let n = "in" + e.charAt(0).toUpperCase() + e.slice(1);
				t[i][n] = a[e];
			}
		}
	}
	return t;
};
//#endregion
//#region buildTable/utils/config/extractTopHeader.js
function ce({ inTopHeader: e }) {
	return e === B.topHeader ? {
		inShow: B.topHeader.show,
		inLabel: B.topHeader.label,
		inPlaceholder: B.topHeader.placeholder
	} : {
		inShow: e.show === void 0 || e.show,
		inLabel: e.label === void 0 ? B.topHeader.label : e.label,
		inPlaceholder: e.placeholder === void 0 ? B.topHeader.placeholder : e.placeholder
	};
}
//#endregion
//#region buildTable/utils/config/mergeClasses.js
function le({ inClasses: e, inTheme: t = "style1" }) {
	let n = e || {}, r = z[t] || z.style1;
	return {
		...r,
		...n,
		head: {
			...r.head,
			...n.head || {}
		},
		body: {
			...r.body,
			...n.body || {}
		},
		topHeader: {
			...r.topHeader,
			...n.topHeader || {}
		}
	};
}
//#endregion
//#region buildTable/utils/dom/appendToDom.js
function ue(e) {
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
	let n = document.createElement("div");
	e.classes.container && (n.className = e.classes.container);
	let r = e.buildTopHeaderElement();
	r && n.appendChild(r), e.tableElement = e.buildTableElements(), n.appendChild(e.tableElement), t.appendChild(n);
}
//#endregion
//#region buildTable/utils/dataFuncs/prepareColumns.js
var de = (e, t) => {
	let n = Array.isArray(e) ? e : [];
	return t && (n = [{
		header: "#",
		dataKey: "$serial",
		options: {
			width: "60px",
			align: "center",
			sortable: !0
		}
	}, ...n]), n;
}, fe = ({ inColumns: e, inShowSerialNo: t }) => de(e, t).map((e) => {
	let t = { ...e };
	return t.options && t.options.width && (t.options = {
		...t.options,
		width: G(t.options.width)
	}), t;
}), q = ({ inData: e, inShowSerialNo: t }) => {
	let n = Array.isArray(e) ? e : [e];
	return t && (n = n.map((e, t) => ({
		...e,
		$serial: t + 1
	}))), n;
};
//#endregion
//#region buildTable/utils/services.js
async function J(e, t = {}) {
	try {
		let n = await fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...t.headers
			}
		});
		if (!n.ok) throw Error(`HTTP error! status: ${n.status}`);
		return await n.json();
	} catch (t) {
		throw console.error(`Error fetching from ${e}:`, t), t;
	}
}
var Y = {
	read: async (e) => {
		if (!e) return null;
		let t = await J(e);
		return Array.isArray(t) ? t : t.tallymessage || t;
	},
	create: async (e, t) => J(e, {
		method: "POST",
		body: JSON.stringify(t)
	}),
	update: async (e, t) => J(e, {
		method: "PUT",
		body: JSON.stringify(t)
	}),
	delete: async (e, t) => J(`${e}/${t}`, { method: "DELETE" })
};
function pe(e, t = {}) {
	e.endPoints = t, e.services = {};
	try {
		Object.keys(Y).forEach((n) => {
			t[n] && (e.services[n] = (...e) => Y[n](t[n], ...e));
		});
	} catch (e) {
		console.log("eeeeeeeee : ", e);
	}
}
//#endregion
//#region buildTable/utils/dataFuncs/setupDataStore.js
var me = ({ instance: e, localColumns: t, localData: n, localEndPoints: r }) => {
	e.dataStore.columns = fe({
		inColumns: t,
		inShowSerialNo: e.tableOptions?.inCommonOptions?.inShowSerialNo
	}), e.dataStore.originalData = n, r ? pe(e, r) : e.dataStore.data = q({
		inData: n,
		inShowSerialNo: e.tableOptions?.inCommonOptions?.inShowSerialNo
	});
};
//#endregion
//#region webComponents/v4/cellRenderers/renderArrayView.js
function he(e, t) {
	let n = document.createElement("button");
	n.textContent = `View (${t.length})`, n.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;", n.onmouseover = () => n.style.backgroundColor = "#e5e7eb", n.onmouseout = () => n.style.backgroundColor = "#f3f4f6", e.appendChild(n);
}
//#endregion
//#region webComponents/v4/cellRenderers/renderDefault.js
function ge(e, t) {
	typeof t == "object" && t && (t = JSON.stringify(t)), t ??= "", e.textContent = t;
}
//#endregion
//#region webComponents/v4/cellRenderers/renderInputControl/v5/1-createInputElement/typeLayer.js
var _e = [
	"text",
	"password",
	"email",
	"number",
	"tel",
	"url",
	"search",
	"date",
	"time",
	"datetime-local",
	"month",
	"week",
	"color",
	"range",
	"checkbox",
	"radio",
	"file",
	"hidden",
	"submit",
	"reset",
	"button",
	"image"
], ve = (e, t) => {
	let n = (t.controlType || "text").toLowerCase();
	e.type = _e.includes(n) ? n : "text";
}, ye = (e, t) => {
	t.placeholder && (e.placeholder = t.placeholder), t.value !== void 0 && (e.value = t.value), t.name && (e.name = t.name), t.id && (e.id = t.id);
}, be = (e, t) => {
	t.min !== void 0 && (e.min = t.min), t.max !== void 0 && (e.max = t.max), t.step !== void 0 && (e.step = t.step), t.maxLength !== void 0 && (e.maxLength = t.maxLength), t.pattern && (e.pattern = t.pattern);
}, xe = (e, t) => {
	t.required && (e.required = !0), t.disabled && (e.disabled = !0), t.readOnly && (e.readOnly = !0), t.checked && (e.checked = !0), t.multiple && (e.multiple = !0);
}, Se = (e) => {
	let t = document.createElement("input");
	return ve(t, e), ye(t, e), be(t, e), xe(t, e), t;
}, X = {
	default: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
	minimal: "width: 100%; max-width: 12rem; box-sizing: border-box; border: none; border-bottom: 2px solid #d1d5db; border-radius: 0; padding: 0.375rem 0.5rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: transparent;",
	pill: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 9999px; padding: 0.375rem 1rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
	danger: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #ef4444; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #b91c1c; background-color: #fef2f2; box-shadow: 0 1px 2px 0 rgba(239, 68, 68, 0.1);"
}, Z = (e, t) => {
	console.log("applyDefaultStyles", e, t);
	let n = t.theme && X[t.theme] ? t.theme : "default";
	e.style.cssText = X[n], t.className && (e.className = t.className);
}, Ce = (e) => {
	e.addEventListener("focus", () => {
		e.style.borderColor = "#3b82f6", e.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.3)";
	}), e.addEventListener("blur", () => {
		e.style.borderColor = "#d1d5db", e.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
	});
}, we = (e, t = null) => {
	console.log("startFunc", e, t);
	let n = t || {
		controlType: "text",
		placeholder: "Enter value..."
	}, r = Se(n);
	Z(r, n), Ce(r), e.appendChild(r);
}, Te = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let e = this._inputs.cellValue;
		this._inputs.rowData;
		let t = this._inputs.options || {};
		if (this.shadowRoot.innerHTML = "", t.table?.tbody?.td, t?.showInput) {
			we(this.shadowRoot, t);
			return;
		}
		if (Array.isArray(e)) {
			he(this.shadowRoot, e);
			return;
		}
		ge(this.shadowRoot, e);
	}
};
customElements.get("ks-table-cell-content-common") || customElements.define("ks-table-cell-content-common", Te);
//#endregion
//#region tableBuilder.js
var Q = class {
	constructor({ htmlId: e, data: t, columns: n = [], classes: r = {}, theme: i = "style1", tableOptions: a = {}, topHeader: o = B.topHeader, endPoints: s }) {
		let c = e, l = t, u = n, d = r, f = s;
		console.log("localData", l), console.log("tableOptions-----------", a);
		let p = K(a);
		console.log("localTableOptionsMapped", p), this.tableOptions = p, this.topHeader = ce({ inTopHeader: o }), this.htmlId = c, this.dataStore = {}, me({
			instance: this,
			localColumns: u,
			localData: l,
			localEndPoints: f
		}), this.classes = le({
			inClasses: d,
			inTheme: i
		}), this.sortState = [], this.tableElement = null;
	}
	handleSort(e, t = !1) {
		V(this, e, t);
	}
	handleSearch(e) {
		U(this, e);
	}
	async appendToDom() {
		this.dataStore.data.length === 0 && (this.dataStore.originalData = await this.services.read(), this.dataStore.data = q({
			inData: this.dataStore.originalData,
			inShowSerialNo: this.tableOptions?.inCommonOptions?.inShowSerialNo
		})), ue(this);
	}
	buildTableElements() {
		return L({
			inData: this.dataStore.data,
			inColumns: this.dataStore.columns,
			inClasses: this.classes,
			inTableOptions: this.tableOptions,
			inSortState: this.sortState,
			inOnSort: this.handleSort.bind(this)
		});
	}
	buildTopHeaderElement() {
		return !this.topHeader || this.topHeader.inShow === !1 ? null : W({
			inLabel: this.topHeader.inLabel,
			inPlaceholder: this.topHeader.inPlaceholder,
			inClasses: this.classes.topHeader,
			inOnSearch: this.handleSearch.bind(this)
		});
	}
	build() {
		return this.appendToDom();
	}
}, $ = {
	inTableOptions: K(B.tableOptions),
	inTopHeader: {
		inShow: B.topHeader.show,
		inLabel: B.topHeader.label,
		inPlaceholder: B.topHeader.placeholder
	}
};
window.ks = window.ks || {}, window.ks.TableBuilder = Q, window.ks.TableBuilder.DEFAULT_CLASSES = z, window.ks.TableBuilder.DEFAULT_CONFIG = B, window.ks.TableBuilder.DEFAULT_INTERNAL_OBJECT = $, window.ks.TableBuilder.version = "v9.0";
//#endregion
export { z as DEFAULT_CLASSES, B as DEFAULT_CONFIG, $ as DEFAULT_INTERNAL_OBJECT, Q as TableBuilder };
