// This is a module worker, so we can use imports (in the browser too!)
import pi from "./utils/pi";

addEventListener("message", (event: MessageEvent<string>) => {
  console.log("event", process.env.NODE_ENV);
  postMessage((String(event.data) + `${typeof window === 'undefined' ? "browser" : "server"}`));
});
