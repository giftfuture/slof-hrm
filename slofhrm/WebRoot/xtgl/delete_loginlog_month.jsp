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
String year_month = request.getParameter("year_month");
String strsql = "delete from loginlog where op_time like '%"+ year_month +"%'";
if (qxbean.execute(strsql)){%>
	<script language=javascript>
		alert("ɾ���ɹ�");
		window.location="login_log_chart.jsp";
	</script>
	<%}else{%>
	<script language=javascript>
		alert("ɾ��ʧ�ܣ�");
		history.back();
	</script>
	<%}%>
    </body>
</html><%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"������"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>