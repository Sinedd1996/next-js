"use client";

import { Button, Input, Modal } from "@/components";
import { FormEvent, useState } from "react";

export function UsersCreate() {
  const [inputValue, setInputValue] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="ml-auto">
      <Button
        text="Создать нового"
        additionalClassName="h-[48px]"
        onClick={() => setIsVisibleModal(true)}
      />
      {isVisibleModal && (
        <Modal isOpen={isVisibleModal} onClose={() => setIsVisibleModal(false)}>
          <form onSubmit={handleSubmit}>
            <Input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Имя"
              maxLength={30}
            />
            <Button text="Создать" />
          </form>
        </Modal>
      )}
    </div>
  );
}
