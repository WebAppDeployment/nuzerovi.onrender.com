package ini

import (
	"github.com/astaxie/beego/logs"
	"gopkg.in/ini.v1"
)

func Main() (string) {
	//[ini 配置]
	cfg, err := ini.Load("./conf/server.ini")
	if err != nil{
		logs.Critical("No conf/server.ini", err.Error())
		return ""
	}
	sec, err := cfg.GetSection("web")
	if err != nil{
		logs.Critical("No web section in conf/server.ini", err.Error())
		return ""
	}
	default_url, err := sec.GetKey("default_url")
	url := "/"
	if err == nil {
		url = default_url.String()
	}


	return url

}
