import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

interface CreateBoardModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  loading?: boolean;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  open,
  onClose,
  onCreate,
  loading = false,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate(title);
    setTitle("");
    onClose();
  };

  return (
    <Modal open={open}  title="Create Board">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2 text-sm sm:text-base"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 text-sm sm:text-base"
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBoardModal;
