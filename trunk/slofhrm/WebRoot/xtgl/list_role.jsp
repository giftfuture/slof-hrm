<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>�û������</title>
    </head>
    <body topmargin="1" leftmargin="0">
        <script language=javascript>
            function gopage(id)
            {
            window.location="list_role.jsp?id="+id+"&page="+document.all["selctpageno"].options[document.all["selctpageno"].selectedIndex].value;
            }

            function delitem(danwei_id){
            if (confirm("ȷʵҪɾ����")==true){
            document.form1.action="delete_role_tj.jsp?id="+danwei_id;
            document.form1.target="_self";
            document.form1.submit();
            }
            }
            
            function selectall(){
            var len=document.all["chkbx"].length;
            if (len>1){
            for (var i=0;i<len;i++){
            document.all["chkbx"][i].checked=true;
            }
            }else{
            document.all["chkbx"].checked=true;
            }
            document.all["btnunselectall"].style["display"]="inline";
            document.all["btnselectall"].style["display"]="none";
            }
            
            function unselectall(){
            var len=document.all["chkbx"].length;
            if (len>1){

            for (var i=0;i<len;i++){
            document.all["chkbx"][i].checked=false;
            }
            }else{
            document.all["chkbx"].checked=false;
            }
            document.all["btnunselectall"].style["display"]="none";
            document.all["btnselectall"].style["display"]="inline";
            }
            
        </script>
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_role.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
        String danwei_id = request.getParameter("id");
        String strcurrentpage = request.getParameter("page");
        String id,rolename,note;
        String strallrownum="";
        String danwei_name="";
        int allrownum=0;
        int curpage=0;
//�õ������� allrownum
		ResultSet danwei_rs = qxbean.getResultSet("SELECT name FROM xtglt_danwei where id='"+danwei_id+"'");
		if(danwei_rs.next()){danwei_name=danwei_rs.getString("name");}                
		ResultSet rs1 = qxbean.getResultSet("SELECT count(*) as num FROM xtglt_role where danwei_id='"+danwei_id+"'");
		if(rs1.next()){allrownum=Integer.parseInt(rs1.getString("num"));}

//�����ܷ�ҳ��
        int onepagenum=10;
        int pagenum=(allrownum%onepagenum)==0?(allrownum/onepagenum):(allrownum/onepagenum+1);
        
//���ݴ������� strcurrentpage �õ���Ӧҳ�棬���û�д�ֵ����ʾ��һҳ��
        if (strcurrentpage==null){curpage=1;}else{
            curpage=Integer.parseInt(strcurrentpage);
            if (curpage<0){curpage=1;}
            if (curpage>pagenum){curpage=pagenum;}
        }
//����ҳ����ʾ����
        ResultSet rs2 = qxbean.getResultSet("SELECT * FROM xtglt_role where danwei_id='"+danwei_id+"' order by id");
        %>
        <form name="form1" method="post">
            <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <TR>
				<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;�û������</DIV></TD>
            </TR>
            <TR>
            <TD vAlign="top">
                <table id="tbMsg" style="BORDER-COLLAPSE: collapse" bordercolor="#111111" cellspacing="1" width="100%" border="0">
                <TR bgcolor="#bfbfbf" align="center" height="25px">
                    <TD width="4%" bgcolor="#FFEFD5"><STRONG>ѡ��</STRONG></TD>
                    <TD width="25%" bgcolor="#FFEFD5"><STRONG>������</STRONG></TD>
                    <TD width="26%" bgcolor="#FFEFD5"><STRONG>������λ</STRONG></TD>
                    <TD width="45%" bgcolor="#FFEFD5"><STRONG>������</STRONG></TD>
                </TR>
                <%
                int i=0;
                while(rs2.next()){
                    i++;
                    id=rs2.getString("id");
                    rolename=rs2.getString("rolename");
                    note=rs2.getString("note");
                    //danwei_id=rs2.getString("danwei_id");
                    
                    if (i>(curpage-1)*onepagenum&&i<=curpage*onepagenum){
						if(!id.equals(roleid)){
						%>
						<TR bgcolor="#FFFAFA">
							<TD align="center"><input type="checkbox" name="chkbx" value="<%=id%>"></TD>
							<TD align="center"><A Href = "edit_role.jsp?id=<%=id%>&dwid=<%=danwei_id%>"><%=rolename %></A></TD>
							<TD align="center"><%= danwei_name %></TD>
							<TD align="center"><%= note %></TD>
						</TR>
						<%}
                    }
                }
                %>
                </TABLE>
                <table style="BORDER-COLLAPSE: collapse" borderColor="#111111" cellSpacing="1" width="100%" border="0">
                    <TR>
                        <TD width="30%" align="center" bgColor="#FFEFD5" height="24">
                            <input type="button" name="btnselectall" value="ȫѡ" onclick="selectall()" <% if (pagenum==0){%>style="display:none"<%}%>/>
                            <input type="button" name="btnunselectall" value="ȫ��ѡ" onclick="unselectall()" style="display:none" />
                            <input type="button" name="btndelitem" value="ɾ��" onclick="delitem(<%=danwei_id%>)" <% if (pagenum==0){%>style="display:none"<%}%>/>
                            <input type="button" name="addrole" value="���" onclick="window.location='add_role.jsp?id=<%= danwei_id %>'" />
                            <input type="button" name="btnreturn" value="����" onclick="window.location='admin_role.jsp'" />
                        </TD>
                        <TD valign="middle" align="center" width="55%" bgcolor="#FFEFD5" >
                            <span id="lPageInfo">[<STRONG><%=curpage%></STRONG>/<%=pagenum%>ҳ] </span>
                            <span id="lCount">[��<%=allrownum%>��]</span>
                            <a id="first" <% if (curpage==1){%>disabled="disabled"<%}else{%>href="list_role.jsp?id=<%= danwei_id %>&page=1"<%}%>>[��ҳ]</a>
                            <a id="pageup" <% if (curpage==1){%>disabled="disabled"<%}else{%>href="list_role.jsp?id=<%= danwei_id %>&page=<%=curpage-1%>"<%}%>>[��һҳ]</a>
                            <a id="pagedown" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%>href="list_role.jsp?id=<%= danwei_id %>&page=<%=curpage+1%>"<%}%>>[��һҳ]</a>
                            <a id="last" <% if (curpage==pagenum){%>disabled="disabled"<%}else{%>href="list_role.jsp?id=<%= danwei_id %>&page=<%=pagenum%>"<%}%>>[βҳ]</a>
                        </TD>
                        <TD valign="middle" align="center" width="15%" bgColor="#FFEFD5" colSpan="3">
                            <select name="selctpageno" id="selctpageno">
                                <% for (int k=1;k<=pagenum;k++){%><option <%if (k==curpage){%>selected<%}%> value="<%=k%>"><%=k%></option><%}%>
                            </select>
                            <input type="button" name="btngoto" value="ת��" onclick="gopage(<%= danwei_id %>)"/>
                        </TD>
                    </TR>
                </table>
            </TD>
                </TR>
            </table>
        </form>
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