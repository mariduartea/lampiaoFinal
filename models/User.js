import Sequelize, { Model } from 'sequelize'; //importar o Model de dentro do sequelize
class User extends Model {
    static inti(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        }, {
            sequelize,
        });
    }
}
export default new User();