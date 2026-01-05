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
import { NotMeListSkeleton } from "./NotMeSkeleton";

export const NotMeSidebar: React.FC = () => {
  const { listItems, addItem, removeItem, isLoading } = useNotMe();
  const [isAdding, setIsAdding] = useState(false);

  // New Item Form State
  const [imgLabel, setImgLabel] = useState("");
  const [imgType, setImgType] = useState<TrackerType>("counter");
  const [imgGoal, setImgGoal] = useState<string>("5");
  const [imgIcon, setImgIcon] = useState("Activity");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgLabel.trim()) return;

    addItem({
      id: Date.now().toString(),
      label: imgLabel,
      type: imgType,
      goal: imgType === "counter" ? parseInt(imgGoal) : undefined,
      icon: imgIcon,
    });

    setIsAdding(false);
    setImgLabel("");
    setImgGoal("5");
  };

  const iconOptions = [
    { value: "Activity", icon: Activity },
    { value: "Droplets", icon: Droplets },
    { value: "Gamepad2", icon: Gamepad2 },
    { value: "Swords", icon: Swords },
    { value: "Zap", icon: Zap },
    { value: "Target", icon: Target },
  ];

  // Delete Confirmation State
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);

  const handleDeleteClick = (id: string) => {
    if (deleteConfirmationId === id) {
      // If already confirming this item, do nothing (or could toggle off, but buttons handle that)
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

  // ... existing code ...

  return (
    <div className="h-full w-full flex flex-col bg-black border-l border-white/5 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
          Managed Habits
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-3 bg-white/5 rounded-lg border border-white/10 flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Label (e.g. Reading)"
            value={imgLabel}
            onChange={(e) => setImgLabel(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-white/30"
            autoFocus
          />

          <div className="flex gap-2">
            <select
              value={imgType}
              onChange={(e) => setImgType(e.target.value as TrackerType)}
              className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none"
            >
              <option value="counter">Counter</option>
              <option value="outcome">Win/Loss</option>
            </select>

            <select
              value={imgIcon}
              onChange={(e) => setImgIcon(e.target.value)}
              className="bg-black/50 border border-white/10 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none flex-1"
            >
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value}
                </option>
              ))}
            </select>
          </div>

          {imgType === "counter" && (
            <input
              type="number"
              placeholder="Daily Goal"
              value={imgGoal}
              onChange={(e) => setImgGoal(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-2 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-white/30"
            />
          )}

          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-200"
            >
              Add
            </button>
          </div>
        </form>
      )}

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
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
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
              <div className="text-center py-8 text-gray-600 text-xs">
                No items tracking. Add one above.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
