import useCustomQuery from "../../../hook/useQuery/useCustomQuery";
import {getListToDo} from "../../../api/todo";
import { useEffect } from "react";
import { List, Spin, Alert, Empty } from 'antd';
import TodoItem from "./TodoItem";
const TodoList = ({toggleTodo}) => {
  const {useQueryWithoutParams} = useCustomQuery();
  const {data: todoList, isLoading, error } = useQueryWithoutParams({
    api: getListToDo,
    key: 'listToDos',
    options: {
      refetchOnWindowFocus: false,
    },
  })



  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load todos. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  return (
      <List dataSource={todoList}
            loading={isLoading}
            renderItem={(todo) => (
              <TodoItem key={todo.id} todo={todo} />
            )}
            size="large"
            bordered>

      </List>
  )
}

export default TodoList