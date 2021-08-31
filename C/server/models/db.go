package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
)

var DB *gorm.DB

func InitDB() {
	// Place these details in .env file for better security
	host := "database"
	port := 5432
	username := "OTOT-C-USER"
	dbName := "OTOT-C"
	password := "OTOT-C-PW"

	URI := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable password=%s", host, port, username, dbName, password)
	instance, err := gorm.Open("postgres", URI)
	if err != nil {
		panic(err.Error())
	}
	DB = instance
	log.Println("Connected to PostgreSQL!")

	DB.LogMode(false)
	DB.AutoMigrate(&User{})
}
