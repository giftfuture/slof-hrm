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
        String role_id ="",username="",pwd="",repwd="",user_name="",email="",phone="",note="",strsql="";
        username = qxbean.ISOtoGB(request.getParameter("username"));
        pwd = qxbean.ISOtoGB(request.getParameter("pwd"));
        user_name = qxbean.ISOtoGB(request.getParameter("user_name"));
        email = qxbean.ISOtoGB(request.getParameter("email"));
        phone = qxbean.ISOtoGB(request.getParameter("phone"));
        note = qxbean.ISOtoGB(request.getParameter("note"));
        role_id = qxbean.ISOtoGB(request.getParameter("role_id"));
        //�鿴���û����Ƿ��Ѵ���
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_user where username='"+username+"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("�û����Ѵ��ڣ�����ġ�<%=username%>����");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "insert into xtglt_user(username,password,name,email,phone,note,role_id) Values ('"+username+"','"+ pwd +"','"+ user_name +"','"+ email +"','"+ phone+"','"+ note+"','"+role_id +"')";
        if (qxbean.execute(strsql)){%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location='admin_user.jsp';
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ�ܣ�");
            window.history.go(-1);
        </script>
        <%}
        }
        %>
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