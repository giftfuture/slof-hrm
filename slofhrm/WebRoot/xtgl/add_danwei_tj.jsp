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
    String tempurl="xtgl/admin_danwei.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String name,description,superior_id,strlvl,superior_id_lvl,strsql,strsql2="";
        String danwei_id="";
        
        name = qxbean.ISOtoGB(request.getParameter("danweiname"));
        description = qxbean.ISOtoGB(request.getParameter("description"));
        superior_id_lvl = request.getParameter("superiorid_lvl");

        if (superior_id_lvl.equals("")){
            strsql = "insert into xtglt_danwei(name,description,superior_id,lvl) Values ('"+name+"','"+ description +"',IDENT_CURRENT('xtglt_danwei')+1,'1')";
        }else{
            String aryTemp[] =superior_id_lvl.split("_");
            superior_id=aryTemp[0];
            strlvl=aryTemp[1];
            int lvl=Integer.parseInt(strlvl)+1;
            strsql = "insert into xtglt_danwei(name,description,superior_id,lvl) Values ('"+name+"','"+ description +"','"+ superior_id +"','"+lvl+"')";
			strsql2 = "update xtglt_danwei set hassub='1' where id='"+ superior_id +"'";
        }
        if (qxbean.execute(strsql)) {
			//�����λ����ɹ���������ѡ���ϼ���λsuperior_id�������ϼ���λ��hassub����ʾ�����¼���λ
			boolean updated = qxbean.execute(strsql2);
		%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location="admin_danwei.jsp";
        </script>
        <%}else{%>
        <script language=javascript>
            alert("���ݿ����ʧ��!");
            window.history.go(-1);
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