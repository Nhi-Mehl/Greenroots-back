import { User } from '../models/index.js';

const userController = {
    async me(req, res) {
        // find user by req.user.id
        const user = await User.findByPk(req.user.id);
        // respond with user
        res.json(user);
    }
};

export default userController;