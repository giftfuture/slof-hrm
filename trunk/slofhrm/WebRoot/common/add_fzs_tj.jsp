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
        String fzs="",cnfzs="",strsql="";
        fzs = qxbean.ISOtoGB(request.getParameter("fzs"));
        cnfzs = qxbean.ISOtoGB(request.getParameter("cnfzs"));
        
        //查看项目名称是否已存在
        int num=0;
        ResultSet rs =qxbean.getResultSet("select count(*) as num from xtglt_insert_char where char_type='chem' and cn_name='"+cnfzs+"' and chem_name='"+ fzs +"'");
        if (rs.next()){
            num=Integer.parseInt(rs.getString("num"));
        }
        if (num>0)
        {%>
        <script language=javascript>
            alert("分子式已存在，请更改。");
            window.history.go(-1);
        </script>
        <%}else{
        strsql = "insert into xtglt_insert_char(chem_name, cn_name, char_type) Values ('"+cnfzs+"','"+ fzs +"','chem')";
        if (qxbean.execute(strsql)){%>
        <script language=javascript>
            alert("保存成功!");
            window.location='admin_fzs.jsp';
        </script>
        <%}else{%>
        <script language=javascript>
            alert("数据库操作失败！");
            window.history.go(-1);
        </script>
        <%}
        }
        qxbean.close();
        %>
    </body>
</html>
