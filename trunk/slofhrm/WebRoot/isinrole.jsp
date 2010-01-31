<%@ page contentType="text/html; charset=GB2312"%>
<%
String loginfilepath="";
String HasLogin="no";
ResultSet IsTrue_rs = qxbean.getResultSet("select description from xtglt_gn where id<>superior_id and id in (select gn_id from xtglt_role_qx where role_id='"+roleid+"') order by id");
while(IsTrue_rs.next()){
     if (IsTrue_rs.getString("description")!=null&&!IsTrue_rs.getString("description").equals("")){loginfilepath=IsTrue_rs.getString("description");}else{loginfilepath="null";}
     if (tempurl.indexOf(loginfilepath)>=0){HasLogin="yes";break;}
}
if (HasLogin.equals("no")){%>
        <script language=javascript>
            alert("您没有操作该功能的权限，请与系统管理员联系。");
            //window.history.go(-1);
			window.parent.location="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/index.htm";
        </script>
<%}%>