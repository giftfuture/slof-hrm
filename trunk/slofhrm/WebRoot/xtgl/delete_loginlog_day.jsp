<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*"%>
<html>
    <head>
        <title></title>
    </head>
    <body>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<%
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/login_log_chart.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String year_month = request.getParameter("ym");
String query_day= request.getParameter("d");
String strsql = "delete from loginlog where op_time like '%"+ year_month +"-"+ query_day +"%'";
if (qxbean.execute(strsql)){%>
	<script language=javascript>
		alert("É¾³ý³É¹¦");
		window.location="login_log_chart_day.jsp?xLabel=<%=year_month%>";
	</script>
	<%}else{%>
	<script language=javascript>
		alert("É¾³ýÊ§°Ü£¡");
		history.back();
	</script>
	<%}%>
    </body>
</html>