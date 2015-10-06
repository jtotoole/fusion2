import express from "express"
import artsyXapp from "artsy-xapp"
import request from "superagent"
import async from 'async'

let { ARTSY_URL } = process.env
let app = express()

app.get('/', (req, res, next) => {
  async.parallel([
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/artist/andy-warhol`).set({
        'x-xapp-token': artsyXapp.token
      }).end((err, sres) => {
        callback(null, sres.body)
      })
    },
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/artist/andy-warhol/artworks`).set({
        'x-xapp-token': artsyXapp.token
      }).end((err, sres) => {
        callback(null, sres.body)
      })  
    }
  ], (err, results) => {
      let data = {
        'artist': results[0],
        'artworks': results[1]
      }
      res.send(data)
  })
})

artsyXapp.init(() => {
  app.listen(3000, () => console.log("server started", artsyXapp.token))
})
