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
        String role_id="";
        String rolename,note,danwei_id,gn_id,return_flag,strsql;
        String saved1="";
        String saved2="";
        rolename = qxbean.ISOtoGB(request.getParameter("rolename"));
        note = qxbean.ISOtoGB(request.getParameter("note"));
        danwei_id = request.getParameter("superiorid");
        return_flag = request.getParameter("return_flag");
        
        strsql = "insert into xtglt_role(rolename,note,danwei_id) Values ('"+rolename+"','"+ note +"','"+ danwei_id +"')";
        if (qxbean.execute(strsql)) {saved1="true";}else{saved1="false";}
        //得到刚插入的用户组ID
        ResultSet rs = qxbean.getResultSet("select @@IDENTITY as currentid");
        if (rs.next()){role_id=rs.getString("currentid");}
        //todo:根据用户自己的权限分配
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            int len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                gn_id = chkbx[i];
                strsql = "insert into xtglt_role_qx (role_id,gn_id) values ('"+ role_id +"','"+gn_id+"')";
                if (qxbean.execute(strsql)){saved2="true";}else{saved2="false";}
            }
        }
      
        if (saved1.equals("true")&&saved2.equals("true")){%>
        <script language=javascript>
            alert("保存成功!");
            <%
                if (return_flag.equals("ToMain")){
                    out.println("window.location='admin_role.jsp';");
                }else{
                    out.println("window.location='list_role.jsp?id="+danwei_id+"';");
                }
            %>
        </script>
        <%}
        if (saved1.equals("true")&&saved2.equals("false"))
        {%>
        <script language=javascript>
            alert("用户组已建立,但权限设置出错。\n请修改其权限，或删除此用户组重新添加。");
            <%
                if (return_flag.equals("ToMain")){
                    out.println("window.location='admin_role.jsp';");
                }else{
                    out.println("window.location='list_role.jsp?id="+danwei_id+"';");
                }
            %>
        </script>
        <%}
        if (saved1.equals("false")&&saved2.equals("false"))
        {%>
        <script language=javascript>
            alert("数据库操作失败！");
            window.history.go(-1);
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