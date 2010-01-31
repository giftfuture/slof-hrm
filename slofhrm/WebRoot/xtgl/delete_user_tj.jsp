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
    String tempurl="xtgl/admin_user.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        //传递上个页面中查询条件
		String condition,queryvalue,query_danwei_id,query_role_id;
		if (request.getParameter("condition")!=null){condition = qxbean.ISOtoGB(request.getParameter("condition"));}else{condition ="0";}
        if (request.getParameter("queryvalue")!=null){queryvalue = qxbean.ISOtoGB(request.getParameter("queryvalue"));}else{queryvalue ="";}
        if (request.getParameter("query_danwei_id")!=null){query_danwei_id = qxbean.ISOtoGB(request.getParameter("query_danwei_id"));}else{query_danwei_id ="";}
        if (request.getParameter("query_role_id")!=null){query_role_id = qxbean.ISOtoGB(request.getParameter("query_role_id"));}else{query_role_id ="";}
		
		String id,strsql;
        String deleted="";
        int len=0;
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                id = chkbx[i];
                strsql = "delete from xtglt_user where id='"+id+"'";
                if (qxbean.execute(strsql)){deleted="true";}
            }
            if (deleted.equals("true")){%>
                    <script language=javascript>
                        alert("删除成功");
                        window.location="admin_user.jsp?condition=<%=condition%>&queryvalue=<%=queryvalue%>&query_danwei_id=<%=query_danwei_id%>&query_role_id=<%=query_role_id%>";
                    </script>
            <%}else{%>
                    <script language=javascript>
                        alert("删除失败！");
                        history.back();
                    </script>
            <%}%>
        <%}else{%>
        <script language=javascript>
            alert("请先选择要删除的项!");
            history.back();
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