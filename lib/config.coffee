class Config
  OracleUser: ""
  OraclePass: ""
  OracleCon: ""
  LockSql: 'SELECT a.session_id,a.oracle_username, a.os_user_name,
            b.owner "OBJECT OWNER", b.object_name,b.object_type,a.locked_mode
            FROM V$Locked_Object A, All_Objects B
            WHERE A.Object_ID = B.Object_ID'
  ReportHeader: "Session ID, Oracle User Name, OS User Name, Owner, Object Name,
                 Object Type, Locked Mode \n"

module.exports = new Config()
