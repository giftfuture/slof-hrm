if (typeof Global === "undefined") {
	Global = {
		newsDirLoader : new Ext.tree.TreeLoader({
					url : "newsDir.ejf?cmd=getNewsDir&pageSize=-1&treeData=true",
					listeners : {
						beforeload : function(b, a) {
							b.baseParams.id = (a.id.indexOf("root") < 0 ? a.id : "")
						}
					}
				})
	}
}
NewsDirPanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			id : "newsDirPanel",
			baseUrl : "newsDir.ejf",
			types : [["实体栏目", 0], ["链接栏目", 1], ["单页栏目", 2]],
			createForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							labelWidth : 80,
							labelAlign : "right",
							defaults : {
								width : 320,
								xtype : "textfield"
							},
							items : [{
										xtype : "hidden",
										name : "id"
									}, EasyJF.Ext.Util.twoColumnPanelBuild({
												fieldLabel : "栏目名称",
												name : "title",
												allowBlank : false
											}, {
												xtype : "treecombo",
												fieldLabel : "父目录",
												name : "parentId",
												hiddenName : "parentId",
												displayField : "title",
												valueField : "id",
												width : 110,
												tree : new Ext.tree.TreePanel({
															autoScroll : true,
															root : new Ext.tree.AsyncTreeNode({
																		id : "root",
																		text : "所有栏目",
																		icon : "images/system/root.gif",
																		expanded : true,
																		loader : Global.newsDirLoader
																	})
														})
											}, {
												fieldLabel : "栏目编码",
												name : "sn",
												allowBlank : false
											}, {
												xtype : "combo",
												name : "types",
												hiddenName : "types",
												fieldLabel : "栏目类型",
												displayField : "title",
												valueField : "value",
												store : new Ext.data.SimpleStore({
															fields : ["title", "value"],
															data : this.types
														}),
												editable : false,
												mode : "local",
												triggerAction : "all",
												emptyText : "请选择..."
											}, {
												fieldLabel : "目录连接",
												name : "url"
											}, {
												fieldLabel : "显示顺序",
												name : "sequence",
												value : 1
											}), {
										xtype : "textarea",
										fieldLabel : "简介/内容",
										height : 220,
										width : 500,
										name : "description",
										id : "description",
										listeners : {
											render : function(b) {
												fckEditor = new FCKeditor("description", 510, 290, "Simple");
												fckEditor.BasePath = "/fckeditor/";
												fckEditor.Config.CustomConfigurationsPath = "/fckeditor/fckconfig.js";
												fckEditor.ReplaceTextarea()
											}
										}
									}]
						});
				return a
			},
			cleanFckEditor : function() {
				if (typeof FCKeditorAPI == "object") {
					FCKeditorAPI.GetInstance("description").SetHTML("")
				}
			},
			create : function() {
				NewsDirPanel.superclass.create.call(this);
				EasyJF.Ext.Util.setFCKEditorContent("description");
				this.fp.form.findField("parentId").setValue(this.parentId && this.parentId.id ? this.parentId : null)
			},
			save : function() {
				NewsDirPanel.superclass.save.call(this);
				if (this.tree) {
					this.tree.root.reload.defer(1000, this.tree.root)
				}
			},
			edit : function() {
				NewsDirPanel.superclass.edit.call(this);
				var a = this.grid.getSelectionModel().getSelected();
				EasyJF.Ext.Util.setFCKEditorContent("description", a.get("description"))
			},
			createWin : function() {
				return this.initWin(638, 450, "信息栏目管理")
			},
			storeMapping : ["id", "sn", "url", "title", "types", "template", {
						name : "parentId",
						mapping : "parent"
					}, "parent", "children", "description", "sequence", "display"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "目录编码",
							sortable : true,
							width : 300,
							dataIndex : "sn"
						}, {
							header : "目录名称",
							sortable : true,
							width : 300,
							dataIndex : "title"
						}, {
							header : "目录类型",
							sortable : true,
							width : 300,
							dataIndex : "types"
						}, {
							header : "目录连接",
							sortable : true,
							width : 300,
							dataIndex : "url"
						}, {
							header : "显示顺序",
							sortable : true,
							width : 300,
							dataIndex : "sequence"
						}, {
							header : "简介",
							sortable : true,
							width : 300,
							dataIndex : "description"
						}]);
				NewsDirPanel.superclass.initComponent.call(this)
			}
		});
NewsDirManagePanel = function() {
	this.list = new NewsDirPanel({
				region : "center"
			});
	this.tree = new Ext.tree.TreePanel({
				title : "网站栏目",
				region : "west",
				width : 150,
				tools : [{
							id : "refresh",
							handler : function() {
								this.tree.root.reload()
							},
							scope : this
						}],
				root : new Ext.tree.AsyncTreeNode({
							id : "root",
							text : "信息栏目",
							icon : "images/system/root.gif",
							expanded : true,
							loader : Global.newsDirLoader
						})
			});
	this.list.tree = this.tree;
	this.tree.on("click", function(b, a) {
				var c = (b.id != "root" ? b.id : "");
				this.list.parentId = {
					id : c,
					title : b.text
				};
				this.list.store.baseParams.parentId = c;
				this.list.store.removeAll();
				this.list.store.load()
			}, this);
	NewsDirManagePanel.superclass.constructor.call(this, {
				id : "newsDirManagePanel",
				closable : true,
				autoScroll : true,
				border : false,
				layout : "border",
				items : [this.tree, this.list]
			})
};
Ext.extend(NewsDirManagePanel, Ext.Panel, {});