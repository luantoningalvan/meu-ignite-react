import { IGenre } from "../interfaces/IGenre";

interface IHeader {
  selectedGenre: IGenre;
}

export function Header(props: IHeader) {
  const { selectedGenre } = props;

  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}
