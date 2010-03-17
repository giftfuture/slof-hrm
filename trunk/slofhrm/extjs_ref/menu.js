Ext.BLANK_IMAGE_URL = '/plugins/extjs/ext-2.2/resources/images/default/s.gif';
var main, menu, header, bottom, onlineWindow, loginWin, messageWindow;
Ext.QuickTips.init();
if (typeof Global === "undefined") {
	Global = {};
}
Global = Ext.apply(Global || {}, {
			iframe : false,
			openExtAppNode : function(node, e) {
				// 使用树的package来代表所在的包,script代表公共脚本
				main.openExtAppNode.call(this, node, e);
			},
			topicCategoryLoader : new Ext.tree.TreeLoader({
						url : "topicCategory.ejf?cmd=getCategory&pageSize=-1&treeData=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
							}
						}
					}),
			albumCategoryLoader : new Ext.tree.TreeLoader({
						url : "albumCategory.ejf?cmd=getCategory&pageSize=-1&treeData=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
							}
						}
					}),
			departmentLoader : new Ext.tree.TreeLoader({
						url : "department.ejf?cmd=getDepartment&pageSize=-1&treeData=true&all=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
							}
						}
					}),
			systemRegionLoader : new Ext.tree.TreeLoader({
						url : "systemRegion.ejf?cmd=getSystemRegion&pageSize=-1&treeData=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
							}
						}
					}),
			newsDirLoader : new Ext.tree.TreeLoader({
						url : "newsDir.ejf?cmd=getNewsDir&pageSize=-1&treeData=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
							}
						}
					}),
			deptUserLoader : new Ext.tree.TreeLoader({
						url : "employee.ejf?cmd=getDepartmentUser&pageSize=-1",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
								if (typeof node.attributes.checked !== "undefined") {
									treeLoader.baseParams.checked = node.attributes.checked;
								}
							}
						}
					}),
			assetDirLoader : new Ext.tree.TreeLoader({
						url : "assetDir.ejf?cmd=getAssetDirTree&pageSize=-1&treeData=true",
						listeners : {
							'beforeload' : function(treeLoader, node) {
								treeLoader.baseParams.id = (node.id.indexOf('root') < 0 ? node.id : "");
								if (typeof node.attributes.checked !== "undefined") {
									treeLoader.baseParams.checked = false;
								}
							}
						}
					})
		});

MenuPanel = function() {
	MenuPanel.superclass.constructor.call(this, {
				id : 'menu',
				region : 'west',
				title : "系统菜单",
				split : true,
				width : 200,
				minSize : 130,
				maxSize : 300,
				margins : '0 0 -1 1',
				collapsible : true,
				layout : "accordion",
				defaults : {
					autoScroll : true,
					border : false
				},
				items : [{
							title : "日常办公",
							iconCls : "icon-daily",
							items : [new DailyWorkMenu()]
						},/*
							 * { title : "业务管理系统", iconCls:"icon-customer",
							 * items : [ new ErpMenu() ] },
							 */{
							title : "客户关系",
							iconCls : "icon-customer",
							items : [new CrmMenu()]
						},/*
							 * { title : "销售管理", iconCls:"icon-customer", items : [
							 * new SaleMenu() ] },
							 */
						{
							title : "信息中心",
							iconCls : "icon-info",
							items : [new InfoMenu()]
						}, {
							title : "实用工具<font color='green'>(测)</font>",
							iconCls : "icon-zoom",
							items : [new ToolsMenu()]
						}, {
							title : "人力资源管理",
							iconCls : "icon-human",
							items : [new HumanMenu()]
						}, {
							title : "财务管理",
							iconCls : "icon-finance",
							items : [new FinanceMenu()]
						}, {
							title : "库存/采购/产品<font color='green'>(测)</font>",
							iconCls : "relating",
							items : [new StockProductMenu()]
						}, {
							title : "设备管理<font color='green'>(测)</font>",
							iconCls : "icon-prop",
							items : [new AssetMenu()]
						}, {
							title : "系统参数设置",
							iconCls : "icon-sys",
							items : [new SystemMenuPanel()]
						}]
			});
};
Ext.extend(MenuPanel, Ext.Panel);

/**
 * 日常办公模块菜单(考勤、工作日志、事项办理、计划\总结等)
 */
DailyWorkMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=DailyWork&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	DailyWorkMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				// package自定义配置属性,指应该类所在的包结构,好处在于分模块化各大功能,便于单元测试.
				package : "dailyWork",
				rootVisible : false,
				root : new Ext.tree.AsyncTreeNode({
							text : '日常办公',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				this.root.appendChild(new Ext.tree.TreeNode({
							text : "企业IM",
							icon : "images/menuPanel/tag_blue.gif",
							listeners : {
								'click' : function() {
									onlineWindow.show();
								}
							}
						}));
			}, this);
}
Ext.extend(DailyWorkMenu, Ext.tree.TreePanel);

StockProductMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=StockProduct&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	this.productDirLoader = new Ext.tree.TreeLoader({
				url : "productDir.ejf?cmd=getProductDirTree&pageSize=-1&prefix=productDir_",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node != this.dirProductNode ? node.id : "");
					},
					scope : this
				}
			});
	this.depotLoader = new Ext.tree.TreeLoader({
				url : "depot.ejf?cmd=getDepotTree&pageSize=-1&prefix=depot_",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node != this.depotProductNode ? node.id : "");

					},
					scope : this
				}
			});
	StockProductMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "stock",
				root : new Ext.tree.AsyncTreeNode({
							text : '库存产品',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.reloadDirProduct = function() {
		var node = this.getSelectionModel().getSelectedNode();
		var panel = Global.iframe ? IFrames["ProductManagePanel"] : Ext.getCmp("productManagePanel");
		if (panel && panel.store) {
			if (this.dirProductNode !== node) {
				var tid = node.id.replace("productDir_", "");
				panel.store.baseParams.dirId = tid;
				panel.currentDir = {
					id : tid,
					title : node.text
				};
			} else {
				panel.store.baseParams.dirId = "";
				panel.currentDir = null;
			}
			panel.store.removeAll();
			panel.store.reload();
		} else
			this.reloadDirProduct.createDelegate(this).defer(1000);
	};
	this.reloadDepotProduct = function() {
		var node = this.getSelectionModel().getSelectedNode();
		var panel = Global.iframe ? IFrames["ProductManagePanel"] : Ext.getCmp("productManagePanel");
		if (panel && panel.store) {
			if (this.depotProductNode !== node) {
				var tid = node.id.replace("depot_", "");
				panel.store.baseParams.depotId = tid;
				panel.currentDepot = {
					id : tid,
					title : node.text
				};
			} else {
				panel.store.baseParams.depotId = "";
				panel.currentDir = null;
			}
			panel.store.removeAll();
			panel.store.reload();
		} else
			this.reloadDepotProduct.createDelegate(this).defer(1000);
	};
	this.productNode = new Ext.tree.TreeNode({
		text : "产品管理",
		expanded : true,
		icon : "images/menuPanel/tag_blue3.gif"
			/*
			 * appClass:"ProductManagePanel",
			 * otherScripts:"plugins/extjs/ext-2.2/plugins/RowExpander.js;fckeditor/fckeditor.js"
			 */
		});
	this.dirProductNode = new Ext.tree.AsyncTreeNode({
				id : "root_dir_product",
				text : "按产品类别",
				title : "产品管理",
				appClass : "ProductManagePanel",
				icon : "images/menuPanel/tag_blue3.gif",
				otherScripts : "plugins/extjs/ext-2.2/plugins/RowExpander.js;fckeditor/fckeditor.js",
				loader : this.productDirLoader,
				callback : this.reloadDirProduct.createDelegate(this)
			});
	this.depotProductNode = new Ext.tree.AsyncTreeNode({
				id : "root_depot_product",
				text : "按产品库存",
				title : "产品管理",
				appClass : "ProductManagePanel",
				icon : "images/menuPanel/tag_blue3.gif",
				otherScripts : "plugins/extjs/ext-2.2/plugins/RowExpander.js;fckeditor/fckeditor.js",
				loader : this.depotLoader,
				callback : this.reloadDepotProduct.createDelegate(this)
			});
	this.productNode.appendChild(this.dirProductNode);
	this.productNode.appendChild(this.depotProductNode);
	this.root.on("load", function() {
				if (!this.root.contains(this.productNode)) {
					this.root.insertBefore(this.productNode, this.root.item(0));
				}
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
	this.on("click", function(node, eventObject) {
				this.getSelectionModel().select(node);
				if (node == this.dirProductNode || (this.dirProductNode.contains(node))) {
					Global.openExtAppNode.call(this, this.dirProductNode, eventObject);
				} else if (node == this.depotProductNode || this.depotProductNode.contains(node)) {
					Global.openExtAppNode.call(this, this.depotProductNode, eventObject);
				} else {
					Global.openExtAppNode.call(this, node, eventObject);
				}
			}, this)
}
Ext.extend(StockProductMenu, Ext.tree.TreePanel);

CrmMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=CRM&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	CrmMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "crm",
				root : new Ext.tree.AsyncTreeNode({
							text : '客户关系',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
}
Ext.extend(CrmMenu, Ext.tree.TreePanel);
/**
 * 销售管理
 */
SaleMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=sale&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	SaleMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "crm",
				root : new Ext.tree.AsyncTreeNode({
							text : '销售管理',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
}
Ext.extend(SaleMenu, Ext.tree.TreePanel);
/**
 * 信息中心
 */
InfoMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=InfoCenter&pageSize=-1&treeData=true&prefix=cms_",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	InfoMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "info",
				root : new Ext.tree.AsyncTreeNode({
							text : '信息中心',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.reloadNewsDoc = function() {
		var node = this.getSelectionModel().getSelectedNode();
		var panel = Global.iframe ? IFrames["NewsDocManagePanel"] : Ext.getCmp("newsDocManagePanel");
		if (panel && panel.store) {
			if (this.infoNode !== node) {
				var tid = node.id.replace("cms_", "");
				panel.store.baseParams.dirId = tid;
				panel.currentDir = {
					id : tid,
					title : node.text
				};
			} else {
				panel.store.baseParams.dirId = "";
				panel.currentDir = null;
			}
			panel.store.removeAll();
			panel.store.reload();
		} else
			this.reloadNewsDoc.createDelegate(this).defer(1000);
	};
	this.infoNode = new Ext.tree.AsyncTreeNode({
				id : "root_article",
				text : "资讯/信息",
				id : "root_article",
				appClass : "NewsDocManagePanel",
				icon : "images/menuPanel/tag_blue3.gif",
				otherScripts : "plugins/extjs/ext-2.2/plugins/RowExpander.js;fckeditor/fckeditor.js",
				loader : Global.newsDirLoader,
				callback : this.reloadNewsDoc.createDelegate(this)
			});
	this.root.on("load", function() {
				if (!this.root.contains(this.infoNode)) {
					this.root.insertBefore(this.infoNode, this.root.item(1));
				}
			}, this);
	this.on("click", function(node, eventObject) {
				this.getSelectionModel().select(node);
				if (node == this.infoNode || (this.infoNode && this.infoNode.contains(node))) {
					Global.openExtAppNode.call(this, this.infoNode, eventObject);
				} else {
					Global.openExtAppNode.call(this, node, eventObject);
				}
			}, this)
}
Ext.extend(InfoMenu, Ext.tree.TreePanel);
/**
 * 人力资源管理系统模块
 */
HumanMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=HumanMenu&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	HumanMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "human",
				root : new Ext.tree.AsyncTreeNode({
							text : '人力资源',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
}
Ext.extend(HumanMenu, Ext.tree.TreePanel);

/**
 * 资产设备管理模块
 */
AssetMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=AssertManage&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	AssetMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				package : "asset",
				rootVisible : false,
				root : new Ext.tree.AsyncTreeNode({
							text : '设备管理',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.reloadAsset = function() {
		var node = this.getSelectionModel().getSelectedNode();
		var panel = Ext.getCmp("assetManagePanel");
		if (this.infoNode !== node) {
			panel.store.baseParams.dirId = node.id;
			panel.currentDir = {
				id : node.id,
				name : node.text
			};
		} else {
			panel.store.baseParams.dirId = "";
			panel.currentDir = null;
		}
		panel.store.removeAll();
		panel.store.reload();
	};
	this.infoNode = new Ext.tree.AsyncTreeNode({
				text : "设备信息维护",
				id : "root_article",
				icon : "images/im2.gif",
				appClass : "AssetManagePanel",
				loader : Global.assetDirLoader,
				callback : this.reloadAsset.createDelegate(this)
			});
	this.root.on("load", function() {
				if (!this.root.contains(this.infoNode)) {
					this.root.appendChild(this.infoNode);
				}
			}, this);
	this.on("click", function(node, eventObject) {
				if (node == this.infoNode || (this.infoNode && this.infoNode.contains(node))) {
					Global.openExtAppNode.call(this, this.infoNode, eventObject);
				} else {
					Global.openExtAppNode.call(this, node, eventObject);
				}
			}, this)
}
Ext.extend(AssetMenu, Ext.tree.TreePanel);

/**
 * 客户信息模块
 */
ErpMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=Erp&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	ErpMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "erp",
				root : new Ext.tree.AsyncTreeNode({
							text : '业务管理系统',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {// 如果没有任何业务项，则隐藏业务菜单
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
				if (this.root.childNodes.length <= 2) {// 如果只有一个或两个菜单项
					var node = null;
					// 客户来访登记特殊处理
					if (this.root.childNodes.length == 1 && this.root.childNodes[0].text != "客户来访登记")
						node = this.root.childNodes[0];
					else if (this.root.childNodes.length == 2 && this.root.childNodes[0].text == "客户来访登记")
						node = this.root.childNodes[1];
					if (node && !node.attributes["leaf"]) {
						node.expand(false, false, function(n) {
									for (; n.childNodes.length > 0;)
										n.parentNode.appendChild(n.childNodes[0]);
									n.remove();
								});
					}
				}
			}, this);
}
Ext.extend(ErpMenu, Ext.tree.TreePanel)
/**
 * 财务管理模块
 */
FinanceMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=Finance&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	FinanceMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "account",
				root : new Ext.tree.AsyncTreeNode({
							text : '财务管理系统',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
}
Ext.extend(FinanceMenu, Ext.tree.TreePanel);

/**
 * 系统管理模块
 */
SystemMenuPanel = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=SystemManage&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	SystemMenuPanel.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "systemManage",
				root : new Ext.tree.AsyncTreeNode({
							text : '系统管理',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	var changePasswordNode = new Ext.tree.TreeNode({
				text : "修改密码",
				icon : "images/menuPanel/tag_blue2.gif",
				listeners : {
					"click" : changePassword
				}
			});
	this.root.on("load", function() {
				if (!this.root.contains(changePasswordNode)) {
					this.root.appendChild(changePasswordNode);
				}
			}, this);
	this.on("click", Global.openExtAppNode, this);
}
Ext.extend(SystemMenuPanel, Ext.tree.TreePanel);

/**
 * 实用工具模块
 */
ToolsMenu = function() {
	this.loader = new Ext.tree.TreeLoader({
				url : "systemMenu.ejf?cmd=getUserMenuTree&sn=ToolsMenu&pageSize=-1&treeData=true",
				listeners : {
					'beforeload' : function(treeLoader, node) {
						this.loader.baseParams.id = (node != this.root ? node.id : "");
					},
					scope : this
				}
			});
	ToolsMenu.superclass.constructor.call(this, {
				autoScroll : true,
				animate : true,
				border : false,
				rootVisible : false,
				package : "tools",
				root : new Ext.tree.AsyncTreeNode({
							text : '实用工具',
							draggable : false,
							expanded : true,
							loader : this.loader
						})
			});
	this.on("click", Global.openExtAppNode, this);
	this.root.on("load", function() {
				if (this.root.childNodes.length < 1) {
					this.ownerCt.hide();
				} else
					this.ownerCt.show();
			}, this);
}
Ext.extend(ToolsMenu, Ext.tree.TreePanel);

ResourceList = Ext.extend(BaseGridList, {
			pagingToolbar : false,
			storeMapping : ["id", "resStr", "type", "desciption"],
			initComponent : function() {
				this.cm = new Ext.grid.ColumnModel([{
							header : "资源描述",
							sortable : true,
							width : 300,
							dataIndex : "resStr"
						}, {
							header : "资源类型",
							sortable : true,
							width : 80,
							dataIndex : "type"
						}, {
							header : "简介",
							sortable : true,
							width : 100,
							dataIndex : "desciption"
						}])
				ResourceList.superclass.initComponent.call(this);
			}
		})

function login() {
	if (window.OnlineMessageManager)
		OnlineMessageManager.stop();
	window.location.href = '/';

}
function logout() {
	Ext.Msg.confirm("友情提示", "是否真的要注销当前用户?", function(btn) {
				if (btn == "yes") {
					Ext.Ajax.request({
								url : "login.ejf?cmd=logout&ext=true",
								success : function() {
									login();
								}
							})
				}
			});
}

MainPanel = function() {
	MainPanel.superclass.constructor.call(this, {
				id : 'main',
				region : 'center',
				margins : '0 2 0 0',
				items : {
					id : 'homePage',
					title : '桌　面',
					closable : false,
					margins : '35 5 5 0',
					xtype : 'portal',
					autoScroll : true,
					tbar : [{
								text : '快速导航',
								cls : 'x-btn-text-icon',
								icon : 'images/icons/help.png',
								handler : function() {
								}
							}, '-', {
								text : "桌面设置",
								cls : 'x-btn-text-icon',
								icon : 'images/icons/picture_empty.png',
								menu : {
									items : [{
												text : '添加模块',
												cls : 'x-btn-text-icon',
												icon : 'images/icons/application_form_add.png',
												handler : this.createPortlet,
												scope : this
											}, {
												text : '保存桌面设置',
												cls : 'x-btn-text-icon',
												icon : 'images/icons/application_put.png',
												handler : this.savePersonality,
												scope : this
											}, {
												text : '恢复默认桌面',
												cls : 'x-btn-text-icon',
												icon : 'images/icons/application_go.png',
												handler : this.resetPersonality,
												scope : this
											}]
								}
							}, "-", {
								text : '蓝源首页',
								cls : 'x-btn-text-icon',
								icon : 'images/icons/application_home.png',
								handler : function() {
									window.open("http://www.lanyotech.com/")
								}
							}],
					items : [{
								columnWidth : .33,
								defaults : {
									height : 215
								},
								style : 'padding:10px 0 10px 10px'
							}, {
								columnWidth : .33,
								defaults : {
									height : 215
								},
								style : 'padding:10px 0 10px 10px;'
							}, {
								columnWidth : .33,
								defaults : {
									height : 215
								},
								style : 'padding:10px 0 10px 10px'
							}]
				}
			});
	this.on("render", this.loadPersonality, this);
};
Ext.extend(MainPanel, EasyJF.Ext["MainTabPanel"]);

Ext.onReady(function() {
			header = new Ext.Panel({
						border : false,
						region : 'north',
						layout : 'anchor',
						height : 50,
						items : [{
							xtype : "box",
							border : true,
							el : "header",
							anchor : 'none -23'
						}/*
							 * , new Ext.Toolbar({items:[
							 * '文章查询:',{xtype:"textfield",width:200,id:"search"},
							 * {text:"搜索",cls:"x-btn-text-icon",icon:"images/search.gif"},"-","->"]})
							 */
						]
					});
			changeSkin = function(value) {
				Ext.util.CSS.swapStyleSheet('window', '/plugins/extjs/ext-2.2/resources/css/' + value + '.css');
			};
			menu = new MenuPanel();
			main = new MainPanel();
			var currentUser = new Ext.Toolbar.TextItem("ccc");
			var clock = new Ext.Toolbar.TextItem('');
			var pr = new Ext.Toolbar.TextItem("版权所有及技术支持　<a href='http://www.lanyotech.com' target='_blank'><font color=blue>成都蓝源信息技术有限公司</font></a>");
			bottom = new Ext.Toolbar({
						cls : "x-statusbar",
						id : "bottom",
						frame : true,
						region : "south",
						height : 25,
						items : ["当前用户：", currentUser, "->", pr, clock],
						listeners : {
							render : {
								fn : function() {
									Ext.fly(pr.getEl().parentNode).addClass('x-status-text-panel').createChild({
												cls : 'spacer'
											});
									Ext.fly(clock.getEl().parentNode).addClass('x-status-text-panel').createChild({
												cls : 'spacer'
											});
									Ext.TaskMgr.start({
												run : function() {
													Ext.fly(clock.getEl()).update(new Date().format('g:i:s A'));
												},
												interval : 1000
											});
								},
								delay : 500
							}
						}
					});
			bottom.currentUser = currentUser;
			var viewport = new Ext.Viewport({
						hideBorders : true,
						layout : 'fit',
						items : [{
									id : "desktop",
									layout : "border",
									items : [header, menu, main, bottom]
								}]
					});
			// OnlineMessageManager.openMessage({sender:OnlineMessageManager.me,content:"测试一下",inputTime:new
			// Date()});
			// MettingManager.joinMeeting(1);

			setTimeout(function() {
						Ext.get('loading').remove();
						Ext.get('loading-mask').fadeOut({
									remove : true
								});

					}, 300);
			// 判断是否需要登录
			EasyJF.Ext.Util.loadScript("OnlineMessageManager", "extApp.ejf?cmd=loadScript&script=onlineChat.js", function() {
						onlineWindow = new OnlineUserWindow();
						// OnlineMessageManager.start.call(OnlineMessageManager);
						var content = "<br/><a href='http://www.lanyotech.com/ext-train.html' target='_blank'><b><font color=blue>蓝源Ext/Ajax专业技术咨询培训</font></b></a><br/>助您轻松驾驭Ext技术，轻松打造绚丽应用软件作品。</font>。<br/><br/><a href='http://www.lanyotech.com/ext.html' target='_blank'><b><font color=blue>蓝源Ext/Ajax快速开发框架</font></b></a><br/>让Ext应用开发变得快速、高效.</font>。";
						OnlineMessageManager.showSystemMessage.defer(2000, OnlineMessageManager, [{
											content : content
										}]);

						EasyJF.Ext.Util.loadScript("FCKeditor", "fckeditor/fckeditor.js");
					});

		});