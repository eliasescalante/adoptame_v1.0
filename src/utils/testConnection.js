import mongoose from 'mongoose';

const uri = 'mongodb+srv://ninja:671905@adoptame.csyio.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error en la conexión:', err);
  });
