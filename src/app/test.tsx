import { useState } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
