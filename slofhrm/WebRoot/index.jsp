<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel="shortcut icon" href="favicon.ico" />
<title>海洋石油设备设施监督检验管理信息系统</title>
</head>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<%
String roleid=(String)session.getAttribute("roleid");
String xg="",description="";
if (request.getParameter("xg")!=null){xg=request.getParameter("xg");}else{xg="0";}
//第一次进入，main框架中显示主菜单中第一项功能。
//得到主菜单zhu_id,如果第一次进入,没有传入参数时得到用户权限中的第一个
String zhu_id="";
if (request.getParameter("id")!=null){
	zhu_id=request.getParameter("id");
}else{
	ResultSet Get_Zhu_id_rs = qxbean.getResultSet("select id from xtglt_gn where id=superior_id and id in (select gn_id from xtglt_role_qx where role_id='"+roleid+"') order by id");        
	if (Get_Zhu_id_rs.next()){
		zhu_id=Get_Zhu_id_rs.getString("id");
	}
}
ResultSet rs2 = qxbean.getResultSet("select * from GetAdminSubgn_ByRoleID(0,"+zhu_id+","+roleid+")");
if(rs2.next()){
	description=rs2.getString("description");
}
%>
<frameset framespacing="0" frameborder="NO" border="0" > 
  <frameset rows="79,*" cols="*" frameborder="NO" border="0" framespacing="0"> 
    <frame name="top" scrolling="NO" src="menu.jsp"  noresize>
    <frameset cols="135,*" frameborder="no" bordercolor="#FF9900">
      <frame src="left.jsp" name="left" frameborder="no" scrolling="auto" bordercolor="#FF9900">
	  <frame name="main" src="<%if (xg.equals("1")){%>modify_user.jsp<%}else{if(description.equals("")){%>main.html<%}else{%><%=description%>?gn_id=<%=zhu_id%><%}}%>" noresize>
    </frameset>
  </frameset>
</frameset>
</html>
