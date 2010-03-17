if (typeof Global === "undefined") {
	Global = {}
}
Ext.apply(Global, {
	CLIENT: {
		id: "",
		fullName: "",
		title: ""
	},
	setClient: function (obj) {
		this.CLIENT = obj
	},
	SUPPLIER: {
		id: "",
		title: "",
		fullName: ""
	},
	setSupplier: function (obj) {
		this.SUPPLIER = obj
	}
});
if (!Global.depotLoader) {
	Ext.apply(Global, {
		depotLoader: new EasyJF.Ext.MemoryTreeLoader({
			varName: "Global.DEPOT_NODES",
			lazyLoad: true,
			leafOnly: true,
			transferNode: {
				text: 'title'
			},
			url: "depot.ejf?cmd=getDepotTree&pageSize=-1&treeData=true&all=true",
			listeners: {
				'beforeload': function (treeLoader, node) {
					var id = (node.id.indexOf('root') < 0 && !isNaN(parseInt(node.id, 10))) ? node.id: "";
					treeLoader.baseParams.id = id;
					if (typeof node.attributes.checked !== "undefined") {
						treeLoader.baseParams.checked = false
					}
				}
			}
		})
	})
}
if (!Global.departmentLoader) {
	Global.departmentLoader = new EasyJF.Ext.MemoryTreeLoader({
		varName: "Global.DEPT_NODES",
		lazyLoad: true,
		leafOnly: true,
		url: "department.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
		listeners: {
			'beforeload': function (treeLoader, node) {
				treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id: "");
				if (typeof node.attributes.checked !== "undefined") {
					treeLoader.baseParams.checked = false
				}
			}
		}
	})
}

ConfigConst = {
    buttons : {
        add : {
            id:"tb_add",
            text : "新增",            
            cls : "x-btn-text-icon",
            icon : "images/icons/page_add.png"
        },
        edit:{id:"tb_edit",
            text : "修改",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_edit.png"
        },
        search:{id:"tb_search",
            text : "查询",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_find.png"
        },
        copy : {
            id:"tb_copy",
            text : "复制",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_copy.png"
        },
        remove : {
            id:"tb_remove",
            text : "删除",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_delete.png"
        },
        audit : {
            id:"tb_audit",
            text : "审核",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_code.png"
        },
        addChild : {
            id:"tb_addChild",
            text : "添加子项",
            cls : "x-btn-text-icon",
            icon : "images/icons/application_form_add.png"
        },
        removeChild : {
            id:"tb_removeChild",
            text : "删除子项",
            cls : "x-btn-text-icon",
            icon : "images/icons/application_form_delete.png"
        },
        red : {
            id:"tb_red",
            text : "红字",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_red.png",
            toggleGroup:"btn_red_or_blue",
            handler:function(){
            this.red=true
            if(this.changeRedBlue)this.changeRedBlue();
            },
            enableToggle:true
        },
        blue : {
            id:"tb_blue",
            text : "蓝字",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_green.png",
            toggleGroup:"btn_red_or_blue",
            handler:function(){
            this.red=false;
            if(this.changeRedBlue)this.changeRedBlue();
            },
            enableToggle:true,
            pressed:true
        },
        preview : {
            id:"tb_preview",
            text : "预览",
            cls : "x-btn-text-icon",
            icon : "images/icons/magnifier.png"
        },
        print : {
            id:"tb_print",
            text : "打印",
            cls : "x-btn-text-icon",
            icon : "images/icons/printer.png"
        },
        excel : {
            id:"tb_excel",
            text : "导出",
            cls : "x-btn-text-icon",
            icon : "images/icons/page_excel.png"
        },
        bnt_import: {
            id:"tb_excel",
            text : "导出",
            cls : "x-btn-text-icon",
            iconCls : "import-icon"
        },
        barCode:{
            id:'barCodeImport',
            text:'PLU',
            cls : "x-btn-text-icon",
            icon:'images/icons/application_barcode.png'
        }
    },
    abstractStore : {
        id : "id",
        root : "result",
        totalProperty : "rowCount",
        remoteSort : true,
        fields : ["id", "name"]
    }
};

ConfigConst.BASE = {
	yesNo: Ext.apply({},
	{
		disableChoice: true
	},
	EasyJF.Ext.Util.buildCombox("type", "是否", [["是", true], ["否", false]], false, true)),
	sex: Ext.apply({},
	{
		disableChoice: true
	},
	EasyJF.Ext.Util.buildCombox("sex", "性别", [["男", "男"], ["女", "女"]], null, true)),
	status: Ext.apply({},
	{
		disableChoice: true
	},
	EasyJF.Ext.Util.buildCombox("status", "状态", [["启用", 0], ["停用", -1]], 0, true)),
	systemRegion: {
		xtype: "treecombo",
		fieldLabel: "所在地区",
		name: "region",
		hiddenName: "region",
		leafOnly: true,
		displayField: "title",
		valueField: "id",
		tree: new Ext.tree.TreePanel({
			autoScroll: true,
			root: new Ext.tree.AsyncTreeNode({
				id: "root",
				text: "所有区域",
				icon: "images/system/root.gif",
				expanded: true,
				loader: new Ext.tree.TreeLoader({
					url: "systemRegion.ejf?cmd=getSystemRegion&pageSize=-1&treeData=true",
					listeners: {
						'beforeload': function (treeLoader, node) {
							treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id: "")
						}
					}
				})
			})
		})
	},
	dept: {
		xtype: "treecombo",
		fieldLabel: "部门",
		name: "dept",
		hiddenName: "dept",
		displayField: "title",
		leafOnly: false,
		valueField: "id",
		editable: false,
		tree: new Ext.tree.TreePanel({
			autoScroll: true,
			root: new Ext.tree.AsyncTreeNode({
				id: "root",
				text: "所有部门",
				icon: "images/system/root.gif",
				expanded: true,
				loader: new EasyJF.Ext.MemoryTreeLoader({
					varName: "Global.DEPARTMENT_NODES",
					lazyLoad: true,
					url: "department.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
					listeners: {
						'beforeload': function (treeLoader, node) {
							var id = (node.id.indexOf('root') < 0 && !isNaN(parseInt(node.id, 10))) ? node.id: "";
							treeLoader.baseParams.id = id;
							if (typeof node.attributes.checked !== "undefined") {
								treeLoader.baseParams.checked = false
							}
						}
					}
				})
			})
		})
	},
	companyDictionary: EasyJF.Ext.Util.buildRemoteCombox("item", "数据字典", "companyDictionary.ejf?cmd=getDictionaryItemBySn", ["id", "title", "tvalue"], "title", "id", true),
	getCompanyDictionaryCombo: function (name, fieldLabel, sn, valueField, disableBlank, editable) {
		return {
			xtype: "smartcombo",
			name: name,
			hiddenName: name,
			displayField: "title",
			valueField: valueField ? valueField: "id",
			lazyRender: true,
			triggerAction: "all",
			typeAhead: true,
			editable: editable,
			allowBlank: !disableBlank,
			sn: sn,
			objectCreator: {
				appClass: "CompanyDictionaryItemPanel",
				script: "base/CompanyDictionaryManagePanel.js"
			},
			createWinReady: function (win) {
				if (this.fieldLabel) win.setTitle("新建" + this.fieldLabel);
				if (this.sn) win.findSomeThing("parentSn").setOriginalValue(this.sn)
			},
			store: new Ext.data.JsonStore({
				id: "id",
				url: "companyDictionary.ejf?cmd=getDictionaryItemBySn&sn=" + sn,
				root: "result",
				totalProperty: "rowCount",
				remoteSort: true,
				baseParams: {
					pageSize: "-1"
				},
				fields: ["id", "title", "tvalue"]
			}),
			fieldLabel: fieldLabel
		}
	}
};
ConfigConst.STOCK = {
	showBill: function (g, r, e) {
		var billId = g.store.getAt(r).get("billId");
		var types = g.store.getAt(r).get("types");
		if (billId) {
			var l = billId.indexOf("-");
			if (l > 0) billId = billId.substring(l + 1);
			var appClass = "";
			if (types.indexOf("-in") > 0) {
				var type = parseInt(types);
				switch (type) {
				case 0:
					appClass = "StockIncomePurchasePanel";
					break;
				case 1:
					appClass = "StockIncomeProducePanel";
					break;
				case 2:
					appClass = "StockIncomeProfitPanel";
					break;
				case 3:
					appClass = "StockIncomeOtherPanel";
					break;
				case 4:
					appClass = "StockIncomeInitPanel";
					break;
				default:
					appClass = "StockIncomeOtherPanel"
				}
			} else {
				var type = parseInt(types);
				switch (type) {
				case 0:
					appClass = "StockOutcomeOrdersPanel";
					break;
				case 1:
					appClass = "StockOutcomeProducePanel";
					break;
				case 2:
					appClass = "StockOutcomeLossPanel";
					break;
				case 3:
					appClass = "StockOutcomeOtherPanel";
					break;
				case 4:
					appClass = "StockOutcomeLossPanel";
					break;
				default:
					appClass = "StockOutcomeOtherPanel"
				}
			}
			EasyJF.Ext.Util.viewObject(appClass, null, "stock/" + appClass + ".js", null, billId)
		}
	},
	depot: {
		xtype: "treecombo",
		fieldLabel: "仓库",
		name: "depot",
		hiddenName: "depot",
		displayField: "title",
		leafOnly: true,
		valueField: "id",
		width: 110,
		listeners: {
			"specialkey": function () {
				this.onTriggerClick()
			},
			scope: this
		},
		tree: new Ext.tree.TreePanel({
			autoScroll: true,
			root: new Ext.tree.AsyncTreeNode({
				text: "所有仓库",
				icon: "images/system/root.gif",
				expanded: true,
				loader: Global.depotLoader
			})
		})
	}
}

