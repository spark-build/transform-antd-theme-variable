import {
  Card,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Menu,
  Dropdown,
  Pagination,
  Steps,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Select,
  InputNumber,
} from 'antd';

const { Text, Link } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea, Search } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export const Components: React.FC<{}> = () => {
  return (
    <>
      <Card title="Button">
        <Space>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="ghost">ghost Button</Button>
          <Button type="primary" danger>
            Primary
          </Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
        </Space>
      </Card>

      <Card title="Typography">
        <Space direction="vertical">
          <Text>Ant Design (default)</Text>
          <Text type="secondary">Ant Design (secondary)</Text>
          <Text type="success">Ant Design (success)</Text>
          <Text type="warning">Ant Design (warning)</Text>
          <Text type="danger">Ant Design (danger)</Text>
          <Text disabled>Ant Design (disabled)</Text>
          <Text mark>Ant Design (mark)</Text>
          <Text code>Ant Design (code)</Text>
          <Text keyboard>Ant Design (keyboard)</Text>
          <Text underline>Ant Design (underline)</Text>
          <Text delete>Ant Design (delete)</Text>
          <Text strong>Ant Design (strong)</Text>
          <Text italic>Ant Design (italic)</Text>
          <Link href="https://ant.design" target="_blank">
            Ant Design (Link)
          </Link>
        </Space>
      </Card>

      <Card title="Dropdown">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  1st menu item
                </a>
              </Menu.Item>
              <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  2nd menu item
                </a>
              </Menu.Item>
              <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  3rd menu item
                </a>
              </Menu.Item>
              <Menu.Item danger>a danger item</Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Hover me
          </a>
        </Dropdown>
      </Card>

      <Card title="Pagination">
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </Card>

      <Card title="Steps">
        <Space>
          <Steps current={1}>
            <Step title="Finished" description="This is a description." />
            <Step
              title="In Progress"
              subTitle="Left 00:00:08"
              description="This is a description."
            />
            <Step title="Waiting" description="This is a description." />
          </Steps>

          <Steps current={1} progressDot>
            <Step title="Finished" description="You can hover on the dot." />
            <Step title="In Progress" description="You can hover on the dot." />
            <Step title="Waiting" description="You can hover on the dot." />
            <Step title="Waiting" description="You can hover on the dot." />
          </Steps>
        </Space>
      </Card>

      <Card title="AutoComplete">
        <AutoComplete options={[]} placeholder="input here" />
      </Card>

      <Card title="AutoComplete">
        <Cascader
          defaultValue={['zhejiang', 'hangzhou', 'xihu']}
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </Card>

      <Card title="Checkbox">
        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Card>

      <Card title="DatePicker">
        <Space direction="vertical" size={12}>
          <RangePicker />
          <RangePicker showTime />
          <RangePicker picker="week" />
          <RangePicker picker="month" />
          <RangePicker picker="year" />
        </Space>
      </Card>

      <Card title="Form">
        <Form {...formItemLayout}>
          <Form.Item
            label="Fail"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="unavailable choice" id="error" />
          </Form.Item>

          <Form.Item label="Warning" validateStatus="warning">
            <Input placeholder="Warning" id="warning" />
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated..."
          >
            <Input placeholder="I'm the content is being validated" id="validating" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input placeholder="I'm the content" id="success" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <Input placeholder="Warning" id="warning2" />
          </Form.Item>

          <Form.Item
            label="Fail"
            hasFeedback
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="unavailable choice" id="error2" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error">
            <Select allowClear>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
              <Option value="3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated..."
          >
            <Cascader options={[{ value: 'xx', label: 'xx' }]} allowClear />
          </Form.Item>

          <Form.Item label="inline" style={{ marginBottom: 0 }}>
            <Form.Item
              validateStatus="error"
              help="Please select the correct date"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <DatePicker />
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                lineHeight: '32px',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input allowClear placeholder="with allowClear" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <Input.Password placeholder="with input password" />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error">
            <Input.Password allowClear placeholder="with input password and allowClear" />
          </Form.Item>
        </Form>
      </Card>

      <Card title="Input">
        <Space direction="vertical">
          <Input placeholder="Basic usage" />
          <Search placeholder="input search text" style={{ width: 200 }} />
          <Search placeholder="input search text" allowClear style={{ width: 200 }} />
          <Search placeholder="input search text" enterButton />
          <TextArea placeholder="Controlled autosize" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Space>
      </Card>
    </>
  );
};
