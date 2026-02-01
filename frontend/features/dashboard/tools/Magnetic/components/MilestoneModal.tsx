import React, { useState, useEffect } from "react";
import { Milestone, Category, Frequency } from "../types";
import { X, Trash2, Save, ChevronDown } from "lucide-react";

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: Milestone;
  onSave: (id: string, updates: Partial<Milestone>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  milestone,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState(milestone.name);
  const [eventDate, setEventDate] = useState(milestone.event_date);
  const [category, setCategory] = useState<Category>(milestone.category);
  const [frequency, setFrequency] = useState<Frequency>(milestone.frequency);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(milestone.name);
      // Format date to YYYY-MM-DD for input[type="date"]
      const formattedDate = milestone.event_date.split("T")[0];
      setEventDate(formattedDate);
      setCategory(milestone.category);
      setFrequency(milestone.frequency);
      setShowDeleteConfirm(false); // Reset on open
    }
  }, [isOpen, milestone]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(milestone.id, {
        name,
        event_date: eventDate,
        category,
        frequency,
      });
      onClose();
    } catch (error) {
      console.error("Failed to save changes", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(milestone.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete milestone", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1B264F]">
            {showDeleteConfirm ? "Delete Milestone?" : "Edit Milestone"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {showDeleteConfirm ? (
          <div className="p-6 space-y-4">
            <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-start space-x-3">
              <div className="shrink-0">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-sm">
                <p className="font-semibold">Are you sure?</p>
                <p className="mt-1">
                  This action cannot be undone. This will permanently delete the
                  milestone{" "}
                  <span className="font-bold">"{milestone.name}"</span>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B264F] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B264F] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B264F] focus:border-transparent outline-none transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="milestone">Milestone</option>
                    <option value="custom">Custom</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <div className="relative">
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as Frequency)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B264F] focus:border-transparent outline-none transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-time</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-[#1B264F] text-white rounded-lg hover:bg-[#1B264F]/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
