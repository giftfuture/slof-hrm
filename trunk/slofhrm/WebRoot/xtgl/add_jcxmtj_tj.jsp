<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.sql.*" %>
<html>
    <head>
        <title></title>
    </head>
    <body>
	<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
	<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_jcxmtj.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String tjxm="",bglb="",strsql="",jcxm_id="",jcxmtj_id="";
        tjxm = qxbean.ISOtoGB(request.getParameter("tjxm"));
        bglb = qxbean.ISOtoGB(request.getParameter("bglb"));
        
		String saved1="";
        String saved2="";
		
        //�鿴ͳ����Ŀģ�������Ƿ��Ѵ���
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_jcxmtj where tjxm='"+tjxm+"' and bgzl2_id='"+ bglb +"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("ģ�������Ѵ��ڣ�����ġ�");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "insert into xtglt_jcxmtj(tjxm,bgzl2_id) Values ('"+tjxm+"','"+ bglb +"')";
        if (qxbean.execute(strsql)) {saved1="true";}else{saved1="false";}
        //�õ��ղ����ģ��id
        ResultSet rs1 = qxbean.getResultSet("select @@IDENTITY as currentid");
        if (rs1.next()){jcxmtj_id=rs1.getString("currentid");}
     
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            int len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                jcxm_id = chkbx[i];
                strsql = "insert into xtglt_jcxmtj_jcxm (jcxmtj_id,jcxm_id) values ('"+ jcxmtj_id +"','"+jcxm_id+"')";
                if (qxbean.execute(strsql)){saved2="true";}else{saved2="false";}
            }
        }
		
		if (saved1.equals("true")&&saved2.equals("true")){%>
        <script language=javascript>
            alert("����ɹ�!");
            window.location='admin_jcxmtj.jsp';
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
<%
}catch(Exception e){
	System.out.println("ҳ��"+request.getRequestURI()+"����"+e.getMessage());
	e.printStackTrace();
}finally{
	qxbean.close();
	qxbean1.close();
}
%>