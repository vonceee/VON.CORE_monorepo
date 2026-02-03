import React, { useState, useEffect } from "react";
import { MidnightNode } from "../types";

interface NodeEditorModalProps {
  node: MidnightNode;
  onSave: (label: string, description: string) => void;
  onCancel: () => void;
}

export const NodeEditorModal: React.FC<NodeEditorModalProps> = ({
  node,
  onSave,
  onCancel,
}) => {
  const [editLabel, setEditLabel] = useState(node.data.label);
  const [editDescription, setEditDescription] = useState(
    node.data.description || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editLabel, editDescription);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1B1B1F] border border-[#2C2C30] p-6 rounded-lg shadow-2xl w-96 animate-fade-in">
        <h3 className="text-[#C78BA1] font-semibold mb-4 flex items-center gap-2">
          <span className="uppercase text-xs tracking-wider text-gray-500">
            {node.type}
          </span>
          Edit Node
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Label</label>
            <input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="w-full bg-[#0F0F12] border border-[#2C2C30] rounded px-3 py-2 text-gray-200 focus:border-[#C78BA1] focus:outline-none"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#0F0F12] border border-[#2C2C30] rounded px-3 py-2 text-gray-200 font-mono text-xs focus:border-[#C78BA1] focus:outline-none"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#C78BA1] hover:bg-[#C78BA1]/90 text-black font-semibold text-xs rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
