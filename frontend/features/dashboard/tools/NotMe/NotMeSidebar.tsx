import React, { useState } from "react";
import { useNotMe, TrackerType } from "./hooks/useNotMe";
import {
  Plus,
  Trash2,
  Droplets,
  Gamepad2,
  Swords,
  Activity,
  Zap,
  Target,
  Check,
  X,
} from "lucide-react";
import { NotMeListSkeleton } from "./components/NotMeSkeleton";

const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Gamepad2,
  Swords,
  Activity,
  Zap,
  Target,
};

export const NotMeSidebar: React.FC = () => {
  const { listItems, addItem, removeItem, isLoading } = useNotMe();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newHabit, setNewHabit] = useState<{
    label: string;
    type: TrackerType;
    goal: number | string;
    icon: string;
    description: string;
  }>({
    label: "",
    type: "counter",
    goal: 5,
    icon: "Activity",
    description: "",
  });

  const handleAdd = () => {
    if (!newHabit.label.trim()) return;

    addItem({
      id: Date.now().toString(),
      label: newHabit.label,
      type: newHabit.type,
      goal:
        newHabit.type === "counter"
          ? parseInt(newHabit.goal.toString())
          : undefined,
      icon: newHabit.icon,
      description: newHabit.description,
    });

    setIsAddModalOpen(false);
    setNewHabit({
      label: "",
      type: "counter",
      goal: 5,
      icon: "Activity",
      description: "",
    });
  };

  // Delete Confirmation State
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);

  const handleDeleteClick = (id: string) => {
    if (deleteConfirmationId === id) {
      return;
    }
    setDeleteConfirmationId(id);
  };

  const confirmDelete = (id: string) => {
    removeItem(id);
    setDeleteConfirmationId(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmationId(null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-black border-l border-white/5 p-4 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Managed Habits
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll space-y-2">
        {isLoading ? (
          <NotMeListSkeleton />
        ) : (
          <>
            {listItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-3 bg-white/5 rounded-lg border border-transparent hover:bg-white/10 hover:border-white/5 transition-all"
              >
                {deleteConfirmationId === item.id ? (
                  <div className="flex items-center justify-between w-full animate-in fade-in duration-200">
                    <span className="text-sm font-medium text-red-400">
                      Confirm delete?
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => cancelDelete()}
                        className="p-1.5 text-gray-500 hover:text-white rounded hover:bg-white/10 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-white/50 transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                          {item.type} {item.goal ? `/ ${item.goal}` : ""}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 transition-all"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            ))}

            {listItems.length === 0 && (
              <div className="text-center py-8 px-4 text-gray-600 text-xs">
                <p>no habits yet.</p>
                <p className="mt-1 text-gray-700">
                  get started by clicking the + button above.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Habit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">Add New Habit</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Label
                </label>
                <input
                  value={newHabit.label}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, label: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Read Book"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newHabit.description}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, description: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 resize-none h-20"
                  placeholder="e.g. read 10 pages before bed..."
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Type</label>
                <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() =>
                      setNewHabit({ ...newHabit, type: "counter" })
                    }
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      newHabit.type === "counter"
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Counter
                  </button>
                  <button
                    onClick={() =>
                      setNewHabit({ ...newHabit, type: "outcome" })
                    }
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      newHabit.type === "outcome"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Outcome
                  </button>
                </div>
              </div>

              {newHabit.type === "counter" && (
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Daily Goal
                  </label>
                  <input
                    type="number"
                    value={newHabit.goal}
                    onChange={(e) =>
                      setNewHabit({
                        ...newHabit,
                        goal: e.target.value,
                      })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400 block mb-1">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(ICON_MAP).map((iconKey) => {
                    const Icon = ICON_MAP[iconKey];
                    return (
                      <button
                        key={iconKey}
                        onClick={() =>
                          setNewHabit({ ...newHabit, icon: iconKey })
                        }
                        className={`p-2 rounded-lg border ${
                          newHabit.icon === iconKey
                            ? "bg-white/10 border-blue-500 text-blue-400"
                            : "border-transparent text-gray-500 hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newHabit.label}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
