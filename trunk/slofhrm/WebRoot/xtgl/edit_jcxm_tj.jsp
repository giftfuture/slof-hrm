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
    String tempurl="xtgl/admin_jcxm.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String jcxm_id="",jcxm="",jcxmlb="",strsql="";
		jcxm_id = qxbean.ISOtoGB(request.getParameter("jcxmid"));
        jcxm = qxbean.ISOtoGB(request.getParameter("jcxm"));
        jcxmlb = qxbean.ISOtoGB(request.getParameter("jcxmlb"));
        
		//查看项目名称是否已存在
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_jcxm where id<>'"+jcxm_id+"' and jcxm='"+jcxm+"' and jcxmlb='"+ jcxmlb +"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("项目名称已存在，请更改。");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "update xtglt_jcxm set jcxm='"+jcxm+"', jcxmlb='"+ jcxmlb +"' where id='"+jcxm_id+"'";
        if (qxbean.execute(strsql)){%>
        <script language=javascript>
            alert("修改成功!");
            window.location='admin_jcxm.jsp';
        </script>
        <%}else{%>
        <script language=javascript>
            alert("数据库操作失败！");
            window.history.go(-1);
        </script>
        <%}
        }
        %>
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