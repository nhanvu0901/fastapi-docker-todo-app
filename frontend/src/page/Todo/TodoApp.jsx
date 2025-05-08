import {React, useState} from 'react';
import {Card, Typography, Space, Switch, Button} from 'antd';
import {BulbOutlined, PlusOutlined, DingdingOutlined,SkypeOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode, setAddModal, selectIsDarkMode} from '../../redux/uiSlice';

import TodoList from './components/TodoList'
import AddTodoModal from "./components/AddTodoModal";

const {Title} = Typography;

const TodoApp = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const [toggleTodo, setToggleTodo] = useState(false)
  return (
    <div>
      <Card bordered={false}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
          <Title level={2} style={{margin: 0}}>Todo List</Title>

          <Space>
            <Switch
              checkedChildren={<DingdingOutlined/>}
              unCheckedChildren={<SkypeOutlined/>}
              checked={toggleTodo}
              onChange={() => setToggleTodo((prevState) => !prevState)}
            />
            <Switch
              checkedChildren={<BulbOutlined/>}
              unCheckedChildren={<BulbOutlined/>}
              checked={isDarkMode}
              onChange={() => dispatch(toggleDarkMode())}
            />
            <Button
              type="primary"
              icon={<PlusOutlined/>}
              onClick={() => dispatch(setAddModal(true))}
            >
              Add Todo
            </Button>
          </Space>
        </div>
        {toggleTodo ? '' : <TodoList/>}


      </Card>

      <AddTodoModal />
      {/*<EditTodoModal />*/}
    </div>
  );
}
export default TodoApp