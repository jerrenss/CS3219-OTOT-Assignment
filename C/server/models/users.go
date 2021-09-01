package models

import (
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

const ACCESS_SECRET = "not-very-secretive"

// Roles: 1 - regular user, 2 - admin
type User struct {
	User_Id       uint64    `json:"user_id" gorm:"primary_key"`
	CreatedAt     time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
	First_Name    string    `json:"first_name" gorm:"not null"`
	Last_Name     string    `json:"last_name" gorm:"not null"`
	Username      string    `json:"username" gorm:"unique;not null"`
	Password_Hash string    `json:"password_hash" gorm:"not null"`
	Role          uint8     `json:"role" gorm:"not null"`
}

func Hash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func CreateToken(userId uint64, role uint8) (string, error) {
	var err error
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["user_id"] = userId
	atClaims["role"] = role
	atClaims["exp"] = time.Now().Add(time.Minute * 60).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(ACCESS_SECRET))
	if err != nil {
		return "", err
	}
	return token, nil
}

func DeleteToken() (string, error) {
	var err error
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = false
	atClaims["user_id"] = "Expired"
	atClaims["role"] = "Expired"
	atClaims["exp"] = time.Now().Add(-7 * 24 * time.Hour).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(ACCESS_SECRET))
	if err != nil {
		return "", err
	}
	return token, nil
}

func CreateUser(firstName string, lastName string, username string, hashed_pw string, role uint8) (User, error) {
	user := User{First_Name: firstName, Last_Name: lastName, Username: username, Password_Hash: hashed_pw, Role: role}
	if err := DB.Create(&user).Error; err != nil {
		log.Println(err)
		return User{}, err
	}
	return user, nil
}

func GetUserByUsername(username string) (User, error) {
	var user User
	if err := DB.Where("username = ?", username).First(&user).Error; err != nil {
		log.Println(err)
		return User{}, err
	}
	return user, nil
}
