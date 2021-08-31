package main

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"io/ioutil"
	"log"
	"net/http"
)

type PostResponse struct {
	UserID int64  `json:"userId"`
	ID     int64  `json:"id"`
	Title  string `json:"title"`
	Body   string `json:"body"`
}

func main() {
	// Gin router initialization
	router := gin.Default()

	// Connect to Redis
	redisClient := redis.NewClient(&redis.Options{
		Addr:     "cache:6379",
		Password: "",
		DB:       0,
	})

	_, err := redisClient.Ping().Result()
	if err == nil {
		log.Println("Server is successfully connected to Redis!")
	} else {
		log.Println(err)
	}

	// Home endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Welcome to the Go app!"})
	})

	// Data endpoint
	router.GET("/api/posts", func(c *gin.Context) {
		val, err := redisClient.Get("posts").Result()

		if err != nil {
			// Cannot be found in Redis
			resp, err := http.Get("http://jsonplaceholder.typicode.com/posts")

			if err != nil {
				log.Println(err)
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			defer resp.Body.Close()

			body, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				log.Println(err)
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			var result []PostResponse
			err = json.Unmarshal(body, &result)
			if err != nil {
				log.Println(err)
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			// Save to Redis
			err = redisClient.Set("posts", body, 0).Err()
			if err != nil {
				log.Println(err)
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"data": result})
		} else {
			// Found in Redis
			var result []PostResponse
			err = json.Unmarshal([]byte(val), &result)
			if err != nil {
				log.Println(err)
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"data": result})
		}
	})

	router.GET("/api/posts-reset", func(c *gin.Context) {
		_ = redisClient.Del("posts")
		c.JSON(http.StatusOK, gin.H{"data": "Redis cache cleared!"})
	})

	router.Run(":4000")
}
