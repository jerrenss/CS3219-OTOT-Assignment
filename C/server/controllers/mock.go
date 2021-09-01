package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func WelcomeUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Welcome, User!"})
}

func WelcomeAdmin(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Welcome, Admin!"})
}
