<%@ page language="java" %>
<%@ page import="java.io.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.Date"%>
<%@ page contentType="text/html; charset=GB2312"%>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
	String danwei_id=(String)session.getAttribute("danweiid");
	String danwei_name=(String)session.getAttribute("danweiname");
    String tempurl="xtgl/fmnrgl.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
//ҳ����ʱ�洢���ݣ����¸�ҳ�洫�ݵ�����
String fmdw1 = qxbean.ISOtoGB(request.getParameter("fmdw1"));
String fmdw1_en = qxbean.ISOtoGB(request.getParameter("fmdw1_en"));
String fmdw2 = qxbean.ISOtoGB(request.getParameter("fmdw2"));
String fmdw2_en = qxbean.ISOtoGB(request.getParameter("fmdw2_en"));
String sm = qxbean.ISOtoGB(request.getParameter("sm"));
String update_sql = "update xtglt_danwei_top_info set fmdw1='"+ fmdw1 +"', fmdw1_en='"+ fmdw1_en +"', fmdw2='"+ fmdw2 +"', fmdw2_en='"+ fmdw2_en +"', content='"+ sm +"' where danwei_id='"+ danwei_id +"'";
if(qxbean.execute(update_sql))
{%>
	<script language=javascript>
		alert("�޸ĳɹ���");
		window.location="fmnrgl.jsp";
	</script>
<%}else{%>
	<script language=javascript>
		alert("�޸�ʧ�ܣ�");
		window.location="fmnrgl.jsp";
	</script>
<%}
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>