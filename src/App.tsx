import AppRoutes from "./router";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
