"use client";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./ui/date-picker";
import { useAuth } from "@clerk/nextjs";

const TRANSACTION_TYPE_OPTIONS = [
  { value: "EXPENSE", label: "Despesa" },
  { value: "DEPOSIT", label: "Depósito" },
  { value: "INVESTMENT", label: "Investimento" },
];

const TRANSACTION_CATEGORY_OPTIONS = [
  { value: "EDUCATION", label: "Educação" },
  { value: "ENTERTAINMENT", label: "Entretenimento" },
  { value: "FOOD", label: "Alimentação" },
  { value: "HEALTH", label: "Saúde" },
  { value: "HOUSING", label: "Moradia" },
  { value: "OTHER", label: "Outros" },
  { value: "SALARY", label: "Salário" },
  { value: "TRANSPORTATION", label: "Transporte" },
  { value: "UTILITY", label: "Utilidades" },
];

const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  { value: "BANK_TRANSFER", label: "Transferência Bancária" },
  { value: "BANK_SLIP", label: "Boleto Bancário" },
  { value: "CASH", label: "Dinheiro" },
  { value: "CREDIT_CARD", label: "Cartão de Crédito" },
  { value: "DEBIT_CARD", label: "Cartão de Débito" },
  { value: "OTHER", label: "Outros" },
  { value: "PIX", label: "Pix" },
];

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  amount: z.string().trim().min(1, { message: "O valor é obrigatório." }),
  type: z.enum(["EXPENSE", "DEPOSIT", "INVESTMENT"], {
    required_error: "O tipo é obrigatório.",
  }),
  category: z.enum(
    [
      "EDUCATION",
      "ENTERTAINMENT",
      "FOOD",
      "HEALTH",
      "HOUSING",
      "OTHER",
      "SALARY",
      "TRANSPORTATION",
      "UTILITY",
    ],
    {
      required_error: "A categoria é obrigatória.",
    }
  ),
  paymentMethod: z.enum(
    [
      "BANK_TRANSFER",
      "BANK_SLIP",
      "CASH",
      "CREDIT_CARD",
      "DEBIT_CARD",
      "OTHER",
      "PIX",
    ],
    { required_error: "O método de pagamento é obrigatório." }
  ),
  date: z.date({ required_error: "A data é obrigatória." }),
});

type FormSchema = z.infer<typeof formSchema>;

const EditTransactionButton = ({
  transaction,
}: {
  transaction: any;
}) => {
  const { userId } = useAuth();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: transaction ? transaction.name : "",
      amount: transaction ? transaction.amount.toString() : "",
      type: transaction ? transaction.type : "EXPENSE",
      category: transaction ? transaction.category : "OTHER",
      paymentMethod: transaction ? transaction.paymentMethod : "CASH",
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }

      const amountAsNumber = parseFloat(data.amount.replace(/[^\d,-]/g, '').replace(',', '.'));

      if (isNaN(amountAsNumber)) {
        throw new Error("Valor inválido");
      }

      const response = await fetch(`http://localhost:3000/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, amount: amountAsNumber, userId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar transação");
      }

      const updatedTransaction = await response.json();
      console.log("Transação atualizada:", updatedTransaction);

      form.reset();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold bg-opacity-0 hover:bg-opacity-10">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl><Input placeholder="Digite o nome..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="amount" render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl><MoneyInput placeholder="Digite o valor..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger></FormControl>
                  <SelectContent>{TRANSACTION_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione a categoria..." /></SelectTrigger></FormControl>
                  <SelectContent>{TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="date" render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionButton;
