package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "encoding/json"
  "log"
  "github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

type PostResponse struct {
  UserID       int `json:"userId"`
  ID    int `json:"id"`
  Title      int `json:"title"`
  Body      int `json:"body"`
}

func main() {
  // Gin router initialization
  router := gin.Default()

  // Connect to Redis
  redisClient := redis.NewClient(&redis.Options{
		Addr: "cache:6379",
		Password: "",
		DB: 0,
	})

  _, err := redisClient.Ping().Result()
  if err == nil {
    fmt.Println("Server is successfully connected to Redis!")
  } else {
    fmt.Println(err)
  }

  // Home endpoint
  router.GET("/", func(c *gin.Context) {
	  c.JSON(http.StatusOK, gin.H{"data": "Welcome to the Go app!"})    
  })

  // Data endpoint
  router.GET("/api/posts", func(c *gin.Context) {
    resp, err := http.Get("http://jsonplaceholder.typicode.com/posts")

    if err != nil {
      log.Fatal(err)
      c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }

    var result []PostResponse
    if err := json.Unmarshal(body, &result); err != nil {  // Parse []byte to the go struct pointer
        fmt.Println("Can not unmarshal JSON")
    }

    c.JSON(http.StatusOK, gin.H{"data": result})    
  })

  router.Run(":4000") 
}