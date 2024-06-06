import User from '../models/user.models.js';

export const editUser = async (req, res) => {

    const { id } = req.params
    console.log(id)

    try {
        const user = await User.findByIdAndUpdate(id, req.body)
        //const user_edit = await User.findById(id)

        //console.log(user_edit)
        res.json(user);

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: ['Error al actualizar el usuario'] });

    }

}





export const deleteUser = async (req, res) => {


    const { id } = req.params
    console.log(id)
    try {
        const user = await User.findByIdAndDelete(id)
        // const user_delet = await User.findById(id)
        //console.log(user_delet)
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: ['Error al eliminar el usuario'] });

    }

}


