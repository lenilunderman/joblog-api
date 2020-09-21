// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// get the model that will be used...
const JobListing = require('../models/joblisting')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// const joblisting = require('../models/joblisting')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// The routers of the job listing application...
// INDEX show all GET/ joblisting
// router.get('/joblisting', requireToken, (req, res, next) => {
//   JobListing.findById(req.params.id)
//     .then(joblistings => {
//       requireOwnership(req, joblistings)
//       return joblistings.map(joblisting => joblisting.toObject())
//     })
//     .then(joblistings => res.status(200).json({ joblistings: joblistings }))
//     //if erros
//     .catch(next)
// })
// SHOW only one resource / GET joblisting/776fsd6f87sd6fsfs7fs8fsdf
router.get('/joblisting/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  JobListing.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(joblisting => res.status(200).json({ joblisting: joblisting.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)

})

// search stuff
router.get('/joblisting/s/:search', requireToken, (req, res, next) => {
  JobListing.find({ owner: req.user.id })
    .then(joblistings => {
      // requireOwnership(req, joblistings)
      const joblistingArray = joblistings.map(joblisting => joblisting.toObject())
      if (!req.params.search) {
        return joblistingArray
      }
      else {
        return joblistingArray.filter(job => job.companyName.toUpperCase().includes(req.params.search.toUpperCase()))
      }
    })
    .then(joblistings => res.status(200).json({ joblistings: joblistings }))
    //if erros
    .catch(next)
})

router.get('/joblisting', requireToken, (req, res, next) => {
  JobListing.find({ owner: req.user.id })
    .then(joblistings => {
      // requireOwnership(req, joblistings)
      return joblistings.map(joblisting => joblisting.toObject())
    })
    .then(joblistings => res.status(200).json({ joblistings: joblistings }))
    //if erros
    .catch(next)
})

// CREATE  - POST /joblisting
router.post('/joblisting', requireToken, (req, res, next) => {
  // set the owner of the joblisting to the current user
  req.body.joblisting.owner = req.user.id

  JobListing.create(req.body.joblisting)
    .then(joblisting => {
      res.status(201).json({ joblisting: joblisting.toObject() })
    })
    .catch(next)
})

// DELETE joblisting/4234fdas65f6d5f68asd5f8a5f8758a5sd
router.delete('/joblisting/:id', requireToken, (req, res, next) => {
  // console.log(req.params.id)
  JobListing.deleteOne({ _id: req.params.id })
    .then(handle404)
    // send back 204 if no content if deletion succeeded
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE  PATCH /joblisting/fads87695ad97f6s9dfasdf0asdfa76f0asd.
router.patch('/joblisting/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.joblisting.owner
  console.log('req body info: ', req.body)
  JobListing.findById(req.params.id)
    .then(handle404)
    .then(joblisting => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, joblisting)

      // pass the result of Mongoose's .updte to the next .then
      return joblisting.updateOne(req.body.joblisting)
    })
    // if succeded, return 204 and no json
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)

})

module.exports = router