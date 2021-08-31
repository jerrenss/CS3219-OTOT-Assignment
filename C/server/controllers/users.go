package controllers

import (
	"c-server/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateUserInput struct {
	First_Name string `json:"first_name" binding:"required"`
	Last_Name  string `json:"last_name" binding:"required"`
	Username   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	Role   uint8   `json:"role" binding:"required"`
}

type LoginUserInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func CreateUser(c *gin.Context) {
	// Validate input
	var input CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	// Hash password
	hashedPassword, err := models.Hash(input.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Unable to hash password!"})
		return
	}

	// Create user
	user, err := models.CreateUser(input.First_Name, input.Last_Name, input.Username, string(hashedPassword), input.Role)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Creation of user failed!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func LoginUser(c *gin.Context) {
	var input LoginUserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Input mismatch!"})
		return
	}

	user, err := models.GetUserByUsername(input.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "User record not found!"})
		return
	}

	err = models.VerifyPassword(user.Password_Hash, input.Password); 
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid password!"})
		return
	}

	token, err := models.CreateToken(user.User_Id, user.Role)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Unable to create JWT token")
		return
	}

	c.SetCookie("jwt", token, 3600, "/", "/", false, true)
	c.JSON(http.StatusOK, gin.H{"data": "Login successful!"})
}

func SignoutUser(c *gin.Context) {
	// Delete JWT token
	token, err := models.DeleteToken()
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, "Unable to delete JWT token")
		return
	}

	// Set cookie and return respose to client
	c.SetCookie("jwt", token, -1, "/", "/", false, true)
	c.JSON(http.StatusOK, gin.H{"data": "Signout successful!"})
}
