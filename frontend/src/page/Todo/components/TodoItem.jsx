import React from 'react';
import { List, Checkbox, Button, Typography, Popconfirm, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';


const { Text } = Typography;

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  // const { mutate: toggleStatus } = useToggleTodoStatus();
  // const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  // const handleToggleStatus = () => {
  //   toggleStatus({ id: todo.id, completed: !todo.completed });
  // };
  //
  // const handleEdit = () => {
  //   dispatch(setSelectedTodo(todo));
  //   dispatch(openEditTodoModal());
  // };
  //
  // const handleDelete = () => {
  //   deleteTodo(todo.id);
  // };

  return (
    <List.Item
      actions={[
        <Button
          icon={<EditOutlined />}
          type="text"

          aria-label="Edit todo"
        />,
        <Popconfirm
          title="Delete this todo?"
          description="This action cannot be undone."

          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <Button
            icon={<DeleteOutlined />}
            type="text"
            danger
            loading={false}
            aria-label="Delete todo"
          />
        </Popconfirm>
      ]}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <Checkbox checked={todo.completed} />
        <Space direction="vertical" size={0} style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1
            }}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text type="secondary" style={{ fontSize: 14 }}>
              {todo.description}
            </Text>
          )}
        </Space>
        {todo.completed ? (
          <Tag color="success">Completed</Tag>
        ) : (
          <Tag color="processing">Active</Tag>
        )}
      </div>
    </List.Item>
  );
};

export default TodoItem;