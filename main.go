package main

import (
	"fmt"

	"github.com/NUZEROVI/nuzerovi.onrender.com/models"
	"github.com/NUZEROVI/nuzerovi.onrender.com/routers"

	"runtime"

	"github.com/astaxie/beego/logs"
)

func main() {

	// [logs configuration]
	logs.SetLogger(logs.AdapterConsole) // "console"
	logs.SetLogger(logs.AdapterMultiFile, `{"filename":"log/project.log","level":7,"maxlines":0,"maxsize":0,"daily":true,"maxdays":10,"separate":["emergency"]}`)
	logs.Async(1000)
	logs.Info("set logger ok")

	// [mysql configuration]
	models.Init()

	// [Router configuration]
	ConfigRuntime()        // ConfigRuntime sets the number of operating system threads.
	routers.StartWorkers() // StartWorkers start starsWorker by goroutine.
	routers.StartGin()     // StartGin starts gin web server with setting router.

}

func ConfigRuntime() {
	nuCPU := runtime.NumCPU()
	runtime.GOMAXPROCS(nuCPU)
	fmt.Printf("Running with %d CPUs\n", nuCPU)
}
