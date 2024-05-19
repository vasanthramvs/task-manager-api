// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimeStamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result)=>{
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    db.collection('users').insertMany([
        {
            name: "Jen",
            age: 25
        }, {
            name: "Gunert",
            age: 23
        }
    ], (error, result)=>{
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: "Clean the house",
            completed: true
        }, {
            description: "Renew inspection",
            completed: false
        }, {
            description: "pot plants",
            completed: false
        }
    ], (error, result)=>{
        if (error) {
            return console.log("Failed to insert documents")
        } 

        console.log(result.ops)
    })

    db.collection('users').findOne({ name:'Jen'}, ( error, user)=>{
        if (error) {
            return console.log('Unable to fetch the details')
        }
        // if u search for any document with same age or name, it will always return the first one and not the all. In that case use the object ID.
        // db.collection('users').findOne({ _id: new ObjectID("59adfvcthrad5789")}, ( error, user)=>{
        console.log(user)
    })

    db.collection('users').find({ age:27 }).toArray((error, users)=>{
        console.log(users)
    })

    db.collection('users').find({ age:27 }).toArray((error, count)=>{
        console.log(count)
    })

    db.collection('tasks').find({ completed:false }).toArray((error, tasks)=>{
        console.log(tasks)
    })



    db.collection('users').updateOne({
        _id: newObjectID('5678atrwnhytre15')
    }, {
        $set:{
            name:'Mike'
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })




    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set:{
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })




    db.collection('users').deleteMany({
        age: 27
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description: "Pot Plants"
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})