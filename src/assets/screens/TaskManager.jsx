import React, { useState, useRef, useEffect, useMemo } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import apiRequest from "../../api/api_call";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { Checks, Trash } from "@phosphor-icons/react";

const TaskManager = () => {
  const { register, handleSubmit } = useForm({});
  const [input, setInput] = useState("");
  const [todosResponse, setTodosResponse] = useState([]);
  const [completedTodosResponse, setCompletedTodosResponse] = useState([]);
  const todoRef = useRef(null);
  async function getAllTodos() {
    const apiDetails = {
      urlEndpoint: "/todos",
      requestMethod: "GET",
    };

    let apiResponse = await apiRequest(apiDetails);
    setTodosResponse(apiResponse.data.todos);
    console.log(apiResponse, "check");

    if (apiResponse.status != 200 && apiResponse.status != 201) {
      toast.error(apiResponse.data.message);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  async function getCompletedToDos() {
    const apiDetails = {
      urlEndpoint: "/completed-todos",
      requestMethod: "GET",
    };

    let apiResponse = await apiRequest(apiDetails);
    setCompletedTodosResponse(apiResponse.data.todos);
    console.log(apiResponse, "comppp");

    if (apiResponse.status != 200 && apiResponse.status != 201) {
      toast.error(apiResponse.data.message);
    }
  }

  const data = useMemo(
    () =>
      todosResponse.map((item) => ({
        col1: item.name,
        col2: item.date.substr(0, 10),
        col3: (
          <Button
            type="button"
            value="Completed"
            variant="normal"
            onClickFunction={() => markAsComplete(item)}
            icon={<Checks size={32} />}
          />
        ),
        col4: (
          <Button
            type="button"
            value="Delete"
            variant="danger"
            onClickFunction={() => deleteTodo(item)}
            icon={<Trash size={32} />}
          />
        ),
      })),
    [todosResponse]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Tasks",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Date created",
        accessor: "col2",
      },
      {
        Header: "Check off",
        accessor: "col3",
      },
      {
        Header: "Delete",
        accessor: "col4",
      },
    ],
    []
  );

  async function markAsComplete(item) {
    todoRef.current = item?._id;
    const apiDetails = {
      urlEndpoint: `/complete-todo/${todoRef.current}`,
      requestMethod: "POST",
    };

    let apiResponse = await apiRequest(apiDetails);

    if (apiResponse.status === 200 || apiResponse.status === 201) {
      toast.success(apiResponse.data.message);
      getAllTodos();
    } else {
      toast.error(apiResponse.data.message);
    }
  }
  async function deleteTodo(item) {
    todoRef.current = item?._id;

    const apiDetails = {
      urlEndpoint: `/todo/${todoRef.current}`,
      requestMethod: "DELETE",
    };

    let apiResponse = await apiRequest(apiDetails);

    if (apiResponse.status === 200 || apiResponse.status === 201) {
      toast.success(apiResponse.data.message);
      getAllTodos();
    } else {
      toast.error(apiResponse.data.message);
    }
  }
  const onSubmit = async (data) => {
    const apiDetails = {
      urlEndpoint: "/todo",
      requestMethod: "POST",
    };

    const reqPayload = { name: input };

    let apiResponse = await apiRequest(apiDetails, reqPayload);

    console.log(apiResponse, "check12");

    if (apiResponse.status == 200 || apiResponse.status == 201) {
      setInput("");
      getAllTodos();
      toast.success(apiResponse.data.message);
    } else {
      toast.error(apiResponse.data.message);
    }
  };

  return (
    <>
      <div className="main-container p-4 max-h-100 scroll-auto max-w-100">
        <div className="flex items-center justify-center mt-6">
          <PageTitle title="Task Manager" />
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          enctype="application/json"
        >
          <div className="flex gap-3 mt-8 items-center justify-center">
            <Input
              nameAttribute="todo"
              register={register}
              value={input}
              onChangeFunction={(e) => setInput(e.target.value)}
            />
            <Button type="submit" value="Add" variant="normal" />
          </div>
        </form>
        <div className="flex items-center justify-center mt-5">
          <Button
            type="button"
            value="Show Completed Todos"
            variant="normal"
            onClickFunction={getCompletedToDos}
          />
        </div>
        <div className="table-container flex items-center justify-center mt-8">
          <Table
            data={data}
            columns={columns}
            // actions={[
            //   { actionName: "Delete",
            //     actionFunction: deleteTodo },
            //   {
            //     actionName: "Mark as Completed",
            //     actionFunction: markAsComplete,
            //   },
            // ]}
          />
        </div>
      </div>
    </>
  );
};

export default TaskManager;
