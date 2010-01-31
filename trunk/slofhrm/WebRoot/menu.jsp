<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*"%>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<html>
    <head>
	
<STYLE TYPE="text/css">

.A_tzd:link {COLOR: #008080; TEXT-DECORATION: none}
.A_tzd:visited {COLOR: #008080; TEXT-DECORATION: none}
.A_tzd:hover {COLOR: red; TEXT-DECORATION: none}

.A_more:link {COLOR: #000000; TEXT-DECORATION: none}
.A_more:visited {COLOR: #000000; TEXT-DECORATION: none}
.A_more:hover {COLOR: red; TEXT-DECORATION: none}

.A_exit:link {COLOR: blue; TEXT-DECORATION: none}
.A_exit:visited {COLOR: blue; TEXT-DECORATION: none}
.A_exit:hover {COLOR: red; TEXT-DECORATION: none}
</STYLE>

        <title>技术检测信息管理系统</title>
        <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
        <script language="JavaScript">
            function onMouseOver(id){
				document.all[id].bgColor = "#808080";
            }
            
            function onMouseOut(id){
				if (document.all[id].bgColor == "#808080"){document.all[id].bgColor = ""}
            }
                        
            function onClick(id, description){
				var len=document.all.tags("td").length
					
				for (var i=0;i<len;i++){
					if (document.all.tags("td")[i].id.split("_")[0]=="id"){
						if (document.all.tags("td")[i].id==id){
							document.all.tags("td")[i].style.backgroundColor="#666666";
						}else{
							document.all.tags("td")[i].style.backgroundColor="";
						}
					}
				}
				//主窗体默认进入子菜单中第一个功能
				parent.frames["main"].location.href=description;
            }
			
			function help(){				
			newwin=window.open("","","resizable=yes, scrollbars=yes")
				if (document.all){
					newwin.moveTo((screen.width-700)/2,(screen.height-420)/2)
					newwin.resizeTo(700,420)
				}
			newwin.location="help.htm";
			}
			
			function txl(){				
			newwin=window.open("","","menubar=yes, resizable=yes, scrollbars=yes")
				if (document.all){
					newwin.moveTo((screen.width-800)/2,(screen.height-600)/2)
					newwin.resizeTo(800,600)
				}
			newwin.location="txl.htm";
			}
			
			function logout(){
				window.parent.location="logout.jsp";
			}			
			
			function fbl()
			{
			 var width,height;
			 width = screen.width;
			 height = screen.height;
			 if(width>=1024){
				document.all["tblmenu"].style.fontSize="14";
			 }else{
				document.all["tblmenu"].style.fontSize="12";
			 }
			}

        </script>
        <link href="font.css" rel="stylesheet" type="text/css">
    </head>
    <body onload="fbl();" text="#000000" link="#FFFFCC" vlink="#FFFFCC" alink="#FFFFCC" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<%
//判断用户是否为系统管理员,根据用户组id查看所属单位是否存在
//根据用户登录session中roleid判断权限，显示菜单
String username=(String)session.getAttribute("name");
String user=(String)session.getAttribute("username");
String roleid=(String)session.getAttribute("roleid");
//out.println(roleid);
if (roleid==null){%>
	<script language=javascript>
		//alert("您还没有登录,请登录后使用！");
		//window.parent.location="index.htm";
	</script>
<%
return;}
String danwei_id="",danwei_name="不属于任何单位",topdanwei_name="",role_name="";
ResultSet danwei_rs=qxbean.getResultSet("select * from xtglt_danwei where id in(select danwei_id from xtglt_role where id ='"+roleid+"')");
if(danwei_rs.next()) {
	danwei_id=danwei_rs.getString("id");
	danwei_name=danwei_rs.getString("name");
	session.setAttribute("danweiid",danwei_id);
	session.setAttribute("danweiname",danwei_name);
	
//为旧系统设置下列参数，更新后系统不需要下列参数
	String jcdwbt="胜利石油管理局环境监测中心站检验报告",jcdw="胜利石油管理局环境监测中心站",sjdw="委托单位",sjdw1="委 托 单 位",dwdzyb="地址：山东省东营市东营区青岛路62号  邮编：257000",dhua="电话（传真）：0546-*******",dzyjdz="电子邮件地址：***@***.***",jcztzd="胜利石油管理局环境监测中心站监测任务计划单",jsu="胜利石油管理局",jce="检测",ywen="Environment Monitoring Central Station Shengli Petroleum Bureau";
	session.setAttribute("jcdwbt",jcdwbt);
	session.setAttribute("jcdw",jcdw);
	session.setAttribute("sjdw",sjdw);
	session.setAttribute("sjdw1",sjdw1);
	session.setAttribute("dwdzyb",dwdzyb);
	session.setAttribute("dhua",dhua);
	session.setAttribute("dzyjdz",dzyjdz);
	session.setAttribute("jcztzd",jcztzd);
	session.setAttribute("jsu",jsu);
	session.setAttribute("jce",jce);
	session.setAttribute("ywen",ywen);
//---------------------------------------------
}
//如果不是总系统管理员进入.
if (!danwei_id.equals("")){
	//根据用户所在单位得到它的最上级单位id，name
	ResultSet top_danwei_rs=qxbean.getResultSet("select * from GetSup_DanWei("+ danwei_id +")");
	if(top_danwei_rs.next()) {
		topdanwei_name=top_danwei_rs.getString("name");
		session.setAttribute("topdanweiname",topdanwei_name);
	}
}

ResultSet role_rs=qxbean.getResultSet("select rolename from xtglt_role where id ='"+roleid+"'");
if(role_rs.next()) {
	role_name=role_rs.getString("rolename");
	session.setAttribute("rolename",role_name);
}
%>
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr height="50"> 
			<%if(roleid.equals("145")||roleid.equals("154")||roleid.equals("155")){%>
			<td width="250"><img src="image/logo1.gif" width="250"></td>  <%}else{%>
                <td width="250"><img src="image/logo.gif" width="250"></td><%}%>
                <td align="center" valign="middle"  width="550">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size:14px">
						<tr>
							<td align="center" valign="middle">单位：<font color="#008080"><B><%=danwei_name%></B></font></td>
						</tr>
						<tr>
							<td align="center" valign="middle">用户组：<font color="#008080"><B><%=role_name%></B></font>&nbsp;&nbsp;姓名：<font color="#008080"><B><%=username%></B>&nbsp;&nbsp;<%if(!user.equals("guest")){%><a class="A_tzd" href="modify_user.jsp" target="main"><B>修改个人信息<%=user%></B></a><%}%></font></td>
						</tr>
					</table>
				</td>
				<td background="image/obj_top2.gif"  ><img src="image/obj_top1.jpg" height="50" width="360">
					<%
					
					%>
				</td>				
				<td align="right" valign="bottom" background="image/obj_top2.gif" width="60">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font:normal 14pt">
				
						
						<tr>
							<td align="center" valign="bottom" style="font-size:10pt"><A class="A_exit" href="#" onclick="logout();"><B>退出</B></A></td>
						</tr>
					</table>
				</td>
            </tr>
            <tr>
                <td colspan="4" background="image/obj_menuup.gif"><img src="image/spacer.gif" width="7" height="7"></td>
            </tr>
            <tr>
                <td colspan="4" bgcolor="#B8B3B3"> 
                    <table name="tblmenu" id="tblmenu" width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#B8B3B3" class="menu1" name="menubutton">
                        <tr> 
                            <%
                            String gn_id,gn_name;
                            String menu_sql="";
                            //取出总系统管理员的role_id，根据单位为空，总系统管理员不属于任何单位
                            String admin_role_id="";
                            ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
                            if (admin_rs.next()){
                                admin_role_id=admin_rs.getString("id");
                            }
                            //如果是总系统管理员，则只显示系统管理。
                            if (roleid.equals(admin_role_id)){
                                menu_sql="select * from xtglt_gn where id='1'";
                            }else{
                                menu_sql="select * from xtglt_gn where id = superior_id and id in (select gn_id from xtglt_role_qx where role_id='"+roleid+"')";
                            }
                            try {
                                ResultSet rs=qxbean.getResultSet(menu_sql);
                                int  i=0;
                                while(rs.next()) {
                                    gn_id=rs.getString("id");
                                    gn_name=rs.getString("name");
									//根据gn_id得到子菜单的第一项功能
									String description="";
									ResultSet desc_rs2 = qxbean1.getResultSet("select * from GetAdminSubgn_ByRoleID(0,"+gn_id+","+roleid+")");
									if(desc_rs2.next()){
										description=desc_rs2.getString("description");
									}
                            %>
                            <td height="20" valign="middle" align="center" id="id_<%=gn_id%>" onclick="onClick('id_<%=gn_id%>','<%=description%>?gn_id=<%=gn_id%>')" onMouseOut="onMouseOut('id_<%=gn_id%>')" onMouseOver="onMouseOver('id_<%=gn_id%>')"><a href="left.jsp?id=<%=gn_id%>" target="left" style="text-decoration:none"><%=gn_name%></a></td>
                            <%
                                }
                            }catch(Exception e){
                                System.out.println(e.toString());
                            }%>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
