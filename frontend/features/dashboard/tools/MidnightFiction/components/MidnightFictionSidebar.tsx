import React, { useState } from "react";
import { LayoutTemplate, Trash2 } from "lucide-react";
import { useMidnightStore } from "../hooks/useMidnightStore";
import { Template } from "../types";
import { ConfirmationModal } from "./ConfirmationModal";

export const MidnightFictionSidebar: React.FC = () => {
  const {
    savedTemplates: templates,
    loadTemplate,
    deleteTemplate,
  } = useMidnightStore();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleTemplateClick = (template: Template) => {
    loadTemplate(template.id, template.data.nodes, template.data.edges);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTemplate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Delete Template"
        message="Are you sure you want to delete this template? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
      />
      <div className="flex flex-col h-full bg-[#0F0F12] border-l border-[#2C2C30] w-full animate-fade-in font-sans">
        <div className="p-4 border-b border-[#2C2C30]">
          <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4 text-[#C78BA1]" />
            Templates
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className="w-full text-left p-3 rounded-lg border border-[#2C2C30] bg-[#1B1B1F] hover:border-[#C78BA1] hover:bg-[#2C2C30] transition-all group focus:outline-none focus:ring-2 focus:ring-[#C78BA1]/50 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-200 group-hover:text-[#C78BA1] transition-colors truncate pr-6">
                  {template.name}
                </span>
              </div>

              {template.isCustom && (
                <div
                  onClick={(e) => handleDeleteClick(e, template.id)}
                  className="absolute top-2 right-2 p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Template"
                >
                  <Trash2 className="w-3 h-3" />
                </div>
              )}
            </button>
          ))}

          {templates.length === 0 && (
            <div className="text-center text-gray-500 text-xs py-4">
              No templates saved. create one!
            </div>
          )}
        </div>
      </div>
    </>
  );
};
