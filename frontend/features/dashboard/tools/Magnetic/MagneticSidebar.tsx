import React, { useState } from "react";
import { Plus, X, Calendar, User, Repeat, ChevronDown } from "lucide-react";
import { Milestone, Category, Frequency } from "./types";

import { useMagnetic } from "./hooks/useMagnetic";

export const MagneticSidebar: React.FC = () => {
  const { addMilestone } = useMagnetic();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    event_date: "",
    category: "birthday" as Category,
    frequency: "annual" as Frequency,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addMilestone(formData);
      setFormData({
        name: "",
        event_date: "",
        category: "birthday",
        frequency: "annual",
      });
      setIsOpen(false);
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full border-r border-[#D1D5DB] bg-[#F2F4F7] flex flex-col w-80 shrink-0">
      <div className="p-6 border-b border-[#D1D5DB]">
        <h2 className="text-xl font-bold text-[#1B264F] mb-2">Magnetic</h2>
        <p className="text-xs text-[#8E9299]">~Track Future Events</p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 w-full flex items-center justify-center space-x-2 py-2 bg-[#1B264F] hover:bg-[#1B264F]/90 rounded-lg text-sm transition-colors text-white shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isOpen && (
          <div className="bg-[#1B264F]/20 border border-[#D1D5DB]/20 rounded-lg p-4 mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#8E9299] mb-1">
                  Name
                </label>
                <div className="flex items-center px-3 py-2 bg-[#F2F4F7] rounded border border-[#D1D5DB]/20">
                  <User className="w-4 h-4 text-[#8E9299] mr-2" />
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-transparent text-sm w-full focus:outline-none text-[#2C2E33] placeholder-[#8E9299]/50"
                    placeholder="Event Name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#8E9299] mb-1">
                  Date
                </label>
                <div className="flex items-center px-3 py-2 bg-[#F2F4F7] rounded border border-[#D1D5DB] focus-within:border-[#1B264F] transition-colors">
                  <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) =>
                      setFormData({ ...formData, event_date: e.target.value })
                    }
                    className="bg-transparent text-sm w-full focus:outline-none text-[#2C2E33]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-[#8E9299] mb-1">
                    Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Category,
                        })
                      }
                      className="w-full bg-[#F2F4F7] border border-[#D1D5DB] rounded px-2 py-2 text-xs text-[#2C2E33] focus:outline-none focus:border-[#1B264F] appearance-none pr-8 cursor-pointer"
                    >
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="milestone">Milestone</option>
                      <option value="custom">Custom</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9299] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#8E9299] mb-1">
                    Frequency
                  </label>
                  <div className="relative">
                    <select
                      value={formData.frequency}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          frequency: e.target.value as Frequency,
                        })
                      }
                      className="w-full bg-[#F2F4F7] border border-[#D1D5DB] rounded px-2 py-2 text-xs text-[#2C2E33] focus:outline-none focus:border-[#1B264F] appearance-none pr-8 cursor-pointer"
                    >
                      <option value="annual">Annual</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-time">One-time</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9299] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-1.5 text-xs text-[#8E9299] hover:text-[#2C2E33]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-1.5 bg-[#1B264F] hover:bg-[#1B264F]/90 text-white text-xs rounded shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
