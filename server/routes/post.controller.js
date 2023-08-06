

const createPost = async (req, res) => {
    try {
        const contract = global.contract

        const { name, date } = req.body

        console.log("req.body", req.body)

        const fetchTask = await contract.methods.getllTasks().call();
        const foundTask = await fetchTask.find(task => task.date == date)
        console.log("foundTask", foundTask)

        if (!!foundTask) {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be added" })
        } else {
            res.status(200).json({ status: 200, message: "Task can be added" })
        }
    } catch (error) {
        res.status(403).json({ status: false, error: error, message: error?.message || "something wen't wrong" });
    }
}


const updatePost = async (req, res) => {
    try {
     
        const {id, name, date } = req.body
        if (!id) {
            res.status(409).json({ status: 409, message: "Id not found" })
        } else if(!name){
            res.status(409).json({ status: 409, message: "Name not valid" })
        }else {
            res.status(200).json({ status: 200, message: "Task can be added" })
        }
    } catch (error) {
        res.status(403).json({ status: false, error: error, message: error?.message || "something wen't wrong" });
    }
}

const viewPost = async (req, res) => {
    const contract = global.contract
    try {
        const { id } = req.params
        const task = await contract.methods.viewTask(id).call();
        console.log("tasktask", task)
        res.send({
            status: 200,
            data: task.name
        })
    } catch (error) {
        res.status(403).json({ status: false, error: error, message: error?.message || "something wen't wrong" });
    }
}

const getAllPosts = async (req, res) => {
    
    try {
        const contract = global.contract

        const task = await contract.methods.getllTasks().call();
        console.log("tasktask", task)
        if (task.length > 0) {
            const addId = task.map(({ id, name, date }) => {
                return { id: Number(id), name, date }
            })
            res.send({
                status: 200,
                data: addId
            })
        } else {
            res.send({
                status: 200,
                data: []
            })
        }

    } catch (error) {
        res.status(403).json({ status: false, error: error, message: error?.message || "something wen't wrong" });
    }
}


const deletePost = async (req, res) => {
    const contract = global.contract
    console.log("contractcontract",contract)
    try {
        const { id } = req.body
        const task = await contract.methods.deleteTask(id).call();
        console.log("tasktask",task)
        res.send({
            status: 200,
            data: { message: "Deleted successfully" }
        })

    } catch (error) {
        res.status(403).json({ status: false, error: error, message: error?.message || "something wen't wrong" });
    }
}


module.exports = {
    createPost,
    updatePost,
    viewPost,
    getAllPosts,
    deletePost,
}