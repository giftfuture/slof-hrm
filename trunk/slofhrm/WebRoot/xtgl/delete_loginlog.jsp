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
    String tempurl="xtgl/admin_loginlog.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String id,strsql;
        String deleted="";
        int len=0;
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                id = chkbx[i];
                strsql = "delete from loginlog where id='"+id+"'";
                if (qxbean.execute(strsql)){
					//���ݿ�ɾ���ɹ���ɾ���ļ������ļ�
				deleted="true";}
            }
            if (deleted.equals("true")){%>
        <script language=javascript>
            alert("ɾ���ɹ�");
            window.location="admin_loginlog.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("ɾ��ʧ�ܣ�");
            window.location="admin_loginlog.jsp";
        </script>
        <%}%>
        <%}else{%>
        <script language=javascript>
            alert("����ѡ��Ҫɾ������!");
            window.location="admin_loginlog.jsp";
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