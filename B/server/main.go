package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  // Gin router initialization
  router := gin.Default()

  // GET endpoint
  router.GET("/api", func(context *gin.Context) {
	  context.JSON(http.StatusOK, gin.H{"data": "Welcome to the Go app!"})    
  })

  // Run application  on port 4000
  router.Run(":4000") 
}