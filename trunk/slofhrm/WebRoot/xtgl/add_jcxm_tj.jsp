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
        String jcxm="",jcxmlb="",strsql="";
        jcxm = qxbean.ISOtoGB(request.getParameter("jcxm"));
        jcxmlb = qxbean.ISOtoGB(request.getParameter("jcxmlb"));
        
        //�鿴��Ŀ�����Ƿ��Ѵ���
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_jcxm where jcxm='"+jcxm+"' and jcxmlb='"+ jcxmlb +"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("��Ŀ�����Ѵ��ڣ�����ġ�");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "insert into xtglt_jcxm(jcxm,jcxmlb) Values ('"+jcxm+"','"+ jcxmlb +"')";
        if (qxbean.execute(strsql)){%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location='admin_jcxm.jsp';
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