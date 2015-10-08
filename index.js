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

app.get('/partners', (req, res, next) => {
  async.parallel([
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/partner/gagosian-gallery`).set({
        'x-xapp-token': artsyXapp.token
      }).end((err, sres) => {
        callback(null, sres.body)
      })
    },
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/partner/white-cube`).set({
        'x-xapp-token': artsyXapp.token
      }).end((err, sres) => {
        callback(null, sres.body)
      })
    }
  ], (err, results) => {
      let data = {
        'gagosian': results[0],
        'white cube': results[1]
      }
      res.send(data)
  })
})

app.get('/fairs', (req, res, next) =>{
  async.parallel([
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/fair/artbo`).set({
      'x-xapp-token': artsyXapp.token
    }).end((err, sres) => {
      callback(null, sres.body)
    })
  },
    (callback) => {
      request.get(`${ARTSY_URL}/api/v1/fair/art-basel`).set({
        'x-xapp-token': artsyXapp.token
      }).end((err, sres) => {
        callback(null, sres.body)
      })
    }
  ], (err, results) => {
      let james = {
        'artbo': results[0],
        'art basel': results[1]
      }
      res.send(james)
  })
})

artsyXapp.init(() => {
  app.listen(3000, () => console.log("server started", artsyXapp.token))
})
