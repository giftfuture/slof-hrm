<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<html>
    <head>
        <title></title>
    </head>
    <body>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_role.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String id,danwei_id,strsql;
        String deleted="";
        int len=0;
        danwei_id = request.getParameter("id");
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                id = chkbx[i];
                strsql = "delete from xtglt_role where id='"+id+"'";
                if (qxbean.execute(strsql)){deleted="true";}
            }
            if (deleted.equals("true")){%>
        <script language=javascript>
            alert("ɾ���ɹ�");
            window.location="list_role.jsp?id=<%=danwei_id%>";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("ɾ��ʧ�ܣ�");
            window.location="list_role.jsp?id=<%=danwei_id%>";
        </script>
        <%}%>
        <%}else{%>
        <script language=javascript>
            alert("����ѡ��Ҫɾ������!");
            window.location="list_role.jsp?id=<%=danwei_id%>";
        </script>
        <%}%>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>