import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useThemeStore } from "../../store/themeStore";

interface Props {
  title: string;
  onUpdate: (title: string) => void;
  onDelete: () => void;
}

const BoardHeader: React.FC<Props> = ({
  title,
  onUpdate,
  onDelete,
}) => {
  const isDark = useThemeStore((s) => s.isDark);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  const handleSave = () => {
    if (!value.trim()) return;
    onUpdate(value);
    setEditing(false);
  };

  return (
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 
        mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border
        ${isDark 
          ? "bg-zinc-900/95 border-zinc-700 text-white" 
          : "bg-white border-gray-200 text-gray-800"
        }
        shadow-sm
      `}
    >
      {editing ? (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:max-w-sm text-sm sm:text-base"
          autoFocus
        />
      ) : (
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold truncate">
            {title}
          </h1>
        </div>
      )}

      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        {editing ? (
          <>
            <Button 
              onClick={handleSave}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditing(false)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={() => setEditing(true)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={onDelete}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-sm"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardHeader;