package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	// Gin router initialization
	router := gin.Default()

	// GET endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Welcome to the Go app!"})
	})

	// Run application  on port 4000
	router.Run(":4000")
}
