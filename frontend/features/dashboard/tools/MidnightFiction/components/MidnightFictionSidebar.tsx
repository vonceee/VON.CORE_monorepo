import React from "react";
import { LayoutTemplate } from "lucide-react";
import { useMidnightStore } from "../hooks/useMidnightStore";
import { Template } from "../types";
import { TEMPLATES } from "../utils";

export const MidnightFictionSidebar: React.FC = () => {
  const loadTemplate = useMidnightStore((state) => state.loadTemplate);

  const handleTemplateClick = (template: Template) => {
    loadTemplate(template.data.nodes, template.data.edges);
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F12] border-l border-[#2C2C30] w-full animate-fade-in font-sans">
      <div className="p-4 border-b border-[#2C2C30]">
        <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-[#C78BA1]" />
          Templates
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className="w-full text-left p-3 rounded-lg border border-[#2C2C30] bg-[#1B1B1F] hover:border-[#C78BA1] hover:bg-[#2C2C30] transition-all group focus:outline-none focus:ring-2 focus:ring-[#C78BA1]/50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-200 group-hover:text-[#C78BA1] transition-colors">
                {template.name}
              </span>
              <span className="text-gray-500 group-hover:text-[#C78BA1]">
                {template.icon}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400">
              {template.description}
            </p>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#2C2C30] text-xs text-center text-gray-500">
        Select a template to load
      </div>
    </div>
  );
};
