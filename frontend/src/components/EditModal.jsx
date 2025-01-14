import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EditModal = ({
  isOpen,
  itemToEdit,
  handleEdit,
  setItemToEdit,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setItemToEdit(null);
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <DialogDescription>Edit an item in the menu</DialogDescription>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-gray-500">Name</Label>
          <Input
            className="border-gray-500"
            value={itemToEdit?.name || ""}
            onChange={(e) =>
              setItemToEdit({ ...itemToEdit, name: e.target.value })
            }
          />
          <Label className="font-bold text-gray-500">Price</Label>
          <Input
            className="border-gray-500"
            value={itemToEdit?.price || ""}
            onChange={(e) =>
              setItemToEdit({ ...itemToEdit, price: e.target.value })
            }
          />
          <Label className="font-bold text-gray-500">Category</Label>
          <Select
            className="border-gray-500"
            value={itemToEdit?.category || ""}
            onValueChange={(value) =>
              setItemToEdit({ ...itemToEdit, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border-gray-500">
              <SelectItem value="Appetizers">Appetizers</SelectItem>
              <SelectItem value="Main Course">Main Course</SelectItem>
              <SelectItem value="Desserts">Desserts</SelectItem>
            </SelectContent>
          </Select>
          <Label className="font-bold text-gray-500">Availability</Label>

          <Switch
            className="data-[state=checked]:bg-green-500"
            checked={itemToEdit?.availability || false}
            onCheckedChange={(checked) =>
              setItemToEdit({ ...itemToEdit, availability: checked })
            }
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              handleEdit(itemToEdit._id);
              setItemToEdit(null);
              onClose();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
