'use client';
import { useEffect, useRef, useCallback, useState } from 'react';

export default function Index() {
  const workerRef = useRef<Worker>();
  const [state, setState] = useState('');

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../worker.ts', import.meta.url));
    workerRef.current.onmessage = (event: MessageEvent<string>) =>
      // alert(`WebWorker Response => ${event.data}`);
    console.log(event.data)
      setState(event.data);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage('100000');
  }, []);

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <button type="button" onClick={()=>console.log(JSON.stringify(state))}>a</button>
      <button type="button" onClick={()=>setState(state)}>qqq</button>
      <button onClick={handleWork}>Calculate PI</button>
    </>
  );
}
