<Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                  
<Form.Item
    name="fullname"
    label="Full Name"
    tooltip="What do you want others to call you?"
    rules={[{ required: true, message: 'Please input your full name!', whitespace: true }]}
>
    <Input />
</Form.Item>

<Form.Item
    name="email"
    label="E-mail"
    rules={[
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
        {
            required: true,
            message: 'Please input your E-mail!',
        },
    ]}
>
    <Input value={email} onChange={this.handleInputChange} />
</Form.Item>


{this.props.location.pathname === '/employee/register' ?
<Form.Item>
    <Form.Item
        name="password"
        label="Password"
        rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
        ]}
        hasFeedback
    >
        <Input.Password value={password} onChange={this.handleInputChange} />
    </Form.Item>
    <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
        ]}
    >
        <Input.Password value={confirmPassword} onChange={this.handleInputChange} />
    </Form.Item>
</Form.Item>
: ''}

{this.props.location.pathname === '/employee/register' ?
<Form.Item
    name=" userName"
    label="UserName"
    tooltip="What do you want others to call you?"
    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
>
    <Input />
</Form.Item>
: ''}


<Form.Item
    name="address"
    label="Address"
>
    <Input value={email} onChange={this.handleInputChange} />
</Form.Item>


<Form.Item
    name="phoneNumber"
    label="Phone Number"
    rules={[{
        required: true, message: 'Please input your phone number!'
    }]}
>
    <Input style={{ width: '100%' }} value={phoneNumber} onChange={this.handleInputChange} />
</Form.Item>



<Form.Item
    name="identityNumber"
    label="Identity Number"
    rules={[{
        required: true, message: 'Please input your phone number!'
    }]}
>
    <Input style={{ width: '100%' }} value={identityNumber} onChange={this.handleInputChange} />
</Form.Item>

{this.props.location.pathname === '/employee/register' ?
<Form.Item
    name="role"
    label="Role"
    hasFeedback
// rules={[{ required: true, message: 'Please select your role!' }]}
>
    <SelectBar name='role'
        type="role"
        value={role}
        placeholder='Select role'
        list={this.state.roleList}
        onSelectRole={this.onSelectRole} />
</Form.Item>
:
this.props.profile.roleName === 'PM' ?
    <div className="col" style={{ marginTop: 5 }}>
        <label className="bmd-label">
            <h5 style={{ fontWeight: 350, fontSize: 15 }}>{showRole(role)}</h5>
        </label>
    </div>
    :
    <Form.Item
        name="role"
        label="Role"
        hasFeedback
        rules={[{ required: true, message: 'Please select your role!' }]}
    >
        <SelectBar
            type="role"
            value={role}
            placeholder='Select role'
            list={this.state.roleListUpdate}
            onSelectRole={this.onSelectRole} />

        <div className="col" style={{ marginTop: 5 }}>
            <label className="bmd-label">
                <h5 style={{ fontWeight: 350, fontSize: 15 }}>{showRole(role)}</h5>
            </label>
        </div>
    </Form.Item>
}
<Form.Item >
<Button className="btn btn-primary pull-right mt-3" type="primary" htmlType="submit" >
    {this.props.location.pathname !== '/employee/register' ? 'Update' : 'Create'}
</Button>
</Form.Item>

</Form>