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
    String tempurl="common/admin_fzs.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        //�����ϸ�ҳ���в�ѯ����
		String condition,queryvalue,query_danwei_id,query_role_id;
        if (request.getParameter("queryvalue")!=null){queryvalue = qxbean.ISOtoGB(request.getParameter("queryvalue"));}else{queryvalue ="";}
        		
		String id,strsql;
        String deleted="";
        int len=0;
        if (request.getParameterValues("chkbx")!=null){
            String chkbx[] = request.getParameterValues("chkbx");
            len = java.lang.reflect.Array.getLength(chkbx);
            for(int i = 0; i < len ; i++){
                id = chkbx[i];
                strsql = "delete from xtglt_insert_char where id='"+id+"'";
                if (qxbean.execute(strsql)){deleted="true";}
            }
            if (deleted.equals("true")){%>
                    <script language=javascript>
                        alert("ɾ���ɹ�");
                        window.location="admin_fzs.jsp?queryvalue=<%=queryvalue%>";
                    </script>
            <%}else{%>
                    <script language=javascript>
                        alert("ɾ��ʧ�ܣ�\n\n�ִ汨�������к��д˼����Ŀ������ɾ����\n\n��ȷʵҪɾ��������ɾ�����д˼����Ŀ�ı��档");
                        history.back();
                    </script>
            <%}%>
        <%}else{%>
        <script language=javascript>
            alert("����ѡ��Ҫɾ������!");
            history.back();
        </script>
        <%}%>
    </body>
</html>
