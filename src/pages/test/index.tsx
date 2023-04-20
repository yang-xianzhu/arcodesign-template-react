import React from 'react';
import { Typography, Card } from '@arco-design/web-react';

function Test() {
  return (
    <Card style={{ height: '80vh' }}>
      <Typography.Title heading={6}>
        <div className="text-white bg-blue p-[12px] rounded-[12px]">
          This is use uno.css page.
        </div>
      </Typography.Title>
      <Typography.Text>You can add content here :)</Typography.Text>
    </Card>
  );
}

export default Test;
