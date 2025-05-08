import React from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setAddModal, selectIsAddTodoModalOpen } from '../../../redux/uiSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCustomQuery from "../../../hook/useQuery/useCustomQuery";
import {createTodo} from "../../../api/todo";


const AddTodoModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsAddTodoModalOpen);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listToDos'] });
      form.resetFields();
      dispatch(setAddModal(false));
    },
    onError: (err) => {
      console.error('Failed to add todo:', err);
    },
  });

  const handleCancel = () => {
    dispatch(setAddModal(false))
    form.resetFields();
  };

  const handleSubmit = (values) => {
    // Use mutation.mutate instead of directly calling createTodo
    mutation.mutate({
      title: values.title,
      description: values.description || '',
      completed: values.completed || false,
    });
  };

  return (
    <Modal
      title="Add New Todo"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ completed: false }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="What needs to be done?" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea
            placeholder="Add details (optional)"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          name="completed"
          valuePropName="checked"
        >
          <Checkbox>Mark as completed</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button style={{ marginRight: 8 }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;