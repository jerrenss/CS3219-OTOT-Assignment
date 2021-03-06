package middlewares

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
)

const ACCESS_SECRET = "not-very-secretive"

func ExtractToken(r *http.Request) string {
	cookie, err := r.Cookie("jwt")
	if err != nil {
		return ""
	}
	return cookie.Value
}

func VerifyToken(r *http.Request) (*jwt.Token, jwt.MapClaims, error) {
	tokenString := ExtractToken(r)
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected Signing Method: %v", token.Header["alg"])
		}
		return []byte(ACCESS_SECRET), nil
	})
	if err != nil {
		return nil, nil, err
	}
	return token, claims, nil
}

func TokenValid(r *http.Request) (jwt.MapClaims, error) {
	token, claims, err := VerifyToken(r)
	if err != nil {
		return nil, err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return nil, err
	}
	return claims, nil
}

func ValidateLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, err := TokenValid(c.Request)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorised - " + err.Error()})
			return
		}
		c.Set("role", claims["role"])
		c.Set("user_id", claims["user_id"])
		c.Next()
	}
}

func ValidateAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, _ := c.Get("role")
		intRole := uint8(role.(float64))
		if intRole != 2 {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Forbidden access on admin resource"})
			return
		}
		c.Next()
	}
}
