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

const AddItemModal = ({
  isOpen,
  setIsOpen,
  itemToAdd,
  setItemToAdd,
  handleAdd,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add a new item to the menu</DialogDescription>
        <div className="flex flex-col gap-2">
          <Label className="font-bold text-gray-500">Name</Label>
          <Input
            className="border-gray-500"
            onChange={(e) =>
              setItemToAdd({ ...itemToAdd, name: e.target.value })
            }
          />
          <Label className="font-bold text-gray-500">Price</Label>
          <Input
            className="border-gray-500"
            onChange={(e) =>
              setItemToAdd({ ...itemToAdd, price: e.target.value })
            }
          />
          <Label className="font-bold text-gray-500">Category</Label>
          <Select
            className="border-gray-500"
            onValueChange={(value) =>
              setItemToAdd({ ...itemToAdd, category: value })
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
            checked={itemToAdd.availability}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              handleAdd();
              setIsOpen(false);
            }}
          >
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
