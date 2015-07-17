(function() {
  var Config;

  Config = (function() {
    function Config() {}

    Config.prototype.OracleUser = "";

    Config.prototype.OraclePass = "";

    Config.prototype.OracleCon = "";

    Config.prototype.LockSql = 'SELECT a.session_id,a.oracle_username, a.os_user_name, b.owner "OBJECT OWNER", b.object_name,b.object_type,a.locked_mode FROM V$Locked_Object A, All_Objects B WHERE A.Object_ID = B.Object_ID';

    Config.prototype.ReportHeader = "Session ID, Oracle User Name, OS User Name, Owner, Object Name, Object Type, Locked Mode \n";

    return Config;

  })();

  module.exports = new Config();

}).call(this);
