import {Project} from '../index.js'

async function checkIfProjectExists(id) {
    return await Project.findByPk(id);
}

export {
    checkIfProjectExists,
}