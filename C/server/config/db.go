package config

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var DB *gorm.DB

func InitDB() {
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

	fmt.Println("Connected to PostgreSQL!")

	// DB.AutoMigrate(&Users{})
	// DB.AutoMigrate(&Events{})
	// DB.AutoMigrate(&Photos{})
	// DB.AutoMigrate(&Registers{})
	// DB.AutoMigrate(&Likes{})
	// DB.AutoMigrate(&Comments{})

	// DB.Model(&Likes{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	// DB.Model(&Likes{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	// DB.Model(&Comments{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	// DB.Model(&Comments{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	// DB.Model(&Registers{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
	// DB.Model(&Registers{}).AddForeignKey("user_id", "users(user_id)", "CASCADE", "CASCADE")
	// DB.Model(&Photos{}).AddForeignKey("event_id", "events(event_id)", "CASCADE", "CASCADE")
}
