import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeIcon from "../../assets/close.svg";
import outcomeIcon from "../../assets/outcome.svg";
import incomeIcon from "../../assets/income.svg";
import { useTransactions } from "../../hooks/useTransactions";
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [data, setData] = useState({
    title: "",
    amount: 0,
    category: "",
    type: "deposit",
  });

  function handleChangeType(type: "deposit" | "withdraw") {
    setData((curr) => ({ ...curr, type }));
  }

  function handleChangeData(e: React.ChangeEvent<HTMLInputElement>) {
    setData((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();
    await createTransaction(data);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          name="title"
          value={data.title}
          placeholder="Título"
          onChange={handleChangeData}
        />
        <input
          name="amount"
          placeholder="Valor"
          type="number"
          value={data.amount}
          onChange={handleChangeData}
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={data.type === "deposit"}
            type="button"
            onClick={() => handleChangeType("deposit")}
            activeColor="green"
          >
            <img src={incomeIcon} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            isActive={data.type === "withdraw"}
            type="button"
            onClick={() => handleChangeType("withdraw")}
            activeColor="red"
          >
            <img src={outcomeIcon} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          name="category"
          placeholder="Categoria"
          onChange={handleChangeData}
          value={data.category}
        />
        <button type="submit">Nova transação</button>
      </Container>
    </Modal>
  );
}
