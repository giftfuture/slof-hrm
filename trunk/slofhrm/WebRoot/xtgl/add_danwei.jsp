<%@ page contentType="text/html; charset=GB2312"%>
<%@ page import="java.sql.*" %>
<jsp:useBean id="qxbean" scope="page" class="jlcx.DBConn"/>
<jsp:useBean id="qxbean1" scope="page" class="jlcx.DBConn"/>
<LINK href="xtgl.css" type="text/css" rel="stylesheet">
<html>
    <head>
        <title>��ӵ�λ</title>
    </head>
    <script language=javascript>
        function datacheck()
        {
        if(document.form1.danweiname.value=="")
        {alert("��������뵥λ����!");document.form1.danweiname.focus();return;}
        else 
        {    document.form1.submit();}
        }
    </script>
	<body topmargin="1" leftmargin="0">
        <form action="add_danwei_tj.jsp" method="post" name="form1">
            <table height="138" cellSpacing="0" cellPadding="0" width="100%" border="0">
                <TR>
					<TD class="heading" bgColor="#FFDAB9" height="20"><DIV style="font-size:15px;filter:progid:DXImageTransform.Microsoft.Glow(Color=#FFFFFF,Strength=3);width:200px"><font color="#4B0082">&nbsp;&nbsp;��ӵ�λ</DIV></TD>
                </TR>
                <TR>
                    <TD vAlign="top" >
                        <TABLE style="BORDER-COLLAPSE: collapse" height="101" cellSpacing="1" width="100%" bgColor="#666666" border="0">
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">��λ����</TD>
                                <TD bgColor="#ffffff" ><input name="danweiname" type="text" size="50" maxlength="50" id="danweiname"/><FONT face="����" color="#ff0000">*</FONT></TD>
                            </TR>
                            <TR>
                                <TD bgColor="#FFFAFA" align="center">�ϼ���λ����</TD>
                                <TD bgColor="#ffffff">
<%
try{
    String roleid=(String)session.getAttribute("roleid");
    String tempurl="xtgl/admin_danwei.jsp";
%>
    <%@ include file="../logined.jsp"%>
    <%@ include file="../isinrole.jsp"%>
<%
String id,name,lvl,zhu_id="";
int i=0,intlvl=0,HasSub=0;
//ȡ����ϵͳ����Ա��role_id�����ݵ�λΪ�գ���ϵͳ����Ա�������κε�λ
    String admin_role_id="";
    ResultSet admin_rs = qxbean.getResultSet("select id from xtglt_role where danwei_id is null");
    if (admin_rs.next()){
        admin_role_id=admin_rs.getString("id");
    }
if (roleid.equals(admin_role_id)){
%>
    <select name="superiorid_lvl">
        <option selected value=""></option>
        <%
        ResultSet zhu_rs = qxbean.getResultSet("select id from xtglt_danwei where id=superior_id order by id");
        while(zhu_rs.next()){
            zhu_id=zhu_rs.getString("id");
            ResultSet rs = qxbean1.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");

            while(rs.next()){
                id=rs.getString("id");
                name=rs.getString("name");
                lvl=rs.getString("lvl");
				HasSub=Integer.parseInt(rs.getString("hassub"));
                intlvl=Integer.parseInt(lvl)-1;
			%>
                <option value="<%=id%>_<%=lvl%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
            <%}
         }%>
    </select>
<%}else{%>
    <select name="superiorid_lvl">
        <%
            //����Ƿּ�����Ա�����������ڵ�λ�г������¼���λ
            //ȡ���ּ�����Ա��danwei_id
            String sub_admin_superior_id;
            int sub_admin_lvl=0;
            ResultSet sub_admin_rs = qxbean.getResultSet("select * from xtglt_danwei where id in(select danwei_id from xtglt_role where id='"+roleid+"')");
            if (sub_admin_rs.next()){
                zhu_id=sub_admin_rs.getString("id");
                sub_admin_superior_id=sub_admin_rs.getString("superior_id");
                //ȡ���ֹ���Ա���ڵ�λ�ļ���
                sub_admin_lvl=Integer.parseInt(sub_admin_rs.getString("lvl"));
            }
            
            ResultSet rs = qxbean.getResultSet("select * from GetSubdanwei(1,"+zhu_id+")");
            while(rs.next()){
                id=rs.getString("id");
                name=rs.getString("name");
                lvl=rs.getString("lvl");
				HasSub=Integer.parseInt(rs.getString("hassub"));
                intlvl=Integer.parseInt(lvl)-sub_admin_lvl;
			%>
                <option value="<%=id%>_<%=lvl%>"><%for(i=0;i<intlvl;i++){out.println("|");}%><%if (HasSub==0){out.println("-");}else{out.println("+");}%><%=name%></option>
            <%}%>
    </select>
<%}%>
                                    <FONT face="����" color="#ff0000">*</FONT>
                                </TD>
                            </TR>  
                            <TR>
                                <TD align="center" bgColor="#FFFAFA">��λ����</TD>
                                <TD bgColor="#ffffff"><textarea name="description" rows="6" id="note" style="height:72px;width:456px;"></textarea></TD>
                            </TR>
                    
                            <TR>
                                <TD vAlign="top" align="left" width="75" bgColor="#FFFAFA" height="18"></TD>
                                <TD bgColor="#ffffff" height="18">&nbsp;
                                    <input type="button" name="save" id="save" value="����" onclick="datacheck()" />&nbsp;&nbsp;
                                    <input type="reset"  name="rewrite" id="rewrite" value="��д" />&nbsp;&nbsp;
                                    <input type="button" name="return" value="����" onclick="window.location='admin_danwei.jsp'" />
                                </TD>
                            </TR>
                        </TABLE>
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
	qxbean1.close();
}
%>