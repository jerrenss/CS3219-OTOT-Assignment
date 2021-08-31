package main

import (
	"c-server/controllers"
	"c-server/middlewares"
	"c-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	// Gin router initialization
	Router := gin.Default()

	models.InitDB()

	// Endpoints
	Router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Welcome to the Go app!"})
	})
	Router.POST("/api/users/create", controllers.CreateUser)
	Router.POST("/api/users/login", controllers.LoginUser)
	Router.GET("/api/users/signout", controllers.SignoutUser)

	Router.GET("/api/mock/user", middlewares.ValidateLogin(), controllers.WelcomeUser)
	Router.GET("/api/mock/admin", middlewares.ValidateLogin(), middlewares.ValidateAdmin(), controllers.WelcomeAdmin)
	Router.GET("/api/mock/superadmin", middlewares.ValidateLogin(), controllers.WelcomeSuperadmin)

	Router.Run(":4000")
}
