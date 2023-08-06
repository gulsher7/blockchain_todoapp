// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Todo {

 
    address owner;

    struct Task {
        uint id;
        string name;
        string date;
    }

    Task public task;

    // Creating a mapping
    mapping(uint256 => Task) tasks;

    uint256 taskId = 1;

    modifier checkId(uint256 id) {
        require(id != 0 && id < taskId, "Invalid id");
        _;
    }

     modifier checkOwner() {
        require(owner == msg.sender, "Owner Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }


    function createTask(string calldata _taskName, string calldata _date) checkOwner()  public {
                
                    tasks[taskId] = Task(taskId, _taskName, _date);
                    taskId++; 
    }
        function updateTask(uint _taskId, string calldata _taskName, string calldata _date) public {
                    tasks[_taskId] = Task(_taskId, _taskName, _date);
                    taskId++; 
    }

         function getllTasks() public view returns(Task[] memory) {
             Task[] memory taskList = new Task[](taskId-1);
             for(uint i= 0; i < taskId -1 ;i++){
                 taskList[i] = tasks[i+1];
             }
            return taskList;
    }

    function viewTask(uint _id) checkId(_id) public  view  returns (Task memory){
            return tasks[_id];
    }

       function deleteTask(uint _id) checkId(_id) public {
            delete tasks[_id];
    }
}
