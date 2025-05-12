"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  amount: z.string().min(1, "O valor é obrigatório."),
});

type FormSchema = z.infer<typeof formSchema>;

const EditTransactionButton = ({ transaction }: { transaction: any }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: transaction.name,
      amount: transaction.amount.toString(),
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar transação");

      alert("Transação atualizada com sucesso!");
      form.reset();
    } catch (error) {
      alert("Erro ao atualizar transação");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription>Atualize as informações da transação.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...form.register("name")}
            placeholder="Nome"
            defaultValue={transaction.name}
            className="w-full p-2 border rounded-md"
          />
          <input
            {...form.register("amount")}
            placeholder="Valor"
            defaultValue={transaction.amount}
            className="w-full p-2 border rounded-md"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionButton;
