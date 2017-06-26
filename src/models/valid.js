module.exports = (sequelize, DataTypes) =>
    sequelize.define('valid', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        _action: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        action: {
            type: new DataTypes.VIRTUAL(DataTypes.JSON, ['_action']),
            get: function() {
                return this.get('_action') && JSON.parse(this.get('_action'));
            },
            set: function(val) {
                this.setDataValue('action', val);
                this.setDataValue('_action', JSON.stringify(val));
            }
        }
        // preValid: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'preValid',
        //         key: 'id'
        //     }
        // },
        // postValid: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'postValid',
        //         key: 'id'
        //     }
        // }
    });
