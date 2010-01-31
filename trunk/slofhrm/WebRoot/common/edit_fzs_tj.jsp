<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<html>
    <head>
        <title></title>
    </head>
    <body>
        <jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<%
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="common/admin_fzs.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String fzs_id="",fzs="",cnfzs="",strsql="";
fzs_id = qxbean.ISOtoGB(request.getParameter("fzsid"));
fzs = qxbean.ISOtoGB(request.getParameter("fzs"));
cnfzs = qxbean.ISOtoGB(request.getParameter("cnfzs"));
strsql = "exec UpdateFZSByID '"+ fzs_id +"', '"+ fzs +"', '"+ cnfzs +"'";
if (qxbean.execute(strsql)){%>
	<script language=javascript>
		alert("修改成功！");
		window.location='admin_fzs.jsp';
	</script>
<%}else{%>
	<script language=javascript>
		alert("分子式已存在，请更改。");
		history.back();
	</script>
<%}
qxbean.close();
%>
    </body>
</html>
