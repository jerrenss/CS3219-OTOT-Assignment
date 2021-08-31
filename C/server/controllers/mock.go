package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func WelcomeUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Welcome, User!"})
}

func WelcomeAdmin(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Welcome, Admin!"})
}

func WelcomeSuperadmin(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Welcome, Superadmin!"})
}
