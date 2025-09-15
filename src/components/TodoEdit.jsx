import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space, Modal } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const TodoEdit = ({ visible, onCancel, onFinish, initialValues = {} }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        text: initialValues.text,
        done: initialValues.done
      });
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="Edit Todo"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="text" label="Text" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="done" label="Status" rules={[{ required: true }]}>
          <Select
            placeholder="Select status"
            allowClear
          >
            <Option value={false}>Pending</Option>
            <Option value={true}>Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoEdit;
