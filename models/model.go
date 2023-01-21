package models

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

// Project Info
type ProjectInfo struct {
	ID                                                          uint   `json:"id"`
	Name                                                        string `json:"name"`
	Detail                                                      string `json:"detail" gorm:"type:longtext"`
	Goal                                                        string `json:"goal"`
	Github_Title                                                string `json:"github_title"`
	Github_Url                                                  string `json:"url"`
	Others_Place                                                string `json:"others_place"`
	Period                                                      string `json:"period"`
	Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10 string
}

func Init() {
	db, err := gorm.Open("mysql", "bca636043a1203:561045eb@(us-cdbr-iron-east-04.cleardb.net)/heroku_cc0e9c5eb8441b0?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Migrate the schema
	//db.AutoMigrate(&ProjectInfo{})
	//db.Delete(&ProjectInfo{})
	/*
		db.Create(&project1)
	*/
}

func Connect() *gorm.DB {
	db, err := gorm.Open("mysql", "bca636043a1203:561045eb@(us-cdbr-iron-east-04.cleardb.net)/heroku_cc0e9c5eb8441b0?charset=utf8mb4&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	return db
}
