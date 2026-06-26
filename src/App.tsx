import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Container from "./components/ui/Container";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import TaskForm from "./components/TaskForm";
import CardLayout from "./components/ui/CardLayout";
import Cards from "./components/ui/Cards";
import TaskList from "./components/TaskList";
function AppContent() {
  const [editingTask, setEditingTask] = useState<any | null>(null);
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-[#050D1A] p-6 font-sans">
        {/*Background*/}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-15%] left-[-10%] w-125 h-125 bg-blue-700/8 rounded-full blur-[100px] " />
          <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-blue-500/6 rounded-full blur-[80px] " />
          <div className="absolute top-[40%] right-[50%] w-75 h-75 bg-indigo-700/5 rounded-full blur-[80px] translate-x-1/2" />

          {/*Grid Background*/}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container>
          <section className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-8 flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-900/50">
                <ClipboardDocumentCheckIcon className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-blue-50 font-black tracking-tight text-2xl">
                TaskFlow
              </h1>
            </div>
            <p className="text-blue-400/50 font-medium text-sm">
              Manage your tasks with clarity and focus
            </p>
          </section>
          {/*Grid layout*/}
          <CardLayout>
            {/*left Card - Task Form*/}
            <Cards
              title={editingTask ? "Edit Task" : "New Task"}
              description={
                editingTask
                  ? "Modify the selected task below"
                  : "Fill in the details and add to your list"
              }
            >
              <TaskForm
                editingTask={editingTask}
                onCancelEdit={() => setEditingTask(null)}
              />
            </Cards>
            {/*right card - Task List*/}
            <Cards
              title="Your Tasks"
              description="Click a task to toggle completion · hover for actions"
              className="from-blue-950/50 to-[#060e1e]/70"
              contentClassName="h-[430px]"
            >
              <TaskList onEdit={(task: any) => setEditingTask(task)} />
            </Cards>
          </CardLayout>
        </Container>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