ConfigConst.CRM = {
    shoppingGuide:Ext.apply({},{xtype : "guideCombo",editable:true,anchor:"-0"},EasyJF.Ext.Util.buildRemoteCombox("employee","员工","employee.ejf?cmd=getShoppingGuide",  ["id", "name", "trueName","duty","tel","dept","sex","email"],"trueName","id",true)),
    user : Ext.apply({},{xtype : "employeecombo",disableChoice:true,editable:true,anchor:"-0"},EasyJF.Ext.Util.buildRemoteCombox("user","员工","employee.ejf?cmd=getDepartmentUserBySn&deptSn",   ["id", "name", "trueName","duty","tel","dept","sex","email"],"trueName","id",true,"cache_user_store")),
    seller : Ext.apply({},{xtype : "employeecombo",editable:true,anchor:"-0"},EasyJF.Ext.Util.buildRemoteCombox("seller","业务员","employee.ejf?cmd=getDepartmentUserBySn&deptSn", ["id", "name", "trueName","duty","tel","dept","sex","email"],"trueName","id",true,'cache_user_store')),
    client : Ext.apply({},{xtype : "clientcombo",disableChoice:true,editable:true,typeAhead : false,width : 160,listWidth : 250,pageSize : 10,enableKeyEvents : true,minChars : 2,queryParam : "searchKey"},EasyJF.Ext.Util.buildRemoteCombox("client","客户","client.ejf?cmd=autocompleteList",  ["id", "fullName", "name", "tel", "address","fax", "linkMan"],"fullName","id",true)),
    supplier : Ext.apply({}, {xtype : "suppliercombo",disableChoice:true,editable : true,baseUrl : "supplier.ejf",width : 160,listWidth : 250,pageSize : 10,enableKeyEvents : true,minChars : 2,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("supplier", "供货商","supplier.ejf?cmd=autocompleteList", ["id", "fullName", "name","tel", "address", "fax", "linkMan"], "name", "id", true)),
    distributor : Ext.apply({},{xtype : "clientcombo",disableChoice:true,editable:true,baseUrl:"distributor.ejf",width : 250,listWidth : 250,pageSize : 15,enableKeyEvents : true,minChars : 20,queryParam : "searchKey"},EasyJF.Ext.Util.buildRemoteCombox("distributor","分销商","distributor.ejf?cmd=autocompleteList&pageSize=15", ["id", "fullName", "name", "tel", "address","fax", "linkMan","accountBalance","qualityAssure","other1","company"],"name","id",true)),
    orders : Ext.apply({},{editable:true,enableKeyEvents : true,minChars : 2,pageSize : 10,queryParam : "searchKey"},EasyJF.Ext.Util.buildRemoteCombox("orders","销售订单","orders.ejf?cmd=autocompleteList",["id", "orderInfo", "sn", "buyTime", "clientId","clientName"],"orderInfo","id",true)),
    contract : Ext.apply({},{editable:true,enableKeyEvents : true,minChars : 2,pageSize : 10,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("contract","合同","clientContract.ejf?cmd=autocompleteList",["id", "title", "clientId", "clientName", "detail"],"title","id",true)),
    linkMan : Ext.apply({},{editable:true,minChars : 2, pageSize : 10,listWidth : 200,enableKeyEvents : true,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("linkMan","联系人","linkMan.ejf?cmd=autocompleteList",   ["id", "tel", "trueName", "appellation", "detail","clientId", "clientName"],"detail","id",true)),
    opporunity : Ext.apply({},{editable:true,minChars : 2,  pageSize : 10,enableKeyEvents : true,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("opporunity","销售机会","businessOpporunity.ejf?cmd=autocompleteList",["id", "title", "beginTime", "userId", "userName","clientId", "clientName"],"title","id",true)),
    event : Ext.apply({},{editable:true,minChars : 2,   pageSize : 10,enableKeyEvents : true,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("event","销售机会","clientEvent.ejf?cmd=autocompleteList",    ["id", "title", "beginTime", "userId", "userName","clientId", "clientName"],"title","id",true)),
    qa : Ext.apply({},{editable:true,minChars : 2,  pageSize : 10,enableKeyEvents : true,queryParam : "searchKey"}, EasyJF.Ext.Util.buildRemoteCombox("qa","对应QA","clientQA.ejf?cmd=autocompleteList",["id", "question"],"question","id",true)),
    ordersQuote : Ext.apply({},{pageSize : 10}, EasyJF.Ext.Util.buildRemoteCombox("ordersQuote","业务员","ordersQuote.ejf?cmd=autocompleteList",   ["id", "quoteInfo", "sn", "vdate", "clientId","clientName"],"quoteInfo","id",true)),
    trade : EasyJF.Ext.Util.buildRemoteCombox("trade", '行业',"trade.ejf?cmd=list", ["id", "title", "sn"],"title","id",true),
    brand:Ext.apply({},{disableChoice:true},EasyJF.Ext.Util.buildRemoteCombox("brand", '品牌',    "brand.ejf?cmd=list", ["id", "name"],"name")),
    deliveryType : EasyJF.Ext.Util.buildRemoteCombox("deliveryType","送货方式","deliveryType.ejf?cmd=list&pageSize=-1",["id","name","price","freePrice"],"name","id",true),     
    payType : EasyJF.Ext.Util.buildRemoteCombox("payType","支付方式","paymentType.ejf?cmd=list&pageSize=-1",["id","name","discount","intro"],"name","id",true),
    product : Ext.apply({},{xtype:"productcombo",disableChoice:true,editable : true,anchor:"-0",pageSize:15,enableKeyEvents : true,minChars : 2,queryParam : "searchKey",listWidth:150,queryDelay:1000},EasyJF.Ext.Util.buildRemoteCombox("product","业务员","product.ejf?cmd=autocompleteList",   ["id","fullName","attributeType","title","sn","keyword","simiProducts","brand","unit","spec","model","types","buyPrice","dir",{name:"dirId",mapping:"dir"},"reCost","salePrice","ratePrice","marketPrice","tradePrice","bottomPrice","stockWarnNum","leastOrderNum","encapNum","size","updateTime","provideType","virtualStock","storeNum","intro","content","pj","star","auditing","inputTime","readTimes","status","vdate","propertys","color","colorSn","stockMinNum","stockMaxNum","encapUnit","encapSn","encaped","buyPeriod","colors","sizes","sizeGroup","stockNO"], "fullName","id",true))
}

ConfigConst.ACCOUNT={
    showCert:function(g,r,e){
            var certId=g.store.getAt(r).get("certId");
            if(certId){
            EasyJF.Ext.Util.viewObject("TransferCertificatePanel",null,"account/CertificatePanel.js",null,certId);
            }
    },
    accountEntryBrief : Ext.apply({},{xtype : "combo",width : 160,listWidth : 250,minChars : 2,pageSize : 20,queryParam : "searchKey"},EasyJF.Ext.Util.buildRemoteCombox("brief","摘要","accountEntryBrief.ejf?cmd=list&pageSize=20",["id", "title"])),
    accountChart:Ext.apply({},{xtype:"accountchartcombo",returnObject:true,typeAhead: false,enableKeyEvents:true,width:160, listWidth:250,minChars:2,pageSize:20,queryParam:"searchKey",value:""},
                    EasyJF.Ext.Util.buildRemoteCombox("accountChart","会计科目","accountChart.ejf?cmd=autocompleteList",
                    ["id","title","sn","fullName"],"fullName","id",true))
}
BaseSelectGridList = Ext.extend(BaseGridList, {
	border: false,
	gridForceFit: true,
	selectSingle: false,
	refresh: function () {
		this.store.removeAll();
		this.store.reload()
	},
	createColumnModel: function () {
		return []
	},
	storeMapping: ["id", "title"],
	initComponent: function () {
		var gridConfig = {
			border: false
		},
		chkM = null;
		if (this.selectSingle) {
			gridConfig.sm = new Ext.grid.RowSelectionModel({
				singleSelect: true
			})
		} else {
			chkM = new Ext.grid.CheckboxSelectionModel();
			gridConfig.sm = chkM
		}
		this.gridConfig = Ext.apply({},
		gridConfig);
		var cms = [chkM ? chkM: new Ext.grid.RowNumberer({
			header: "序号",
			width: 35
		})].concat(this.createColumnModel());
		this.cm = new Ext.grid.ColumnModel(cms);
		BaseSelectGridList.superclass.initComponent.call(this);
		this.store.on("load", function (s, rs) {
			if (rs && rs.length > 0) {
				this.grid.getSelectionModel().clearSelections();
				this.grid.getView().focusRow(0)
			}
		},
		this)
	}
});
BaseSelectWin = Ext.extend(Ext.Window, {
	title: "选择数据",
	width: 800,
	height: 500,
	layout: "fit",
	buttonAlign: "center",
	closeAction: "hide",
	modal: true,
	selectSingle: false,
	callback: Ext.emptyFn,
	maximizable: true,
	listeners: {
		maximize: function (win) {
			win.doLayout()
		},
		restore: function (win) {
			win.doLayout()
		}
	},
	choice: function (e) {
		var records = this.list.grid.getSelectionModel().getSelections();
		if (!records || records.length < 1) {
			Ext.Msg.alert("提示", "请选择数据");
			return false
		}
		var datas = [];
		for (var i = 0; i < records.length; i++) {
			datas[i] = records[i].data
		}
		this.hide();
		this.fireEvent('select', datas, this)
	},
	createListGrid: function (params) {
		return new BaseSelectGridList(params || {})
	},
	initComponent: function () {
		this.keys = [{
			key: Ext.EventObject.ENTER,
			fn: this.choice,
			stopEvent: true,
			scope: this
		},
		{
			key: Ext.EventObject.ESC,
			fn: function () {
				this.hide()
			},
			scope: this
		}];
		this.buttons = [{
			text: "确定",
			handler: this.choice,
			scope: this
		},
		{
			text: "清空"
		},
		{
			text: "取消",
			handler: function () {
				this.hide()
			},
			scope: this
		}];
		BaseSelectWin.superclass.initComponent.call(this);
		var params = {
			selectSingle: this.selectSingle,
			region: "center"
		};
		this.list = this.createListGrid(params);
		this.on("show", function () {
			this.list.refresh()
		},
		this);
		this.list.grid.on("rowdblclick", this.choice, this);
		this.add(this.list);
		this.addEvents("select")
	}
});

/**
 * 通用的选择数据对象下拉组件
 * @class BaseSelectComboBox
 * @extends EasyJF.Ext.SmartCombox
 */
BaseSelectComboBox = Ext.extend(EasyJF.Ext.SmartCombox, {
    choiceValue : Ext.emptyFn(),
    createSelectWin:function(params){
        return new BaseSelectWin(params);
    },
    choiceProvider : function() {
        if (!this.lookupWin) {
            var params = {
                closeAction : "hide",
                selectSingle : true
            };
            this.lookupWin = this.createSelectWin(params);
            this.lookupWin.on("select", function(data) {
                var text = data[0][this.displayField || "title"];
                var obj = {
                    id : data[0].id,
                    title:text
                };
                if(this.displayField)obj[this.displayField] = text;
                this.setValue(obj);
                if (this.choiceValue)
                    this.choiceValue(data[0]);
            }, this);
        }
        this.lookupWin.show();
    },
    selectProvider : function(c, r, o) {
        if (this.choiceValue)
            this.choiceValue(r.data);
    },
     onDestroy : function(){
        if(this.lookupWin){
            this.lookupWin.close();
            delete this.lookupWin;
        }
        BaseSelectComboBox.superclass.onDestroy.call(this);
    },
    onRender : function(ct, position) {
        BaseSelectComboBox.superclass.onRender.call(this, ct, position);
        var label = this.el.findParent('.x-form-element', 5, true)
                || this.el.findParent('.x-form-field-wrap', 5, true);
        this.helpIcon = label.createChild({
            cls:"object-select-icon",
            style : "width:16px;height:18px; position:absolute; left:0; top:0; display:block; background:transparent no-repeat scroll 0 2px;"
        });
        this.helpIcon.on("click", this.choiceProvider, this);
        this.alignHelpIcon = function() {
            var el = this.wrap ? this.wrap : this.el;
            this.el.setWidth(this.el.getWidth() - 20);
            this.helpIcon.alignTo(this.el, 'tl-tr', [20, 0]);
        }
        this.on("resize", this.alignHelpIcon, this);
        this.on("select", this.selectProvider, this);
    }
});

AccoutChartGridList = Ext.extend(BaseSelectGridList, {
	pageSize: 15,
	url: "accountChart.ejf?cmd=list&pageSize=15",
	types: [["资产", 1], ["负债", 2], ["所有者权益", 3], ["成本", 4], ["损益", 5]],
	refresh: function () {
		this.store.baseParams = {
			searchKey: this.btn_sn.getValue(),
			title: this.btn_title.getValue()
		};
		this.store.removeAll();
		this.store.reload()
	},
	reset: function () {
		this.btn_sn.reset();
		this.btn_title.reset();
		this.refresh()
	},
	balanceTypeRender: function (v) {
		if (v == "debit") return "借方";
		else if (v == "credit") return "贷方"
	},
	createColumnModel: function () {
		return [{
			header: "名称",
			sortable: true,
			width: 150,
			dataIndex: "title"
		},
		{
			header: "编号",
			sortable: true,
			width: 60,
			dataIndex: "sn"
		},
		{
			header: "类别",
			sortable: true,
			width: 60,
			dataIndex: "types",
			renderer: this.typesRender(this.types)
		},
		{
			header: "余额方向",
			sortable: true,
			width: 60,
			dataIndex: "balanceType",
			renderer: this.balanceTypeRender
		},
		{
			header: "级别",
			sortable: true,
			width: 50,
			dataIndex: "lev"
		},
		{
			header: "父科目",
			sortable: true,
			width: 120,
			dataIndex: "parent",
			renderer: this.objectRender("title")
		},
		{
			header: "创建时间",
			sortable: true,
			width: 100,
			dataIndex: "createTime",
			renderer: this.dateRender("Y-m-d"),
			hidden: true
		},
		{
			header: "排序",
			sortable: true,
			width: 50,
			dataIndex: "sequence"
		}]
	},
	storeMapping: ["id", "sn", "lev", "title", "dirPath", "createTime", "types", "parent", "sequence", "intro", "balanceType", "status"],
	initComponent: function () {
		this.btn_sn = new Ext.form.TextField({
			xtype: "textfield",
			width: 100,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_title = new Ext.form.TextField({
			xtype: "textfield",
			width: 80,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.tbar = ["编号:", this.btn_sn, "名称:", this.btn_title, {
			text: "查询",
			handler: this.refresh,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icon-png/search.png"
		},
		{
			text: "重置",
			handler: this.reset,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icons/arrow_undo.png"
		}];
		AccoutChartGridList.superclass.initComponent.call(this)
	}
})

AccountChartSelectWin = Ext.extend(BaseSelectWin, {
	title: "选择会计科目",
	createListGrid: function (params) {
		return new AccoutChartGridList(Ext.apply({},
		{
			region: "center"
		},
		params || {}))
	},
	initComponent: function () {
		AccountChartSelectWin.superclass.initComponent.call(this);
		if (!Global.accountChartLoader) {
			Global.accountChartLoader = new Ext.tree.TreeLoader({
				url: "accountChart.ejf?cmd=getAccountChartTree&pageSize=-1&treeData=true",
				listeners: {
					'beforeload': function (treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id: "");
						if (typeof node.attributes.checked !== "undefined") {
							treeLoader.baseParams.checked = false
						}
						if (node.attributes.isTypes) treeLoader.baseParams.isTypes = true;
						else treeLoader.baseParams.isTypes = ""
					}
				}
			})
		}
		this.tree = new Ext.tree.TreePanel({
			region: "west",
			floating: false,
			autoScroll: true,
			split: true,
			collapsible: true,
			width: 200,
			tools: [{
				id: "refresh",
				handler: function () {
					this.tree.root.reload()
				},
				scope: this
			}],
			root: new Ext.tree.AsyncTreeNode({
				id: "root",
				text: "所有分类",
				icon: "images/system/root.gif",
				expanded: true,
				loader: Global.accountChartLoader
			})
		});
		this.list.tree = this.tree;
		this.tree.on("click", function (node, eventObject) {
			var id = (node.id != 'root' ? node.id: "");
			if (id && !node.attributes.isTypes) {
				this.list.parentId = {
					id: id,
					title: node.text
				}
			} else this.list.parentId = null;
			if (node.attributes.isTypes) this.list.theTypes = node.id;
			this.list.store.baseParams.parentId = node.attributes.isTypes ? "": id;
			this.list.store.baseParams.types = node.attributes.isTypes ? id: "";
			this.list.store.removeAll();
			this.list.store.load()
		},
		this);
		this.add(this.tree)
	}
});


AccoutChartComboBox = Ext.extend(BaseSelectComboBox, {
    createSelectWin:function(params){
        return new AccountChartSelectWin(params);
    },
    autoSelectBySn : function(c, e) {
        if (e.getKey() == Ext.EventObject.ENTER) {
            var t = c.el.dom.value;
            var r = this.store.find("title", t);
            if (r >= 0)
                this.selectProvider(this, this.store.getAt(r), r);
            else {// 根据编码查询数据
                if (t.indexOf('[') == -1) {
                    Ext.Ajax.request({
                                url : "accountChart.ejf?cmd=loadBySn",
                                params : {
                                    sn : t
                                },
                                success : function(response) {
                                    var obj = Ext.decode(response.responseText);
                                    if (obj) {
                                        this.selectProvider(this, {
                                                    data : obj
                                                }, -1);
                                    } else {
                                        Ext.Msg.alert("提示", "科目编号不正确,请重新输入!",
                                                function() {
                                                    this.focus(true, 100);
                                                }, this);
                                    }
                                },
                                scope : this
                            });
                }

            }
        }
    },
    onRender : function(ct, position) {
        AccoutChartComboBox.superclass.onRender.call(this, ct, position);
        this.on("keypress", this.autoSelectBySn, this);
    }
})
Ext.reg('accountchartcombo', AccoutChartComboBox);

ProductGridList = Ext.extend(BaseSelectGridList, {
	gridForceFit: false,
	url: "product.ejf?cmd=loadBySn",
	refresh: function () {
		this.store.baseParams = {
			searchKey: this.btn_sn.getValue(),
			title: this.btn_title.getValue(),
			model: this.btn_model.getValue(),
			dirId: this.currentDir ? this.currentDir.id: ""
		};
		this.store.removeAll();
		this.store.reload()
	},
	reset: function () {
		this.btn_sn.reset();
		this.btn_title.reset();
		this.refresh()
	},
	createProduct: function () {
		EasyJF.Ext.Util.addObject("ProductManagePanel", this.refresh.createDelegate(this), "/stock/ProductManagePanel.js", "fckeditor/fckeditor.js", function (win) {
			if (this.currentDir) win.getComponent(0).findSomeThing("dirId").setOriginalValue(this.currentDir)
		}.createDelegate(this))
	},
	createColumnModel: function () {
		return [{
			header: "名称",
			sortable: true,
			width: 150,
			dataIndex: "title"
		},
		{
			header: "编号",
			sortable: true,
			width: 80,
			dataIndex: "sn"
		},
		{
			header: "品牌",
			sortable: true,
			width: 60,
			dataIndex: "brand",
			renderer: this.objectRender("name")
		},
		{
			header: "色号",
			sortable: true,
			width: 60,
			dataIndex: "colorSn"
		},
		{
			header: "类型",
			sortable: true,
			width: 60,
			dataIndex: "dir",
			renderer: EasyJF.Ext.Util.objectRender("title")
		},
		{
			header: "单位",
			sortable: true,
			width: 60,
			dataIndex: "unit",
			renderer: this.objectRender("title")
		},
		{
			header: "销售价格",
			sortable: true,
			width: 60,
			dataIndex: "salePrice"
		},
		{
			header: "尺寸规格",
			sortable: true,
			width: 60,
			dataIndex: "spec"
		},
		{
			header: "材质/型号",
			sortable: true,
			width: 80,
			dataIndex: "model"
		},
		{
			header: "备注",
			sortable: true,
			width: 100,
			dataIndex: "remark"
		}]
	},
	storeMapping: ["id", "sn", "title", "costPrice", "salePrice", "marketPrice", "spec", "model", "unit", "remark", "producer", "flows", "brand", "dir", "colorSn", "stockNO", "tradePrice"],
	initComponent: function () {
		this.btn_brand = new EasyJF.Ext.SmartCombox(Ext.apply({},
		{
			width: 100,
			listeners: {
				"select": this.refresh,
				scope: this
			}
		},
		ConfigConst.CRM.brand));
		this.btn_sn = new Ext.form.TextField({
			xtype: "textfield",
			width: 80
		});
		this.btn_title = new Ext.form.TextField({
			xtype: "textfield",
			width: 100,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_model = new Ext.form.TextField({
			xtype: "textfield",
			width: 80,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.tbar = ["关键字", this.btn_sn, "型号:", this.btn_model, "名称:", this.btn_title, {
			text: "查询",
			handler: this.refresh,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icon-png/search.png"
		},
		{
			text: "重置",
			handler: this.reset,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icons/arrow_undo.png"
		},
		Ext.apply({},
		{
			text: "新建商品",
			handler: this.createProduct,
			scope: this
		},
		ConfigConst.buttons.addChild)];
		ProductGridList.superclass.initComponent.call(this);
		this.store.on("beforeload", function (store, ops) {
			store.baseParams = store.baseParams || {};
			store.baseParams.client = Global.CLIENT.id
		},
		this)
	}
});

ProductSelectWin = Ext.extend(BaseSelectWin, {
            title : "选择产品",
            layout : "border",
            autoLoad:true,
             createListGrid:function(params){
                return new  ProductGridList(Ext.apply({},{region : "center"},params||{}));
            }/*,
            initComponent : function() {
                var aditionalkeys={
                    key:Ext.EventObject.NUM_PLUS,
                    fn:function(){
                        if(this.baseQueryParams){
                            this.list.el.mask("正在加载...","x-mask-loading");
                            this.baseQueryParams.all=true;
                            Ext.Ajax.request({
                                url : "product.ejf?cmd=loadBySn",
                                scope:this,
                                params:this.baseQueryParams,
                                success:function(req){
                                    var ret=Ext.decode(req.responseText);
                                    if(ret&& ret.length){
                                        this.list.grid.store.loadData({result:ret,rowCount:ret.length});
                                        this.baseQueryParams=null;
                                        this.list.el.unmask();
                                    }
                                }
                            });
                        }
                    },
                    scope:this
                }
            }*/
        });

ProductComboBox = Ext.extend(BaseSelectComboBox, {
    createSelectWin:function(params){
        return new ProductSelectWin(params);
    }, 
    choiceProvider : function(data) {
        ProductComboBox.superclass.choiceProvider(this,data);
        if(this.getValue() && this.getValue().text)
        this.lookupWin.keyword = this.getValue().text; 
        if(data && data.length){
            this.lookupWin.list.store.loadData({result:data,rowCount:data.length});
        }
    },
    autoSelectBySn:function(c,e){
        if (e.getKey() == Ext.EventObject.ENTER) {
            var t=c.el.dom.value;
            //var r=this.store.find("title",t);
            //if(r>=0)this.selectProvider(this,this.store.getAt(r),r);
            //else {//根据编码查询数据
            var params={sn : t};
                    //使用baseQueryParamster来控制产品过滤列表æ¯å¦ä¾åºåè¿æ»¤ç­
            if(this.baseQueryParameter)Ext.applyIf(params,this.baseQueryParameter);
            if(this.store.baseParams)
                Ext.apply(this.store.baseParams,params);
            Ext.Ajax.request({
                url : "product.ejf?cmd=loadBySn",
                params : this.store.baseParams,
                success : function(response) {
                    var obj=Ext.decode(response.responseText);
                    if(obj){
                        //this.selectProvider(this,{data:obj},-1);
                    }else {
                        this.choiceProvider();
                    }
                },
                scope : this
            });
            //}
        }
    },
    onRender : function(ct, position) {
        ProductComboBox.superclass.onRender.call(this, ct, position);
        this.on("keypress", this.autoSelectBySn, this); 
        this.store.on("beforeload",function(store,ops){
            store.baseParams=store.baseParams||{};
            store.baseParams.client=Global.CLIENT.id;
            });
    }
})
Ext.reg('productcombo', ProductComboBox);       

ClientGridList = Ext.extend(BaseGridList, {
	border: false,
	gridForceFit: false,
	selectSingle: false,
	columnLock: true,
	pageSize: 18,
	url: "client.ejf?cmd=list&pageSize=18",
	refresh: function () {
		this.store.baseParams = {
			types: this.btn_types.getValue(),
			searchKey: this.btn_title.getValue(),
			sn: this.btn_sn.getValue(),
			region: this.currentRegion ? this.currentRegion.id: ""
		};
		this.store.removeAll();
		this.store.reload()
	},
	reset: function () {
		this.btn_types.reset();
		this.btn_title.reset();
		this.btn_sn.reset();
		this.refresh()
	},
	createClient: function () {
		EasyJF.Ext.Util.addObject("ClientPanel", this.refresh.createDelegate(this), "/crm/ClientPanel.js", null, function (win) {
			if (this.currentRegion) win.getComponent(0).findSomeThing("region").setOriginalValue(this.currentRegion)
		}.createDelegate(this))
	},
	storeMapping: ["id", "fullName", "sn", "name", "shortName", "birthday", "region", "address", "zip", "tel", "fax", "layMan", "linkMan", "email", "trade", "street", "businessScope", "homePage", "producerType", "intro", "elite", "onTop", "passed", "turnover", "capital", "workerNum", "businessLicence", "taxation", "bank", "bankCode", "qualityAssure", "pic", "types", "status", "owner", "seller", "inputTime", "hot", "hotInfo", "updateTime", "lastVisitTime"],
	initComponent: function () {
		if (this.baseUrl) this.url = this.baseUrl + "?cmd=list&pageSize=18";
		var gridConfig = {
			border: false
		},
		chkM = null;
		if (this.selectSingle) {
			gridConfig.sm = new Ext.grid.RowSelectionModel({
				singleSelect: true
			})
		} else {
			this.columnLock = false;
			chkM = new Ext.grid.CheckboxSelectionModel({
				chkLocked: true
			});
			gridConfig.sm = chkM
		}
		this.gridConfig = Ext.apply({},
		gridConfig);
		this.cm = new Ext.grid.ColumnModel([chkM ? chkM: new Ext.grid.RowNumberer({
			header: "序号",
			width: 35,
			locked: true
		}), {
			header: "客户名称",
			sortable: true,
			width: 150,
			locked: true,
			dataIndex: "name",
			renderer: this.customerRender
		},
		{
			header: "编号",
			sortable: true,
			width: 60,
			dataIndex: "sn"
		},
		{
			header: "客户类型",
			sortable: true,
			width: 60,
			dataIndex: "types",
			renderer: this.objectRender("title")
		},
		{
			header: "行业",
			sortable: true,
			width: 150,
			dataIndex: "trade",
			renderer: this.objectRender("title")
		},
		{
			header: "客户简写",
			sortable: true,
			width: 70,
			dataIndex: "shortName"
		},
		{
			header: "联系人",
			sortable: true,
			width: 60,
			dataIndex: "linkMan"
		},
		{
			header: "电子邮件",
			sortable: true,
			width: 100,
			dataIndex: "email",
			hidden: true
		},
		{
			header: "联系电话",
			sortable: true,
			width: 85,
			dataIndex: "tel"
		},
		{
			header: "传真号码",
			sortable: true,
			width: 80,
			dataIndex: "fax",
			hidden: true
		},
		{
			header: "公司地址",
			sortable: true,
			width: 160,
			dataIndex: "address"
		},
		{
			header: "邮政编码",
			sortable: true,
			width: 60,
			dataIndex: "zip",
			hidden: true
		},
		{
			header: "热点",
			sortable: true,
			width: 40,
			dataIndex: "hot",
			renderer: this.hotRender
		},
		{
			header: "状态",
			sortable: true,
			width: 80,
			dataIndex: "status"
		},
		{
			header: "业务员",
			sortable: true,
			width: 60,
			dataIndex: "seller",
			renderer: this.objectRender("trueName")
		},
		{
			header: "最近跟踪",
			sortable: true,
			width: 80,
			dataIndex: "lastVisitTime",
			renderer: this.dateRender("Y-m-d")
		},
		{
			header: "更新时间",
			sortable: true,
			width: 80,
			dataIndex: "updateTime",
			renderer: this.dateRender("Y-m-d")
		},
		{
			header: "创立日期",
			sortable: true,
			width: 80,
			dataIndex: "birthday",
			renderer: this.dateRender("Y-m-d")
		},
		{
			header: "所在地区",
			sortable: true,
			width: 80,
			dataIndex: "region",
			renderer: this.objectRender("title"),
			hidden: true
		},
		{
			header: "开户行",
			sortable: true,
			width: 60,
			dataIndex: "bank",
			hidden: true
		},
		{
			header: "银行账号",
			sortable: true,
			width: 60,
			dataIndex: "bankCode",
			hidden: true
		},
		{
			header: "保质金",
			sortable: true,
			width: 60,
			dataIndex: "qualityAssure",
			hidden: true
		},
		{
			header: "所有者",
			sortable: true,
			width: 60,
			dataIndex: "owner",
			renderer: this.objectRender("name"),
			hidden: true
		},
		{
			header: "收录时间",
			sortable: true,
			width: 60,
			dataIndex: "inputTime",
			renderer: this.dateRender("y-m-d"),
			hidden: true
		},
		{
			header: "热点说明",
			sortable: true,
			width: 60,
			dataIndex: "hotInfo",
			hidden: true
		}]);
		this.btn_types = new EasyJF.Ext.SmartCombox(Ext.apply({},
		{
			width: 100,
			listeners: {
				"select": this.refresh,
				scope: this
			}
		},
		ConfigConst.BASE.getCompanyDictionaryCombo("types", "客户类型", "ClientTypes")));
		this.btn_title = new Ext.form.TextField({
			xtype: "textfield",
			width: 100,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_sn = new Ext.form.TextField({
			xtype: "textfield",
			width: 80,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.tbar = ["客户类别:", this.btn_types, "编号:", this.btn_sn, "名称:", this.btn_title, {
			text: "查询",
			handler: this.refresh,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icon-png/search.png"
		},
		{
			text: "重置",
			handler: this.reset,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icons/arrow_undo.png"
		},
		Ext.apply({},
		{
			text: "新建客户",
			handler: this.createClient,
			scope: this
		},
		ConfigConst.buttons.addChild)];
		this.menus = this.menus || [];
		this.menus[this.menus.length] = Ext.apply({},
		{
			text: "新建客户",
			handler: this.createClient,
			scope: this
		},
		ConfigConst.buttons.addChild);
		ClientGridList.superclass.initComponent.call(this);
		this.store.on("load", function (s, rs) {
			if (rs && rs.length > 0) {
				this.grid.getSelectionModel().selectFirstRow();
				this.grid.getView().focusRow(0)
			}
		},
		this)
	}
});

ClientSelectWin = Ext.extend(BaseSelectWin, {
	title: "选择客户",
	width: 800,
	height: 600,
	layout: "border",
	buttonAlign: "center",
	createListGrid: function (params) {
		return new ClientGridList(Ext.apply({},
		{
			region: "center",
			menus: [{
				text: "选定客户",
				handler: this.choice,
				scope: this,
				cls: "x-btn-text-icon",
				icon: "images/icons/accept.png"
			}]
		},
		params || {}))
	},
	initComponent: function () {
		ClientSelectWin.superclass.initComponent.call(this);
		if (!Global.productDirLoader) {
			Global.productDirLoader = new Ext.tree.TreeLoader({
				url: "productDir.ejf?cmd=getProductDirTree&pageSize=-1",
				listeners: {
					'beforeload': function (treeLoader, node) {
						treeLoader.baseParams.id = (node.id != "root" ? node.id: "")
					},
					scope: this
				}
			})
		}
		if (!Global.systemRegionLoader) {
			Global.systemRegionLoader = new Ext.tree.TreeLoader({
				url: "systemRegion.ejf?cmd=getSystemRegion&pageSize=-1&treeData=true",
				listeners: {
					'beforeload': function (treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id: "")
					}
				}
			})
		}
		this.tree = new Ext.tree.TreePanel({
			title: "客户所在地区",
			region: "west",
			autoScroll: true,
			split: true,
			collapsible: true,
			width: 200,
			tools: [{
				id: "refresh",
				handler: function () {
					this.tree.root.reload()
				},
				scope: this
			}],
			tools: [{
				id: "refresh",
				handler: function () {
					this.tree.root.reload()
				},
				scope: this
			}],
			root: new Ext.tree.AsyncTreeNode({
				id: "root",
				text: "所有地区",
				icon: "images/system/root.gif",
				expanded: true,
				loader: Global.systemRegionLoader
			})
		});
		this.list.tree = this.tree;
		this.tree.on("click", function (node, eventObject) {
			var id = (node.id != 'root' ? node.id: "");
			this.list.store.baseParams.region = id;
			if (id) {
				this.list.currentRegion = {
					id: id,
					title: node.text
				}
			} else this.list.currentRegion = null;
			this.list.store.removeAll();
			this.list.store.load()
		},
		this);
		this.add(this.tree)
	}
});
       
ClientComboBox= Ext.extend(EasyJF.Ext.SmartCombox, {
    baseUrl:"client.ejf",
    choiceValue : Ext.emptyFn,
    selectSingle:true,
    disableChoice:true,
    enableKeyEvents : true,
    mode:'local',
    loadBySn:'autocompleteList',
    doQuery:Ext.emptyFn,
    winTitle:"请选择客户",
//  onLoad:Ext.emptyFn,
    //setClientInfo用来控制当客户选中一个客户后，设置全局客户信息
    setClientInfo:function(v){
       if(v&&typeof v=="object"){
            Global.setClient(v);
        }else {
            Global.setClient({id:v,fullName:""});
        } 
    },
    setValue:function(v){
        if(v!="" && Ext.type(v)!="object") {
            if(this.store.getById(v)){
                v=this.store.getById(v).data;
            }
        }
        ClientComboBox.superclass.setValue.call(this, v);
        this.setClientInfo(v);
    },
    clearLastValue:function(){
        this.lastValue=null;        
    },
    createSelectWin:function(params){
        return new ClientSelectWin(params);
    },
    choiceProvider : function() {
        if(!this.lookupWin){
        this.lookupWin =this.createSelectWin({
            title:this.winTitle,
            baseUrl:this.baseUrl,
            selectSingle : this.selectSingle
        });
        this.lookupWin.on("select", function(data) {
            if (data && data.length) {
                this.setValue({
                    id : data[0].id,
                    fullName : data[0][this.displayField
                            ? this.displayField
                            : "fullName"]
                });
                var r = new this.store.recordType(data[0]);
                this.fireEvent("select",this,r,-1);//注意，此处传-1存在问题
                if (this.choiceValue)
                    this.choiceValue(data[0]);
            }
        }, this);
        }
        this.lookupWin.show();
    },
    selectProvider : function(c, r, o) {
        if (this.choiceValue && this.choiceValue!=Ext.emptyFn){
            if(r.data)
                this.choiceValue(r.data);
            else
                this.choiceValue(r);
        }
    },
    autoSelectBySn:function(c,e){
        if(c.el.dom.value&&c.getValue()){
            //alert(c.getValue());
        }else if((e.getKey() == Ext.EventObject.ENTER) && !this.isExpanded()) {         
                var t=c.el.dom.value;
                var r=this.store.find("fullName",t);
                if(r>=0){
                    this.selectProvider(this,this.store.getAt(r),r);
                }else {//根据编码查询数据
                    var params={searchKey : t};
                    //使用baseQueryParamster来控制产品过滤列表，比如供应商过滤等
                    if(this.baseQueryParameter)Ext.applyIf(params,this.baseQueryParameter);
                    Ext.Ajax.request({
                        url : this.baseUrl+"?cmd="+this.loadBySn,
                        params : params,
                        success : function(response,opt) {
                            this.lastValue={text:this.lastSelectionText,id:this.hiddenField.value};
                            this.store.baseParams=Ext.apply({},opt.params);
                            var obj=Ext.decode(response.responseText);
                            this.store.removeAll();
                            if(obj && obj.result){
                                this.store.loadData({
                                    result:obj.result,
                                    rowCount:obj.rowCount
                                });
                            }
                            if(this.store.getCount()==1){
                                var data = this.store.getAt(0);
                                this.select(0,true);
                                this.expand();
                            }else if(this.store.getCount()>1){
                                this.select(0,true);
                                this.expand();
                            }else if(this.store.getCount()==0){
                                Ext.Msg.alert("提示","客户编号不正确,请重新输入!",function(){
                                this.focus(true,100);
                                },this);
                            }
                        },
                        scope : this
                    });
                    }
              }else if(e.getKey()==Ext.EventObject.PAGEDOWN){//使用PageDown激活窗口选择
                this.choiceProvider();
            }
        //e.stopEvent();
    },
    onRender : function(ct, position) {
        ClientComboBox.superclass.onRender.call(this, ct, position);
        var label = this.el.findParent('.x-form-element', 5, true)
                || this.el.findParent('.x-form-field-wrap', 5, true);
        this.helpIcon = label.createChild({
            cls:"object-select-icon",
            style : 'width:16px;height:18px; position:absolute; left:0; top:0; display:block; background:transparent no-repeat scroll 0 2px;'
        });
        this.helpIcon.on("click", this.choiceProvider, this);
        this.alignHelpIcon = function() {
            var el = this.wrap ? this.wrap : this.el;
            this.el.setWidth(this.el.getWidth() - 20);
            this.helpIcon.alignTo(this.el, 'tl-tr', [20, 0]);
        }
        this.on('resize', this.alignHelpIcon, this);
        this.on("select", this.selectProvider, this);
        this.on("specialkey", this.autoSelectBySn, this);
        this.on("keypress",function(c,e){
            if(!e.isSpecialKey())c.value=null;
        },this)
    },
    onTriggerClick : function() {
        if (this.disabled) {
            return;
        }
        this.choiceProvider();
    }
})
Ext.reg('clientcombo', ClientComboBox); 

SupplierGridList = Ext.extend(BaseSelectGridList, {
	url: "supplier.ejf?cmd=autocompleteList&pageSize=15",
	pageSize: 15,
	refresh: function () {
		this.store.baseParams = {
			searchKey: this.btn_sn.getValue(),
			title: this.btn_title.getValue(),
			tel: this.btn_tel.getValue(),
			linkMan: this.btn_linkMan.getValue()
		};
		this.store.removeAll();
		this.store.reload()
	},
	reset: function () {
		this.btn_sn.reset();
		this.btn_title.reset();
		this.btn_tel.reset();
		this.btn_linkMan.reset();
		this.refresh()
	},
	createColumnModel: function () {
		return [{
			header: "供应商名称",
			sortable: true,
			width: 150,
			dataIndex: "name"
		},
		{
			header: "缩写",
			sortable: true,
			width: 60,
			dataIndex: "shortName"
		},
		{
			header: "联系人电话",
			sortable: true,
			width: 80,
			dataIndex: "tel"
		},
		{
			header: "编号",
			sortable: true,
			width: 80,
			dataIndex: "sn"
		},
		{
			header: "联系人",
			sortable: true,
			width: 80,
			dataIndex: "linkMan"
		},
		{
			header: "联系地址",
			sortable: true,
			width: 150,
			dataIndex: "address"
		}]
	},
	storeMapping: ["id", "address", "designer", "seller", "consultant", "area", "name", "tel", "fullName"],
	initComponent: function () {
		this.btn_sn = new Ext.form.TextField({
			xtype: "textfield",
			width: 100,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_tel = new Ext.form.TextField({
			xtype: "textfield",
			width: 100,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_title = new Ext.form.TextField({
			xtype: "textfield",
			width: 80,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.btn_linkMan = new Ext.form.TextField({
			xtype: "textfield",
			width: 80,
			listeners: {
				"change": this.refresh,
				scope: this
			}
		});
		this.tbar = ["编号:", this.btn_sn, "名称:", this.btn_title, "联系人:", this.btn_linkMan, "电话:", this.btn_tel, {
			text: "查询",
			handler: this.refresh,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icon-png/search.png"
		},
		{
			text: "重置",
			handler: this.reset,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icons/arrow_undo.png"
		}];
		SupplierGridList.superclass.initComponent.call(this)
	}
});
SupplierSelectWin = Ext.extend(ClientSelectWin, {
	title: "选择供应商",
	width: 800,
	height: 500,
	layout: "fit",
	createListGrid: function (params) {
		return new SupplierGridList(Ext.apply({},
		{
			region: "center"
		},
		params || {}))
	}
});


SupplierComboBox= Ext.extend(ClientComboBox, {
    winTitle:"请选择供应商",
    baseUrl:"supplier.ejf",
    setClientInfo:function(v){
       if(v&&typeof v=="object"){
            Global.setSupplier(v);
        }else {
            Global.setSupplier({id:v,fullName:""});
        } 
    },
    createSelectWin:function(params){
        return new SupplierSelectWin(params);
    }
})
Ext.reg('suppliercombo', SupplierComboBox); 
EmployeeGridList = Ext.extend(BaseSelectGridList, {
	pageSize: 10,
	url: "employee.ejf?cmd=list",
	storeMapping: ["id", "name", "trueName", "email", "dept", "contractNo", "duty", "password", "tel", "registerTime", "status", "sex", "workerOnly"],
	quick_search: function () {
		this.store.reload({
			params: {
				start: 0,
				searchKey: this.btn_searchKey.getValue(),
				deptId: this.btn_dept.getValue(),
				tel: this.btn_tel.getValue()
			}
		})
	},
	createColumnModel: function () {
		return [{
			header: "用户名",
			sortable: true,
			width: 100,
			dataIndex: "name"
		},
		{
			header: "姓名",
			sortable: true,
			width: 100,
			dataIndex: "trueName"
		},
		{
			header: "部门",
			sortable: true,
			width: 100,
			dataIndex: "dept",
			renderer: this.objectRender("title")
		},
		{
			header: "电子邮件",
			sortable: true,
			width: 100,
			dataIndex: "email",
			hidden: true
		},
		{
			header: "电话",
			sortable: true,
			width: 100,
			dataIndex: "tel"
		},
		{
			header: "紧急电话",
			sortable: true,
			width: 100,
			dataIndex: "contractNo",
			hidden: true
		},
		{
			header: "职务",
			sortable: true,
			width: 100,
			dataIndex: "duty",
			renderer: this.objectRender("title"),
			hidden: true
		}]
	},
	initComponent: function () {
		this.btn_dept = new EasyJF.Ext.TreeComboField({
			xtype: "treecombo",
			fieldLabel: "部门",
			name: "parentId",
			hiddenName: "parentId",
			displayField: "title",
			valueField: "id",
			width: 100,
			listWidth: 150,
			tree: new Ext.tree.TreePanel({
				autoScroll: true,
				root: new Ext.tree.AsyncTreeNode({
					id: "root",
					text: "所有部门",
					icon: "images/system/root.gif",
					expanded: true,
					loader: Global.departmentLoader
				})
			})
		});
		this.btn_searchKey = new Ext.form.TextField({
			width: 100
		});
		this.btn_tel = new Ext.form.TextField({
			width: 100
		});
		this.tbar = ["部门", this.btn_dept, "姓名", this.btn_searchKey, "电话", this.btn_tel, "-", {
			text: "查询",
			handler: this.quick_search,
			scope: this,
			cls: "x-btn-text-icon",
			icon: "images/icon-png/search.png"
		},
		{
			text: "重置",
			iconCls: 'clean',
			handler: function () {
				Ext.each(this.getTopToolbar().items.items, function (o) {
					if (o && o.reset) o.reset()
				})
			},
			scope: this
		}];
		EmployeeGridList.superclass.initComponent.call(this)
	}
});
EmployeeSelectWin = Ext.extend(BaseSelectWin, {
	title: "选择员工",
	width: 540,
	height: 400,
	createListGrid: function (params) {
		return new EmployeeGridList(params || {})
	}
});

EmployeeComboBox = Ext.extend(BaseSelectComboBox, {
    createSelectWin:function(params){
                return new EmployeeSelectWin(params);
            }
})
Ext.reg('employeecombo', EmployeeComboBox);


ShoppingGuideComboBox = Ext.extend(EasyJF.Ext.SmartCombox, {
    disableChoice:true,
    choiceValue : Ext.emptyFn(),
    doQuery:Ext.emptyFn,
    enableKeyEvents:true,
    choiceProvider : function() {   
        if(!this.lookupWin){
            this.lookupWin = new EmployeeSelectWin({closeAction:"hide",selectSingle:true});
            this.lookupWin.on("select", function(data) {
            this.setValue({id:data[0].id,trueName:data[0][this.displayField?this.displayField:"trueName"]});
                    if (this.choiceValue)
                        this.choiceValue(data[0]);
                }, this);
        }
        this.lookupWin.show();
    },
    selectProvider : function(c, r, o) {
        if (this.choiceValue)
            this.choiceValue(r.data);
    },
    onDestroy : function(){
        if(this.lookupWin){
            this.lookupWin.close();
            delete this.lookupWin;
        }
        ShoppingGuideComboBox.superclass.onDestroy.call(this);
    },
    autoSelectBySn:function(c,e){
        if(e.getKey() == Ext.EventObject.ENTER && !this.isExpanded()) {
            var t=c.el.dom.value;
            Ext.Ajax.request({
                url : "employee.ejf?cmd=getShoppingGuide",
                params : {searchKey : t},
                success : function(response,opt) {
                    this.store.baseParams=Ext.apply({},opt.params);
                    var obj=Ext.decode(response.responseText);
                    this.store.removeAll();
                    if(obj && obj.result){
                        this.store.loadData({
                            result:obj.result,
                            rowCount:obj.rowCount
                        });
                    }
                    if(this.store.getCount()==1){
                        var data = this.store.getAt(0);
                        this.select(0,true);
                        this.expand();
                    }else if(this.store.getCount()>1){
                        this.select(0,true);
                        this.expand();
                    }
                    else if(this.store.getCount()==0){
                        Ext.Msg.alert("提示","编号不正确,请重新输入!",function(){
                        this.focus(true,100);
                        },this);
                    }
                },
                scope : this
            });
        }
        e.stopEvent();
    },
    onRender : function(ct, position) {
        ShoppingGuideComboBox.superclass.onRender.call(this, ct, position);
        this.on("select", this.selectProvider, this);
        this.on("specialkey", this.autoSelectBySn, this);
        this.on("keypress",function(c,e){
                        if(e.getKey()!=13&&c.value)c.value=null;
               })
    }
})
Ext.reg('guideCombo', ShoppingGuideComboBox);

LoginWindow = Ext.extend(Ext.Window, {
	title: '登陆系统',
	width: 265,
	height: 140,
	collapsible: true,
	closable: false,
	modal: true,
	defaults: {
		border: false
	},
	buttonAlign: 'center',
	createFormPanel: function () {
		return new Ext.form.FormPanel({
			bodyStyle: 'padding-top:6px',
			defaultType: 'textfield',
			labelAlign: 'right',
			labelWidth: 55,
			labelPad: 0,
			frame: true,
			defaults: {
				allowBlank: false,
				width: 158,
				selectOnFocus: true
			},
			items: [{
				cls: 'user',
				name: 'j_username',
				fieldLabel: '帐号',
				blankText: '帐号不能为空'
			},
			{
				cls: 'key',
				name: 'j_password',
				fieldLabel: '密码',
				blankText: '密码不能为空',
				inputType: 'password'
			}]
		})
	},
	login: function () {
		this.fp.form.submit({
			waitTitle: "请稍候",
			waitMsg: '正在登录......',
			url: '/login.ejf?cmd=checkLogin',
			success: function (form, action) {
				if (Ext.isIE) {
					window.location.reload()
				} else {
					window.location = "manage.ejf"
				}
			},
			failure: function (form, action) {
				if (action.failureType == Ext.form.Action.SERVER_INVALID) Ext.MessageBox.alert('警告', action.result.errors.msg);
				form.findField("j_password").setRawValue("");
				form.findField("j_username").focus(true)
			},
			scope: this
		})
	},
	initComponent: function () {
		this.keys = {
			key: Ext.EventObject.ENTER,
			fn: this.login,
			scope: this
		};
		LoginWindow.superclass.initComponent.call(this);
		this.fp = this.createFormPanel();
		this.add(this.fp);
		this.addButton('登陆', this.login, this);
		this.addButton('退出', function () {
			Ext.Msg.confirm("提示", "确认要退出系统吗？", function (btn) {
				if (btn == "yes") window.location.href = "login.ejf?cmd=logout"
			})
		},
		this)
	}
});
RegisterWindow = Ext.extend(Ext.Window, {
	title: '新用户注册',
	width: 265,
	height: 260,
	modal: true,
	defaults: {
		border: false
	},
	buttonAlign: 'center',
	createFormPanel: function () {
		return new Ext.form.FormPanel({
			bodyStyle: 'padding-top:6px',
			defaultType: 'textfield',
			labelAlign: 'right',
			labelWidth: 55,
			labelPad: 0,
			frame: true,
			defaults: {
				allowBlank: false,
				width: 158,
				selectOnFocus: true
			},
			items: [{
				name: 'name',
				fieldLabel: '帐号',
				blankText: '帐号不能为空'
			},
			{
				name: 'password',
				fieldLabel: '密码',
				blankText: '密码不能为空',
				inputType: 'password'
			},
			{
				name: 'password1',
				fieldLabel: '确认密码',
				blankText: '密码不能为空',
				inputType: 'password'
			},
			{
				name: 'email',
				fieldLabel: '电子邮件',
				blankText: '密码不能为空'
			},
			{
				xtype: "textarea",
				name: 'intro',
				fieldLabel: '简介',
				blankText: '密码不能为空'
			}]
		})
	},
	save: function () {
		var p1 = this.fp.form.findField("password").getValue();
		var p2 = this.fp.form.findField("password1").getValue();
		if (p1 != p2) {
			this.fp.form.findField("password").markInvalid("两次输入的新密码不同!");
			this.fp.form.findField("password").focus(true);
			return
		}
		this.fp.form.submit({
			waitTitle: "请稍候",
			waitMsg: '正在保存......',
			url: 'portal.ejf?cmd=saveRegister&ext=true',
			success: function (form, action) {
				var name = this.fp.form.findField("name").getValue();
				this.close();
				if (loginWin) {
					loginWin.fp.form.findField("userName").setValue(name);
					loginWin.fp.form.findField("password").focus()
				}
			},
			failure: function (form, action) {
				form.findField("name").focus(true)
			},
			scope: this
		})
	},
	initComponent: function () {
		this.keys = {
			key: Ext.EventObject.ENTER,
			fn: this.save,
			scope: this
		};
		RegisterWindow.superclass.initComponent.call(this);
		this.fp = this.createFormPanel();
		this.add(this.fp);
		this.addButton('保存', this.save, this);
		this.addButton('取消', function () {
			this.close()
		},
		this)
	}
});
ChangePasswordWindow = Ext.extend(Ext.Window, {
	title: '修改密码',
	modal: true,
	iconCls: 'icon-password',
	width: 265,
	height: 165,
	defaults: {
		border: false
	},
	buttonAlign: 'center',
	createFormPanel: function () {
		return new Ext.form.FormPanel({
			bodyStyle: 'padding-top:6px',
			defaultType: 'textfield',
			labelAlign: 'right',
			labelWidth: 70,
			labelPad: 0,
			frame: true,
			defaults: {
				allowBlank: false,
				width: 158,
				selectOnFocus: true
			},
			items: [{
				cls: 'key',
				name: 'oldPassword',
				fieldLabel: '旧密码',
				blankText: '密码不能为空',
				inputType: 'password'
			},
			{
				cls: 'key',
				name: 'password',
				fieldLabel: '新密码',
				blankText: '密码不能为空',
				inputType: 'password'
			},
			{
				cls: 'key',
				name: 'password1',
				fieldLabel: '确认密码',
				blankText: '密码不能为空',
				inputType: 'password'
			}]
		})
	},
	save: function () {
		var p1 = this.fp.form.findField("password").getValue();
		var p2 = this.fp.form.findField("password1").getValue();
		if (p1 != p2) {
			this.fp.form.findField("password").markInvalid("两次输入的新密码不同!");
			this.fp.form.findField("password").focus(true);
			return
		}
		this.fp.form.submit({
			waitTitle: "请稍候",
			waitMsg: "正在保存...",
			url: 'login.ejf?cmd=changePasssword&ext=true',
			success: function (form, action) {
				Ext.Msg.alert("提示", "密码修改成功，请重新登录系统!", function () {
					this.close();
					login()
				},
				this)
			},
			failure: function (form, action) {},
			scope: this
		})
	},
	initComponent: function () {
		this.keys = {
			key: Ext.EventObject.ENTER,
			fn: this.save,
			scope: this
		};
		ChangePasswordWindow.superclass.initComponent.call(this);
		this.fp = this.createFormPanel();
		this.add(this.fp);
		this.addButton('保存', this.save, this);
		this.addButton('取消', function () {
			this.close()
		},
		this)
	}
});
SystemConfigWindow = Ext.extend(Ext.Window, {
	title: '系统设置',
	modal: true,
	iconCls: 'icon-password',
	width: 265,
	height: 245,
	desktopTypes: [["默认主页(Portal)", "menu"], ["视窗桌面模式", "menu-desktop"], ["进销存主界面", "menu-stock"], ["客户关系主界面", "menu-crm"], ["财务管理主界面", "menu-crm"], ["人力资源主界面", "menu-hr"], ["服装业主界面", "menu-wear"]],
	styleDatas: [["默认风格", "default"], ["银白风格", "xtheme-gray"], ["紫色风格", "xtheme-purple"], ["绿色风格", "xtheme-green"], ["灰色风格", "xtheme-darkgray"], ["黑色风格", "xtheme-black"], ["深蓝风格", "xtheme-slate"]],
	appTypes: [["禁用IFrame(OPOA模式)", false], ["启用IFrame(IFrame模式)", true]],
	tabTypes: [["多窗体", false], ["单窗体", true]],
	defaults: {
		border: false
	},
	buttonAlign: 'center',
	createFormPanel: function () {
		return new Ext.form.FormPanel({
			bodyStyle: 'padding-top:6px',
			defaultType: 'textfield',
			labelAlign: 'right',
			labelWidth: 70,
			labelPad: 0,
			frame: true,
			defaults: {
				width: 158,
				selectOnFocus: true
			},
			items: [EasyJF.Ext.Util.buildCombox('homePage', '首页设置', this.desktopTypes, main.homeMenu), EasyJF.Ext.Util.buildCombox('tabType', '窗体支持', this.tabTypes, main.singleTabMode), EasyJF.Ext.Util.buildCombox('appType', 'IFrame支持', this.appTypes, Global.iframe), EasyJF.Ext.Util.buildCombox('style', '皮肤', this.styleDatas, main.theStyle || "default"), Ext.apply({},
			{
				fieldLabel: '开取动画',
				name: 'enableAnimate',
				hiddenName: 'enableAnimate',
				allowBlank: false,
				value: main.enableAnimate
			},
			ConfigConst.BASE.yesNo), {
				name: 'maxTab',
				fieldLabel: '最大Tab数',
				value: main.maxTabs
			}]
		})
	},
	save: function () {
		var appType = this.fp.form.findField("appType").getValue();
		var tabType = this.fp.form.findField("tabType").getValue();
		var maxTab = this.fp.form.findField("maxTab").getValue();
		var homeMenu = this.fp.form.findField("homePage").getValue();
		var enableAnimate = this.fp.form.findField("enableAnimate").getValue();
		var style = this.fp.form.findField("style").getValue();
		if (typeof main !== "undefined" && main) {
			main.iframe = Global.iframe = appType;
			main.singleTabMode = tabType;
			main.maxTabs = maxTab;
			main.enableAnimate = enableAnimate;
			main.homeMenu = homeMenu;
			main.theStyle = style;
			main.savePersonality(function () {
				var isDirty = this.fp.form.findField("tabType").isDirty() || this.fp.form.findField("homePage").isDirty();
				this.close();
				if (isDirty) {
					Ext.Msg.confirm("提示", "IFrame支持或系统主页已经修改,只有重新加载页面新的设置才会生效,是否要重新加载系统?", function (button) {
						if (button == "yes") window.location.reload()
					})
				}
				if (this.fp.form.findField("style").isDirty()) {
					if (main.changeSkin) main.changeSkin(style)
				}
			}.createDelegate(this))
		}
	},
	initComponent: function () {
		this.keys = {
			key: Ext.EventObject.ENTER,
			fn: this.save,
			scope: this
		};
		SystemConfigWindow.superclass.initComponent.call(this);
		this.fp = this.createFormPanel();
		this.add(this.fp);
		this.addButton('保存', this.save, this);
		this.addButton('取消', function () {
			this.close()
		},
		this)
	}
});

function changePassword(){
    //Ext.get("desktop").mask();
    var changePasswordWin=new ChangePasswordWindow();
    changePasswordWin.show();   
}
function login(){
    if(window.OnlineMessageManager)OnlineMessageManager.stop();
    if(!loginWin)loginWin=new LoginWindow();
    loginWin.show();
}
function logout(){
    Ext.Msg.confirm("友情提示","是否真的要注销当前用户?",function(btn){
        if(btn=="yes"){
            Ext.Ajax.request({
                url:"login.ejf?cmd=logout&ext=true",
                success:function(){
                    window.location.href="Lanyowebprinter://restart";
                }
            })
        }   
    }
    );
}
/**
 * 产品订单处理基类
 * @class BaseProductBillPanel
 * @extends EasyJF.Ext.CrudPanel
 */
BaseProductBillPanel=Ext.extend(EasyJF.Ext.CrudListPanel,{
    printData:true, 
    status:[["<span style=\"color:green;\">初始录入<span>",0],["已审核",1],["作废",-1]],
    editEmptyObj:{"id":null, "product":null,productTitle:null,productSn:null,"brand":null, "spec":null, "model":null, "unit":null, "price":null,"num":null, "remark":null, "totalAmount":null,"colorSn":null},
    editStoreMapping:["id","product",{name:"productSn",mapping:"product.sn"},{name:"productTitle",mapping:"product.title"}, {name:"brand",mapping:"product.brand"}, {name:"spec",mapping:"product.spec"}, {name:"model",mapping:"product.model"},{name:"unit",mapping:"product.unit"},{name:"colorSn",mapping:"product.colorSn"}, "price","num", "remark","marketPrice","packageFee","taxRate","taxPrice", "totalAmount"],
    gridForceFit:false,
    columnLock : false,
    maximizable:true,   
    pageSize:20,
    /**
     * 子类根据情况重载
     * @param {} record
     */
    autoCountData:function(record){
        var p = record.get("price");
        var n = record.get("num");
        var total = p && n ? p * n : 0;
        record.set("totalAmount",parseFloat(total));
    },
    /**
     * 子类根据情况重载
     * @param {} record
     */
    addRowDataHandler:function(r){
        var obj=Ext.apply({},r,this.editEmptyObj);
        if(r){
            obj.price=r.salePrice;
            obj.product=r;
            obj.product.toString=EasyJF.Ext.Util.objectToString;
            obj.productTitle=r.title;
            obj.productSn=r.sn;
            obj.spec=r.spec;
            obj.colorSn=r.colorSn;
            obj.marketPrice=r.marketPrice;
            obj.brand=r.brand;
            obj.model=r.model;
            obj.unit=r.unit;
        }
        delete obj.id;  
        return obj;
    },
    /**
     * 子类根据情况重载
     * @param {} record
     */
    selectRowDataHandler : function(obj,record) {       
        obj.toString = EasyJF.Ext.Util.objectToString;
        record.set("product", obj);
        record.set("productTitle", obj.title);
        record.set("productSn", obj.sn);
        record.set("spec", obj.spec);
        record.set("brand", obj.brand);
        record.set("colorSn", obj.colorSn);
        record.set("model", obj.model);
        record.set("unit", obj.unit);
        record.set("price", obj.salePrice);
        record.set("marketPrice", obj.marketPrice);
    },
    formFocus:function(){
        this.fp.form.findField("client").focus("",100);
    },
    /**
     * 得到可编辑表格的ColumnModel
     * @return {}
     */
    getEditColumnModel:function(){
        this.productEditor=new ProductComboBox(Ext.apply({},{
                 returnObject:true,
                 name:"productInput",
                 hiddenName:"productInput",
                 displayField:"fullName",
                 valueField:"id",           
                 width:300, 
                 choiceValue:this.selectRowData.createDelegate(this)
                 },ConfigConst.CRM.product));
        return new Ext.grid.ColumnModel([               
                 new Ext.grid.RowNumberer({header:"序号",dataIndex:"sequence",width:35}),
                 {header:"Id",dataIndex:"id",width:1,hidden:true,hideable:false},
                 {header:"产品",dataIndex:"product",width:0,hidden:true,hideable:false},
                 {header:"产品编号",dataIndex:"productSn",width:150,hideable:false,editor:this.productEditor,summaryType: 'count',summaryRenderer: function(v){return "合计("+v+")";}},
                 {header:"产品名称",dataIndex:"productTitle",width:80,renderer:this.readOnlyRender()},
                 {header:"品牌",dataIndex:"brand",width:80,renderer:this.objectRender("name",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"材质/型号",dataIndex:"model",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"尺寸/规格",dataIndex:"spec",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"色号",dataIndex:"colorSn",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"单位",dataIndex:"unit",width:50,renderer:this.objectRender("title",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"单价",dataIndex:"price",width:60,editor:new Ext.form.NumberField(),summaryType: 'average',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"市场价格",dataIndex:"marketPrice",width:80,hidden:true,renderer:this.readOnlyRender(),summaryType: 'average',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"数量",dataIndex:"num",width:50,editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v;}},
                 {header:"税率",dataIndex:"taxRate",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'average',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"包装费用",dataIndex:"packageFee",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"价格合计",dataIndex:"totalAmount",width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"备注",dataIndex:"remark",editor:new Ext.form.TextField()}
        ]);
    },
    createEditGrid:function(){
        var store=new  Ext.data.JsonStore({
            root : "result",
            totalProperty : "rowCount",
            fields:this.editStoreMapping
        }); 
        var colM=this.getEditColumnModel();
        this.editGridMenu=new Ext.menu.Menu({items:[Ext.apply({}, {
                        id:"menu_add",
                        text : "添加商品[Ins]",
                        handler : this.autoAddLastRow,
                        scope : this
                    }, ConfigConst.buttons.addChild), Ext.apply({}, {
                        id:"menu_remove",
                        text : "删除商品[Del]",
                        handler : this.removeRow,
                        scope : this
                    }, ConfigConst.buttons.removeChild),{
                        id:'barCodeImport',
                        text:'条码录入商品',
                        //handler:ConfigConst.STOCK.getBarCodeWindow.createDelegate(this),
                        scope:this
                    }]});
        this.editGrid = new Ext.grid.EditorGridPanel({
            //title:"订购产品详情",
            cm:colM,
            autoScroll:true,
            store:store,
            clicksToEdit:1,
            border:false,
            autoExpandColumn:colM.getColumnCount()-1,
            plugins:[new Ext.ux.grid.GridSummary()],
            keys:[{
                    key:Ext.EventObject.INSERT,
                    fn:function(e){
                        this.autoAddLastRow();
                        var row=this.editGrid.store.getCount()-1;
                        var column=this.editGrid.getColumnModel(row).findColumnIndex("productSn");
                        this.editGrid.startEditing(row,column);
                        e.stopEvent();
                    },
                    scope:this
                },{
                    key:Ext.EventObject.DELETE,
                    fn:function(e){
                    this.removeRow(),
                    e.stopEvent();
                    },
                    scope:this
                },{
                    key:Ext.EventObject.S,
                    altKey:true,
                    fn:function(e){
                    this.save();
                    e.stopEvent();
                    },
                    scope:this
                }],
            listeners : Ext.apply({},{scope : this},this.baseEditGridListeners)
        }); 
    },
    createFormToolBar:function(){
        var bars=[Ext.apply({}, {text:"新建[n]",handler:this.create,scope:this}, ConfigConst.buttons.add),
                    Ext.apply({}, {text:"复制[c]",handler:this.copy,scope:this}, ConfigConst.buttons.copy),
                    Ext.apply({}, {text:"审¸[u]",handler:this.auditing,scope:this}, ConfigConst.buttons.audit),
                    "-",
                    Ext.apply({}, {
                        text : "æ·»å åå[Ins]",
                        handler : this.autoAddLastRow,
                        scope : this
                    }, ConfigConst.buttons.addChild), Ext.apply({}, {
                        text : "å é¤åå[Del]",
                        handler : this.removeRow,
                        scope : this
                    }, ConfigConst.buttons.removeChild),
                    Ext.apply({}, {handler:this.showBarCodeWindow,scope:this}, ConfigConst.buttons.barCode),"-"];
        if(this.showRedBlueButton){
            bars=bars.concat([Ext.apply({}, {scope:this}, ConfigConst.buttons.red),Ext.apply({}, {scope:this}, ConfigConst.buttons.blue),"-"]);
        }
        bars=bars.concat([{id:"btn_saveNew",xtype:"checkbox",checked:false},{text:"ä¿å­åæ°å»º"},"-",
                    //Ext.apply({}, {text:"é¢è§[v]",handler:this.preview,scope:this}, ConfigConst.buttons.preview),
                    Ext.apply({}, {text:"æå°[p]",handler:this.printList,scope:this}, ConfigConst.buttons.print),
                    Ext.apply({}, {hidden:true,text:"Excel[e]",disabled:true}, ConfigConst.buttons.excel)
                    ])
        return bars;
    },
    addProduct:function(){
        if(!this.selectWin){
            this.selectWin=new ProductSelectWin();
            this.selectWin.on("select",this.addRow,this) ; 
        }
        this.selectWin.show();
    },
    addRow:function(rs){
        EasyJF.Ext.Util.appendGridRows(this.editGrid,this.editStoreMapping,rs,this.addRowDataHandler.createDelegate(this),true);
    },
    removeRow:function(){   
        EasyJF.Ext.Util.removeGridRow(this.editGrid);
    },
    selectRowData:function(r){
        var cell = this.editGrid.getSelectionModel().getSelectedCell();
        if(cell){
            var obj = Ext.apply({}, r);
            var record = this.editGrid.store.getAt(cell[0]);
            this.selectRowDataHandler(obj,record);
            this.autoCountData(record);
            this.autoAddLastRow();
        }
    },
    autoAddLastRow:function(){
         alert("æ·»å ");
        if(this.editGrid.store.getCount()<1 || (this.editGrid.store.getAt(this.editGrid.store.getCount()-1).get("product") && this.editGrid.store.getAt(this.editGrid.store.getCount()-1).get("product").id)){
           
            var r = new this.editGrid.store.recordType({product:''});
            this.editGrid.store.add(r);
            
        }
    },
    showBarCodeWindow:function(){
        BarCodeWindow=Ext.extend(Ext.Window,{
            title:"æ¡ç ä¿¡æ¯éé",
            width:350,
            height:280,
            layout:"fit",
            crudService:null,
            border:false,
            resizable:false,
            closeAction:"hide",
            reset:function(){
                this.data=null;
                this.form.getForm().items.each(function(f){
                        if(f.xtype=='numberfield'){
                            f.setValue(1);
                        }else{
                            f.setValue('');
                        }
                });
                /*this.findSomeThing("barCode").setValue("");
                this.findSomeThing("num").reset();*/
                this.findSomeThing("barCode").focus("",100);
            },
            addProductTo:function(autoAdd){
                if(this._barCodeCache){
                    this._barCodeCache.key('');
                }
                if(this.data){
                    var service=this.crudService;
                    var obj = this.data;
                    var o = {};
                    if(obj.color)o['color']= obj.color['title'];
                    if(obj.size)o['size']=obj.size['title'];
                    if(obj)o['stockNum']=Ext.num(obj.product['storeNum'],0);
                    this.form.getForm().setValues(o);
                    this.data.product['color'] = obj.color;
                    this.data['num'] = this.findSomeThing("num").getValue();
                    autoAdd =autoAdd || this.findSomeThing('quickScan').getValue();
                    if(autoAdd)service.addProductByBarCode(this.data);
                    this.findSomeThing("barCode").el.dom.select();
                }else{
                    this.loadProductByBarCode(autoAdd);
                }
            },
            loadProductByBarCode:function(autoAdd){
                var code=this.findSomeThing("barCode").getValue();
                //this.crudService.fp.getForm().findField('supplier');
                Ext.Ajax.request({
                        waitMsg:'正在加载信息，请稍后。。。。',
                        url:'productBarCode.ejf',
                        params:{
                            cmd:'getProductBarCodeByCode',
                            code:code,
                            supplierId:this.supplierId
                        },
                        success:function(response){
                            var obj = Ext.decode(response.responseText);
                            this.data=obj.data;
                            if(obj.success && obj.data){
                                this.data['code']=code;
                                var service=this.crudService;
                                if(service.addProductByBarCode){
                                    this.addProductTo(autoAdd);
                                }else{
                                    Ext.MessageBox.alert("提示信息","此功能还未完善");
                                }
                            }else{
                                var msg = obj.errors ? (obj.errors['msg']||"条码错误，请重新录入") : "条码错误，请重新录入";
                                EasyJF.Ext.Util.msg("提示信息",msg);
                                this.findSomeThing("barCode").el.dom.select();
                            }
                        },
                        scope:this
                    })
            },
            initComponent : function() {
                Ext.apply(this, {
                    onEsc:this.reset,
                    items : {xtype:"form",
                    enterNavigationKey:true,
                    bodyStyle:'padding:16px;',
                    frame:false,
                    navigationSequences:["barCode","num"],
                    items:[
                    {fieldLabel : "固定数量",xtype:"checkbox",name:"fixedNum"},
                    {fieldLabel : "扫描后立即添加",xtype:"checkbox",name:"quickScan"},
                    {
                        fieldLabel : "请输入条码",
                        xtype : 'textfield',
                        enableKeyEvents:true,
                        name : 'barCode',
                        selectOnFocus : true,
                        listeners:{
                            specialkey:function(textfield, e){
                                if(e.keyCode==13){
                                    this.data = null;
                                    this.addProductTo(false);
                                }
                            },
                            scope:this
                        }
                    }, {
                        fieldLabel : "请输入数量",
                        xtype : 'numberfield',
                        selectOnFocus : true,
                        allowDecimals:false,
                        name : 'num',
                        value:1
                    }, {
                        xtype : "labelfield",
                        name : 'color',
                        fieldLabel : "商品颜色"
                    }, {
                        xtype : "labelfield",
                        name : 'size',
                        fieldLabel : "商品尺码"
                    }, {
                        xtype : "labelfield",
                        name : 'stockNum',
                        fieldLabel : "库存数"
                    }]},
                    buttons : [
                    {
                        text : "确定(Alt+o)",
                        handler : this.addProductTo,
                        scope : this
                    }, {
                        text : "取消(ESC)",
                        handler :this.reset,
                        scope : this
                    }, {
                        text : "关闭(Alt+x)",
                        handler : function() {
                            this.hide();
                        },
                        scope : this
                    }]
                }),
                BarCodeWindow.superclass.initComponent.call(this);
                this.form = this.getComponent(0);
                this.on({
                    scope:this,
                    "show":function(win) {
                        win.findSomeThing("barCode").setValue("");
                        win.findSomeThing("num").reset();
                        win.findSomeThing("barCode").focus(true,100);
                    },
                    "hide":this.reset,
                    "render" : function(win){
                        new Ext.KeyMap(this.el,[{
                                key:"x",
                                alt:true,
                                fn: function(){this.hide();},
                                scope: this
                            },{
                                key:"o",
                                alt:true,
                                fn: this.addProductTo.createDelegate(this,[false],false),
                                scope: this
                            }]);
                    }
                });
            }
        });
        var barWin=EasyJF.Ext.Util.barWin,supplierId;
        if(!barWin){
            barWin=new BarCodeWindow();
            EasyJF.Ext.Util.barWin=barWin;
        }
        barWin.crudService=this;
        if((supplierId = this.checkSupplierIsNull())!==true){
            barWin.supplierId = supplierId;
            barWin.show();
        }
        this.win.on('hide',function(){EasyJF.Ext.Util.barWin.hide();},this,{single:true});
    },
    checkSupplierIsNull:function(){
        if(this.fp && this.fp.form.findField("supplier")){
            var supplierId = this.fp.form.findField("supplier").getValue();
            if(!supplierId){
                EasyJF.Ext.Msg.alert("请你先选择供货商!");
                return true;
            }
            return supplierId;
        }
    },
    onCreate:function(){
        this.editGrid.store.removeAll();
        this.autoAddLastRow();
//      this.fp.getTopToolbar().items.get("tb_blue").toggle(true);
        this.fp.getTopToolbar().items.get("tb_audit").disable();
        var dfield=this.fp.form.findField("vdate");
        if(dfield)dfield.clearDirty();
//      this.red=false;//蓝字
        this.generatorSn();
    },
    loadItems : function(id,grid) {
        grid.getGridEl().mask("请稍后...","x-mask-loading");
        Ext.Ajax.request({
            waitTitle:"加载数据",
            waitMsg:"正在加载单据详情,请稍候...",
            url : this.baseUrl + "?cmd=view",
            params:{id:id,view:true},
            success : function(req) {
                var ret = Ext.decode(req.responseText);
                if (ret.items && ret.items.length) {
                    if(this.beforeLoadItem)this.beforeLoadItem(ret.items);
                    grid.store.loadData({
                        rowCount : ret.items.length,
                        result : ret.items
                    });
                    this.afterLoadItem(ret.items,grid,ret);
                    //grid.store.commitChanges();
                    //if(grid==this.editGrid)this.autoAddLastRow();
                }
                 grid.getGridEl().unmask();
            },
            scope : this
        });
    },
    onEdit:function(ret){
        if(ret){
            var record = this.grid.getSelectionModel().getSelected();
            this.editGrid.store.removeAll();
            var entrys=record.get("items");
            if(entrys&&entrys.length){
                var pageList={rowCount:entrys.length,result:entrys};
                this.editGrid.store.loadData(pageList);
                this.afterLoadItem(entrys,this.editGrid);
            }
            else {
                this.loadItems(record.get("id"),this.editGrid);
            }
            //this.autoAddLastRow();
//          this.fp.getTopToolbar().items.get(record.get("red")?"tb_red":"tb_blue").toggle(true);
//          this.red=record.get("red");
        }
    },    
    afterLoadItem:function(items,grid,ret){
    },
    onView:function(win,data){
        if (win) {
            win.setWidth(Ext.getBody().dom.offsetWidth-20);
            win.setHeight(Ext.getBody().dom.offsetHeight-20);
            win.center();
            win.doLayout();
            var entrys=data.items;
            this.viewGrid.store.removeAll();            
            if(entrys&&entrys.length){
                var pageList={rowCount:entrys.length,result:entrys};    
                this.viewGrid.store.loadData(pageList);
            }
            else {
                this.loadItems(data.id,this.viewGrid);
            }
        }
    },
    onSave:function(form,action){
        var chk=this.fp.getTopToolbar().items.get("btn_saveNew");
        if(chk && chk.getValue()){
            this.create.defer(100,this);
            return false;
        }
    },
    save:function(){
        var o=EasyJF.Ext.Util.getEditGridData(this.editGrid,"item_","product");
        o.red=(this.red==true);
        this.fp.form.baseParams=o;
        BaseProductBillPanel.superclass.save.call(this);
    },    
    preview:function(){
        var o=EasyJF.Ext.Util.getEditGridData(this.editGrid,"item_","product");
        this.fp.form.baseParams=o;
        BaseProductBillPanel.superclass.preview.call(this);
    },
    /**
     * 自动生成编号
     */
    generatorSn:function(waitMsg){
        Ext.Ajax.request({url:this.baseUrl+"?cmd=generatorSn",waitMsg:waitMsg,success :function(response){
            var sn=Ext.decode(response.responseText);
            this.fp.form.findField("sn").setOriginalValue(sn);
        },
        scope:this
        });
    },
    /**
     * 复制订单
     */
    copy:function(){
        this.fp.form.findField("id").setValue();
        this.generatorSn("加载编号...");
        for(var i=0,len=this.editGrid.store.getCount();i<len;i++)
        this.editGrid.store.getAt(i).set("id","");
    },
    auditing : function() {
        if (this.fp.form.findField("id")) {
            this.executeUrl(this.baseUrl + "?cmd=auditing", {
                id : this.fp.form.findField("id").getValue()
            }).call(this);
        }
    },
    addQuickKeyMap:function(){
        new Ext.KeyMap(this.fp.el, [{
                        key: "n",
                        alt:true,
                        stopEvent:true,
                        fn: this.create,
                        scope: this
                    },{
                        key: "u",
                        alt:true,
                        stopEvent:true,
                        fn: this.auditing,
                        scope: this
                    },{
                        key: "a",
                        alt:true,
                        stopEvent:true,
                        fn: this.addProduct,
                        scope: this
                    },{
                        key: "d",
                        alt:true,
                        stopEvent:true,
                        fn: this.removeRow,
                        scope: this
                    },{
                        key: "c",
                        alt:true,
                        stopEvent:true,
                        fn: this.copy,
                        scope: this
                    },{
                        key: "v",
                        alt:true,
                        stopEvent:true,
                        fn: this.preview,
                        scope: this
                    },{
                        key: "p",
                        alt:true,
                        stopEvent:true,
                        fn: this.preview,
                        scope: this
                    }]);
    },
    operateRender:function(v,p,r){
                var audit=r.get("auditing");
                var t= new Ext.Template("<a href='{2}' theid='{2}' op='{1}' onclick='return false'><font color='blue'>{0}</font></a>");
                if(audit)return t.applyTemplate(["","cancelAuditing",r.get("id")]);
                else if(v==-1)return t.applyTemplate(["恢复","cancelBlankOut",r.get("id")]);
                else  return t.applyTemplate(["审核确认","auditing",r.get("id")]) ;
                
    },
    statusRender:function(status){
        return function(v){
            if(v===null)return status[0][0];;
            if(v<0)return status[2][0];
            else if(v<status.length)return status[v][0];
            else return v;
        }
    },
   onRowSelection:function(r,g,index,e){
        this.enableOperaterItem("btn_edit","btn_view","btn_print");
        var status=r.get("status");
        if(!status || status==-1){
            this.enableOperaterItem("btn_remove");
        }
        else if(status>=1){
            this.disableOperaterItem("btn_remove");
        }
    }   
});


BasePurchaseBillPanel=Ext.extend(BaseProductBillPanel,{
    editEmptyObj:{"id":null, "product":null,productTitle:null,productSn:null,"brand":null, "spec":null, "model":null, "unit":null, "price":null,"num":null, "remark":null, "totalAmount":null,"vdate":null,"approveNum":null,"blockSn":null,"closed":false,"purpose":null,"colorSn":null},
    editStoreMapping:["id","product",{name:"productSn",mapping:"product.sn"},{name:"productTitle",mapping:"product.title"}, "brand", {name:"spec",mapping:"product.spec"}, {name:"model",mapping:"product.model"},{name:"colorSn",mapping:"product.colorSn"},"unit", "price","num", "remark","marketPrice","packageFee","taxRate","taxPrice", "totalAmount","vdate","approveNum","blockSn","closed","purpose"],
    formFocus:function(){
        this.fp.form.findField("supplier").focus("",1000);
    },
    getEditColumnModel:function(){
        this.productEditor=new ProductComboBox(Ext.apply({},{
                 returnObject:true,
                 name:"productInput",
                 hiddenName:"productInput",
                 displayField:"fullName",
                 valueField:"id",           
                 width:300, 
                 choiceValue:this.selectRowData.createDelegate(this)
                 },ConfigConst.CRM.product));
        return new Ext.grid.ColumnModel([               
                 new Ext.grid.RowNumberer({header:"序号",dataIndex:"sequence",width:35}),
                 {header:"Id",dataIndex:"id",width:1,hidden:true,hideable:false},
                 {header:"产品",dataIndex:"product",width:0,hidden:true,hideable:false},
                 {header:"产品编号",dataIndex:"productSn",width:150,editor:this.productEditor,summaryType: 'count',summaryRenderer: function(v){return "合计("+v+")";}},
                 {header:"产品名称",dataIndex:"productTitle",width:80,renderer:this.readOnlyRender()},
                 {header:"品牌",dataIndex:"brand",width:80,renderer:this.objectRender("name",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"材质/型号",dataIndex:"model",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"尺寸/规格",dataIndex:"spec",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"单位",dataIndex:"unit",width:50,renderer:this.objectRender("title",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"单价",dataIndex:"price",width:60,editor:new Ext.form.NumberField()},
                 {header:"含税价格",dataIndex:"taxPrice",hidden:true,width:60,editor:new Ext.form.NumberField()},
                  {header:"税率",dataIndex:"taxRate",hidden:true,width:60,editor:new Ext.form.NumberField(),summaryType: 'average',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"含税金额",dataIndex:"taxPriceAmount",hidden:true,width:60,editor:new Ext.form.NumberField(),summaryType: 'average',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"数量",dataIndex:"num",width:50,editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},                 
                 {header:"价格合计",dataIndex:"totalAmount",width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"批次",dataIndex:"blockSn",width:40,editor:new Ext.form.NumberField()},
                 {header:"交货日期",dataIndex:"vdate",width:100,editor:new Ext.form.DateField({format:"Y-m-d"}),renderer:this.dateRender("Y-m-d")},
                 {header:"入库数",dataIndex:"stockNum",width:80,hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"开票数   ",dataIndex:"invoiceNum",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"备注",dataIndex:"remark",editor:new Ext.form.TextField()}
        ]);
    }
});


/**
 * 入库单相关单据
 * @class BaseStockBillPanel
 * @extends BaseProductBillPanel
 */
BaseStockBillPanel=Ext.extend(BaseProductBillPanel,{
    baseUrl:"stockIncome.ejf",
    storeMapping:["id","sn","vdate","supplier","purchaseOrder","transfer","types","sender","deliver","depot","red","inputTime","inputUser","auditing","auditor",
    "recipient","keeper","manager","totalAmount","closed","status","remark","items","fee1","fee2","fee3","fee4","other1","other2","other3","other4","other5"],
    editEmptyObj:{"id":null, "product":null,productTitle:null,productSn:null,"brand":null, "spec":null, "model":null, "unit":null, "price":null,"num":null, "remark":null, "location":null, "depot":null,"blockSn":null,"totalAmount":null,"vdate":null,"salePrice":null,"saleAmount":null,colorSn:"","other1":null,"other2":null,"other3":null},
    editStoreMapping:["id","product",{name:"productSn",mapping:"product.sn"},{name:"productTitle",mapping:"product.title"}, {name:"brand",mapping:"product.brand"}, {name:"spec",mapping:"product.spec"}, {name:"model",mapping:"product.model"},{name:"unit",mapping:"product.unit"},{name:"colorSn",mapping:"product.colorSn"}, "price","num", "remark","location", "depot","blockSn","totalAmount","vdate", "totalAmount","salePrice","saleAmount","other1","other2","other3"],
    /**
     * 子类根据情况重载
     * @param {} record
     */
    addRowDataHandler:function(r){
        var obj=Ext.apply({},r,this.editEmptyObj);
        if(r){
            obj.price=r.buyPrice;
            obj.salePrice=r.salePrice;
            obj.product=r;
            obj.product.toString=EasyJF.Ext.Util.objectToString;
            obj.productTitle=r.title;
            obj.productSn=r.sn;
            obj.spec=r.spec;
            obj.colorSn=r.colorSn;
            obj.marketPrice=r.marketPrice;
            obj.brand=r.brand;
            obj.model=r.model;
            obj.unit=r.unit;
        }
        delete obj.id;  
        return obj;
    },
    /**
     * 子类根据情况重载
     * @param {} record
     */
    selectRowDataHandler : function(obj,record) {       
        obj.toString = EasyJF.Ext.Util.objectToString;
        record.set("product", obj);
        record.set("productTitle", obj.title);
        record.set("productSn", obj.sn);
        record.set("spec", obj.spec);
        record.set("brand", obj.brand);
        record.set("colorSn", obj.colorSn);
        record.set("model", obj.model);
        record.set("unit", obj.unit);
        record.set("price", obj.buyPrice);
        record.set("salePrice", obj.salePrice);
        record.set("marketPrice", obj.marketPrice);
    },
    formFocus:function(){
        var firstField=this.fp.form.findField("supplier");
        if(!firstField)firstField=this.fp.form.findField("depot");
        if(firstField)firstField.focus("",1000);
    },
    generatorSn:function(waitMsg){
        Ext.Ajax.request({url:this.baseUrl,params:{cmd:"generatorSn",types:this.types,snType:this.snType},waitMsg:waitMsg,success :function(response){
            var sn=Ext.decode(response.responseText);
            this.fp.form.findField("sn").setOriginalValue(sn);
        },
        scope:this
        });
    },
    save:function(){
        var types=this.fp.form.findField("types");
        if(types)types.setValue(this.types);
        BaseStockBillPanel.superclass.save.call(this);
    },   
    preview:function(){
        var types=this.fp.form.findField("types");
        if(types)types.setValue(this.types);
        BaseStockBillPanel.superclass.preview.call(this);
    },
    onEdit:function(ret){
        BaseStockBillPanel.superclass.onEdit.call(this,ret);
        if(ret){
            var record = this.grid.getSelectionModel().getSelected();
            var depot=record.get("depot");
            if(depot&&depot.id){
                Ext.Ajax.request({
                    url : "depot.ejf?cmd=view",
                    params : {
                        id : depot.id
                    },
                    callback : function(options ,success,response) {
                        var ret=Ext.decode(response.responseText);
                        if(ret && ret.locations && ret.locations.length)
                            this.depotLocationEditor.store.loadData(ret.locations);
                    },
                    scope : this
                });
            }
        }
    },
    getEditColumnModel:function(){
        this.productEditor=new ProductComboBox(Ext.apply({},{
                 returnObject:true,
                 name:"productInput",
                 hiddenName:"productInput",
                 displayField:"fullName",
                 valueField:"id",           
                 width:300, 
                 choiceValue:this.selectRowData.createDelegate(this)
                 },ConfigConst.CRM.product));
        this.depotLocationEditor=new EasyJF.Ext.SmartCombox({
                                returnObject:true,
                                name : "depotLocationInput",
                                hiddenName : "depotLocationInput",
                                fieldLabel : "depotLocationInput",
                                displayField : "title",
                                valueField : "id",
                                store : new Ext.data.JsonStore({
                                    fields : ["id",'title']
                                }),
                                editable : false,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : '请选择...'
                            }
        );       
        return new Ext.grid.ColumnModel([               
                 new Ext.grid.RowNumberer({header:"序号",dataIndex:"sequence",width:35}),
                 {header:"Id",dataIndex:"id",width:1,hidden:true,hideable:false},
                 {header:"产品",dataIndex:"product",width:0,hidden:true,hideable:false},
                 {header:"产品编号",dataIndex:"productSn",width:150,editor:this.productEditor,summaryType: 'count',summaryRenderer: function(v){return "合计("+v+")";}},
                 {header:"产品名称",dataIndex:"productTitle",width:80,renderer:this.readOnlyRender()},
                 {header:"品牌",dataIndex:"brand",width:80,renderer:this.objectRender("name",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"材质/型号",dataIndex:"model",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"尺寸/规格",dataIndex:"spec",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"色号",dataIndex:"colorSn",width:80,renderer:this.readOnlyRender()},
                 {header:"单位",dataIndex:"unit",width:50,renderer:this.objectRender("title",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"单价",dataIndex:"price",width:60,editor:new Ext.form.NumberField()},
                 {header:"实收数量",dataIndex:"num",width:60,editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"金额",dataIndex:"totalAmount",width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"销售单价",dataIndex:"salePrice",hidden:true,width:80,editor:new Ext.form.NumberField()},
                 {header:"销售金额",dataIndex:"saleAmount",hidden:true,width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"批次",dataIndex:"blockSn",width:50,editor:new Ext.form.NumberField()},
                 {header:"库位",dataIndex:"location",width:80,editor:this.depotLocationEditor,renderer:function(v){return v?(v.title||v.text||v):v;}},
                 {header:"入库日期",dataIndex:"vdate",width:100,editor:new Ext.form.DateField({format:"Y-m-d"}),renderer:this.dateRender("Y-m-d"),hidden:true},
                 {header:"入库数",dataIndex:"stockNum",width:80,hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"开票数   ",dataIndex:"invoiceNum",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"备注",dataIndex:"remark",width:150,editor:new Ext.form.TextField()}
        ]);
    },
    quickSearch:function(){
                var d1=this.search_vdate1.getValue()?this.search_vdate1.getValue().format("Y-m-d"):"";
                var d2=this.search_vdate2.getValue()?this.search_vdate2.getValue().format("Y-m-d"):"";
                this.store.baseParams = Ext.apply({},{vdate1:d1,
                                                vdate2:d2,
                                                supplier:this.search_supplier.getValue()},this.baseQueryParameter);
                this.refresh();
    },
    afterList:function(){
    this.btn_refresh.hide();
    this.searchField.hide();
    this.search_vdate1=new  Ext.form.DateField({fieldLabel:"开始时间",emptyText:"开始时间",width:90,format:"Y-m-d"});
    this.search_vdate2=new  Ext.form.DateField({fieldLabel:"结束时间",emptyText:"结束时间",width:90,format:"Y-m-d"});
    this.search_supplier=new ClientComboBox(ConfigConst.CRM.supplier);
    this.grid.on("render",function(){
        this.grid.getTopToolbar().insert(10,[{
                text : "批量审核",
                cls : "x-btn-text-icon",
                icon : "images/icon-png/save.png",
                handler : this.executeMulitCmd("batchAuditing"),
                scope : this
            },"-","时间:从",this.search_vdate1,"到",this.search_vdate2,"供应商",this.search_supplier,{text:"查询",handler:this.quickSearch,scope:this}]);
            },this);    
    }
});

/**
 * 出库单相关单据
 * @class BaseStockBillPanel
 * @extends BaseProductBillPanel
 */
BaseStockOutcomeBillPanel=Ext.extend(BaseStockBillPanel,{
    printData:false,    
    storeMapping:["id","sn","vdate","client","distributor","orders","sendInform","transfer","types","sender","deliver","depot","red","inputTime","inputUser","auditing","auditor",
    "recipient","keeper","manager","seller","sender","totalAmount","closed","status","remark","items","fee1","fee2","fee3","fee4","other1","other2","other3","other4","other5","other6"],
    baseUrl:"stockOutcome.ejf",
    formFocus:function(){
        var firstField=this.fp.form.findField("client");
        if(!firstField)firstField=this.fp.form.findField("depot");
        if(firstField)firstField.focus("",1000);
    },
    autoCountData:function(record){
        var p = record.get("salePrice");
        var n = record.get("num");       
        var total = p && n ? p * n : 0;       
        record.set("saleAmount",parseFloat(total));
    },
    getEditColumnModel:function(){
        this.productEditor=new ProductComboBox(Ext.apply({},{
                 returnObject:true,
                 name:"productInput",
                 hiddenName:"productInput",
                 displayField:"fullName",
                 valueField:"id",           
                 width:300, 
                 choiceValue:this.selectRowData.createDelegate(this)
                 },ConfigConst.CRM.product));
        this.depotLocationEditor=new EasyJF.Ext.SmartCombox({
                                returnObject:true,
                                name : "depotLocationInput",
                                hiddenName : "depotLocationInput",
                                fieldLabel : "depotLocationInput",
                                displayField : "title",
                                valueField : "id",
                                store : new Ext.data.JsonStore({
                                    fields : ["id",'title']
                                }),
                                editable : false,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : '请选择...'
                            }
        );       
        var otherConfig=ConfigConst.BASE.getCompanyDictionaryCombo("propertyOther1","属性1","StockItemOther1","title",false,true);
        delete otherConfig.hiddenName;
        delete otherConfig.valueField;
        var other1Editor=new EasyJF.Ext.SmartCombox(Ext.apply({},{typeAhead : false,editable:true,hiddenName:null},otherConfig));
        return new Ext.grid.ColumnModel([               
                 new Ext.grid.RowNumberer({header:"序号",dataIndex:"sequence",width:35}),
                 {header:"Id",dataIndex:"id",width:1,hidden:true,hideable:false},
                 {header:"房间位置",dataIndex:"other1",width:100,editor:other1Editor},
                 {header:"产品",dataIndex:"product",width:0,hidden:true,hideable:false},
                 {header:"产品编号",dataIndex:"productSn",width:150,editor:this.productEditor,summaryType: 'count',summaryRenderer: function(v){return "合计("+v+")";}},
                 {header:"产品名称",dataIndex:"productTitle",width:80,renderer:this.readOnlyRender()},
                 {header:"品牌",dataIndex:"brand",width:80,renderer:this.objectRender("name",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"材质/型号",dataIndex:"model",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"尺寸/规格",dataIndex:"spec",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"单位",dataIndex:"unit",width:50,renderer:this.objectRender("title",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"色号",dataIndex:"colorSn",width:80,renderer:this.readOnlyRender()},
                 {header:"单价",dataIndex:"price",width:60,hidden:true,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;})},
                 {header:"实收数量",dataIndex:"num",width:60,editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"金额",dataIndex:"totalAmount",hidden:true,width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"销售单价",dataIndex:"salePrice",width:80,editor:new Ext.form.NumberField()},
                 {header:"销售金额",dataIndex:"saleAmount",width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"批次",dataIndex:"blockSn",hidden:true,width:50,editor:new Ext.form.NumberField()},
                 {header:"库位",dataIndex:"location",hidden:true,width:80,editor:this.depotLocationEditor,renderer:function(v){return v?(v.title||v.text||v):v;}},
                 {header:"出库日期",dataIndex:"vdate",width:100,editor:new Ext.form.DateField({format:"Y-m-d"}),renderer:this.dateRender("Y-m-d"),hidden:true},
                 {header:"出库数",dataIndex:"stockNum",width:80,hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"开票数   ",dataIndex:"invoiceNum",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"备注",dataIndex:"remark",editor:new Ext.form.TextField()}
        ]);
    },
    printRecord:function(types){
        return function(){
            var record = this.grid.getSelectionModel().getSelected();
            if (!record) {
                Ext.Msg.alert("提示",
                        "请先选择要操作的数据！");
                return false;
            }
            window.open(this.baseUrl+"?cmd=print&type="+types+"&id=" + record.get("id"));
        }
    },
    quickSearch : function() {
        var d1 = this.search_vdate1.getValue() ? this.search_vdate1.getValue().format("Y-m-d") : "";
        var d2 = this.search_vdate2.getValue() ? this.search_vdate2.getValue().format("Y-m-d") : "";
        this.store.baseParams = Ext.apply({}, {
            vdate1 : d1,
            vdate2 : d2,
            client : this.search_client.getValue(),
            distributor:this.search_distributor.getValue()
        },this.baseQueryParameter);
        this.refresh();
    },
    afterList:function(){
        this.btn_refresh.hide();
        this.searchField.hide();
        this.search_vdate1=new  Ext.form.DateField({fieldLabel:"开始时间",emptyText:"开始时间",width:90,format:"Y-m-d"});
        this.search_vdate2=new  Ext.form.DateField({fieldLabel:"结束时间",emptyText:"»ææ¶é´",width:90,format:"Y-m-d"});
        this.search_client=new ClientComboBox(Ext.apply({},{emptyText:"å®¢æ·",width:100},ConfigConst.CRM.client));
        this.search_distributor=new ClientComboBox(Ext.apply({},{emptyText:"åéå",width:100},ConfigConst.CRM.distributor));
        
        this.grid.on("render",function(){
            this.grid.getTopToolbar().insert(10,["-",
            {
                text : "æ¹éå®¡æ ¸",
                cls : "x-btn-text-icon",
                icon : "images/icon-png/save.png",
                handler : this.executeMulitCmd("batchAuditing"),
                scope : this
            },"-","æ¶é´:ä»",this.search_vdate1,"å°",this.search_vdate2,this.search_distributor,this.search_client,"-",{text:"æ¥è¯¢",handler:this.quickSearch,scope:this}]);
            
            this.grid.getTopToolbar().insertButton(11,{text : "æå°",
             iconCls:"print-icon",
             menu:new Ext.menu.Menu({items:[{text:"åè´§/åºåºå",handler:this.printRecord(0),scope:this},{text:"åæ§å",handler:this.printRecord(1),scope:this},{text:"å©æ¶¦åæå",handler:this.printRecord(3),scope:this,hidden:true}]})
             });    
            
                },this);    
            
    }   
});

/**
 * çç¹åæ®åºæ¬ä¿¡æ¯
 * @class BaseStockTakeBillPanel
 * @extends BaseStockBillPanel
 */
BaseStockTakeBillPanel=Ext.extend(BaseStockBillPanel,{
    baseUrl:"stockIncome.ejf",
    editEmptyObj:{"id":null, "product":null,productTitle:null,productSn:null,"brand":null, "spec":null, "model":null, "unit":null, "price":null,"num":null, "remark":null, "location":null, "depot":null,"blockSn":null,"totalAmount":null,"vdate":null,"salePrice":null,"saleAmount":null,"factNum":null,"accountNum":null},
    editStoreMapping:["id","product",{name:"productSn",mapping:"product.sn"},{name:"productTitle",mapping:"product.title"}, {name:"brand",mapping:"product.brand"}, {name:"spec",mapping:"product.spec"}, {name:"model",mapping:"product.model"},{name:"unit",mapping:"product.unit"}, "price","num", "remark","location", "depot","blockSn","totalAmount","vdate", "totalAmount","salePrice","saleAmount","factNum","accountNum"],
    formFocus:function(){
        var firstField=this.fp.form.findField("depot");
        if(firstField)firstField.focus("",1000);
    },
    getEditColumnModel:function(){
        this.productEditor=new ProductComboBox(Ext.apply({},{
                 returnObject:true,
                 name:"productInput",
                 hiddenName:"productInput",
                 displayField:"fullName",
                 valueField:"id",           
                 width:300, 
                 choiceValue:this.selectRowData.createDelegate(this)
                 },ConfigConst.CRM.product));
        this.depotLocationEditor=new EasyJF.Ext.SmartCombox({
                                returnObject:true,
                                name : "depotLocationInput",
                                hiddenName : "depotLocationInput",
                                fieldLabel : "depotLocationInput",
                                displayField : "title",
                                valueField : "id",
                                store : new Ext.data.JsonStore({
                                    fields : ["id",'title']
                                }),
                                editable : false,
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : 'è¯·éæ©...'
                            }
        );       
        return new Ext.grid.ColumnModel([               
                 new Ext.grid.RowNumberer({header:"序号",dataIndex:"sequence",width:35}),
                 {header:"Id",dataIndex:"id",width:1,hidden:true,hideable:false},
                 {header:"产品",dataIndex:"product",width:0,hidden:true,hideable:false},
                 {header:"产品编号",dataIndex:"productSn",width:150,editor:this.productEditor,summaryType: 'count',summaryRenderer: function(v){return "合计("+v+")";}},
                 {header:"产品名称",dataIndex:"productTitle",width:80,renderer:this.readOnlyRender()},
                 {header:"品牌",dataIndex:"brand",width:80,renderer:this.objectRender("name",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"材质/型号",dataIndex:"model",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"尺寸/规格",dataIndex:"spec",width:80,hidden:true,renderer:this.readOnlyRender()},
                 {header:"单位",dataIndex:"unit",width:50,renderer:this.objectRender("title",EasyJF.Ext.Util.readOnlyGridCellColor)},
                 {header:"账存数",dataIndex:"accountNum",width:60,renderer:this.readOnlyRender(),editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"实存数",dataIndex:"factNum",width:60,editor:new Ext.form.NumberField(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"数量",dataIndex:"num",width:60,renderer:this.readOnlyRender(),summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"单价",dataIndex:"price",width:60,hidden:true,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;})},
                 {header:"金额",dataIndex:"totalAmount",hidden:true,width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"销售单价",dataIndex:"salePrice",width:80,editor:new Ext.form.NumberField()},
                 {header:"销售金额",dataIndex:"saleAmount",width:80,renderer:this.readOnlyRender(function(v){return v&&v.toFixed?v.toFixed(2):v;}),summaryType:'sum',summaryRenderer: function(v, params, data){return v.toFixed(2);}},
                 {header:"批次",dataIndex:"blockSn",width:50,editor:new Ext.form.NumberField()},
                 {header:"库位",dataIndex:"location",width:80,editor:this.depotLocationEditor,renderer:function(v){return v?(v.title||v.text||v):v;}},
                 {header:"出库日期",dataIndex:"vdate",width:100,editor:new Ext.form.DateField({format:"Y-m-d"}),renderer:this.dateRender("Y-m-d"),hidden:true},
                 {header:"出库数",dataIndex:"stockNum",width:80,hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"开票数   ",dataIndex:"invoiceNum",width:80,editor:new Ext.form.NumberField(),hidden:true,summaryType: 'sum',summaryRenderer: function(v){return v.toFixed(2);}},
                 {header:"备注",dataIndex:"remark",editor:new Ext.form.TextField()}
        ]);
    }
});

/**window约束在视图中显示**/

Ext.apply(Ext.Window.prototype,{constrain:true});

EasyJF.Ext.AdvanceSearch = Ext.extend(Ext.Button, {
	iconCls: "search-icon",
	text: "高级搜索",
	store: undefined,
	formConfig: {},
	handler: function () {
		if (this.isExpanded()) this.collapse();
		else this.expand()
	},
	isExpanded: function () {
		return this.layer && this.layer.isVisible()
	},
	isCreate: function () {
		return this.layer
	},
	expand: function () {
		if (!this.isCreate()) {
			this.create();
			var advanceSearch = this;
			this.formPanel.getForm().items.each(function (field) {
				if (field.expand) {
					field.on("expand", advanceSearch.onFieldExpand, advanceSearch);
					field.on("collapse", advanceSearch.onFieldCollapse, advanceSearch)
				}
				if (field.getXType() == "datefield" || field.getXType() == "datesearchfield") field.beforeShowMenu = function () {
					if (this.menuEventBound) return;
					this.menuEventBound = true;
					field.menu.on("hide", advanceSearch.onFieldCollapse, advanceSearch);
					field.menu.on("show", advanceSearch.onFieldExpand, advanceSearch)
				}
			})
		}
		this.layer.alignTo(this.el, "bl");
		this.layer.show();
		Ext.getDoc().on("mousewheel", this.collapseIf, this);
		Ext.getDoc().on("mousedown", this.collapseIf, this);
		this.fireEvent("expand", this)
	},
	onFieldExpand: function () {
		Ext.getDoc().un("mousewheel", this.collapseIf, this);
		Ext.getDoc().un("mousedown", this.collapseIf, this)
	},
	onFieldCollapse: function () {
		Ext.getDoc().on("mousewheel", this.collapseIf, this);
		Ext.getDoc().on("mousedown", this.collapseIf, this)
	},
	collapse: function () {
		if (!this.isExpanded()) return;
		this.layer.hide();
		Ext.getDoc().un("mousewheel", this.collapseIf, this);
		Ext.getDoc().un("mousedown", this.collapseIf, this);
		this.fireEvent("collapse", this)
	},
	collapseIf: function (but) {
		if (!but.within(this.el) && !but.within(this.layer)) this.collapse()
	},
	destroy: function () {
		if (this.destroyed) return;
		this.destroyed = true;
		Ext.AdvanceSearch.superclass.destroy.call(this);
		if (this.formPanel) this.formPanel.destroy();
		if (this.layer) this.layer.destroy();
		Ext.getDoc().un("mousewheel", this.collapseIf, this);
		Ext.getDoc().un("mousedown", this.collapseIf, this)
	},
	create: function () {
		this.layer = new Ext.Layer({
			shadow: true,
			constrain: false
		});
		var nav = new Ext.KeyNav(this.layer, {
			"enter": function (e) {
				this.search()
			},
			scope: this
		});
		var formConfig = {
			width: 300,
			frame: true,
			bodyStyle: "padding:10px",
			baseParams: this.baseParams || {},
			defaultType: "textfield",
			labelWidth: 60,
			labelAlign: "right",
			defaults: {
				width: 180
			},
			items: this.createFormItems(),
			buttons: [{
				text: "重置",
				scope: this,
				handler: this.reset
			},
			{
				text: "搜索",
				scope: this,
				handler: this.search
			},
			{
				text: "取消",
				scope: this,
				handler: this.collapse
			}]
		};
		Ext.apply(this.formConfig, formConfig);
		this.formPanel = new Ext.FormPanel(formConfig);
		this.formPanel.render(this.layer)
	},
	reset: function () {
		var formPanel = this.formPanel.getForm();
		formPanel.reset()
	},
	search: function () {
		this.store.removeAll();
		this.store.load({
			params: this.formPanel.getForm().getValues()
		});
		this.collapse()
	},
	findField: function (field) {
		return this.formPanel.getForm().findField(field)
	},
	createFormItems: function () {}
});
Ext.reg("advanceSearch", EasyJF.Ext.AdvanceSearch);
//屏蔽浏览器的右键
//Ext.getBody().on('contextmenu',function(e){e.preventDefault();},this);