module.exports = (sequelize, DataTypes) =>
    sequelize.define('dataGenerator', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        _generator: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        generator: {
            type: new DataTypes.VIRTUAL(DataTypes.JSON, ['_generator']),
            get: function() {
                return this.get('_generator') && JSON.parse(this.get('_generator'));
            },
            set: function(val) {
                this.setDataValue('generator', val);
                this.setDataValue('_generator', JSON.stringify(val));
            },
            validate: {
                isObject(val) {
                    if(typeof val !== 'object' || !isNaN(val.length)) {
                        throw new TypeError('it\'s not a object');
                    }
                }
            }
        },
        merge: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
