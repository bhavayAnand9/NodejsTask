'use strict'

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

  /*
  * Test the /POST login route
  */
  describe('/POST login', () => {
      it('it should not POST login a user without username', (done) => {
          let user = {
              name: "",
              password: 'lannister'
          }
        chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.errors.should.have.property('errorCode');
                  res.body.errors.should.have.property('message').eql('Auth not successful : bad credentials');
              done();
            });
      });

      it('it should not POST login a user without password', (done) => {
          let user = {
              name: "jon snow",
              password: ''
          }
        chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.errors.should.have.property('errorCode').eql(123);
                  res.body.errors.should.have.property('message').eql('Auth not successful : bad credentials');
              done();
            });
      });      
  });


  /*
  * TEST THE PATCH /jsonpatch route
  */
 describe('/PATCH jsonpatch', () => {
  it('it should not POST patched data if patch is not an array', (done) => {
      let data = {
        "patch": {"op": "replace", "path": "/baz", "value": "boo"},
      
        "JSONdata": {
            "baz": "qux",
            "foo": "bar"
          }
      }
    chai.request(server)
        .patch('/jsonpatch')
        .send(data)
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.errors.should.have.property('errorCode');
              res.body.errors.should.have.property('message').eql('bad data received: patch should be an array');
          done();
        });
  });
  
});



describe('/POST thumbnail', () => {
  it('it should not POST processed thumbnail if a bad URL provided', (done) => {
      let data = {
        "url": "http://www.africau.edu/images/default/sample.pdf"
      }
    chai.request(server)
        .post('/thumbnail')
        .send(data)
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.errors.should.have.property('errorCode');
              res.body.errors.should.have.property('message').eql('bad data received from URL: mime type not matched');
          done();
        });
  });
  
});