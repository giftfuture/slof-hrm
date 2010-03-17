if (typeof Global === "undefined") {
	Global = {}
}
if (!Global.newsDirLoader) {
	Global.newsDirLoader = new Ext.tree.TreeLoader({
				url : "newsDir.ejf?cmd=getNewsDir&pageSize=-1&treeData=true",
				listeners : {
					beforeload : function(b, a) {
						b.baseParams.id = (a.id.indexOf("root") < 0 ? a.id : "");
						if (typeof a.attributes.checked !== "undefined") {
							b.baseParams.checked = false
						}
					}
				}
			})
}
NewsDocManagePanel = Ext.extend(EasyJF.Ext.CrudPanel, {
			id : "newsDocManagePanel",
			baseUrl : "newsDoc.ejf",
			autoLoadGridData : false,
			totalPhoto : 0,
			pageSize : 20,
			contentTypes : [["文字", "text"], ["连接", "url"]],
			gridViewConfig : {
				forceFit : true,
				enableRowBody : true,
				showPreview : true,
				getRowClass : function(a, d, c, b) {
					if (this.showPreview) {
						c.body = "<p>文章简介：" + a.data.intro + "</p><br/>";
						return "x-grid3-row-expanded"
					}
					return "x-grid3-row-collapsed"
				}
			},
			selectPhoto : function(c) {
				for (var a = 0; a < this.photoList.items.getCount(); a++) {
					this.photoList.getComponent(a).body.clearOpacity()
				}
				var b = this.photoList.getComponent(c);
				b.body.setOpacity(0.6);
				this.photoList.currentPhoto = c
			},
			addPhoto : function(e) {
				var c = this.totalPhoto++;
				var a = {
					columnWidth : 0.6,
					id : "photo_" + c
				};
				var f = {
					columnWidth : 0.4,
					id : "photo_" + c + "_title",
					xtype : "textfield"
				};
				if (e.path) {
					a.value = e.path;
					a.photoId = e.id;
					a.readOnly = true;
					f.value = e.title;
					f.readOnly = true
				} else {
					a.inputType = "file"
				}
				var d = new Ext.form.TextField(a);
				var b = new Ext.Panel({
							anchor : "95%",
							layout : "column",
							items : [{
										width : 70,
										html : "名称:"
									}, f, d]
						});
				this.photoList.add(b);
				this.photoList.doLayout();
				b.body.on("click", this.selectPhoto.createDelegate(this, [b.id]))
			},
			removePhoto : function() {
				var a = this.photoList.currentPhoto;
				var b = this.fp;
				if (a) {
					Ext.Msg.confirm("提示", "真的要删除当前选中照片吗？", function(c) {
								if (c == "yes") {
									var d = this.photoList.getComponent(a);
									if (d.getComponent(2).photoId) {
										Ext.Ajax.request({
													url : "newsDoc.ejf?cmd=removePhoto",
													params : {
														id : b.form.findField("id").getValue(),
														photoId : d.getComponent(2).photoId
													}
												})
									}
									this.photoList.remove(a);
									this.photoList.doLayout()
								}
							}, this)
				}
			},
			createForm : function() {
				var a = new Ext.form.FormPanel({
							frame : true,
							fileUpload : true,
							autoScroll : true,
							labelWidth : 70,
							labelAlign : "right",
							items : [{
										xtype : "hidden",
										name : "id"
									}, {
										xtype : "fieldset",
										anchor : "-20",
										height : 180,
										collapsible : true,
										title : "基本信息",
										layout : "form",
										items : [EasyJF.Ext.Util.columnPanelBuild({
															columnWidth : 0.5,
															items : {
																name : "title",
																fieldLabel : "标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题",
																allowBlank : false
															}
														}, {
															columnWidth : 0.3,
															items : {
																name : "subTitle",
																fieldLabel : "副标题"
															}
														}, {
															columnWidth : 0.2,
															items : {
																xtype : "combo",
																store : new Ext.data.SimpleStore({
																			fields : ["name", "value"],
																			data : this.contentTypes
																		}),
																mode : "local",
																valueField : "value",
																displayField : "name",
																fieldLabel : "内容性质",
																name : "contentTypes",
																hiddenName : "contentTypes",
																lazyRender : true,
																selectOnFocus : true,
																editable : false,
																triggerAction : "all"
															}
														}), EasyJF.Ext.Util.columnPanelBuild({
															columnWidth : 0.4,
															items : {
																xtype : "treecombo",
																fieldLabel : "文章目录",
																displayField : "title",
																name : "dirId",
																hiddenName : "dirId",
																width : 100,
																tree : new Ext.tree.TreePanel({
																			root : new Ext.tree.AsyncTreeNode({
																						id : "root",
																						text : "所有目录",
																						expanded : true,
																						loader : Global.newsDirLoader
																					})
																		})
															}
														}, {
															columnWidth : 0.3,
															items : {
																xtype : "datefield",
																name : "displayTime",
																format : "Y-n-j G:i:s",
																fieldLabel : "显示时间",
																value : new Date()
															}
														}, {
															columnWidth : 0.3,
															items : {
																xtype : "datefield",
																name : "expiredTime",
																format : "Y-n-j G:i:s",
																fieldLabel : "超期时间"
															}
														}), EasyJF.Ext.Util.oneColumnPanelBuild({
															xtype : "smartcombo",
															fieldLabel : "文章模板",
															name : "templateId",
															hiddenName : "templateId",
															displayField : "title",
															valueField : "id",
															lazyRender : true,
															triggerAction : "all",
															typeAhead : true,
															editable : false,
															store : new Ext.data.JsonStore({
																		id : "id",
																		url : "template.ejf?cmd=list",
																		root : "result",
																		totalProperty : "rowCount",
																		remoteSort : true,
																		baseParams : {
																			pageSize : "-1"
																		},
																		fields : ["id", "title"]
																	})
														}, {
															fieldLabel : "作者",
															name : "author"
														}, {
															fieldLabel : "来源",
															name : "source"
														}, {
															xtype : "datefield",
															name : "topTime",
															format : "Y-n-j G:i:s",
															fieldLabel : "置顶时间"
														}), EasyJF.Ext.Util.twoColumnPanelBuild({
															name : "url",
															fieldLabel : "连接"
														}, {
															name : "keywords",
															fieldLabel : "关键字"
														}), {
													xtype : "textarea",
													anchor : "-20",
													name : "intro",
													height : 50,
													fieldLabel : "文章摘要"
												}]
									}, {
										xtype : "fieldset",
										anchor : "-20",
										autoHeight : true,
										title : "文章内容",
										layout : "form",
										items : {
											xtype : "textarea",
											name : "content",
											hideLabel : true,
											id : "content",
											listeners : {
												render : function(b) {
													fckEditor = new FCKeditor("content", Ext.getBody().dom.offsetWidth - 190, 350, "Normal");
													fckEditor.BasePath = "/fckeditor/";
													fckEditor.Config.CustomConfigurationsPath = "/fckeditor/fckconfig.js";
													fckEditor.ReplaceTextarea()
												}
											}
										}
									}, {
										xtype : "fieldset",
										anchor : "-20",
										collapsible : true,
										autoHeight : true,
										autoScroll : true,
										title : "图片/附件",
										layout : "fit",
										listeners : {
											render : function(b) {
												this.photoList = b.findById("photoList")
											},
											scope : this
										},
										items : {
											id : "photoList",
											autoScroll : true,
											height : 50
										},
										bbar : [{
													text : "添加图片/附件",
													handler : this.addPhoto,
													scope : this
												}, {
													text : "删除图片/附件",
													handler : this.removePhoto,
													scope : this
												}]
									}]
						});
				return a
			},
			create : function() {
				var b = NewsDocManagePanel.superclass.create.call(this);
				if (this.photoList) {
					var a = this.photoList;
					while (a.items && a.items.getCount() > 0) {
						a.remove(0)
					}
					this.addPhoto({})
				}
				EasyJF.Ext.Util.setFCKEditorContent("content");
				this.fp.form.findField("dirId").setValue(this.currentDir);
				this.fp.form.findField("author").setValue("ccc")
			},
			edit : function() {
				var d = NewsDocManagePanel.superclass.edit.call(this);
				if (d) {
					var a = this.grid.getSelectionModel().getSelected();
					var c = this.photoList;
					while (c.items && c.items.getCount() > 0) {
						c.remove(0)
					}
					if (a.data.allResource && a.data.allResource.length > 0) {
						var e = a.data.allResource;
						for (var b = 0; b < e.length; b++) {
							this.addPhoto(e[b])
						}
					} else {
						this.addPhoto({})
					}
					Ext.Ajax.request({
								url : this.baseUrl + "?cmd=getContent&id=" + a.get("id"),
								success : function(f) {
									var g = Ext.decode(f.responseText);
									EasyJF.Ext.Util.setFCKEditorContent("content", g)
								}
							})
				}
			},
			view : function() {
				var a = this.grid.getSelectionModel().getSelected();
				if (!a) {
					return Ext.Msg.alert("提示", "请先选择要操作的行!")
				}
				window.open("news.ejf?cmd=show&id=" + a.get("id"))
			},
			topicRender : function(b, c, a) {
				return String.format('{1}<b><a style="color:green" href="news.ejf?cmd=show&id={0}" target="_blank">查看</a></b><br/>', a.id, b)
			},
			resourceRender : function(a) {
				return a && a.length ? a.length + "个" : "无"
			},
			toggleDetails : function(b, c) {
				var a = this.grid.getView();
				a.showPreview = c;
				a.refresh()
			},
			createWin : function() {
				return this.initWin(Ext.getBody().dom.offsetWidth - 120, Ext.getBody().dom.offsetHeight - 30, "文章管理")
			},
			storeMapping : ["id", "title", "subTitle", "dir", "contentTypes", "url", "pics", "displayTime", "content", "intro", "author", "source", "sequence", "expiredTime", "readTimes", "inputTime", "template", "elite", "auditing", "reviewEnbaled", "reviewTimes", "reviews", "topTime", "collectionTimes", "htmlPath", "editor", "keywords", "staticUrl", {
						name : "op",
						mapping : "id"
					}, {
						name : "dirId",
						mapping : "dir"
					}, {
						name : "templateId",
						mapping : "template"
					}, "resources", "allResource"],
			initComponent : function() {
				this.expander = new Ext.grid.RowExpander({
							tpl : new Ext.Template("<p><b>文章简介:</b>{intro}</p><br />")
						});
				this.gridConfig = {
					plugins : this.expander
				};
				this.cm = new Ext.grid.ColumnModel([this.expander, {
							header : "主题",
							dataIndex : "title",
							width : 250,
							renderer : this.topicRender
						}, {
							header : "栏目",
							sortable : true,
							width : 60,
							dataIndex : "dir",
							renderer : this.objectRender("title")
						}, {
							header : "显示日期",
							sortable : true,
							width : 100,
							dataIndex : "displayTime",
							renderer : this.dateRender()
						}, {
							header : "作者",
							sortable : true,
							width : 60,
							dataIndex : "author"
						}, {
							header : "审核",
							sortable : true,
							width : 40,
							dataIndex : "auditing",
							renderer : this.booleanRender
						}, {
							header : "推荐",
							sortable : true,
							width : 40,
							dataIndex : "elite",
							renderer : this.booleanRender
						}, {
							header : "编辑",
							sortable : true,
							width : 60,
							dataIndex : "editor"
						}, {
							header : "附件",
							sortable : true,
							width : 40,
							dataIndex : "resources",
							renderer : this.resourceRender
						}, {
							header : "输入时间",
							sortable : true,
							width : 100,
							dataIndex : "inputTime",
							renderer : this.dateRender()
						}]);
				this.gridButtons = [new Ext.Toolbar.Separator, {
							text : "显示摘要",
							cls : "x-btn-text-icon",
							icon : "images/core/15.gif",
							enableToggle : true,
							handler : this.toggleDetails,
							scope : this
						}, {
							text : "审核",
							cls : "x-btn-text-icon",
							icon : "images/core/08.gif",
							handler : this.executeCmd("audit"),
							scope : this
						}, {
							text : "加精",
							cls : "x-btn-text-icon",
							icon : "images/core/24.gif",
							handler : this.executeCmd("elite"),
							scope : this
						}, {
							text : "发布文章",
							cls : "x-btn-text-icon",
							icon : "images/core/04.gif",
							handler : this.executeMulitCmd("generator"),
							scope : this
						}];
				NewsDocManagePanel.superclass.initComponent.call(this)
			}
		});