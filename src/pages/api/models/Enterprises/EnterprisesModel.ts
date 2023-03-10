import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../sql/connect';
// import User from './UserModel';


const Enterprises = sequelize.define('Enterprises', {
  NIT: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  enterpriseName: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 50,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 50,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 20,
  },
}, {
  freezeTableName: true
});
// Rol.hasMany(User);

// `sequelize.define` also returns the model
console.log(Enterprises === sequelize.models.Enterprises); // true

sequelize.sync().then(() => {
  console.log('Enterprises table created successfully!');

}).catch((error:any) => {
  console.error('Unable to create table : ', error);
});

export default Enterprises;