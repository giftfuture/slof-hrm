<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*"%>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<html>
    <head>
        <title></title>
    </head>
    <body>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/login_log_chart.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String delete_start = request.getParameter("start");
String delete_end = request.getParameter("end");
String strsql = "delete from loginlog where op_time between '" + delete_start + "' and '" + delete_end + "' or op_time like '%" + delete_start + "%' or op_time like '%" + delete_end + "%'";
if (qxbean.execute(strsql)){%>
	<script language=javascript>
		alert("É¾³ý³É¹¦");
		window.location="login_log_chart.jsp";
	</script>
	<%}else{%>
	<script language=javascript>
		alert("É¾³ýÊ§°Ü£¡");
		history.back();
	</script>
	<%}%>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("Ò³Ãæ"+request.getRequestURI()+"³ö´í£º"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>