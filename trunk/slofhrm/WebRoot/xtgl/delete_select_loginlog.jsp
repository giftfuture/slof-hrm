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
					//数据库删除成功后，删除文件夹中文件
				deleted="true";}
            }
            if (deleted.equals("true")){%>
        <script language=javascript>
            alert("删除成功");
            window.location="admin_loginlog.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("删除失败！");
            window.location="admin_loginlog.jsp";
        </script>
        <%}%>
        <%}else{%>
        <script language=javascript>
            alert("请先选择要删除的项!");
            window.location="admin_loginlog.jsp";
        </script>
        <%}%>
    </body>
</html>
<%
}catch(Exception e){
	System.out.println("页面"+request.getRequestURI()+"出错："+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
}
%>