import { createContext, useCallback, useContext, useState } from "react"

type TransactionStatus = "pending" | "success" | "error"

interface Transaction {
  hash: `0x${string}`
  description: string
  status: TransactionStatus
  error?: Error
}

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, "status">) => void
  updateTransaction: (
    hash: `0x${string}`,
    status: TransactionStatus,
    error?: Error
  ) => void
  clearTransactions: () => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
)

export function TransactionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = useCallback((tx: Omit<Transaction, "status">) => {
    setTransactions((prev) => [...prev, { ...tx, status: "pending" }])
  }, [])

  const updateTransaction = useCallback(
    (hash: `0x${string}`, status: TransactionStatus, error?: Error) => {
      setTransactions((prev) =>
        prev.map((tx) => (tx.hash === hash ? { ...tx, status, error } : tx))
      )
    },
    []
  )

  const clearTransactions = useCallback(() => {
    setTransactions([])
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        clearTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider")
  }
  return context
}
