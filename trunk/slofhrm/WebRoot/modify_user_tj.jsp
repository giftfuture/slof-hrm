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
%>
    <%@ include file="logined.jsp"%>
<%
        String user_id,role_id ="",username="",pwd="",repwd="",user_name="",email="",phone="",note="",strsql="";
        user_id = (String)session.getAttribute("userid");
        username = qxbean.ISOtoGB(request.getParameter("username"));
        pwd = qxbean.ISOtoGB(request.getParameter("pwd"));
        user_name = qxbean.ISOtoGB(request.getParameter("user_name"));
        email = qxbean.ISOtoGB(request.getParameter("email"));
        phone = qxbean.ISOtoGB(request.getParameter("phone"));
        note = qxbean.ISOtoGB(request.getParameter("note"));
        role_id = (String)session.getAttribute("roleid");
        //�鿴���û����Ƿ��Ѵ���
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_user where id<>'"+user_id+"' and username='"+username+"'");
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
        strsql = "update xtglt_user set username='"+username+"',password='"+ pwd +"',name='"+ user_name +"',email='"+ email +"',phone='"+ phone +"',note='"+ note +"',role_id='"+ role_id +"' where id='"+user_id+"'";
        if (qxbean.execute(strsql)){
		//��session.setAttribute("name",user_name)����
		session.setAttribute("name",user_name);
		%>
        <script language=javascript>
            alert("�޸ĳɹ�!");
			window.parent.frames[0].location = "menu.jsp";
            window.location='modify_user.jsp';
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ�ܣ�");
            window.history.go(-1);
        </script>
        <%}
        }
        qxbean.close();
        %>
    </body>
</html>
