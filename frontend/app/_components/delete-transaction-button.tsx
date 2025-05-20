"use client";

import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { useState } from "react";

interface DeleteTransactionButtonProps {
  transactionId: string;
  reloadTransactions: () => void; // Função para recarregar a lista
}

const DeleteTransactionButton = ({
  transactionId,
  reloadTransactions,
}: DeleteTransactionButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir transação");
      }

      console.log("Transação excluída com sucesso");
      setIsDialogOpen(false);

      reloadTransactions(); // Recarregar a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  return (
    <div className="space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <TrashIcon />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Transação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir essa transação?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleDelete} variant="destructive">
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteTransactionButton;
