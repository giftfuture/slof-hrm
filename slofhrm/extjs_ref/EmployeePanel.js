if (typeof Global === "undefined") {
	Global = {};
}

if (!Global.departmentLoader) {
	Global.departmentLoader = new EasyJF.Ext.MemoryTreeLoader({
				varName : "Global.DEPARTMENT_NODES",
				url : "department.ejf?cmd=getTree&pageSize=-1&treeData=true&all=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
						if (typeof node.attributes.checked !== "undefined") {
							treeLoader.baseParams.checked = false;
						}
					}
				}
			});
}

if (typeof RoleList === "undefined") {
	RoleList = Ext.extend(BaseGridList, {
				url : "role.ejf?cmd=list",
				loadData : true,
				storeMapping : ["id", "name", "title", "description"],
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "编码",
								sortable : true,
								width : 60,
								dataIndex : "name"
							}, {
								header : "名称",
								sortable : true,
								width : 120,
								dataIndex : "title"
							}, {
								header : "简介",
								sortable : true,
								width : 100,
								dataIndex : "description"
							}])
					RoleList.superclass.initComponent.call(this);
				}
			});
}
if (typeof PermissionList === "undefined") {
	PermissionList = Ext.extend(BaseGridList, {
				pageSize : 20,
				loadData : true,
				url : "permission.ejf?cmd=list",
				storeMapping : ["id", "name", "description"],
				quickSearch : function() {
					this.grid.store.removeAll();
					this.grid.store.reload({
								params : {
									searchKey : this.btn_search.getValue(),
									start : 0
								}
							});
				},
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "权限名",
								sortable : true,
								width : 60,
								dataIndex : "name"
							}, {
								header : "简介",
								sortable : true,
								width : 100,
								dataIndex : "description"
							}]);
					this.btn_search = new Ext.form.TextField({
								width : 100
							});
					this.tbar = ["关键字:", this.btn_search, {
								text : "查询",
								handler : this.quickSearch,
								scope : this,
								cls : "x-btn-text-icon",
								icon : "images/icon-png/search.png"
							}];
					PermissionList.superclass.initComponent.call(this);
				}
			});
}
if (typeof DeptList === "undefined") {
	DeptList = Ext.extend(BaseGridList, {
				url : "department.ejf?cmd=listAll",
				loadData : true,
				storeMapping : ["id", "title", "sn", "admin", "parent"],
				initComponent : function() {
					var chkM = new Ext.grid.CheckboxSelectionModel();
					this.gridConfig = {
						sm : chkM
					}, this.cm = new Ext.grid.ColumnModel([chkM, {
								header : "名称",
								sortable : true,
								width : 60,
								dataIndex : "title"
							}, {
								header : "编号",
								sortable : true,
								width : 120,
								dataIndex : "sn"
							}, {
								header : "所属部门",
								sortable : true,
								width : 60,
								dataIndex : "parent",
								renderer : EasyJF.Ext.Util.objectRender("title")
							}, {
								header : "管理员",
								sortable : true,
								width : 100,
								dataIndex : "admin",
								renderer : EasyJF.Ext.Util.objectRender("trueName")
							}])
					DeptList.superclass.initComponent.call(this);
				}
			});
}

/**
 * 员工信息管理
 * 
 * @class EmployeePanel
 * @extends EasyJF.Ext.CrudPanel
 */
EmployeePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			importData : true,
			exportData : true,
			pageSize : 17,
			baseUrl : "employee.ejf",
			searchWin : {
				width : 550,
				height : 225,
				title : "高级查询"
			},
			choiceSelectGridData : function(grid, winName, gridList, winTitle) {
				return function() {
					var theGrid = this[grid];
					if (!this[winName]) {
						var glist = eval("new " + gridList);
						this[winName] = new EasyJF.Ext.GridSelectWin({
									title : winTitle,
									width : 650,
									grid : glist
								});
						this[winName].on("select", function(datas) {
									var ds = [];
									for (var i = 0; i < datas.length; i++) {// 过滤掉重复的内容
										if (theGrid.store.find("id", datas[i].id) < 0)
											ds[ds.length] = datas[i];
									}
									theGrid.store.loadData(ds, true);
								}, this);
					}
					this[winName].show();
				}
			},
			createForm : function() {
				var chkM = new Ext.grid.CheckboxSelectionModel();
				this.editGrid = new Ext.grid.GridPanel({
							title : "额外权限",
							sm : chkM,
							viewConfig : {
								forceFit : true
							},
							cm : new Ext.grid.ColumnModel([chkM, new Ext.grid.RowNumberer({
												header : "序号",
												width : 40
											}), {
										header : "ID",
										dataIndex : "id",
										hideable : true,
										hidden : true
									}, {
										header : "权限名称",
										dataIndex : "name",
										width : 100
									}, {
										header : "简介",
										dataIndex : "description",
										width : 300
									}]),
							store : new Ext.data.JsonStore({
										fields : ["id", "name", "description"]
									}),
							bbar : [{
										text : "添加权限",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_add.png",
										handler : this.choiceSelectGridData("editGrid", "selectWin", "PermissionList", "选择权限"),
										scope : this
									}, {
										text : "删除权限",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_delete.png",
										handler : function() {
											EasyJF.Ext.Util.removeGridRows(this.editGrid);
										},
										scope : this
									}]
						});
				var roleChkM = new Ext.grid.CheckboxSelectionModel();
				this.roleGrid = new Ext.grid.GridPanel({
							title : "用户角色",
							sm : roleChkM,
							viewConfig : {
								forceFit : true
							},
							cm : new Ext.grid.ColumnModel([chkM, new Ext.grid.RowNumberer({
												header : "序号",
												width : 40
											}), {
										header : "ID",
										dataIndex : "id",
										hideable : true,
										hidden : true
									}, {
										header : "角色编码",
										sortable : true,
										width : 70,
										dataIndex : "name"
									}, {
										header : "名称",
										sortable : true,
										width : 100,
										dataIndex : "title"
									}, {
										header : "简介",
										sortable : true,
										width : 80,
										dataIndex : "desciption",
										hidden : true
									}]),
							store : new Ext.data.JsonStore({
										fields : ["id", "name", "title", "description"]
									}),
							bbar : [{
										text : "添加角色",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_add.png",
										handler : this.choiceSelectGridData("roleGrid", "selectRoleWin", "RoleList", "选择角色"),
										scope : this
									}, {
										text : "删除角色",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_delete.png",
										handler : function() {
											EasyJF.Ext.Util.removeGridRows(this.roleGrid);
										},
										scope : this
									}]
						});
				var deptChkM = new Ext.grid.CheckboxSelectionModel();
				this.deptGrid = new Ext.grid.GridPanel({
							title : "额外部门",
							sm : deptChkM,
							viewConfig : {
								forceFit : true
							},
							cm : new Ext.grid.ColumnModel([chkM, new Ext.grid.RowNumberer({
												header : "序号",
												width : 40
											}), {
										header : "ID",
										dataIndex : "id",
										hideable : true,
										hidden : true
									}, {
										header : "部门名称",
										sortable : true,
										width : 70,
										dataIndex : "title"
									}, {
										header : "所属部门",
										sortable : true,
										width : 70,
										dataIndex : "parent",
										renderer : this.objectRender("title")
									}, {
										header : "部门管理员",
										sortable : true,
										width : 100,
										dataIndex : "admin",
										renderer : this.objectRender("trueName")
									}]),
							store : new Ext.data.JsonStore({
										fields : ["id", "sn", "title", "admin"]
									}),
							bbar : [{
										text : "添加部门",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_add.png",
										handler : this.choiceSelectGridData("deptGrid", "selectDeptWin", "DeptList", "选择部门"),
										scope : this
									}, {
										text : "删除部门",
										cls : "x-btn-text-icon",
										icon : "images/icons/application_form_delete.png",
										handler : function() {
											EasyJF.Ext.Util.removeGridRows(this.deptGrid);
										},
										scope : this
									}]
						});
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : 'right',
							items : [{
										xtype : "hidden",
										name : "id"
									}, {
										xtype : "fieldset",
										title : "基本信息",
										labelWidth : 70,
										autoHeight : true,
										items : [EasyJF.Ext.Util.twoColumnPanelBuild({
													fieldLabel : "用户名称",
													name : "name",
													allowBlank : false
												}, {
													fieldLabel : "密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码",
													name : "password",
													inputType : "password",
													allowBlank : false
												}, {
													fieldLabel : "真实姓名",
													name : "trueName",
													allowBlank : false
												}, Ext.apply({
															allowBlank : false
														}, ConfigConst.BASE.sex), {
													fieldLabel : "联系电话",
													name : "tel",
													allowBlank : false
												}, {
													fieldLabel : "电子邮件",
													name : "email",
													allowBlank : false
												}, {
													xtype : "treecombo",
													fieldLabel : "部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门",
													displayField : "title",
													name : "deptId",
													hiddenName : "deptId",
													tree : new Ext.tree.TreePanel({
																root : new Ext.tree.AsyncTreeNode({
																			id : "root",
																			text : "选择部门",
																			expanded : true,
																			loader : Global.departmentLoader
																		})
															})
												}, ConfigConst.BASE.getCompanyDictionaryCombo("duty", "职务", "EmployeeDuty"), {
													fieldLabel : "紧急电话",
													name : "contractNo"
												}, EasyJF.Ext.Util.buildCombox("workerOnly", "系统用户", [["是", false], ["否", true]], false))

										]
									}, {
										xtype : "panel",
										// title : "权限资源",
										anchor : "100%",
										height : 250,
										layout : "fit",
										items : {
											xtype : "tabpanel",
											activeTab : 0,
											items : [this.roleGrid, this.editGrid, this.deptGrid]
										}
									}]
						});
				return formPanel;
			},
			searchFormPanel : function() {
				var formPanel = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : "right",
							items : [{
										xtype : "fieldset",
										title : "查询条件",
										height : 140,
										layout : 'column',
										items : [{
													columnWidth : .50,
													layout : 'form',
													defaultType : 'textfield',
													items : [{
																fieldLabel : "用户名称",
																name : "name",
																anchor : '90%'
															}, {
																fieldLabel : "真实姓名",
																name : "trueName",
																anchor : '90%'
															}, {
																fieldLabel : "联系电话",
																name : "tel",
																anchor : '90%'
															}, {
																fieldLabel : "输入日期(始)",
																name : "inputStartTime",
																anchor : '90%',
																xtype : 'datefield',
																format : 'Y-m-d'
															}]
												}, {
													columnWidth : .50,
													layout : 'form',
													defaultType : 'textfield',
													defaults : {
														width : 130
													},
													items : [{
																fieldLabel : "电子邮件",
																name : "email",
																anchor : '90%'
															}, {
																fieldLabel : "合同编码",
																name : "contractNo",
																anchor : '90%'
															}, {
																xtype : "treecombo",
																fieldLabel : "部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门",
																displayField : "title",
																name : "deptId",
																hiddenName : "deptId",
																anchor : '90%',
																tree : new Ext.tree.TreePanel({
																			root : new Ext.tree.AsyncTreeNode({
																						id : "root",
																						text : "选择部门",
																						expanded : true,
																						loader : Global.departmentLoader
																					})
																		})
															}, {
																fieldLabel : "输入日期(末)",
																name : "inputEndTime",
																anchor : '90%',
																xtype : 'datefield',
																format : 'Y-m-d'
															}]
												}]
									}]
						});
				return formPanel;
			},
			onCreate : function() {
				if (this.editGrid.store.getCount() > 0)
					this.editGrid.store.removeAll();
				if (this.roleGrid.store.getCount() > 0)
					this.roleGrid.store.removeAll();
				this.fp.form.findField("password").el.dom.readOnly = false;
			},
			onEdit : function(ret) {
				if (ret) {
					this.editGrid.store.removeAll();
					this.roleGrid.store.removeAll();
					this.deptGrid.store.removeAll();
					this.editGrid.store.loadData(this.grid.getSelectionModel().getSelected().get("permissions"));
					this.roleGrid.store.loadData(this.grid.getSelectionModel().getSelected().get("roles"));
					this.deptGrid.store.loadData(this.grid.getSelectionModel().getSelected().get("otherDepts"));
					this.fp.form.findField("password").el.dom.readOnly = true;
				}
				return ret;
			},
			getGridValue : function(grid) {
				var s = "";
				for (var i = 0; i < grid.store.getCount(); i++) {
					var r = grid.store.getAt(i);
					s += r.get("id") + ",";
				}
				return s;
			},
			save : function() {
				this.fp.form.baseParams = {
					permissions : this.getGridValue(this.editGrid),
					roles : this.getGridValue(this.roleGrid),
					otherDepts : this.getGridValue(this.deptGrid)
				};
				EmployeePanel.superclass.save.call(this);
			},
			createWin : function(callback, autoClose) {
				return this.initWin(600, 500, "员工信息", callback, autoClose);
			},
			deptRender : function(v) {
				return v ? v.title : "未知原因";
			},
			statusRender : function(v) {
				if (v == -1)
					return "<font color='red'>禁用</font>";
				else
					return "正常";
			},
			doLoadAll : function() {
				this.store.load({});
			},
			storeMapping : ["id", "name", "trueName", "otherDepts", "email", "dept", "contractNo", "duty", "password", "tel", "registerTime", {
						name : "deptId",
						mapping : "dept"
					}, "status", "sex", "workerOnly", "roles", "permissions"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "用户名",
							sortable : true,
							width : 100,
							dataIndex : "name"
						}, {
							header : "姓名",
							sortable : true,
							width : 100,
							dataIndex : "trueName"
						}, {
							header : "部门",
							sortable : true,
							width : 100,
							dataIndex : "dept",
							renderer : this.deptRender
						}, {
							header : "电子邮件",
							sortable : true,
							width : 100,
							dataIndex : "email"
						}, {
							header : "电话",
							sortable : true,
							width : 100,
							dataIndex : "tel"
						}, {
							header : "紧急电话",
							sortable : true,
							width : 100,
							dataIndex : "contractNo"
						}, {
							header : "职务",
							sortable : true,
							width : 100,
							dataIndex : "duty",
							renderer : this.objectRender("title")
						}, {
							header : "注册时间",
							sortable : true,
							width : 100,
							dataIndex : "registerTime",
							renderer : this.dateRender()
						}, {
							header : "状态",
							sortable : true,
							width : 80,
							dataIndex : "status",
							renderer : this.statusRender
						}]);
				this.gridButtons = [{
							text : "禁用/启用",
							cls : "x-btn-text-icon",
							icon : "images/core/up.gif",
							handler : this.executeCmd("changeStatus"),
							scope : this
						}, {
							text : "重置密码",
							cls : "x-btn-text-icon",
							icon : "images/core/23.gif",
							handler : this.executeCmd("initializePassword"),
							scope : this
						}];
				EmployeePanel.superclass.initComponent.call(this);
				this.menu.insert(3, new Ext.menu.Item({
									text : "禁用/启用",
									cls : "x-btn-text-icon",
									icon : "images/core/up.gif",
									handler : this.executeCmd("changeStatus"),
									scope : this
								}));
				this.menu.insert(4, new Ext.menu.Item({
									text : "重置密码",
									cls : "x-btn-text-icon",
									icon : "images/core/23.gif",
									handler : this.executeCmd("initializePassword"),
									scope : this
								}));
			}
		});