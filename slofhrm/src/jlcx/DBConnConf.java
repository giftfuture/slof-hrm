package jlcx;
import java.sql.*;
import java.io.*;
import java.util.*;
public class DBConnConf {
    private String ConfFile="conf.property";
    private String server=getServer();
    private String dbName=getDbName();
    private String user=getUser();
    private String pwd=getPwd();
    private String port=getPort();
    
    private Connection conn=null;
    private Statement stmt=null;
    private ResultSet rs=null;
    
    public DBConnConf() {
        BuildConnection();
    }
    private void BuildConnection() {
        try {
            //Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            //conn = DriverManager.getConnection("jdbc:microsoft:sqlserver://"+server+":"+port+";DatabaseName="+dbName,user,pwd);
            conn = DriverManager.getConnection("jdbc:jtds:sqlserver://"+server+":"+port+";DatabaseName="+dbName,user,pwd);
            //conn.setCatalog(dbName);
        } catch(Exception ex) {
            System.out.println(ex.toString());
        }
    }
    public Connection getConnection() {
        if(conn==null)
            BuildConnection();
        return this.conn;
    }
    private void setStatement() {
        try{
            stmt=getConnection().createStatement();
        }catch(Exception e){System.out.print(e);}
    }
    public Statement getStatement() {
        if(stmt==null)
            setStatement();
        return this.stmt;
    }
    public ResultSet getResultSet(String sqlStatement) {
        try{
            if(stmt==null)
                setStatement();
            stmt=getStatement();
            rs=stmt.executeQuery(sqlStatement);
        }catch(Exception e){System.out.print(e);}
        return rs;
    }
    
    
    
    public boolean execute(String sql){
        try{
            if(stmt==null)
                setStatement();
            stmt=getStatement();
            if(stmt.executeUpdate(sql) == 0)
                return false;
            else
                return true;
        }catch(SQLException e){
            System.out.print(e);
            return false;
        }
    }
    
    /**
     *ISOtoGB(String str)方法用于字符的转换，将iso字符转化成为gb2312字符。改变在输出汉语时为乱码的现象。
     **/
    public static String ISOtoGB(String str){
        if(str==null)
            return "";
        try{
            byte[] bytes = str.getBytes("ISO8859_1");
            String temp = new String(bytes);
            return temp;
        }catch(UnsupportedEncodingException e){
            return "";
        }
    }
    /**
     *replace(String str1, String str2, String str3)方法用于字符串的替换。
     *@return 返回值得类型为字符串型
     *@param str1, str2, str3 均为字符串型，str1为提交的一段内容，str2为被替换的内容，str3为替换成的内容。
     **/
    public static String replace(String str1, String str2, String str3){
        int len = str2.length();
        int f = str1.indexOf(str2);
        do{
            if(f!=-1)
                str1 = str1.substring(0,f)+str3+str1.substring(f+len);
            f = str1.indexOf(str2);
        }while(f!=-1);
        return str1;
    }
    
    public void close() {
        try {
            conn.close();
            conn=null;
        } catch(SQLException sex) {
            System.out.println(sex.toString());
        }
    }
    /**
     *getServer()用于取得数据库所在服务器的名称。
     *@return the return type of database server name is String
     **/
    private String getServer() {
        Properties prop= new Properties();
        try {
            InputStream is = getClass().getResourceAsStream(ConfFile);
            prop.load(is);
            if(is!=null) is.close();
        } catch(Exception e) {
            System.out.println(e+"file "+ConfFile+" not found");
        }
        return prop.getProperty("Server");
    }
    /**
     *getDBName()用于取得数据库的名称。
     *@return the return type of database name is String
     **/
    private String getDbName() {
        Properties prop= new Properties();
        try {
            InputStream is = getClass().getResourceAsStream(ConfFile);
            prop.load(is);
            if(is!=null) is.close();
        } catch(Exception e) {
            System.out.println(e+"file "+ConfFile+" not found");
        }
        return prop.getProperty("DataBase");
    }
    /**
     *getUser()用于取得数据库用户的名称。
     *@return the return type is String
     **/
    private String getUser() {
        Properties prop= new Properties();
        try {
            InputStream is = getClass().getResourceAsStream(ConfFile);
            prop.load(is);
            if(is!=null) is.close();
        } catch(Exception e) {
            System.out.println(e+"file "+ConfFile+" not found");
        }
        return prop.getProperty("User");
    }
    /**
     *getPassword()用于取得数据库用户的密码。
     *@return the return type is String
     **/
    private String getPwd() {
        Properties prop= new Properties();
        try {
            InputStream is = getClass().getResourceAsStream(ConfFile);
            prop.load(is);
            if(is!=null) is.close();
        } catch(Exception e) {
            System.out.println(e+"file "+ConfFile+" not found");
        }
        return prop.getProperty("Password");
    }
    
    /**
     *getPassword()用于取得数据库得端口号默认为1433。
     *@return the return type is String
     **/
    private String getPort() {
        Properties prop= new Properties();
        try {
            InputStream is = getClass().getResourceAsStream(ConfFile);
            prop.load(is);
            if(is!=null) is.close();
        } catch(Exception e) {
            System.out.println(e+"file "+ConfFile+" not found");
        }
        return prop.getProperty("Port");
    }
}

