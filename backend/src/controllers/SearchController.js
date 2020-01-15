const {Router} = require('express')
const parseStringAsArray = require('../utils/parseStringAsArray')

const Dev = require('../models/Dev')

module.exports = {
    async index(request, response){
        //Buscar todos os devs num raio de 10kkm
        //Filter por tecnologia
        const {latitude, longitude, techs} = request.query
        
        techsArray = parseStringAsArray(techs)
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return response.json({ devs })
    }
}