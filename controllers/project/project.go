package project

import (
	"net/http"

	"github.com/NUZEROVI/nuzerovi.onrender.com/models"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func Show(ctx *gin.Context) {
	//Query data
	project_ID := ctx.Query("projectID")
	var Info = Query(project_ID)

	//router process
	defer func() {
		if err := recover(); err != nil {
			ctx.Redirect(http.StatusTemporaryRedirect, "httpstatus/notfound")
		}
	}()

	//projectName := ctx.Query("project")
	view_name := ctx.Param("view_name")
	ctx.HTML(http.StatusOK, view_name, gin.H{
		"title":      "Jing Ru's CV",
		"project_ID": project_ID,
		//"project_Name" : projectName ,
		"name":         Info.Name,
		"detail":       Info.Detail,
		"goal":         Info.Goal,
		"github_title": Info.Github_Title,
		"github_url":   Info.Github_Url,
		"period":       Info.Period,
		"img1":         Info.Img1, "img2": Info.Img2, "img3": Info.Img3, "img4": Info.Img4, "img5": Info.Img5,
		"img6": Info.Img6, "img7": Info.Img7, "img8": Info.Img8, "img9": Info.Img9, "img10": Info.Img10,
	})
}

// Query
func Query(projectID string) models.ProjectInfo {
	db := models.Connect()

	var Info models.ProjectInfo
	db.Where("ID = ?", projectID).Find(&Info)
	return Info
}
