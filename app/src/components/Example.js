'use client';
import React from 'react';
import { Button } from 'flowbite-react';

const ExampleComponent = () => {
  return (
    <>hello

     <Button>Click me</Button>
      <div className="bg-blue-500 text-white p-4">
      This is an example component using Tailwind CSS classes!
      hello i am here
    </div>

    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button color="blue">Blue</Button>
      <Button color="gray">Gray</Button>
      <Button color="dark">Dark</Button>
      <Button color="light">Light</Button>
      <Button color="success">Success</Button>
      <Button color="failure">Failure</Button>
      <Button color="warning">Warning</Button>
      <Button color="purple">Purple</Button>
    </div>
    </>
  

  );
};

export default ExampleComponent;