import { memo } from "react";
import { IGenre } from "../interfaces/IGenre";
import { Button } from "./Button";
interface ISideBar {
  genres: IGenre[];
  selectedGenreId: number;
  handleClickButton(id: number): void;
}

function SideBarComponent(props: ISideBar) {
  const { genres, handleClickButton, selectedGenreId } = props;

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent);
