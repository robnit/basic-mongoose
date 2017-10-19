const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('creature api', () => {

    beforeEach( () => mongoose.connection.dropDatabase() );

    const creature = {
        name: 'vampire criminal',
        createType: 'vampire',
        power: 2,
        toughness: 3,
        abilities: 'flying',
        protectionFrom: 'red',
        diesToRemoval: true
    };

    describe('POST', () => {
        it('posts with valid _id', () => {
            return request.post('/api/creatures')
                .send(creature)
                .then( res => {
                    assert.ok(res.body._id);
                });
        });
    });

    describe('GET', () => {
        it('gets creature from db', () => {
            return request.post('/api/creatures')
                .send(creature)
                .then(({body}) => request.get(`/api/creatures/${body._id}`))
                .then(({body}) => {
                    assert.equal(body.name, 'vampire criminal'); 
                });
        });

        it('gets creature by id', () => {
            let saved = null;
            return request.post('/api/creatures')
                .send(creature)
                .then( res => {
                    saved = res.body;
                    return request.get(`/api/creatures/${saved._id}`);
                })
                .then( res => {
                    assert.equal(res.body.name, saved.name);
                });
        });

    });

    describe('DELETE', () => {
        
        it.only('should delete a creature', () => {
            return request.post('/api/creatures')
                .send(creature)
                .then( res => {
                    return request.delete(`/api/creatures/${res.body._id}`);
                })
                .then( res => {
                    assert.deepEqual(res.body, { removed: true });
                });
        });
    });


});