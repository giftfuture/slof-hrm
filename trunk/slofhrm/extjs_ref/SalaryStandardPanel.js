if (typeof SalaryStandardItemList === "undefined") {
	SalaryStandardItemList = Ext.extend(BaseGridList, {
				border : false,
				pageSize : 15,
				url : "salaryStandardItem.ejf?cmd=list&pageSize=15",
				typesData : [["增项", 0], ["减项", 1]],
				refresh : function() {
					this.store.baseParams = {
						types : this.btn_types.getValue(),
						searchKey : this.btn_title.getValue()
					};
					this.store.removeAll();
					this.store.reload()
				},
				reset : function() {
					this.btn_title.reset();
					this.btn_types.reset();
					this.refresh()
				},
				storeMapping : ["id", "title", "types", "sequence", "category", "intro", "status"],
				initComponent : function() {
					this.keys = {
						key : Ext.EventObject.ENTER,
						fn : this.refresh,
						scope : this
					};
					this.cm = new Ext.grid.ColumnModel([{
								header : "项目名称",
								sortable : true,
								width : 150,
								dataIndex : "title"
							}, {
								header : "类别",
								sortable : true,
								width : 80,
								dataIndex : "types",
								renderer : this.typesRender(this.typesData)
							}, {
								header : "序号",
								sortable : true,
								width : 80,
								dataIndex : "sequence"
							}]);
					this.btn_title = new Ext.form.TextField({
								xtype : "textfield",
								width : 80,
								listeners : {
									change : this.refresh,
									scope : this
								}
							});
					this.btn_types = new EasyJF.Ext.SmartCombox(Ext.apply({}, {
								width : 100,
								name : "types",
								allowBlank : true,
								hiddenName : "types",
								listeners : {
									select : function(a) {
										this.refresh()
									},
									scope : this
								}
							}, EasyJF.Ext.Util.buildCombox("types", "类别", this.typesData, "")));
					this.tbar = ["类别:", this.btn_types, "名称:", this.btn_title, {
								text : "查询",
								handler : this.refresh,
								scope : this
							}, {
								text : "重置",
								handler : this.reset,
								scope : this
							}];
					SalaryStandardItemList.superclass.initComponent.call(this);
					this.store.load()
				}
			})
}
if (typeof SalaryStandardItemSelectWin === "undefined") {
	SalaryStandardItemSelectWin = Ext.extend(Ext.Window, {
				title : "选择工资基本项目",
				width : 450,
				height : 350,
				layout : "fit",
				buttonAlign : "center",
				closeAction : "hide",
				callback : Ext.emptyFn,
				choice : function() {
					var b = this.list.grid.getSelectionModel().getSelections();
					if (!b && !b.length < 1) {
						Ext.Msg.alert("提示", "请先选择要操作的行!");
						return false
					}
					var a = [];
					for (var c = 0; c < b.length; c++) {
						a[c] = b[c].data
					}
					this.hide();
					this.fireEvent("select", a, this)
				},
				initComponent : function() {
					this.buttons = [{
								text : "确定",
								handler : this.choice,
								scope : this
							}, {
								text : "取消",
								handler : function() {
									this.hide()
								},
								scope : this
							}];
					SalaryStandardItemSelectWin.superclass.initComponent.call(this);
					this.list = new SalaryStandardItemList();
					this.list.grid.on("rowdblclick", this.choice, this);
					this.add(this.list);
					this.addEvents("select")
				}
			})
}
SalaryStandardPanel = Ext.extend(EasyJF.Ext.CrudListPanel, {
			id : "salarystandardPanel",
			baseUrl : "salaryStandard.ejf",
			editStoreMapping : ["id", "sequence", "standardItem", "theSum"],
			addStandardItem : function(a) {
				return function() {
					if (!this[a.id + "Win"]) {
						this[a.id + "Win"] = new SalaryStandardItemSelectWin();
						this[a.id + "Win"].on("select", this.addStandardItemRow(a), this)
					}
					this[a.id + "Win"].show()
				}
			},
			addStandardItemRow : function(a) {
				return function(b) {
					var g = a.store.getCount() - 1;
					var d = Ext.data.Record.create(["id", "sequence", "standardItem", "theSum"]);
					for (var c = 0; c < b.length; c++) {
						var h = this.fp.form.findField("id").getValue();
						var f = Ext.apply({}, !b[c].title ? b[c] : {
									standardItem : b[c],
									sequence : b[c].sequence
								});
						if (f.id == h || a.store.find("id", f.id) >= 0) {
							continue
						}
						if (b[c].title) {
							delete f.id
						}
						var e = new d(f);
						a.store.add(e)
					}
				}
			},
			removeStandardItem : function(a) {
				return function() {
					EasyJF.Ext.Util.removeGridRows(a)
				}
			},
			doSum : function(c, b) {
				var e = 0;
				for (var a = 0; a < c.store.getCount(); a++) {
					var d = c.store.getAt(a).get("theSum");
					if (d) {
						e += d
					}
				}
				b.el.innerHTML = "<font color=blue>" + e + "</font>"
			},
			createForm : function() {
				if (!this.editGrid1) {
					this.editStore1 = new Ext.data.JsonStore({
								url : "salaryStandard.ejf?cmd=getSalaryStandardItemList",
								id : "itemId",
								root : "result",
								totalProperty : "rowCount",
								fields : this.editStoreMapping
							});
					this.editCM1 = new Ext.grid.ColumnModel([{
								header : "id",
								sortable : false,
								width : 1,
								dataIndex : "id",
								hidden : true
							}, {
								header : "项目",
								sortable : false,
								width : 200,
								dataIndex : "standardItem",
								renderer : this.objectRender("title")
							}, {
								header : "行次",
								sortable : false,
								width : 80,
								dataIndex : "sequence"
							}, {
								header : "基本金额",
								sortable : false,
								width : 80,
								dataIndex : "theSum",
								renderer : this.theSumRender,
								editor : new Ext.form.NumberField()
							}]);
					this.editGrid1 = new Ext.grid.EditorGridPanel({
								cm : this.editCM1,
								store : this.editStore1,
								clicksToEdit : 1,
								autoExpandColumn : 1,
								listeners : {
									afteredit : function(b) {
										if (b.field == "theSum") {
											this.doSum(b.grid, this.btn_incomeSum)
										}
									},
									scope : this
								}
							})
				}
				if (!this.editGrid2) {
					this.editStore2 = new Ext.data.JsonStore({
								url : "salaryStandard.ejf?cmd=getSalaryStandardItemList",
								id : "itemId",
								root : "result",
								totalProperty : "rowCount",
								fields : this.editStoreMapping
							});
					this.editCM2 = new Ext.grid.ColumnModel([{
								header : "id",
								sortable : false,
								width : 1,
								dataIndex : "id",
								hidden : true
							}, {
								header : "项目",
								sortable : false,
								width : 200,
								dataIndex : "standardItem",
								renderer : this.objectRender("title")
							}, {
								header : "行次",
								sortable : false,
								width : 80,
								dataIndex : "sequence"
							}, {
								header : "基本金额",
								sortable : false,
								width : 80,
								dataIndex : "theSum",
								renderer : this.theSumRender,
								editor : new Ext.form.NumberField()
							}]);
					this.editGrid2 = new Ext.grid.EditorGridPanel({
								cm : this.editCM2,
								store : this.editStore2,
								clicksToEdit : 1,
								autoExpandColumn : 1,
								listeners : {
									afteredit : function(b) {
										if (b.field == "theSum") {
											this.doSum(b.grid, this.btn_payoutSum)
										}
									},
									scope : this
								}
							})
				}
				this.btn_incomeSum = new Ext.Toolbar.TextItem("<font color=blue>0</font>");
				this.btn_payoutSum = new Ext.Toolbar.TextItem("<font color=blue>0</font>");
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 70,
							labelAlign : "right",
							items : [{
										xtype : "fieldset",
										title : "基本信息",
										autoHeight : true,
										items : [{
													xtype : "hidden",
													name : "id"
												}, EasyJF.Ext.Util.twoColumnPanelBuild({
															fieldLabel : "标准名称",
															name : "title",
															allowBlank : false
														}, {
															fieldLabel : "编号",
															name : "sn",
															allowBlank : false
														}, {
															fieldLabel : "使用日期",
															name : "vdate",
															xtype : "datefield",
															value : new Date(),
															format : "Y-m-d"
														}, Ext.apply({}, {
																	fieldLabel : "状态",
																	name : "status",
																	hiddenName : "status"
																}, ConfigConst.BASE.status)), {
													xtype : "textarea",
													fieldLabel : "简介",
													name : "intro",
													anchor : "-20",
													height : 50
												}]
									}, {
										layout : "column",
										defaults : {
											columnWidth : 0.5
										},
										items : [{
													layout : "fit",
													title : "应发项目",
													height : 250,
													bbar : [{
																text : "添加",
																handler : this.addStandardItem(this.editGrid1),
																scope : this
															}, {
																text : "删除",
																handler : this.removeStandardItem(this.editGrid1),
																scope : this
															}, "->", "合计:", this.btn_incomeSum],
													items : this.editGrid1
												}, {
													layout : "fit",
													title : "应扣项目",
													height : 250,
													bbar : [{
																text : "添加",
																handler : this.addStandardItem(this.editGrid2),
																scope : this
															}, {
																text : "删除",
																handler : this.removeStandardItem(this.editGrid2),
																scope : this
															}, "->", "合计:", this.btn_payoutSum],
													items : this.editGrid2
												}]
									}]
						});
				return a
			},
			save : function() {
				var a = EasyJF.Ext.Util.getEditGridData(this.editGrid1, "salaryStandard1_", "standardItem");
				Ext.apply(a, EasyJF.Ext.Util.getEditGridData(this.editGrid2, "salaryStandard2_", "standardItem"));
				this.fp.form.baseParams = a;
				SalaryStandardPanel.superclass.save.call(this)
			},
			create : function() {
				SalaryStandardPanel.superclass.create.call(this);
				this.editGrid1.store.removeAll();
				this.editGrid2.store.removeAll();
				this.fp.form.clearDirty()
			},
			edit : function() {
				var b = SalaryStandardPanel.superclass.edit.call(this);
				if (b) {
					this.editGrid1.store.removeAll();
					this.editGrid2.store.removeAll();
					var a = this.grid.getSelectionModel().getSelected();
					if (a && a.get("incomeItems")) {
						this.addStandardItemRow(this.editGrid1).call(this, a.get("incomeItems"))
					}
					if (a && a.get("payoutItems")) {
						this.addStandardItemRow(this.editGrid2).call(this, a.get("payoutItems"))
					}
					this.fp.form.clearDirty()
				}
				return b
			},
			createWin : function() {
				return this.initWin(668, 480, "公司薪酬标准管理")
			},
			storeMapping : ["id", "title", "vdate", "modifyTime", "intro", "types", "items", "incomeItems", "payoutItems", "sn", "types", "incomeSum", "payoutSum", "theSum", "status"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "标准名称",
							sortable : true,
							width : 100,
							dataIndex : "title"
						}, {
							header : "薪酬编号",
							sortable : true,
							width : 100,
							dataIndex : "sn"
						}, {
							header : "制订时间",
							sortable : true,
							width : 100,
							dataIndex : "vdate",
							renderer : this.dateRender()
						}, {
							header : "更新时间",
							sortable : true,
							width : 100,
							dataIndex : "modifyTime",
							renderer : this.dateRender()
						}, {
							header : "简介",
							sortable : true,
							width : 300,
							dataIndex : "intro"
						}, {
							header : "状态",
							sortable : true,
							width : 6,
							dataIndex : "status"
						}]);
				SalaryStandardPanel.superclass.initComponent.call(this)
			}
		});