<%@ page contentType="text/html; charset=GB2312"%>
<%
session.removeAttribute("jcdwbt");
session.removeAttribute("jcdw");
session.removeAttribute("sjdw");
session.removeAttribute("sjdw1");
session.removeAttribute("dwdzyb");
session.removeAttribute("dhua");
session.removeAttribute("dzyjdz");
session.removeAttribute("jcztzd");
session.removeAttribute("jsu");
session.removeAttribute("jce");
session.removeAttribute("ywen");
session.removeAttribute("userid");
session.removeAttribute("username");
session.removeAttribute("name");
session.removeAttribute("email");
session.removeAttribute("phone");
session.removeAttribute("note");
session.removeAttribute("roleid");
session.removeAttribute("rolename");
session.removeAttribute("danweiid");
session.removeAttribute("danweiname");
session.removeAttribute("ipdz");
response.sendRedirect("index.htm");
%>

